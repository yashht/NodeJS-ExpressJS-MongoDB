import mongoose from "mongoose";
import appointmentSchema from './appointmentSchema';
import notificationSchema from "./notificationSchema";
import constants from '../common/config/constant'

// This is a userSchema which is used by userModel to create a collection named "users" in the database. 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    },
    appointments: {
        // It shows that this array field stores the objects which follow the appointmentSchema.
        type: [appointmentSchema],
        default: []
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        // default: null
    },
    locationName: {
        type: String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    profilePicture: {
        type: String,
        default: ''
    },
    profileVideo: {
        type: String,
        default: ''
    },
    aboutMe: {
        type: String,
        default: ''
    },
    sectorId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    accountType: {
        type: String,
        enum: [constants.ACCOUNT_TYPES.PERSONAL, constants.ACCOUNT_TYPES.COMPANY],
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    isOnboarded: {
        type: Boolean,
        default: true
    },
    deletedDate: {
        type: Date
    },
    deletionReason: {
        type: String,
        default: ''
    },
    deviceToken: {
        type: String,
        default: ''
    },
    deviceId: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    showOnline: {
        type: Boolean,
        default: true
    },
    showLastSeen: {
        type: Boolean,
        default: true
    },
    showTimeZone: {
        type: Boolean,
        default: true
    },
    notifications: {
        // It shows that this array field stores the objects which follow the notificationSchema.
        type: [notificationSchema],
        default: []
    },
    status: {
        type: String,
        enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE, constants.STATUS.DELETED],
        default: constants.STATUS.ACTIVE
    },
    emailOTP: {
        type: Number,
        default: null
    },
    mobileOTP: {
        type: Number,
        default: null
    },
    emailOTPExpiresAt: {
        type: Date,
        default: null
    },
    mobileOTPExpiresAt: {
        type: Date,
        default: null
    },
    companyName: {
        type: String,
        default: ''
    },
    isAdminDeleted: {
        type: Boolean,
        default: false
    },
    authToken: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    });

/**
 * Creates a new Mongoose model for the "users" collection using the provided userSchema.
*  It returns a Mongoose model for the "users" collection.
 */
const userModel = mongoose.model("users", userSchema);

export default userModel