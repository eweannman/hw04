const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/users");
// const { get } = require("mongoose");

require("dotenv").config();

const JWT_TOKEN = process.env.JWT_TOKEN;

const auth = (...allowedRoles) => {
  return async (req, res, next) => {
    const token = req.handlers.authorization;

    // const decode = jwt.decode(token);
    // console.log(decode);

    if (!token) {
      return res.status(401).send("No token provided");
    }

    try {
      const decoded = jwt.verify(token, JWT_TOKEN);
      const { id } = decoded;

      const user = await getUserById(id);

      if (user.token === token) {
        req.body = user;
        next();
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
      // const { role } = user;

      // const isAllowed = allowedRoles.includes(role);

      //     if (user) {
      //       if (isAllowed) {
      //         next();
      //       } else {
      //         return res
      //           .status(403)
      //           .send("You don't have permission to this resource");
      //       }
      //     } else {
      //       return res.status(401).send("Access denied");
      //     }
    } catch (error) {
      return res.status(401).send({ message: "Not authorized", error });
    }
  };
};

module.exports = auth;
