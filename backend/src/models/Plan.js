import pkg from 'mongoose';
const { model, Schema } = pkg;

const planSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    title: {
      type: String,
    },
    originalName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model('Plan', planSchema);
