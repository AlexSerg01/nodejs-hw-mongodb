import {
  createContact,
  deleteContact,
  getAllContactsFromDB,
  getContactByIdFormDB,
  updateContact,
} from "../services/contacts.js";

import createHttpError from "http-errors";

export async function getAllContacts(req, res) {
  const contacts = await getAllContactsFromDB();
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const contact = await getContactByIdFormDB(contactId);
  if (!contact) {
    throw createHttpError(404, "Student not found");
  } else {
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  }
}

export async function createContactController(req, res) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.student,
  });
}

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, "Not found contact"));
    return;
  }
  res.status(204).send();
}
