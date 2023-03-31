const bcrypt = require("bcrypt");

const { getContactByEmail } = require("../controllers/contacts");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
  const contact = await getContactByEmail(email);

  if (!contact) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 404, msg: "User not found" };
  }

  const contactPassword = contact.password;

  const result = bcrypt.compareSync(incomingPassword, contactPassword);

  if (result) {
    return issueToken(contact);
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { code: 401, msg: "Invalid credentials" };
  }
};

module.exports = loginHandler;
