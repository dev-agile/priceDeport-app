import { StyleSheet, Dimensions } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

const { width, height } = Dimensions.get("window")

const FRAME_SIZE = 260
const INSTRUCTION_MARGIN_TOP = 20
const OVERLAY_GAP_VERTICAL = (height - FRAME_SIZE) / 2
const OVERLAY_GAP_SIDE = (width - FRAME_SIZE) / 2

export const styles = StyleSheet.create({
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  centerContent: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  errorContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorMessage: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  errorTitle: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  frame: {
    backgroundColor: colors.transparent,
    borderColor: commonStyles.colors.primaryColor,
    borderRadius: 16,
    borderWidth: 3,
    height: FRAME_SIZE,
    width: FRAME_SIZE,
  },
  instructionText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: INSTRUCTION_MARGIN_TOP,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayBottom: {
    backgroundColor: colors.palette.overlay50,
    bottom: 0,
    height: Math.max(0, OVERLAY_GAP_VERTICAL),
    left: 0,
    position: "absolute",
    right: 0,
  },
  overlayLeft: {
    backgroundColor: colors.palette.overlay50,
    height: FRAME_SIZE,
    left: 0,
    position: "absolute",
    top: OVERLAY_GAP_VERTICAL,
    width: Math.max(0, OVERLAY_GAP_SIDE),
  },
  overlayRight: {
    backgroundColor: colors.palette.overlay50,
    height: FRAME_SIZE,
    position: "absolute",
    right: 0,
    top: OVERLAY_GAP_VERTICAL,
    width: Math.max(0, OVERLAY_GAP_SIDE),
  },
  overlayTop: {
    backgroundColor: colors.palette.overlay50,
    height: Math.max(0, OVERLAY_GAP_VERTICAL),
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  permissionContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  permissionMessage: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  permissionTitle: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
})

export const modalStyles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.palette.neutral200,
  },
  cancelButtonText: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  overlay: {
    alignItems: "center",
    backgroundColor: colors.palette.grey500,
    flex: 1,
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: commonStyles.colors.primaryColor,
  },
  submitButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
})
