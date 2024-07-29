import createHttpError from "http-errors";

export const errorHandler = (err, _req, res, _next) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors || [],
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
