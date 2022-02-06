/* eslint-disable import/prefer-default-export */
import { HttpStatus } from '../constants';
import { HttpException } from './HttpException';

/**
 * Defines an HTTP exception for *Bad Request* type errors.
 */
export class UnauthorizedException extends HttpException {
  /**
   * Instantiate a `UnauthorizedException` Exception.
   *
   * @example
   * `throw new UnauthorizedException()`
   *
   * @usageNotes
   * The HTTP response status code will be 401.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 401.
   * - `message`: the string `'Bad Request'` by default; override this by supplying
   * a string in the `objectOrError` parameter.
   *
   * If the parameter `objectOrError` is a string, the response body will contain an
   * additional property, `error`, with a short description of the HTTP error. To override the
   * entire JSON response body, pass an object instead. Error handler will serialize the object
   * and return it as the JSON response body.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | Record<string, unknown>, description = 'Unauthorized') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    );
  }
}
