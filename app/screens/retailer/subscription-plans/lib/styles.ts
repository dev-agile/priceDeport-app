import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeButtonIcon: {
    height: 24,
    width: 24,
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
  planCard: {
    backgroundColor: colors.palette.neutral100,
    borderColor: commonStyles.borderColor.secondary,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: commonStyles.borderWidth.medium,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  planCardSelected: {
    borderColor: commonStyles.colors.primaryColor,
    borderWidth: commonStyles.borderWidth.large,
  },
  planDescription: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: spacing.xs,
  },
  planHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  planInterval: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginTop: spacing.xs,
  },
  planName: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
  },
  planPrice: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
  },
  scrollContent: {
    gap: spacing.md,
    padding: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  subtitle: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    marginBottom: spacing.lg,
  },
  title: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    marginBottom: spacing.xs,
  },
  webViewContainer: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
  webViewHeader: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderBottomColor: commonStyles.borderColor.secondary,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
  },
  webViewLoadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  webViewTitle: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
  },
})
