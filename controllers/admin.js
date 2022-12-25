const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(StatusCodes.OK).json({ usersCount: users.length, users });
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new NotFoundError("No user found with userID: " + id);
  }

  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  if (req.body.isAdmin) {
    req.body.isAdmin = false;
  }

  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    },
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError("No user found with userID: " + id);
  }

  res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    },
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new NotFoundError("No user found with userID: " + id);
  }

  res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    },
  });
};

const getAllAdmins = async (req, res) => {
  const admins = await User.find({ isAdmin: true }).select("-password");

  res.status(StatusCodes.OK).json({ adminsCount: admins.length, admins });
};

const getAdmin = async (req, res) => {
  const admin = await User.findOne({
    _id: req.params.id,
    isAdmin: true,
  }).select("-password");

  if (!admin) {
    throw new NotFoundError("No admin found with ID: " + id);
  }

  res.status(StatusCodes.OK).json({ admin });
};

const createAdmin = async (req, res) => {
  const admin = await User.create({ ...req.body, isAdmin: true });

  res.status(StatusCodes.CREATED).json({
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      createdAt: admin.createdAt,
    },
  });
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const admin = await User.findOneAndUpdate(
    { _id: id, isAdmin: true },
    req.body,
    { new: true, runValidators: true }
  );

  if (!admin) {
    throw new NotFoundError("No admin found with ID: " + id);
  }

  res.status(StatusCodes.OK).json({
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      createdAt: admin.createdAt,
    },
  });
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  const admin = await User.findOneAndDelete({ _id: id, isAdmin: true });

  if (!admin) {
    throw new NotFoundError("No admin found with ID: " + id);
  }

  res.status(StatusCodes.OK).json({
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      createdAt: admin.createdAt,
    },
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createAdmin,
  getAllAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
