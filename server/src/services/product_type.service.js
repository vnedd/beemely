import ProductType from '../models/Product_Type.js';
import { generateSlug } from '../utils/GenerateSlug.js';
import { Transformer } from '../utils/transformer.js';
import { getFilterOptions, getPaginationOptions } from '../utils/pagination.js';
import { checkRecordByField } from '../utils/CheckRecord.js';
import Product from '../models/Product.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

export default class ProductTypeService {
  static createProductType = async (req) => {
    const { name, image_url } = req.body;

    await checkRecordByField(ProductType, 'name', name, false);

    const slug = await generateSlug(ProductType, name);

    const newProductTypes = await ProductType.create({ name, slug, image_url });

    return Transformer.transformObjectTypeSnakeToCamel(newProductTypes.toObject());
  };

  static getAllProductType = async (req) => {
    const options = getPaginationOptions(req);
    const filter = getFilterOptions(req, ['name']);

    const paginatedProductTypes = await ProductType.paginate(filter, options);
    const { docs, ...otherFields } = paginatedProductTypes;

    const productTypesWithProductCount = await Promise.all(
      docs.map(async (productType) => {
        const productCount = await Product.countDocuments({
          product_type: productType._id,
        });

        const productTypeObject = productType.toObject();
        productTypeObject.product_count = productCount;

        return productTypeObject;
      })
    );

    const transformedProductTypes = productTypesWithProductCount.map((productType) =>
      Transformer.transformObjectTypeSnakeToCamel(productType)
    );

    return {
      metaData: Transformer.removeDeletedField(transformedProductTypes),
      others: otherFields,
    };
  };

  static getOneProductType = async (req) => {
    await checkRecordByField(ProductType, '_id', req.params.id, true);
    const type = await ProductType.findById(req.params.id);
    return Transformer.transformObjectTypeSnakeToCamel(type.toObject());
  };

  static updateProductType = async (req) => {
    const { name, image_url } = req.body;

    await checkRecordByField(ProductType, '_id', req.params.id, true);

    const currentType = await ProductType.findById(req.params.id);

    let slug = currentType.slug;

    if (name && name !== currentType.name) {
      await checkRecordByField(ProductType, 'name', name, false, req.params.id);
      slug = await generateSlug(ProductType, name);
    }

    const updatedProductType = await ProductType.findByIdAndUpdate(
      req.params.id,
      { name, slug, image_url: image_url || currentType.image_url },
      { new: true, runValidators: true }
    );

    return Transformer.transformObjectTypeSnakeToCamel(updatedProductType.toObject());
  };

  static deleteProductType = async (req) => {
    await checkRecordByField(ProductType, '_id', req.params.id, true);
    const productCount = await Product.countDocuments({
      product_type: req.params.id,
    });

    if (productCount > 0) {
      throw new ApiError(StatusCodes.CONFLICT, {
        message: 'Không thể xóa loại sản phẩm này',
      });
    }
    return await ProductType.findByIdAndDelete(req.params.id);
  };
}
