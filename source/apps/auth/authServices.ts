import userModel from "../../model/userModel";
import bcrypt from "bcryptjs";

// This function fetches the list of all Job Titles.
const userLogin = async (email: string, password: string) => {
  const user: any = await userModel.find({ email: email });
  if (user.length > 0) {
    let passwordMatch = await bcrypt.compare(password, user[0]?.password);
    if (passwordMatch) {
      return user;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

// This function fetches the list of all Job Titles.
const forgotPassword = async (email: string) => {
  const user: any = await userModel.find({ email: email });
  return user;
};

// This function fetches the list of all Job Titles.
const resendOTP = async (email: string) => {
  const user: any = await userModel.find({ email: email });
  return user;
};

// This function fetches the list of all Job Titles.
const resetPassword = async (email: string, password: string) => {
  const user: any = await userModel.find({ email: email });
  let updateProfile: any = [];
  if (user.length > 0) {
    let update = {
      password: password,
    };
    updateProfile = await userModel.findByIdAndUpdate(user[0]._id, update, {
      new: true,
    });
  }

  return updateProfile;
};

export default {
  userLogin,
  forgotPassword,
  resendOTP,
  resetPassword,
};
