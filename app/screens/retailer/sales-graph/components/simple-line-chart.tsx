import { Dimensions, View, Text } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

import { CHART_CONFIG } from "../lib/constants"
import { styles } from "../lib/styles"
import type { ChartDataPoint } from "../lib/types"

interface SimpleLineChartProps {
  data: ChartDataPoint[]
  height?: number
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  height = responsiveHeight(CHART_CONFIG.HEIGHT_PERCENTAGE),
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.chartContent}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    )
  }

  // Format data for react-native-chart-kit
  const chartData = {
    labels: data.map((point) => point.formattedDate),
    datasets: [
      {
        data: data.map((point) => point.price),
        color: (_opacity = 1) => commonStyles.colors.primaryColor,
        strokeWidth: 3,
      },
    ],
  }

  // Chart configuration matching API doc requirements
  const chartConfig = {
    backgroundColor: colors.palette.neutral100,
    backgroundGradientFrom: commonStyles.colors.primaryColor,
    backgroundGradientTo: colors.palette.neutral100,
    decimalPlaces: CHART_CONFIG.DECIMAL_PLACES,
    color: (_opacity = 1) => commonStyles.colors.primaryColor,
    labelColor: (_opacity = 1) => colors.palette.grey600,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: CHART_CONFIG.DOT_RADIUS,
      strokeWidth: "2",
      stroke: commonStyles.colors.primaryColor,
      fill: commonStyles.colors.primaryColor,
    },
    propsForBackgroundLines: {
      strokeDasharray: "4,4",
      stroke: colors.palette.grey200,
      strokeWidth: 1,
    },
    formatYLabel: (value: string) => {
      const numValue = parseFloat(value)
      // Format with "k" suffix for thousands if needed
      if (numValue >= 1000) {
        return `$${(numValue / 1000).toFixed(2)}k`
      }
      return `$${numValue.toFixed(2)}`
    },
  }

  const screenWidth = Dimensions.get("window").width

  return (
    <View style={styles.chartWrapper}>
      <LineChart
        data={chartData}
        width={screenWidth * 0.9}
        height={height}
        chartConfig={chartConfig}
        bezier // Smooth curves
        style={styles.chartStyle}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        withDots={true}
        withShadow={false}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        segments={4}
      />
    </View>
  )
}
