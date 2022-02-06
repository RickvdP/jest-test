import { isObject } from '../utils';

/**
 * Defines the base HTTP exception
 */
// eslint-disable-next-line import/prefer-default-export
export class HttpException extends Error {
  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   * `throw new HttpException()`
   *
   * @usageNotes
   * The constructor arguments define the response and the HTTP response status code.
   * - The `response` argument (required) defines the JSON response body.
   * - The `status` argument (required) defines the HTTP Status Code.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: the Http Status Code.
   * - `message`: a short description of the HTTP error by default; override this
   * by supplying a string in the `response` parameter.
   *
   * To override the entire JSON response body, pass an object to the `createBody`
   * method. Error handler will serialize the object and return it as the JSON response body.
   *
   * The `status` argument is required, and should be a valid HTTP status code.
   * Best practice is to use the `HttpStatus` enum imported from constants.
   *
   * @param response string or object describing the error condition.
   * @param status HTTP response status code.
   */
  constructor(
    private readonly response: string | Record<string, unknown>,
    private readonly status: number,
  ) {
    super();
    this.initMessage();
    this.initName();
  }

  public initMessage() {
    if (typeof this.response === 'string') {
      this.message = this.response;
    } else if (
      this.response
      && typeof this.response === 'object'
      && typeof (this.response as Record<string, string>).message === 'string'
    ) {
      this.message = (this.response as Record<string, string>).message;
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') || 'Error';
    }
  }

  public initName(): void {
    this.name = this.constructor.name;
  }

  public getResponse(): string | object {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }

  public static createBody(
    objectOrError?: string | Record<string, unknown>,
    description?: string,
    statusCode?: number,
  ) {
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}
