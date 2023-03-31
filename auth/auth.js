const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/contacts");
// const { get } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

const auth = (...allowedRoles) => {
  return async (req, res, next) => {
    const token = req.handlers.authorization;

    // const decode = jwt.decode(token);
    // console.log(decode);

    if (!token) {
      return res.status(401).send("No token provided");
    }

    try {
      const { id } = jwt.verify(token, jwtSecret);

      const user = await getUserById(id);
      const { role } = user;

      const isAllowed = allowedRoles.includes(role);

      if (user) {
        if (isAllowed) {
          next();
        } else {
          return res
            .status(403)
            .send("You don't have permission to this resource");
        }
      } else {
        return res.status(401).send("Access denied");
      }
    } catch {
      return res.status(401).send("Access denied");
    }
  };
};

module.exports = auth;
