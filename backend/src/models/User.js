import pkg from 'mongoose';
const { model, Schema } = pkg;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      default: '',
    },
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
    gender: {
      type: String,
      default: '',
    },
    cityOfResidence: {
      type: String,
      default: '',
    },
    weight: {
      type: Number,
      default: 0,
    },
    birthDate: {
      type: Date,
      default: new Date(),
    },
    motivation: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
