import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"

import { commonStyles } from "@/theme/styles"

import { SimpleLineChart } from "./components/simple-line-chart"
import { useSalesGraph } from "./hooks/use-sales-graph"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function SalesGraph() {
  const { productName, productImage, currentPrice, chartData, isLoading, isError } = useSalesGraph()

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
          <Text style={styles.emptyText}>{UI_TEXT.LOADING}</Text>
        </View>
      </View>
    )
  }

  // Error state
  if (isError) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{UI_TEXT.ERROR_LOADING}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Product Header */}
        <View style={styles.productHeader}>
          <Image source={productImage} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productName}</Text>
          </View>
        </View>

        {/* Current Price */}
        <View style={styles.currentPriceContainer}>
          <Text style={styles.currentPriceLabel}>{UI_TEXT.CURRENT_PRICE}</Text>
          <Text style={styles.currentPriceValue}>${currentPrice.toFixed(2)}</Text>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{UI_TEXT.PRICE_HISTORY}</Text>
          {chartData.length > 0 ? (
            <SimpleLineChart data={chartData} />
          ) : (
            <View style={styles.chartContent}>
              <Text style={styles.emptyText}>{UI_TEXT.NO_DATA_AVAILABLE}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
