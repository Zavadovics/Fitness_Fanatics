import pkg from 'mongoose';
const { model, Schema } = pkg;

const EditUserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    password: {
      type: String,
      required: true,
      max: 255,
      min: 8,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
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
    gender: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    cityOfResidence: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    weight: {
      type: Number,
      required: true,
      max: 255,
      min: 1,
    },
    birthDate: {
      type: Date,
      required: true,
      max: 255,
      min: 1,
    },
    motivation: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
  },
  { timestamps: true }
);

export default model('EditUser', EditUserSchema);
