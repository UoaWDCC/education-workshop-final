import { Contact } from "./schema.js";

/**
 * Retrieves all contacts from the database.
 *
 * @returns a list of contacts
 */
export async function retrieveContacts() {
  return await Contact.find();
}

/**
 * Creates a new contact in the database.
 *
 * @param contact the contact to add; should not include an _id, this will be auto-generated.
 * @returns the contact created by the database, including _id.
 * @throws error if trying to add a contact with a duplicate name. The error will have a keyPattern.name prop.
 */
export async function createContact(contact) {
  const dbContact = new Contact(contact);
  await dbContact.save();
  return dbContact;
}

/**
 * Updates a contact with the given id.
 *
 * @param id the id of the contact to update.
 * @param contact the contact info to update for the matching contact.
 * @returns true if a contact with matching _id was found and updated, false otherwise.
 * @throws error if trying to update a contact with a name that's already taken.
 *         The error will have a keyPattern.name prop.
 * @throws error if an invalid format for id is supplied.
 *         The error's value prop will be equal to the supplied id.
 */
export async function updateContact(id, contact) {
  const dbContact = await Contact.findByIdAndUpdate(id, contact);
  return !!dbContact;
}

/**
 * Deletes the contact with the given id, if it exists.
 *
 * @param id the id of the cotnact to delete.
 * @throws error if an invalid format for id is supplied.
 *         The error's value prop will be equal to the supplied id.
 */
export async function deleteContact(id) {
  return await Contact.deleteOne({ _id: id });
}
