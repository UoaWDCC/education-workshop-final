import { Router } from "express";
import { Contact } from "../../data/schema.js";

const photoUrl = async (file) => {
  if (file == undefined) {
    return undefined;
  } else {
    const fileContent = Buffer.from(file.data, "binary");
    const response = await fetch("https://api.imgbb.com/1/upload", {
      body: JSON.stringify({ key: process.env.IMAGEBB_API_KEY, image: fileContent })
    });
    const data = await response.json();
    return data.displayUrl;
  }
};

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
  try {
    await Contact.create({
      name,
      phoneNumber,
      funFact,
      photoUrl: await photoUrl(req.files.image)
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("failed to create contact");
  }
  return res.status(201).send("create user");
});

router.patch("/contact", async (req, res) => {
  const { name, phoneNumber, funFact } = req.body;
  if (!name) return res.status(400).send(`'name' is a required field`);
  try {
    await Contact.findOneAndUpdate(
      {
        name
      },
      {
        phoneNumber,
        funFact,
        photoUrl: await photoUrl(req.files.image)
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
