import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  pill: {
    backgroundColor: commonStyles.colors.backgroundQuinary,
    borderRadius: commonStyles.borderRadius.large,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  pillSelected: {
    backgroundColor: commonStyles.colors.primaryColor,
  },
  pillText: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.medium,
  },
  pillTextSelected: {
    color: colors.palette.neutral100,
  },
})
