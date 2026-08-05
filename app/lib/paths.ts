import {
  API_RETAILER_VERSION,
  API_STATIC_VERSION,
  API_USER_VERSION,
  API_VERSION,
} from "./constants"

export const retailerPaths = {
  root: (retailerId: string) => `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}`,

  product: (retailerId: string, productId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/product/${productId}`,

  productSalesGraph: (retailerId: string, productId: string, wholeSellerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/product/${productId}/${wholeSellerId}`,

  productSearch: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/products/search`,

  cart: (retailerId: string) => `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/cart`,

  placeOrder: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/place-order`,

  order: (retailerId: string, orderId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/order/${orderId}`,

  orders: (retailerId: string) => `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/orders`,

  accountDelete: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/account-delete`,

  updateProfile: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/update-profile`,

  favorites: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/favorites`,
}

//static paths
export const staticPaths = {
  getAppVersion: () => `/${API_STATIC_VERSION}/${API_VERSION}/get-version`,
  getPeerGroups: () => `/${API_STATIC_VERSION}/${API_VERSION}/peer-groups`,
}

export const userPaths = {
  login: () => `${API_USER_VERSION}/${API_VERSION}/${API_RETAILER_VERSION}/login`,
  register: () => `${API_USER_VERSION}/${API_VERSION}/${API_RETAILER_VERSION}/register`,
  verify: () => `${API_USER_VERSION}/${API_VERSION}/${API_RETAILER_VERSION}/verify`,
  whoami: () => `${API_VERSION}/whoami`,
}

export const resetPasswordPaths = {
  request: () => `reset-password/${API_VERSION}/request`,
  verify: () => `reset-password/${API_VERSION}/verify`,
  complete: () => `reset-password/${API_VERSION}/complete`,
}
