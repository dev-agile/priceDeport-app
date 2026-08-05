import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  addButton: {
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1),
  },
  addButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.palette.neutral100,
  },
  blurredContainer: {
    opacity: 0.6,
  },
  cartControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: responsiveWidth(3),
    justifyContent: "center",
    marginTop: responsiveHeight(1),
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  controlButton: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    borderRadius: 8,
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
  },
  controlButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    gap: responsiveWidth(2),
    justifyContent: "space-between",
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
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
  favoriteButton: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    width: 40,
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
  productCategory: {
    color: colors.palette.grey600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  productHeader: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  productId: {
    color: colors.palette.grey500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
    marginTop: 4,
  },
  productImage: {
    borderRadius: 8,
    height: responsiveHeight(25),
    resizeMode: "contain",
    width: responsiveWidth(80),
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
  quantityButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 4,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  quantityButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    minWidth: 40,
    textAlign: "center",
  },
  section: {
    marginBottom: responsiveHeight(10),
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  sectionPeerGroupPrice: {
    backgroundColor: commonStyles.colors.primary,
    borderRadius: commonStyles.borderRadius.medium,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.bold,
  },
  wholesalerDate: {
    color: colors.palette.grey500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 12,
    marginTop: 4,
  },
  wholesalerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(1),
  },
  wholesalerItem: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    marginBottom: responsiveHeight(1),
    padding: responsiveWidth(4),
  },
  wholesalerList: {
    flex: 1,
  },
  wholesalerName: {
    color: colors.customColors.BLACK,
    flex: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  wholesalerPrice: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "700",
  },
})

export const modalStyles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
  },
  buttonContainer: {
    flexDirection: "row",
    gap: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  cancelButton: {
    backgroundColor: colors.palette.grey300,
  },
  cancelButtonText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    maxHeight: responsiveHeight(60),
    padding: responsiveWidth(5),
    width: responsiveWidth(80),
  },
  input: {
    borderColor: colors.palette.grey300,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: colors.palette.grey200,
    paddingVertical: responsiveHeight(1.5),
  },
  itemId: {
    color: colors.palette.grey500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
    marginTop: 4,
  },
  itemInfo: {
    marginBottom: responsiveHeight(1),
  },
  itemName: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  itemText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
  },
  overlay: {
    alignItems: "center",
    backgroundColor: colors.palette.grey600,
    flex: 1,
    justifyContent: "center",
  },
  peerGroupModalOptions: {
    backgroundColor: colors.palette.green50,
  },
  submitButton: {
    backgroundColor: commonStyles.colors.primaryColor,
  },
  submitButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
    textAlign: "center",
  },
})
