import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2.5),
  },
  contentContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    color: colors.palette.grey600,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    paddingVertical: 20,
    textAlign: "center",
  },
  footnoteCard: {
    backgroundColor: colors.palette.grey100,
    borderRadius: commonStyles.borderRadius.large,
    marginTop: 22,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  footnoteText: {
    color: colors.palette.grey600,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    textAlign: "center",
  },
  screenTitle: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 33,
    fontWeight: "600",
    marginBottom: 18,
    textAlign: "center",
  },
  tableCard: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.grey300,
    borderRadius: commonStyles.borderRadius.large,
    borderWidth: 1,
    overflow: "hidden",
  },
  tableHeadCell: {
    color: colors.palette.grey700,
    flex: 1,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: "600",
  },
  tableHeadDateCell: {
    flex: 1.2,
  },
  tableHeaderRow: {
    backgroundColor: colors.palette.grey100,
    borderBottomColor: colors.palette.grey300,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tableRow: {
    borderBottomColor: colors.palette.grey300,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  tableRowCell: {
    color: colors.palette.charcoal500,
    flex: 1,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  tableRowDateCell: {
    flex: 1.2,
    fontWeight: commonStyles.fontWeight.bold,
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
})
