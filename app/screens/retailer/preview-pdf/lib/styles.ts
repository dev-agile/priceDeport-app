import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.palette.neutral300,
    opacity: 0.6,
  },
  buttonLoader: {
    marginRight: 8,
  },
  buttonSecondary: {
    backgroundColor: commonStyles.colors.backgroundSecondary,
    borderColor: colors.palette.neutral300,
    borderWidth: 1,
  },
  buttonShare: {
    backgroundColor: colors.palette.neutral100,
    borderColor: commonStyles.colors.backgroundQuinary,
    borderWidth: commonStyles.borderWidth.small,
  },
  buttonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextSecondary: {
    color: colors.palette.neutral900,
  },
  container: {
    flex: 1,
  },
  errorButton: {
    marginTop: 20,
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: colors.palette.red500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loaderText: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: 12,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  previewCard: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: "hidden",
    shadowColor: colors.palette.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  webView: {
    backgroundColor: colors.palette.neutral100,
    height: 700,
    width: "100%",
  },
})
