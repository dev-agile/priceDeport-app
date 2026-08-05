export const UI_TEXT = {
  PROFILE_TITLE: "Profile",
  RETAILER_NAME: "Retailer Name",
  NAME: "Name",
  EMAIL: "Email",
  PREMIUM_MEMBER: "Premium Member",
  STORE_NAME: "Store Name",
  LOCATION: "Location",
  CITY: "City",
  ZIP_CODE: "ZIP Code",
  PHONE: "Phone",
  PEER_GROUP: "Peer Group",
  LOGOUT: "Logout",
  DELETE_ACCOUNT: "Delete Account",
  DELETE_CONFIRM_MESSAGE: "Are you sure? Your subscription also get cancelled.",
  DELETE_CONFIRM: "Confirm",
  DELETE_CANCEL: "Cancel",
  LOGOUT_SUCCESS: "User logged out successfully.",
  LOGOUT_ERROR: "Failed to logout. Please try again.",
  DELETE_ERROR: "Failed to delete account. Please try again.",
} as const

export const ERROR_MESSAGES = {
  PROFILE_FETCH_ERROR: "Failed to fetch profile. Please try again.",
  LOGOUT_ERROR: "Failed to logout. Please try again.",
  DELETE_ACCOUNT_ERROR: "Failed to delete account. Please try again.",
} as const

export const CONSOLE_MESSAGES = {
  PROFILE_FETCHED: "Profile fetched successfully",
  PROFILE_FETCH_ERROR: "Error fetching profile:",
  LOGOUT_SUCCESS: "User logged out successfully",
  LOGOUT_ERROR: "Error during logout:",
  DELETE_ACCOUNT_SUCCESS: "Account deleted successfully",
  DELETE_ACCOUNT_ERROR: "Error deleting account:",
} as const
