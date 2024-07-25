import { Contact } from "../db/models/Contact.js";

export const getAllContactsFromDB = () => Contact.find();

export const getContactByIdFormDB = (id) => Contact.findById(id);

export const createContact = async (payload) => {
  const student = await Contact.create(payload);
  return student;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
