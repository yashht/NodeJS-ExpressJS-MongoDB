import mongoose from "mongoose";

// This notificationSchema is used in the user model to define the schema of the objects to be stored in the notifications array. 
const notificationSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    timestamp: {
        type: Date,
        required : true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    redirection: {
      type: String,
      required: true
    },
    customType: {
      type: String,
      required: true
    },
    notificationType: {
      type: String,
      required: true
    },
    senderName: {
      type: String,
      required: true
    },
    senderImage: {
      type: String,
      required: true
    },
    channelName: {
      type: String,
      required: true
    }
  }
  );

export default notificationSchema;