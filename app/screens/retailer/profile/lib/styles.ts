import { Platform, StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(1.5),
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: responsiveWidth(4),
    justifyContent: "center",
    marginBottom: responsiveHeight(4),
    marginTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(2),
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(12),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  crownIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.quaternaryColor,
    borderRadius: commonStyles.borderRadius.large,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  deleteButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    textAlign: commonStyles.textAlign.center,
  },
  fieldCard: {
    backgroundColor: commonStyles.colors.secondaryColor,
    borderRadius: commonStyles.borderRadius.large,
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  fieldLabel: {
    color: colors.palette.grey700,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 13,
    fontWeight: commonStyles.fontWeight.medium,
    marginBottom: 6,
  },
  fieldValue: {
    color: colors.palette.black700,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  fieldsContainer: {
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  input: {
    borderColor: colors.palette.grey300,
    borderRadius: commonStyles.borderRadius.medium,
    borderWidth: 1,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    padding: 12,
  },
  inputContainer: {
    marginTop: 6,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.quinaryColor,
    borderRadius: commonStyles.borderRadius.large,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  logoutButtonText: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.medium,
    fontWeight: commonStyles.fontWeight.semiBold,
    textAlign: commonStyles.textAlign.center,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  premiumMemberRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(0.5),
  },
  premiumMemberText: {
    color: colors.palette.neutral600,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  titleText: {
    fontWeight: commonStyles.fontWeight.bold,
  },
  userName: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
    textAlign: commonStyles.textAlign.center,
  },
})
