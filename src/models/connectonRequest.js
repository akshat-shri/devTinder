const mongoose = require("mongoose");

const conncetionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "accepted", "interested", "rejected"],
        message: `{VALUE} is incorret status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

conncetionRequestSchema.index({fromUserId: 1 , toUserId: 1 });

conncetionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

const ConncetionRequestModel = new mongoose.model(
  "ConnectionRequest",
  conncetionRequestSchema
);

module.exports = ConncetionRequestModel;
