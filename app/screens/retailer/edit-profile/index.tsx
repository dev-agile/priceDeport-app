import { useCallback, useMemo, useRef } from "react"
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import { Controller } from "react-hook-form"
import Toast from "react-native-toast-message"

import { Avatar, ButtonField, InputFieldContianer } from "@/components/common-components"
import { commonStyles } from "@/theme/styles"

import { useEditProfile } from "./hooks/use-edit-profile"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

export default function EditProfile({ navigation }: { navigation: any }) {
  const peerGroupSheetRef = useRef<BottomSheetModal>(null)

  const {
    control,
    handleSubmit,
    errors,
    btnDisable,
    isLoading,
    profileData,
    peerGroups,
    onSubmit,
    isProfileLoading,
  } = useEditProfile(navigation)

  const snapPoints = useMemo(() => ["45%"], [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    [],
  )

  if (isProfileLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {profileData && (
            <>
              <View style={styles.avatarContainer}>
                <Avatar name={profileData.name} size={80} />
              </View>

              <View style={styles.fieldsContainer}>
                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.RETAILER_NAME}
                        placeholder={UI_TEXT.RETAILER_NAME}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="name"
                  />
                  {errors.name?.message && (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.STORE_NAME}
                        placeholder={UI_TEXT.STORE_NAME}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="storeName"
                  />
                  {errors.storeName?.message && (
                    <Text style={styles.errorText}>{errors.storeName.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.PHONE}
                        placeholder={UI_TEXT.PHONE}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="number"
                  />
                  {errors.number?.message && (
                    <Text style={styles.errorText}>{errors.number.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.LOCATION}
                        placeholder={UI_TEXT.LOCATION}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="location"
                  />
                  {errors.location?.message && (
                    <Text style={styles.errorText}>{errors.location.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.CITY}
                        placeholder={UI_TEXT.CITY}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="city"
                  />
                  {errors.city?.message && (
                    <Text style={styles.errorText}>{errors.city.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.ZIP_CODE}
                        placeholder={UI_TEXT.ZIP_CODE}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="zipCode"
                  />
                  {errors.zipCode?.message && (
                    <Text style={styles.errorText}>{errors.zipCode.message}</Text>
                  )}
                </View>

                {/* Peer Group — tappable selector that opens a BottomSheet */}
                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Text style={[styles.titleText, styles.peerGroupTitleText]}>
                          {UI_TEXT.PEER_GROUP}
                        </Text>
                        <TouchableOpacity
                          style={styles.peerGroupSelector}
                          onPress={() => peerGroupSheetRef.current?.present()}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.peerGroupSelectorText,
                              !value && styles.peerGroupSelectorPlaceholder,
                            ]}
                          >
                            {value || UI_TEXT.PEER_GROUP}
                          </Text>
                          <Image
                            source={Icon.LeftBackArrow}
                            resizeMode="contain"
                            style={styles.peerGroupChevron}
                          />
                        </TouchableOpacity>

                        <BottomSheetModal
                          ref={peerGroupSheetRef}
                          snapPoints={snapPoints}
                          enablePanDownToClose
                          backdropComponent={renderBackdrop}
                        >
                          <BottomSheetView style={styles.sheetContent}>
                            <Text style={styles.sheetTitle}>{UI_TEXT.PEER_GROUP}</Text>
                            {peerGroups.map((group) => (
                              <TouchableOpacity
                                key={group}
                                style={styles.sheetOptionRow}
                                onPress={() => {
                                  onChange(group)
                                  peerGroupSheetRef.current?.dismiss()
                                }}
                                activeOpacity={0.7}
                              >
                                <Text
                                  style={[
                                    styles.sheetOptionText,
                                    value === group && styles.sheetOptionTextSelected,
                                  ]}
                                >
                                  {group}
                                </Text>
                                {value === group && <Text style={styles.sheetCheckmark}>✓</Text>}
                              </TouchableOpacity>
                            ))}
                          </BottomSheetView>
                        </BottomSheetModal>
                      </>
                    )}
                    name="peerGroup"
                  />
                  {errors.peerGroup?.message && (
                    <Text style={styles.errorText}>{errors.peerGroup.message}</Text>
                  )}
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <ButtonField
                  value={UI_TEXT.UPDATE}
                  onPress={handleSubmit(onSubmit)}
                  btnDisable={btnDisable}
                  isLoading={isLoading}
                  variant={btnDisable || isLoading ? "disabled" : "active"}
                />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
    </View>
  )
}
