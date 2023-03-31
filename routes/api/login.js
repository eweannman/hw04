const express = require("express");
const loginHandler = require("../../auth/loginHandler");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const token = await loginHandler(email, password);

    return res.status(200).send(token);
  } catch (err) {
    return res.status(err.code).send(err);
  }
});

module.exports = router;

// logowanie - wg openAI
// const bcrypt = require('bcryptjs'); //importujemy bibliotekę bcryptjs

// // Tworzymy endpoint /users/signup
// app.post('/users/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body; //pobieramy email i password z body żądania
//     //Sprawdzamy, czy pola email i password są przesłane w żądaniu
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Błąd walidacji' }); //zwracamy Błąd walidacji, jeśli brakuje któregoś z pól
//     }
//     //Sprawdzamy, czy email nie jest już wykorzystywany przez kogoś innego
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Błąd Conflict' }); //zwracamy Błąd Conflict, jeśli email jest już zajęty
//     }
//     //Tworzymy nowego użytkownika
//     const hashedPassword = await bcrypt.hash(password, 12); //szyfrujemy hasło za pomocą bcryptjs
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save(); //zapisujemy nowego użytkownika w bazie danych
//     res.status(201).json({ message: 'Sukces' }); //zwracamy Sukces odpowiedzi, jeśli użytkownik został utworzony
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Wystąpił błąd serwera' }); //zwracamy błąd serwera, jeśli wystąpił jakiś inny błąd
//   }
// });
