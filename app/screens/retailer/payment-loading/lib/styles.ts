import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  loadingText: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.large,
    marginTop: spacing.md,
  },
  verifyingText: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    marginTop: spacing.sm,
  },
})
