/**
 * Checks if the given input is null.
 *
 * @template T The type of the input.
 * @param {T | null} input The input to be checked.
 * @returns {boolean} A boolean value indicating if the input is null.
 */
export const isNull = <T>(input: T | null): input is null => {
  return input === null;
};

/**
 * Check if the given value is undefined
 *
 * @param {any} input - The value to be checked
 * @returns {boolean} - True if the value is undefined, false otherwise
 */
export const isUndefined = <T>(input: T | undefined): input is undefined => {
  return typeof input === "undefined";
};

/**
 * Checks if the input is a boolean value.
 *
 * @param {any} input - The input to be checked.
 * @returns {boolean} - Returns true if the input is a boolean value, otherwise false.
 */
export const isBoolean = <T>(input: T | boolean): input is boolean => {
  return typeof input === "boolean";
};

/**
 * Checks if the input is a valid number.
 *
 * @param {T | number} input - The input to be checked.
 * @returns {boolean} True if the input is a number, false otherwise.
 */
export const isNumber = <T>(input: T | number): input is number => {
  return typeof input === "number" && !Number.isNaN(input);
};

/**
 * Determines whether the given input is a bigint.
 *
 * @param {any} input - The input value to check.
 * @returns {boolean} - True if the input is a bigint, false otherwise.
 */
export const isBigInt = <T>(input: T | bigint): input is bigint => {
  return typeof input === "bigint";
};

/**
 * Checks if the input is a string.
 * @param {any} input - The value to be checked.
 * @return {boolean} - True if the input is a string, false otherwise.
 */
export const isString = <T>(input: T | string): input is string => {
  return typeof input === "string";
};

/**
 * Checks if a given value is a symbol.
 *
 * @param {any} input - The value to be checked.
 * @returns {boolean} - Returns true if the value is a symbol, false otherwise.
 */
export const isSymbol = <T>(input: T | symbol): input is symbol => {
  return typeof input === "symbol";
};
