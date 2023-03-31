const { Contact } = require("../models/contact");
const { hashPassword } = require("../models/user.js");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contacts = await Contact.find({ _id });
  return contacts;
};

const getContactByEmail = async (email) => {
  const contact = await Contact.findOne({ email });
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone, password) => {
  const hashedPassword = hashPassword(password);

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    contact.save();
    return contact;
  } catch (err) {
    console.log(err);
    throw err;
  }

  // eslint-disable-next-line no-useless-catch
  // try {
  //   const contact = new Contact({ name, email, phone });
  //   contact.save();
  //   return contact;
  // } catch (err) {
  //   throw err;
  // }
};

const updateContact = async (id, newContact) => {
  const updatedContact = await Contact.findByIdAndUpdate({ id, newContact });
  return updatedContact;
};

const updateStatusContact = async (id, favorite) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  getContactByEmail,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
