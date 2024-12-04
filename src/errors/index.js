import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.StatusCode = StatusCodes.FORBIDDEN;
  }
}

export { UnauthenticatedError, UnauthorizedError };
