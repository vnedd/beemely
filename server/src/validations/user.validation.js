import { USER_GENDER_ENUM } from '../models/User.js';
import { STATUS } from '../utils/constants.js';
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  validateBeforeCreateOrUpdate,
} from '../utils/validators.js';
import Joi from 'joi';

export class userValidation {
  static updateUserInfo = async (req, res, next) => {
    const correctCondition = Joi.object({
      full_name: Joi.string().optional().min(3).max(50).messages({
        'string.base': 'Full name should be a string',
        'string.empty': 'Full name cannot be an empty field',
        'string.min': 'Full name must be at least 3 characters long',
        'string.max': 'Full name should be at most 50 characters long',
      }),
      password: Joi.any(),
      avatar_url: Joi.string().optional().uri().allow('').messages({
        'string.base': 'Avatar URL should be a string',
        'string.uri': 'Avatar URL should be a valid URI',
      }),
      email: Joi.string().optional().email().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email should be a valid email address',
      }),
      phone: Joi.string()
        .optional()
        .pattern(/^\d{10}$/)
        .messages({
          'string.base': 'Phone should be a string',
          'string.pattern.base': 'Phone number must be exactly 10 digits',
        }),
      birth_day: Joi.date().optional().messages({
        'date.base': 'Birth day should be a date',
      }),
      status: Joi.number().valid(STATUS.ACTIVE, STATUS.INACTIVE),
      gender: Joi.string().valid(...Object.values(USER_GENDER_ENUM)),
      roles: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
      addresses: Joi.array().items(
        Joi.object({
          commune: Joi.string().trim().allow(''),
          district: Joi.string().trim().required(),
          city: Joi.string().trim().required(),
          detail_address: Joi.string().trim().required(),
          user_id: Joi.alternatives().try(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
          ),
          default: Joi.boolean().default(false),
        })
      ),
      vouchers: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
      tags: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
      is_verified: Joi.boolean().optional(),
      is_new_user: Joi.boolean().optional(),
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
  static updateProfile = async (req, res, next) => {
    const correctCondition = Joi.object({
      full_name: Joi.string().optional().min(3).max(50).messages({
        'string.base': 'Full name should be a string',
        'string.empty': 'Full name cannot be an empty field',
        'string.min': 'Full name must be at least 3 characters long',
        'string.max': 'Full name should be at most 50 characters long',
      }),
      is_new_user: Joi.boolean().optional(),
      password: Joi.any(),
      avatar_url: Joi.string().optional().uri().allow('').messages({
        'string.base': 'Avatar URL should be a string',
        'string.uri': 'Avatar URL should be a valid URI',
      }),
      phone: Joi.string()
        .optional()
        .pattern(/^\d{10}$/)
        .messages({
          'string.base': 'Phone should be a string',
          'string.pattern.base': 'Phone number must be exactly 10 digits',
        }),
      birth_day: Joi.date().optional().messages({
        'date.base': 'Birth day should be a date',
      }),
      gender: Joi.string().valid(...Object.values(USER_GENDER_ENUM)),
      addresses: Joi.array().items(
        Joi.object({
          commune: Joi.string().trim().allow(''),
          district: Joi.string().trim().required(),
          city: Joi.string().trim().required(),
          detail_address: Joi.string().trim().required(),
          user_id: Joi.alternatives().try(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
          ),
          default: Joi.boolean().default(false),
        })
      ),
      tags: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

  static createUserInfo = async (req, res, next) => {
    const correctCondition = Joi.object({
      full_name: Joi.string().required().max(50).messages({
        'string.base': 'Full name should be a string',
        'string.empty': 'Full name cannot be an empty field',
        'string.max': 'Full name should be at most 50 characters long',
        'any.required': 'Full name is required',
      }),
      password: Joi.string().required().min(6).trim().messages({
        'string.base': 'Password should be a string',
        'string.min': 'Password should be at least 6 characters',
        'any.required': 'Password is required',
      }),
      avatar_url: Joi.string().optional().uri().allow('').messages({
        'string.base': 'Avatar URL should be a string',
        'string.uri': 'Avatar URL should be a valid URI',
      }),
      email: Joi.string().required().email().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email should be a valid email address',
        'any.required': 'Email is required',
      }),
      phone: Joi.string()
        .optional()
        .pattern(/^\d{10}$/)
        .messages({
          'string.base': 'Phone should be a string',
          'string.pattern.base': 'Phone number must be exactly 10 digits',
        }),
      birth_day: Joi.date().optional().messages({
        'date.base': 'Birth day should be a date',
      }),
      status: Joi.number().valid(STATUS.ACTIVE, STATUS.INACTIVE),
      gender: Joi.string().valid(...Object.values(USER_GENDER_ENUM)),
      roles: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
      addresses: Joi.array().items(
        Joi.object({
          commune: Joi.string().trim().allow(''),
          district: Joi.string().trim().required(),
          city: Joi.string().trim().required(),
          detail_address: Joi.string().trim().required(),
          user_id: Joi.alternatives().try(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
          ),
          default: Joi.boolean().default(false),
        })
      ),
      vouchers: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
      tags: Joi.alternatives()
        .try(
          Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
          Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
        )
        .optional(),
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
