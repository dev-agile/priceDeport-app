import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { Avatar, PopupModal } from "@/components/common-components"
import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

import { ProfileField } from "./components/profile-field"
import { useProfile } from "./hooks/use-profile"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function Profile() {
  const navigation = useNavigation()
  const {
    profileData,
    isLoading,
    showDeleteModal,
    isDeleting,
    handleLogout,
    handleDeleteAccount,
    handleConfirmDelete,
    handleCancelDelete,
  } = useProfile(navigation)

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {profileData && (
          <>
            <View style={styles.avatarContainer}>
              <Avatar name={profileData.name} size={100} />
              <Text style={styles.userName}>{profileData.name}</Text>
              <View style={styles.premiumMemberRow}>
                <Text style={styles.crownIcon}>👑</Text>
                <Text style={styles.premiumMemberText}>{UI_TEXT.PREMIUM_MEMBER}</Text>
              </View>
            </View>

            <View style={styles.fieldsContainer}>
              <ProfileField label={UI_TEXT.RETAILER_NAME} value={profileData.name} />
              <ProfileField label={UI_TEXT.EMAIL} value={profileData.email} />
              <ProfileField label={UI_TEXT.STORE_NAME} value={profileData.storeName} />
              <ProfileField label={UI_TEXT.PHONE} value={profileData.number} />
              <ProfileField label={UI_TEXT.LOCATION} value={profileData.location} />
              <ProfileField label={UI_TEXT.CITY} value={profileData.city} />
              <ProfileField label={UI_TEXT.ZIP_CODE} value={profileData.zipCode} />
              <ProfileField label={UI_TEXT.PEER_GROUP} value={profileData.peerGroup} />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                disabled={isDeleting}
                onPress={handleDeleteAccount}
                style={styles.deleteButton}
              >
                {isDeleting ? (
                  <ActivityIndicator color={colors.palette.neutral100} size="small" />
                ) : (
                  <Text style={styles.deleteButtonText}>{UI_TEXT.DELETE_ACCOUNT}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isDeleting}
                onPress={handleLogout}
                style={styles.logoutButton}
                activeOpacity={0.8}
              >
                <Text style={styles.logoutButtonText}>{UI_TEXT.LOGOUT}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <PopupModal
        cancelText={UI_TEXT.DELETE_CANCEL}
        confirmText={UI_TEXT.DELETE_CONFIRM}
        isVisible={showDeleteModal}
        message={UI_TEXT.DELETE_CONFIRM_MESSAGE}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <Toast />
    </View>
  )
}
