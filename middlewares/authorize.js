const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/user");

const authenticate = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userid).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    throw new UnauthenticatedError(
      "Authentication Invalid! Invalid/Expired Token."
    );
  }
};

module.exports = authenticate;
