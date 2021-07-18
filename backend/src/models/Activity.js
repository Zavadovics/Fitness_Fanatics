import pkg from 'mongoose';
const { model, Schema } = pkg;

const ActivitySchema = new Schema(
  {
    activityDate: {
      type: Date,
      required: true,
      min: 1,
    },
    activityTime: {
      type: String,
      required: true,
      min: 1,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    activityType: {
      type: String,
      required: true,
      min: 1,
    },
    distance: {
      type: Number,
      required: true,
      min: 1,
    },
    comment: {
      type: String,
      required: true,
      min: 1,
    },
    photoUrl: {
      type: String,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export default model('Activity', ActivitySchema);
