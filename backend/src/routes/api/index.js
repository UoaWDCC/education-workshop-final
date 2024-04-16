import { Router } from "express";
import {
  createContact,
  deleteContact,
  retrieveContacts,
  updateContact
} from "../../data/contacts-dao.js";

const router = Router();

router.get("/contacts", async (req, res) => {
  try {
    return res.json(await retrieveContacts());
  } catch (err) {
    console.error(err);
    return res.status(500).send("Database error when fetching contacts");
  }
});

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

router.patch("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, funFact } = req.body;

  try {
    const updated = await updateContact(id, { name, phoneNumber, funFact });

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

router.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteContact(id);
    return res.sendStatus(204);
  } catch (err) {
    // Handle the case where we try to update the contact with an id that's not formatted properly
    if (err?.value === id) return res.status(404).send(`Invalid id ${id}`);

    // Unknown error e.g. can't connect to database
    console.error(err);
    return res.status(500).send("Database error when deleting contact");
  }
});

export default router;
