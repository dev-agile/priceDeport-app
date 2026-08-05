/**
 * Role constants for user role selection
 */
export const role = {
  RETAILER: "retailer",
  WHOLE_SELLER: "wholeSeller",
} as const

export type RoleType = (typeof role)[keyof typeof role]
