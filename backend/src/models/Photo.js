import pkg from 'mongoose';
const { model, Schema } = pkg;

const photoSchema = new Schema({
  user_id: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

export default model('Photo', photoSchema);
