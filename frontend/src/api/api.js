const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CONTACTS_URL = `${BASE_URL}/contacts`;

/**
 * Sends a POST request to the server to create a new contact.
 *
 * @param {string} name the new contact's name
 * @param {string} phoneNumber the new contact's phone number
 * @param {string} funFact a fun fact about the new contact
 *
 * @returns a promise which will either resolve to the new contact object returned by the server,
 *          or will reject with the response object if a response outside the 200-299 range is returned.
 */
export const apiCreateContact = (name, phoneNumber, funFact) =>
  fetch(CONTACTS_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      phoneNumber,
      funFact
    }),
    headers: { "content-type": "application/json" }
  })
    .then(throwIfNotOk)
    .then((r) => r.json());

/**
 * Sends a GET request to the server to get all contacts.
 *
 * @returns a promise which will resolve to an array of all contact info on the server.
 */
export const apiRetrieveContacts = () => fetch(CONTACTS_URL).then((response) => response.json());

/**
 * Sends a PATCH request to the server to update a contact.
 *
 * @param contact the contact to update
 *
 * @returns a promise which will either resolve if the update was successful, or reject with the
 *          response object if a response object outside the 200-299 range is returned.
 */
export const apiUpdateContact = (contact) =>
  fetch(`${CONTACTS_URL}/${contact._id}`, {
    method: "PATCH",
    body: JSON.stringify(contact),
    headers: { "content-type": "application/json" }
  }).then(throwIfNotOk);

/**
 * Sends a DELETE request to the server to delete a contact.
 *
 * @param {string} id the id of the contact to delete
 *
 * @returns a promise which will either resolve if the deletion was successful, or reject with the
 *          response object if a response object outside the 200-299 range is returned.
 */
export const apiDeleteContact = (id) =>
  fetch(`${CONTACTS_URL}/${id}`, {
    method: "DELETE"
  }).then(throwIfNotOk);

/**
 * A helper function which will either throw or return the given response, depending on the value
 * of its "ok" prop.
 *
 * @param response An HTTP response, from a resolved fetch() call
 * @returns the response object itself, if its ok property is truthy
 * @throws the response object itself, if its ok property is falsy
 */
function throwIfNotOk(response) {
  if (!response.ok) throw response;
  return response;
}
