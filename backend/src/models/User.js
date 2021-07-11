// import { model, Schema } from 'mongoose';
import pkg from 'mongoose';
const { model, Schema } = pkg;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    lastName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 255,
      min: 8,
    },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
