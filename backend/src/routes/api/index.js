import { Router } from "express";
import {
  createContact,
  deleteContact,
  retrieveContacts,
  updateContact
} from "../../data/contacts-dao.js";

const router = Router();

/**
 * GET /api/contacts: Returns a 200 OK response with a JSON array of all contacts.
 */
router.get("/contacts", async (req, res) => {
  try {
    return res.json(await retrieveContacts());
  } catch (err) {
    console.error(err);
    return res.status(500).send("Database error when fetching contacts");
  }
});

/**
 * POST /api/contacts: Creates a contact with the name, phoneNumber and funFact included in the request
 * body. name is required and must be unique; the others are optional.
 *
 * If name is not supplied or is not unique, returns a 422 response. Otherwise, returns a 201 response
 * with its location header set, and a JSON representation of the created contact.
 */
router.post("/contacts", async (req, res) => {
  const { name, phoneNumber, funFact } = req.body;
  if (!name) {
    return res.status(422).send(`'name' is a required field`);
  }

  // Fetch a photo from an API
  const response = await fetch("https://randomuser.me/api/?results=1");
  const data = await response.json();
  const photoUrl = data.results[0].picture.large;

  try {
    const contact = await createContact({ name, phoneNumber, funFact, photoUrl });
    return res.status(201).location(`/contact/${contact._id}`).json(contact);
  } catch (err) {
    // Handle the case where we try to add a contact with duplicate name
    if (err?.keyPattern?.name)
      return res.status(422).send("Cannot add contact with a duplicate name");

    // Unknown error e.g. can't connect to database
    console.error(err);
    return res.status(500).send("Database error when creating contact");
  }
});

/**
 * PATCH /api/contacts/:id: Updates the contact with the id given in the path param, if it exists.
 *
 * Returns a 404 if the contact doesn't exist. Returns a 422 if trying to update the contact's name
 * to one that is already taken. Returns a 204 response if successful.
 */
router.patch("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, funFact, photoUrl } = req.body;

  try {
    const updated = await updateContact(id, { name, phoneNumber, funFact, photoUrl });

    if (!updated) return res.status(404).send(`Contact ${id} not found`);

    return res.sendStatus(204);
  } catch (err) {
    // Handle the case where we try to update the contact to a name that already exists
    if (err?.keyPattern?.name) return res.status(422).send("That name is already taken");

    // Handle the case where we try to update the contact with an id that's not formatted properly
    if (err?.value === id) return res.status(404).send(`Contact ${id} not found`);

    // Unknown error e.g. can't connect to database
    console.error(err);
    return res.status(500).send("Database error when updating contact");
  }
});

/**
 * DELETE /api/contacts/:id: Deletes the contact with the given id, if it exists. Returns a 204
 * response either way.
 */
router.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteContact(id);
    return res.sendStatus(204);
  } catch (err) {
    // Handle the case where we try to update the contact with an id that's not formatted properly
    if (err?.value === id) return res.sendStatus(204);

    // Unknown error e.g. can't connect to database
    console.error(err);
    return res.status(500).send("Database error when deleting contact");
  }
});

export default router;
