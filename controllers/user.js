const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const registerUser = async (req, res) => {
  if (req.body.isAdmin) {
    req.body.isAdmin = false;
  }
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Provide Email and Password!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }

  const isCorrectPassword = await user.checkPassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
