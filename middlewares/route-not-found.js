const { StatusCodes } = require("http-status-codes");

const routerNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: "Route Does Not Exists!" });
};

module.exports = routerNotFound;
