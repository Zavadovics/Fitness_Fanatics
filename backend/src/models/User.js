import pkg from 'mongoose';
const { model, Schema } = pkg;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
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
      required: false,
    },
    cityOfResidence: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    // birthDate: {
    //   type: String,
    // },
    motivation: {
      type: String,
      required: false,
    },
  },
  { timestamps: false }
);

export default model('User', UserSchema);
