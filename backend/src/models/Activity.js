// import { model, Schema } from 'mongoose';
import pkg from 'mongoose';
const { model, Schema } = pkg;

const ActivitySchema = new Schema(
  {
    // activityStartDateAndTime: {
    //   type: Date,
    //   required: true,
    // },
    duration: {
      type: Number,
      required: true,
      // min: 1,
    },
    activityType: {
      type: String,
      required: true,
      // min: 1,
    },
    distance: {
      type: Number,
      required: true,
      // min: 1,
    },
    comment: {
      type: String,
      required: true,
      // min: 1,
    },
  },
  { timestamps: true }
);

export default model('Activity', ActivitySchema);
