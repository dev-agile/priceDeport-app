import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: spacing.md,
    width: "100%",
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  detailLabel: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  detailValue: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
  },
  detailsContainer: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: commonStyles.borderRadius.large,
    gap: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
    width: "100%",
  },
  failureIcon: {
    color: colors.palette.red500,
    fontSize: 64,
    marginBottom: spacing.md,
  },
  message: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  title: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    marginBottom: spacing.sm,
  },
})
