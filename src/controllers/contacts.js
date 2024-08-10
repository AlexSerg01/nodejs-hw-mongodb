import {
  createContact,
  deleteContact,
  getAllContactsFromDB,
  getContactByIdFormDB,
  updateContact,
} from "../services/contacts.js";

import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export async function getAllContacts(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  filter.userId = req.user._id;

  const contacts = await getAllContactsFromDB({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const contact = await getContactByIdFormDB(contactId, req.user._id);
  if (!contact) {
    const error = createHttpError(404, "Contact not found");
    return res.status(404).json({
      status: 404,
      message: error.message,
      data: error.message,
    });
  } else {
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  }
}

export async function createContactController(req, res) {
  const contact = await createContact({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

export async function updateContactController(req, res, _next) {
  const updatedContact = await updateContact(
    req.params.contactId,
    req.body,
    req.user._id
  );
  if (!updatedContact) {
    throw createHttpError(404, "Contact not found");
  }
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact.contact,
  });
}

export async function deleteContactController(req, res, _next) {
  const result = await deleteContact(req.params.contactId, req.user._id);
  if (!result) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(204).end();
}
