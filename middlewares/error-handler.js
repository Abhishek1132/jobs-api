const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const customError = {
    error: err.message || "Internal Server Error! Try again later.",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    customError.error = `Please provide valid ${Object.keys(err.errors)}!`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    customError.error = `Invalid ID: ${err.value} !`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.error = `Duplicate value provided for unique field: ${Object.keys(
      err.keyValue
    )}! Please provide another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // return res.status(customError.statusCode).json({ err });

  return res.status(customError.statusCode).json({ error: customError.error });
};

module.exports = errorHandler;
