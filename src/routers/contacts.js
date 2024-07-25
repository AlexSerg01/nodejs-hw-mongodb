import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createContactController,
  deleteContactController,
  getAllContacts,
  getContactById,
  patchContactController,
} from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/contacts", ctrlWrapper(getAllContacts));

contactsRouter.get("/contacts/:contactId", ctrlWrapper(getContactById));

contactsRouter.post("/contacts", ctrlWrapper(createContactController));

contactsRouter.patch(
  "/contacts/:contactId",
  ctrlWrapper(patchContactController)
);

contactsRouter.delete(
  "/contacts/:contactId",
  ctrlWrapper(deleteContactController)
);

export default contactsRouter;
