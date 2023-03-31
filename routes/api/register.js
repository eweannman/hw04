const express = require("express");

const router = express.Router();
const { userValidationSchema } = require("../../models/user");
const { addContact } = require("../../controllers/contacts");

const auth = require("../../auth/auth");

router.post("/", auth, async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(409).json(error.details[0].message);
  }

  try {
    const { name, email, password, role } = req.body;

    const user = await addContact(name, email, password, role);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
