import { isBoolean, isNull, isNumber, isString, isUndefined } from "./primitives";

describe("primitives", () => {
  // isNull
  test("isNull null", () => expect(isNull(null)).toEqual(true));
  test("isNull undefined", () => expect(isNull(undefined)).toEqual(false));
  test("isNull boolean", () => expect(isNull(false)).toEqual(false));
  test("isNull number", () => expect(isNull(6)).toEqual(false));
  test("isNull string", () => expect(isNull("trpkit")).toEqual(false));

  // isUndefined
  test("isUndefined null", () => expect(isUndefined(null)).toEqual(false));
  test("isUndefined undefined", () => expect(isUndefined(undefined)).toEqual(true));
  test("isUndefined boolean", () => expect(isUndefined(false)).toEqual(false));
  test("isUndefined number", () => expect(isUndefined(6)).toEqual(false));
  test("isUndefined string", () => expect(isUndefined("trpkit")).toEqual(false));

  // isBoolean
  test("isBoolean null", () => expect(isBoolean(null)).toEqual(false));
  test("isBoolean undefined", () => expect(isBoolean(undefined)).toEqual(false));
  test("isBoolean boolean", () => expect(isBoolean(false)).toEqual(true));
  test("isBoolean number", () => expect(isBoolean(6)).toEqual(false));
  test("isBoolean string", () => expect(isBoolean("trpkit")).toEqual(false));

  // isNumber
  test("isNumber null", () => expect(isNumber(null)).toEqual(false));
  test("isNumber undefined", () => expect(isNumber(undefined)).toEqual(false));
  test("isNumber boolean", () => expect(isNumber(false)).toEqual(false));
  test("isNumber number", () => expect(isNumber(6)).toEqual(true));
  test("isNumber string", () => expect(isNumber("trpkit")).toEqual(false));

  // isString
  test("isString null", () => expect(isString(null)).toEqual(false));
  test("isString undefined", () => expect(isString(undefined)).toEqual(false));
  test("isString boolean", () => expect(isString(false)).toEqual(false));
  test("isString number", () => expect(isString(6)).toEqual(false));
  test("isString string", () => expect(isString("trpkit")).toEqual(true));
});
