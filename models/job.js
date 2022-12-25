const { Schema, model, Types } = require("mongoose");

const JobSchema = Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required!"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Position is required!"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      required: [true, "UserID of the job creator is required!"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Job", JobSchema);
