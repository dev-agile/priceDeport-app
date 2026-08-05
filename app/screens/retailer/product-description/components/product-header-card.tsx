import { Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./product-header-card.styles"

interface ProductHeaderCardProps {
  imageUrl?: string
  productName: string
  productId: string
  category?: string
  subCategory?: string
  onPriceHistoryPress: () => void
  onFavoritePress: () => void
  isFavorite: boolean
}

export function ProductHeaderCard({
  imageUrl,
  productName,
  productId,
  category,
  subCategory,
  onPriceHistoryPress,
  onFavoritePress,
  isFavorite,
}: ProductHeaderCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <TouchableOpacity style={styles.favoriteIcon} onPress={onFavoritePress}>
          <Text style={styles.favoriteIconText}>{isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.productId}>ID: {productId}</Text>
        {category && <Text style={styles.category}>{category}</Text>}
        {subCategory && <Text style={styles.category}>• {subCategory}</Text>}
        <TouchableOpacity style={styles.priceHistoryButton} onPress={onPriceHistoryPress}>
          <Text style={styles.priceHistoryIcon}>🕐</Text>
          <Text style={styles.priceHistoryText}>Price History</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
