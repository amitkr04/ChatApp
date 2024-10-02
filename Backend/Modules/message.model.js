import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  // create schema for message model with senderId, receiverId and message fields with required properties
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createAt & updateAt // add timestamps to the schema
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
