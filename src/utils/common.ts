/* eslint-disable import/prefer-default-export */
/**
 * Check whether given input is object or not
 * @export
 * @param {unknown} obj
 * @return {*}  {boolean}
 */
export function isObject(obj: unknown): boolean {
  return !!(obj && typeof obj === 'object');
}
