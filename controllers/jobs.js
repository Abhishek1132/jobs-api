const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  const { _id: userid } = req.user;
  const jobs = await Job.find({ createdBy: userid });

  res.status(StatusCodes.OK).json({ jobsCount: jobs.length, jobs });
};

const getJob = async (req, res) => {
  const { id } = req.params;
  const { _id: userid } = req.user;

  const job = await Job.findOne({ _id: id, createdBy: userid });

  if (!job) {
    throw new NotFoundError(`No job found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { _id: userid } = req.user;
  req.body.createdBy = userid;

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }

  const job = await Job.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new NotFoundError(`No job found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findOneAndDelete({ _id: id }).select(
    "company position -_id"
  );

  if (!job) {
    throw new NotFoundError(`No job found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
