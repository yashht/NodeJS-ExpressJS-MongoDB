import express from "express";
import auth from "../../common/midlewares/auth";
import validate from "../../common/midlewares/validate";
import authValidation from "./authValidation";
import authController from "./authController";
import methodNotAllowed from "../../common/utils/methodNotFound";

// Creates an instance of express router
const router = express.Router();

// These routes deal with the comapnay related operations.

router
  .route("/login")
  .post(validate(authValidation.userLogin), authController.userLogin)
  .all(methodNotAllowed);
router
  .route("/forgotPassword")
  .post(validate(authValidation.forgotPassword), authController.forgotPassword)
  .all(methodNotAllowed);
router
  .route("/resetPassword")
  .patch(validate(authValidation.resetPassword), authController.resetPassword)
  .all(methodNotAllowed);
router
  .route("/resendOTP")
  .post(validate(authValidation.resendOTP), authController.resendOTP)
  .all(methodNotAllowed);

export default router;
