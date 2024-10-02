import Conversation from "../Modules/Conversation.model.js";
import Message from "../Modules/message.model.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req, res) => {
  //   console.log("message sent", req.params.id, req.body.message);
  try {
    const { message } = req.body; // The message text is extracted from the request body
    const { id: receiverId } = req.params;
    const senderId = req.user._id; //current logged in user

    // Find an existing conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); //save both conversation and message //if one fails other will not be saved //if both are saved then only it will be saved //parallel saving
    // res.status(201).json({ message: "Message Sent successfully", newMessage });
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; //current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("message"); // Populate the conversation with actual message details (not just IDs)
    if (!conversation) {
      return res.status(201).json([]);
    }

    // Extract messages from the conversation
    const messages = conversation.message;
    res.status(201).json(messages); // Return the messages in the response as JSON
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
