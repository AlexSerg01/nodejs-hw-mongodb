import { SORT_ORDER } from "../constants/sortOrder.js";
import { Contact } from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContactsFromDB = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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
      ...options,
    }
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
