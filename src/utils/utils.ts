export const getErrorMessageFromFirebaseCode = (code: string): string  => {
  switch (code) {
    case "auth/user-not-found":
      return "The email or password you entered is incorrect. Please try again.";
    case "auth/wrong-password":
      return "The email or password you entered is incorrect. Please try again.";
    case "auth/too-many-requests":
      return "We have detected too many requests from this device. Please try again later.";
    case "auth/argument-error":
      return "There was an error with the provided argument. Please check your input and try again.";
    case "auth/network-request-failed":
      return "There was an error connecting to the network. Please check your internet connection and try again.";
    case "auth/email-already-in-use":
      return "That email is already in use. Please try a different one.";
    case "auth/phone-number-already-exists":
      return "That phone number is already in use. Please try a different one.";
    default:
      return "An error occurred. Please try again later.";
  }
}

export const ADMIN_EMAIL = "blackangryrabbit@gmail.com"
export const ADMINS_ID = ["Buq4vRVMWDN7kvmOtJRgx3eQVcA3", "Ql5EM7BT09Z4MZThpSNTlIdqbzF2"];
