import { Router } from "express";
import { Contact } from "../../data/schema.js";

const router = Router();

router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).send(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("could not fetch contacts");
  }
});

router.post("/contact", async (req, res) => {
  const { name, phoneNumber, funFact } = req.body;
  if (!name) {
    return res.status(400).send(`'name' is a required fields`);
  }
  const response = await fetch("https://randomuser.me/api/?results=1");
  const data = await response.json();
  const photoUrl = data.results[0].picture.large;
  try {
    await Contact.create({
      name,
      phoneNumber,
      funFact,
      photoUrl
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("failed to create contact");
  }
  return res.status(201).json({
    name,
    phoneNumber,
    funFact,
    photoUrl
  });
});

router.patch("/contact", async (req, res) => {
  const { name, newName, phoneNumber, funFact } = req.body;
  if (!name || !newName) return res.status(400).send(`'name' and 'newName' are required fields`);
  try {
    const existingContact = await Contact.find({ name });
    await Contact.findOneAndUpdate(
      {
        name
      },
      {
        name: newName,
        phoneNumber,
        funFact,
        photoUrl: existingContact.photoUrl
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send("could not upsert user");
  }
  return res.status(200).send("successfully edited contact");
});

router.delete("/contact", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send("contact must have a name");
  try {
    await Contact.deleteOne({ name });
  } catch (err) {
    console.error(err);
    return res.status(500).send("could not delete contact");
  }
  return res.status(200).send("deleted contact");
});

export default router;
