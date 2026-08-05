import { StyleSheet } from "react-native"

import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  emptyText: {
    color: commonStyles.colors.textSecondary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.medium,
    textAlign: commonStyles.textAlign.center,
  },
  header: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.backgroundQuinary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerTitle: {
    color: commonStyles.colors.text,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: commonStyles.colors.backgroundTertiary,
    flex: 1,
  },
  refreshButton: {
    padding: spacing.sm,
  },
  refreshButtonText: {
    color: commonStyles.colors.primary,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.medium,
  },
})
