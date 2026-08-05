import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  optionRow: {
    borderBottomWidth: 1,
    borderColor: colors.palette.grey200,
    paddingVertical: spacing.md,
  },
  optionText: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
  },
  title: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
    marginBottom: spacing.md,
  },
})
