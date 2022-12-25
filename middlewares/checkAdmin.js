const { UnauthenticatedError } = require("../errors");
const User = require("../models/user");

const checkAdmin = async (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    throw new UnauthenticatedError(
      "You are not authorized to access this route!"
    );
  }
  next();
};

module.exports = checkAdmin;
