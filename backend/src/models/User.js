import pkg from 'mongoose';
const { model, Schema } = pkg;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
      default: '',
    },
    firstName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
      default: '',
    },
    lastName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
      default: '',
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
      default: '',
    },
    password: {
      type: String,
      required: true,
      max: 255,
      min: 8,
      default: '',
    },
    gender: {
      type: String,
      required: false,
      default: '',
    },
    cityOfResidence: {
      type: String,
      required: false,
      default: '',
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    birthDate: {
      type: Date,
      required: false,
      default: 0,
    },
    motivation: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
