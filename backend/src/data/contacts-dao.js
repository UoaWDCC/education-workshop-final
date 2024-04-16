import { Contact } from "./schema.js";

/**
 * Retrieves all contacts from the database.
 *
 * @returns a list of contacts
 */
export async function retrieveContacts() {
  return await Contact.find();
}

export async function createContact(contact) {
  const dbContact = new Contact(contact);
  await dbContact.save();
  return dbContact;
}

export async function updateContact(id, contact) {
  const dbContact = await Contact.findByIdAndUpdate(id, contact);
  return !!dbContact;
}

export async function deleteContact(id) {
  return await Contact.deleteOne({ _id: id });
}
