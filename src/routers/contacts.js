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
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactById));

contactsRouter.post(
  "/",
  upload.single("photo"),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

contactsRouter.patch(
  "/:contactId",
  isValidId,
  upload.single("photo"),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController)
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrlWrapper(deleteContactController)
);

export default contactsRouter;
