import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  validateBeforeCreateOrUpdate,
} from '../utils/validators.js';
import Joi from 'joi';

export const addressCreateValidation = async (req, res, next) => {
  const createCondition = Joi.object({
    commune: Joi.string().trim().allow(''),
    district: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    detail_address: Joi.string().trim().required(),
    user_id: Joi.alternatives().try(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    ),
    default: Joi.boolean().default(false),
  });

  try {
    await validateBeforeCreateOrUpdate(createCondition, req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const addressUpdateValidation = async (req, res, next) => {
  const updateCondition = Joi.object({
    commune: Joi.string().trim().required(),
    district: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    detail_address: Joi.string().trim().required(),
    user_id: Joi.alternatives().try(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    ),
    default: Joi.boolean(),
  });

  try {
    await validateBeforeCreateOrUpdate(updateCondition, req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const permissionValidation = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().trim().required(),
  });

  try {
    await validateBeforeCreateOrUpdate(correctCondition, req.body);
    next();
  } catch (error) {
    next(error);
  }
};
