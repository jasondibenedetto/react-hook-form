import getFieldValue from './getFieldValue';
import isString from '../utils/isString';
import { DataType, FieldValue, Ref } from '../types';

export default function getFieldsValue<Data extends DataType>(
  fields: DataType,
  fieldName?: string | string[],
): Data {
  return Object.values(fields).reduce(
    (previous: DataType, data: Ref): FieldValue => {
      const {
        ref,
        ref: { name },
      } = data;
      const value = getFieldValue(fields, ref);

      if (isString(fieldName)) return name === fieldName ? value : previous;

      if (Array.isArray(fieldName)) {
        if (fieldName.includes(name)) {
          previous[name] = value;
        }
      } else {
        previous[name] = value;
      }

      return previous;
    },
    {},
  );
}
