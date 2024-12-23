import lodash from 'lodash';
import { TypeCheck } from './typeCheck.js';

export const reSort = (obj) => {
  const sortedObj = {};
  const sortedKeys = Object.keys(obj).sort();
  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key];
  });

  return sortedObj;
};

export const toCamelCase = (obj) => {
  const output = {};
  for (const [key, value] of Object.entries(obj)) {
    if (TypeCheck.isArray(value)) {
      const transformedValue = value.map((v) => {
        if (TypeCheck.isObjectId(v)) return v.toString();
        if (TypeCheck.isPlainObject(v)) return toCamelCase(v);
        if (TypeCheck.isMongooseModel(v)) return toCamelCase(v._doc);
        return v;
      });
      output[lodash.camelCase(key)] = transformedValue;
    } else if (TypeCheck.isObjectId(value)) {
      output[lodash.camelCase(key)] = value.toString();
    } else if (TypeCheck.isPlainObject(value)) {
      output[lodash.camelCase(key)] = toCamelCase(value);
    } else if (TypeCheck.isMongooseModel(value)) {
      output[lodash.camelCase(key)] = toCamelCase(value._doc);
    } else {
      output[lodash.camelCase(key)] = TypeCheck.isObjectId(value) ? value.toString() : value;
    }
  }

  return output;
};

export const Transform = (data, transform) => {
  const transformFn = transform || toCamelCase;
  if (Array.isArray(data)) {
    return data.map((item) => {
      const dt = item._doc || item;
      return reSort(transformFn(dt));
    });
  }

  return reSort(transformFn(data));
};
