import type { FavouriteProductItem } from "@/api/retailer/favourites"

/** Section header row for FlatList */
export interface FavouritesListHeader {
  isHeader: true
  title: string
}

/** Product row for FlatList */
export type FavouritesListItem = {
  isHeader: false
  latestPrice: string
} & FavouriteProductItem

export type FavouritesFlatItem = FavouritesListHeader | FavouritesListItem

export function isHeader(item: FavouritesFlatItem): item is FavouritesListHeader {
  return (item as FavouritesListHeader).isHeader === true
}
