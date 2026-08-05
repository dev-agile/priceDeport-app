import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    width: "100%",
  },
  buttonIcon: {
    height: 24,
    width: 24,
  },
  buttonIconCircle: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.tertiaryColor,
    borderRadius: 999,
    justifyContent: "center",
    marginRight: responsiveWidth(3),
    padding: 10,
  },
  buttonsContainer: {
    alignSelf: "stretch",
    gap: 16,
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(4),
    width: "100%",
  },
  closeButton: {
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: colors.palette.neutral100,
    fontSize: 16,
  },
  contactUsText: {
    color: colors.palette.neutral500,
    fontSize: 14,
  },
  container: {
    backgroundColor: commonStyles.colors.secondaryColor,
    flex: 1,
    flexDirection: "column",
    paddingBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    // marginVertical: "auto",
  },
  externalLinkIcon: {
    height: 16,
    marginLeft: 4,
    width: 16,
  },
  footerImage: {
    bottom: 0,
    height: "12%",
    position: "absolute",
    width: "100%",
  },
  footerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(4),
  },
  guide: {
    color: colors.customColors.BLACK,
    fontFamily: "Arial-Rounded-Bold",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    color: colors.palette.red700,
    fontSize: 24,
  },
  iconContainer: {
    backgroundColor: colors.palette.red50,
    borderRadius: 50,
    marginBottom: 20,
    padding: 10,
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
  logoContainer: {
    alignItems: "center",
    borderRadius: 12,
    height: responsiveWidth(20),
    justifyContent: "center",
    marginBottom: responsiveHeight(3),
    width: responsiveWidth(20),
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.black500,
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  safeAreaView: {
    flex: 1,
  },
  screenContentContainer: {
    flexGrow: 1,
  },

  scrollContent: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  subtitle: {
    color: colors.palette.neutral500,
    fontSize: 16,
    marginTop: responsiveHeight(1),
    textAlign: "center",
  },
  textdata: {
    color: commonStyles.colors.secondaryColor,
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "left",
  },
})

export const headingStyles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    height: 5,
    width: "70%",
  },
  container: {
    alignItems: "center",
    bottom: "-60%",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  image: {
    height: 65,
    width: 65,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.customColors.LIGHTGREEN,
    borderRadius: 50,
    borderWidth: 5,
    display: "flex",
    height: 100,
    justifyContent: "center",
    width: 100,
  },
  topBar: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    height: 5,
    width: "10%",
  },
})
