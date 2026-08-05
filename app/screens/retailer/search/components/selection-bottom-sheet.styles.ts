import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  checkmark: {
    color: commonStyles.colors.primaryColor,
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    backgroundColor: colors.palette.grey200,
    height: 1,
    marginHorizontal: spacing.lg,
  },
  header: {
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  item: {
    alignItems: "center",
    borderBottomColor: colors.palette.grey200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  itemSelected: {
    backgroundColor: commonStyles.colors.primaryLight,
  },
  itemText: {
    color: colors.palette.neutral700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 15,
    fontWeight: "500",
  },
  itemTextSelected: {
    color: commonStyles.colors.primaryColor,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: spacing.xl,
    paddingTop: spacing.xxl,
  },
  title: {
    borderBottomColor: colors.palette.grey300,
    borderBottomWidth: 1,
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 17,
    fontWeight: "700",
    paddingBottom: spacing.sm,
    textAlign: "center",
  },
})
