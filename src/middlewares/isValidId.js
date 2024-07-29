import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    const error = new createHttpError(400, "Invalid ID format");
    return next(error);
  }
  next();
};
