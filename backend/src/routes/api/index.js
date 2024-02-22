import { Router } from "express";
import { Contact } from "../../data/schema.js";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, phoneNumber, funFact } = req.body;
  if (!name) {
    return res.status(400).send(`'name', 'phoneNumber', and 'funFact' are required fields`);
  }
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const result = data.results[0];
  console.log(`data = ${JSON.stringify(data)}`);
  try {
    await Contact.findOneAndUpdate(
      { name },
      {
        name,
        phoneNumber,
        funFact,
        photoUrl: result.picture.large
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send("failed to create user");
  }
  return res.status(200).send("upserted user");
});

router.delete("/contact", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send("contact must have a name");
  try {
    await Contact.deleteOne({ name });
  } catch (err) {
    console.error(err);
    return res.status(500).send("failed to create contact");
  }
  return res.status(200).send("deleted contact");
});

export default router;
