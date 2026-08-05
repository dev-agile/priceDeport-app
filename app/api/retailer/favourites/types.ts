/** Price entry per peer group */
export interface PriceEntry {
  Date: string
  price: string
}

/** Favourite product item from API */
export interface FavouriteProductItem {
  category_desc: string
  product_desc: string
  product_id: string
  image_url?: string
  price: Record<string, PriceEntry[]>
  [key: string]: unknown
}

export interface GetFavouritesResponse {
  data?: FavouriteProductItem[]
}
