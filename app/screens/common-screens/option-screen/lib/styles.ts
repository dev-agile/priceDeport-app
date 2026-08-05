import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  buttonsContainer: {
    gap: responsiveHeight(2),
    marginTop: responsiveHeight(4),
    width: "100%",
  },
  comingSoonText: {
    color: colors.palette.grey600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
    marginTop: responsiveHeight(0.5),
    textAlign: "center",
  },
  contactText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: responsiveHeight(4),
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(4),
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconContainer: {
    alignItems: "center",
    // backgroundColor: colors.customColors.GREEN,
    borderRadius: 12,
    height: responsiveWidth(20),
    justifyContent: "center",
    marginBottom: responsiveHeight(3),
    width: responsiveWidth(20),
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: commonStyles.borderRadius.large,
    height: 65,
    width: 65,
  },
  instructionText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: responsiveHeight(3),
    textAlign: "center",
  },
  subtitle: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: responsiveHeight(1),
    textAlign: "center",
  },
  title: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
})
