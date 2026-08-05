export const UI_TEXT = {
  SORT_BY: "Sort By",
  PRICE_LOW_TO_HIGH: "Price (Low to High)",
  PRICE_HIGH_TO_LOW: "Price (High to Low)",
  ALPHABETICAL: "Alphabetical (A to Z)",
  DATE_LATEST: "Date (Latest Update)",
  PEER_GROUP: "Peer Group",
  ADD: "Add",
  SHOW_PRICE_HISTORY: "Show price history",
  SOMETHING_WENT_WRONG: "Something Went Wrong",
  PRODUCT_NOT_FOUND: "Product not found",
  FREE_TRIAL_OVER: "Please go back, your free trial is over",
  ADDED_TO_FAVORITE: "ADDED TO FAVORITE",
  REMOVED_FROM_FAVORITE: "REMOVE TO FAVORITE",
  CART_UPDATED_SUCCESS: "Cart updated successfully",
  QUANTITY_MODAL_TITLE: "Enter Quantity",
  QUANTITY_MODAL_SUBMIT: "Submit",
  QUANTITY_MODAL_CANCEL: "Cancel",
} as const

export const ERROR_MESSAGES = {
  PRODUCT_FETCH_ERROR: "Failed to fetch product details",
  CART_UPDATE_ERROR: "Failed to update cart",
  FAVORITE_TOGGLE_ERROR: "Failed to update favorite status",
  SORT_ERROR: "Failed to sort products",
} as const

export const STORAGE_KEYS = {
  PREMIUM_USER: "premuimUser",
  FILE_ID: "fileId",
} as const

export const CONSOLE_MESSAGES = {
  PRODUCT_FETCHED: "Product fetched successfully",
  PRODUCT_FETCH_ERROR: "Error fetching product:",
  CART_UPDATED: "Cart updated successfully",
  CART_UPDATE_ERROR: "Error updating cart:",
  FAVORITE_TOGGLED: "Favorite toggled successfully",
  FAVORITE_TOGGLE_ERROR: "Error toggling favorite:",
  SORT_APPLIED: "Sort applied successfully",
  SORT_ERROR: "Error applying sort:",
} as const

export const SORT_OPTIONS = {
  PRICE_LOW_TO_HIGH: { id: "lthprice", label: UI_TEXT.PRICE_LOW_TO_HIGH },
  PRICE_HIGH_TO_LOW: { id: "htlprice", label: UI_TEXT.PRICE_HIGH_TO_LOW },
  ALPHABETICAL: { id: "atz", label: UI_TEXT.ALPHABETICAL },
  DATE_LATEST: { id: "time", label: UI_TEXT.DATE_LATEST },
} as const

export const SORT_OPTIONS_ARRAY = Object.values(SORT_OPTIONS)
