import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getAllContacts,
  getContactById,
  updateContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/contacts", ctrlWrapper(getAllContacts));

contactsRouter.get(
  "/contacts/:contactId",
  isValidId,
  ctrlWrapper(getContactById)
);

contactsRouter.post(
  "/contacts",
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

contactsRouter.patch(
  "/contacts/:contactId",
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController)
);

contactsRouter.delete(
  "/contacts/:contactId",
  isValidId,
  ctrlWrapper(deleteContactController)
);

export default contactsRouter;
