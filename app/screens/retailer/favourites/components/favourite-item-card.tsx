import { Image, Pressable, Text, View } from "react-native"

import { styles } from "./favourite-item-card.styles"
import { Images } from "../../../../../assets/Images/wholeSeller"
import { UI_TEXT } from "../lib/constants"

interface FavouriteItemCardProps {
  imageUrl?: string
  productName: string
  productId: string
  price: string
  onPress: () => void
  onUnlikePress: () => void
  isUnlikeLoading?: boolean
}

export function FavouriteItemCard({
  imageUrl,
  productName,
  productId,
  price,
  onPress,
  onUnlikePress,
  isUnlikeLoading = false,
}: FavouriteItemCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.imageWrap}>
          <Image
            source={imageUrl ? { uri: imageUrl } : Images.SoyaMilk}
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable
            style={[styles.likeBadge, isUnlikeLoading ? styles.likeBadgeLoading : null]}
            onPress={(e) => {
              e.stopPropagation()
              onUnlikePress()
            }}
            disabled={isUnlikeLoading}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.likeText}>❤️</Text>
          </Pressable>
        </View>
        <View style={styles.infoWrap}>
          <Text style={styles.productName} numberOfLines={2}>
            {productName}
          </Text>
          <Text style={styles.productId}>ID: {productId}</Text>
          <Text style={styles.madrLabel}>{UI_TEXT.MADR_PRICE}</Text>
        </View>
      </View>
      <View style={styles.priceWrap}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  )
}
