import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
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
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Custom validation to ensure either text or image is present
messageSchema.pre('save', function(next) {
  if (!this.text && !this.image) {
    next(new Error('Either text or image must be provided'));
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;