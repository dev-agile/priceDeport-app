import { Dimensions, Platform, StyleSheet } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginHorizontal: 2,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: 14,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  cardBoxLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-start",
  },
  categoryContainer: {
    flexDirection: "row",
    gap: responsiveWidth(3),
    marginBottom: 12,
    marginTop: 12,
  },
  container: {
    paddingHorizontal: 0,
    paddingTop: responsiveHeight(0.2),
  },
  dropdownArrow: {
    height: 10,
    marginLeft: 4,
    transform: [{ rotate: "-90deg" }],
    width: 10,
  },
  emptyText: {
    color: colors.palette.neutral600,
    fontSize: 16,
    fontWeight: "500",
  },
  fileImage: {
    borderRadius: 8,
    height: 45,
    width: 45,
  },
  fileUploadContainer: {
    bottom: 0,
    elevation: 3,
    padding: 20,
    position: "absolute",
    right: 0,
    shadowColor: colors.customColors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  helperText1: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 15,
    fontWeight: "700",
  },
  helperText2: {
    color: colors.palette.neutral500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 13,
  },
  helperText3: {
    color: commonStyles.colors.primaryColor,
    fontSize: 16,
    fontWeight: "700",
  },
  image: {
    borderRadius: 8,
    height: 64,
    width: 64,
  },
  imageContainer: {
    width: 64,
  },
  latestTrendsHeading: {
    color: commonStyles.colors.primaryColor,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: responsiveFontSize(3),
    marginVertical: 10,
    textAlign: "center",
    textShadowColor: colors.palette.grey500,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContent: {
    paddingBottom: responsiveHeight(8),
  },
  loaderConatiner: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  loaderContainer: {
    alignSelf: "center",
    paddingTop: responsiveHeight(30),
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  peerGroupButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryLight,
    borderColor: commonStyles.colors.border,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: 1,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: 12,
  },
  peerGroupButtonDisabled: {
    opacity: 0.5,
  },
  peerGroupButtonText: {
    color: colors.palette.neutral700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "500",
  },
  peerGroupButtonTextDisabled: {
    color: colors.palette.neutral500,
  },
  priceContainer: {
    alignItems: "flex-end",
    display: "flex",
    justifyContent: "center",
    minWidth: 56,
  },
  productInfo: {
    flex: 1,
    gap: 2,
    justifyContent: "center",
  },
  searchCard: {
    // backgroundColor: commonStyles.colors.backgroundSecondary,
    borderRadius: commonStyles.borderRadius.large,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...Platform.select({
      android: { elevation: 1 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
      },
    }),
  },
})

export const modalStyles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    width: "100%",
  },
  itemText: {
    color: colors.customColors.BLACK,
    fontSize: 16,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: colors.customColors.WHITE,
    borderRadius: 20,
    elevation: 5,
    height: height - 100,
    margin: 20,
    paddingTop: 35,
    shadowColor: colors.customColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: width - 50,
  },
})
