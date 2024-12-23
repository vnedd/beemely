import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { getFilterOptions, getPaginationOptions } from '../utils/pagination.js';
import { Transformer } from '../utils/transformer.js';
import { checkRecordByField } from '../utils/CheckRecord.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';

export default class UserService {
  static createUser = async (req) => {
    const {
      full_name,
      email,
      password,
      avatar_url,
      phone,
      status,
      gender,
      roles,
      addresses,
      tags,
    } = req.body;
    const userPermissions = req.user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name)
    );

    if (!userPermissions.includes('Read_User') && roles) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, {
        not_have_access: 'You do not have permission to create users with roles',
      });
    }

    await checkRecordByField(User, 'email', email, false);

    let updateAddress = addresses;
    const defaultAddress = addresses.filter((address) => address.default);
    if (defaultAddress.length > 1) {
      throw new ApiError(StatusCodes.BAD_REQUEST, {
        addresses: 'There can only be one default address',
      });
    } else if (defaultAddress.length === 0) {
      updateAddress = addresses.map((a, index) => (index === 0 ? { ...a, default: true } : a));
    }

    const createdAddresses = await Promise.all(
      updateAddress.map((address) => {
        return Address.create(address);
      })
    );

    const addressIds = createdAddresses.map((add) => add._id);

    const newUser = await User.create({
      full_name,
      email,
      password: bcrypt.hashSync(password, 10),
      avatar_url,
      phone,
      status,
      gender,
      roles,
      addresses: addressIds,
      tags,
    });

    await newUser.save();
    const populatedUser = await User.findById(newUser._id)
      .populate([
        {
          path: 'roles',
          populate: { path: 'permissions' },
        },
        {
          path: 'addresses',
        },
        {
          path: 'tags',
        },
      ])
      .exec();

    populatedUser.password = undefined;

    return Transformer.transformObjectTypeSnakeToCamel(populatedUser.toObject());
  };

  static updateUser = async (req) => {
    const {
      full_name,
      email,
      password,
      avatar_url,
      phone,
      birth_day,
      status,
      gender,
      roles,
      addresses,
      tags,
      is_verified,
      is_new_user,
    } = req.body;

    await checkRecordByField(User, 'email', email, false, req.params.id);

    const userPermissions = req.user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name)
    );

    if (!userPermissions.includes('Read_User') && req.body.roles) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, {
        not_have_access: 'You do not have permission to update roles',
      });
    }

    const currentUser = await User.findById(req.params.id).populate([
      {
        path: 'roles',
      },
      {
        path: 'addresses',
      },
    ]);

    if (!currentUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, {
        not_found: 'User not found',
      });
    }

    const isCustomer =
      req.user.list_name_role.includes('Customer') && req.user.list_name_role.length === 1;

    const defaultAddress = addresses?.filter((address) => address.default);
    if (defaultAddress?.length > 1) {
      throw new ApiError(StatusCodes.BAD_REQUEST, {
        addresses: 'There can only be one default address',
      });
    } else if (defaultAddress?.length === 0) {
      updateAddress = addresses.map((a, index) => (index === 0 ? { ...a, default: true } : a));
    }

    let newAddressIds;
    if (addresses) {
      const oldAddressIds = currentUser.addresses.map((addr) => addr._id);
      let updateAddress = addresses;
      const defaultAddress = addresses.filter((address) => address.default);
      if (defaultAddress.length > 1) {
        throw new ApiError(StatusCodes.BAD_REQUEST, {
          addresses: 'There can only be one default address',
        });
      } else if (defaultAddress.length === 0) {
        updateAddress = addresses.map((a, index) => (index === 0 ? { ...a, default: true } : a));
      }
      const createdAddresses = await Address.insertMany(updateAddress);
      await Address.deleteMany({ _id: { $in: oldAddressIds } });
      newAddressIds = createdAddresses.map((addr) => addr._id);
    }

    let updateFields = {
      ...(full_name && { full_name }),
      ...(password && { password: bcrypt.hashSync(password, 10) }),
      ...(avatar_url && { avatar_url }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(birth_day && { birth_day }),
      ...(gender && { gender }),
      ...((status || status == 0) && { status }),
      ...(addresses && { addresses: newAddressIds }),
      ...(tags && { tags }),
      ...(is_verified !== undefined && { is_verified }),
      ...(is_new_user !== undefined && { is_new_user }),
    };

    const restrictedFields = [
      'full_name',
      'password',
      'avatar_url',
      'email',
      'phone',
      'birth_day',
      'gender',
      'addresses',
      'tags',
      'is_new_user',
      'is_verified',
    ];

    if (isCustomer) {
      if (Object.keys(updateFields).some((field) => restrictedFields.includes(field))) {
        throw new ApiError(StatusCodes.FORBIDDEN, {
          not_have_access: 'You only have permission to update status and role!',
        });
      }
      updateFields = {
        ...((status || status == 0) && { status }),
      };
      if (roles) updateFields.roles = roles;
    } else {
      if (userPermissions.includes('Read_User')) {
        updateFields = { ...updateFields, ...(roles && { roles }) };
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .populate([
        {
          path: 'roles',
          populate: { path: 'permissions' },
        },
        {
          path: 'addresses',
        },
        {
          path: 'tags',
        },
      ])
      .exec();

    if (!updatedUser) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, {
        server: 'Server does not respond',
      });
    }

    const orderCount = await Order.countDocuments({
      user: updatedUser._id,
    });

    const userObj = updatedUser.toObject();
    userObj.order_count = orderCount;

    console.log(userObj);

    return Transformer.transformObjectTypeSnakeToCamel(userObj);
  };

  static getOneUser = async (req) => {
    await checkRecordByField(User, '_id', req.params.id, true);
    const user = await User.findById(req.params.id)
      .populate([
        {
          path: 'roles',
          populate: { path: 'permissions' },
        },
        {
          path: 'addresses',
        },
        {
          path: 'tags',
        },
      ])
      .exec();

    user.password = undefined;

    return Transformer.transformObjectTypeSnakeToCamel(user.toObject());
  };

  static getAllUsers = async (req) => {
    const options = getPaginationOptions(req);
    const filter = getFilterOptions(req, ['full_name', 'email']);

    const users = await User.paginate(filter, options);

    await User.populate(users.docs, [
      {
        path: 'roles',
        populate: { path: 'permissions' },
      },
      {
        path: 'addresses',
      },
      {
        path: 'vouchers',
      },
      {
        path: 'tags',
      },
    ]);

    const { docs, ...otherFields } = users;

    const userOrderCount = await Promise.all(
      docs.map(async (user) => {
        const orderCount = await Order.countDocuments({
          user: user._id,
        });

        const userObject = user.toObject();
        userObject.orderCount = orderCount;
        delete userObject.password;

        return userObject;
      })
    );
    const transformedUsers = userOrderCount.map((user) =>
      Transformer.transformObjectTypeSnakeToCamel(user)
    );

    return {
      metaData: Transformer.removeDeletedField(transformedUsers),
      ...otherFields,
    };
  };

  static deleteUser = async (req) => {
    await checkRecordByField(User, '_id', req.params.id, true);

    const orderCount = await Order.countDocuments({
      user: req.params.id,
    });

    if (orderCount > 0) {
      throw new ApiError(StatusCodes.CONFLICT, {
        message: 'Không thể xóa người dùng này',
      });
    }

    const res = await User.findByIdAndDelete(req.params.id);

    return Transformer.transformObjectTypeSnakeToCamel(res.toObject());
  };
}
