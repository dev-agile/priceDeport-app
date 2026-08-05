export const UI_TEXT = {
  EMPTY_CART: "Your cart is currently empty",
  SAVE_ORDER: "Save Order",
  ITEM_REMOVED_SUCCESS: "ITEM REMOVED SUCCESSFULLY",
  CART_UPDATED_SUCCESS: "Cart updated successfully",
  ORDER_PLACED_SUCCESS: "Order placed successfully",
  QUANTITY_MODAL_TITLE: "Enter Quantity",
  QUANTITY_MODAL_SUBMIT: "Submit",
  QUANTITY_MODAL_CANCEL: "Cancel",
} as const

export const ERROR_MESSAGES = {
  SESSION_EXPIRED: "Session Expired",
  SESSION_EXPIRED_DETAIL: "Please login again",
  INVALID_REQUEST: "Invalid Request",
  NETWORK_ERROR: "Network Error",
  FAILED_TO_LOAD_CART: "Failed to load cart",
  FAILED_TO_UPDATE_CART: "Failed to update cart",
  FAILED_TO_PLACE_ORDER: "Failed to place order",
  EMPTY_CART_ERROR: "Your cart is empty",
} as const

export const STORAGE_KEYS = {
  FILE_ID: "fileId",
} as const

export const CONSOLE_MESSAGES = {
  CART_LOADED: "Cart loaded successfully",
  CART_UPDATE_SUCCESS: "Cart updated successfully",
  ORDER_PLACED: "Order placed successfully",
  CART_ERROR: "Error loading cart",
  UPDATE_ERROR: "Error updating cart",
  PLACE_ORDER_ERROR: "Error placing order",
} as const
