/**
 * Check input is truly. Always return boolean
 */
export const isTruly = (value): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  if (value instanceof String) {
    value = value.toLocaleLowerCase();
    return value === 'true' || value === '1';
  }

  return !!value;
};

export const int = value => {
  return parseInt(value, 10);
};

export const float = value => {
  return parseFloat(value);
};
