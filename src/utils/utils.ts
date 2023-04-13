import { FirebaseErrorCode } from "../types/AppTypes";

export const getErrorMessageFromFirebaseCode = (code: string): string  => {
  switch (code) {
    case FirebaseErrorCode.UserNotFound:
      return "The email or password you entered is incorrect. Please try again.";
    case FirebaseErrorCode.WrongPassword:
      return "The email or password you entered is incorrect. Please try again.";
    case FirebaseErrorCode.TooManyRequests:
      return "We have detected too many requests from this device. Please try again later.";
    case FirebaseErrorCode.ArgumentError:
      return "There was an error with the provided argument. Please check your input and try again.";
    case FirebaseErrorCode.NetworkRequestFailed:
      return "There was an error connecting to the network. Please check your internet connection and try again.";
    case FirebaseErrorCode.EmailAlreadyInUse:
      return "That email is already in use. Please try a different one.";
    case FirebaseErrorCode.PhoneNumberAlreadyExists:
      return "That phone number is already in use. Please try a different one.";
    case FirebaseErrorCode.AccountExistsWithDifferentCredential:
      return "An account already exists with the same email address but different sign-in credentials. Please try signing in using a different method.";
    default:
      return "An error occurred. Please try again later.";
  }
}

export const ADMIN_EMAIL = "blackangryrabbit@gmail.com"
export const ADMINS_ID = ["Buq4vRVMWDN7kvmOtJRgx3eQVcA3", "Ql5EM7BT09Z4MZThpSNTlIdqbzF2"];
