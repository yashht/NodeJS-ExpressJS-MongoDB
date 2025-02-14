import mongoose from "mongoose";

// This appointmentSchema is used in the user model to define the schema of the objects to be stored in the appointments array.
const appointmentSchema = new mongoose.Schema({
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    jobTitleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    startMonth: {
      type: String,
      required: true
    },
    startYear: {
        type: Number,
        required : true
    },
    endMonth: {
        type: String,
        default: ''
    },
    endYear: {
        type: Number,
        default: null
    },
    isCurrent:{
        type: Boolean,
        required: true
    },
    roleDescription:{
        type: String,
        default: ''
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true
    },
    locationName: { 
      type: String,
      require: true
    },
    companyName: {
      type: String,
      required: true
    },
  },

  // It prevents the generation of _id field. 
  { _id: false }
  );

export default appointmentSchema;