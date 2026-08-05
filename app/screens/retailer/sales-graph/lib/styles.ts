import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(4),
  },
  chartContent: {
    alignItems: "center",
    height: responsiveHeight(30),
    justifyContent: "center",
    width: "100%",
  },
  chartLabel: {
    color: colors.palette.grey600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 10,
    textAlign: "center",
  },
  chartLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
  },
  chartStyle: {
    borderRadius: 12,
    marginVertical: responsiveHeight(1),
  },
  chartTitle: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: responsiveHeight(2),
  },
  chartWrapper: {
    alignItems: "center",
    height: responsiveHeight(30),
    justifyContent: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  currentPriceContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
  },
  currentPriceLabel: {
    color: colors.palette.grey600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginBottom: responsiveHeight(0.5),
  },
  currentPriceValue: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(10),
  },
  emptyText: {
    color: colors.palette.grey600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(10),
  },
  errorText: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: colors.palette.grey50,
    flex: 1,
  },
  productHeader: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  productImage: {
    borderRadius: 8,
    height: responsiveHeight(20),
    resizeMode: "contain",
    width: responsiveWidth(60),
  },
  productInfo: {
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  productName: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  yAxisLabel: {
    color: colors.palette.grey600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 10,
  },
  yAxisLabelsContainer: {
    height: responsiveHeight(30) - 80,
    justifyContent: "space-between",
    left: 0,
    position: "absolute",
    top: 40,
  },
})
