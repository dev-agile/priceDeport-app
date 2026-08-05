import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { HeaderComponent } from "@/components/common-components"
import ButtonField from "@/components/common-components/button/button"

import { useUploadFiles } from "./hooks/use-upload-files"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

export default function UploadFiles() {
  const {
    userPeerGroup,
    selectedPeerGroup,
    selectedFile,
    hasValidSelectedFile,
    banner,
    dismissBanner,
    selectPeerGroup,
    handlePickDocumentForGroup,
    handleUploadFile,
    removeFileForGroup,
    peerGroups,
    isUploading,
    openMADRLink,
  } = useUploadFiles()

  return (
    <View style={styles.container}>
      <HeaderComponent value="Upload Files" />

      {banner.visible && (
        <View style={styles.successBanner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerText}>✔</Text>
            <Text style={styles.bannerText} numberOfLines={1}>
              {banner.message}
            </Text>
          </View>
          <TouchableOpacity
            onPress={dismissBanner}
            style={styles.bannerDismiss}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image source={Icon.CLOSE} style={styles.bannerDismissIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={["bottom"]}>
          <View style={styles.iconWrapper}>
            <Image source={Icon.UPLOAD_FILES} style={styles.iconImage} resizeMode="contain" />
          </View>

          <Text style={styles.title}>{UI_TEXT.TITLE}</Text>
          <Text style={styles.subtitle}>{UI_TEXT.SUBTITLE}</Text>

          <View style={styles.downloadSection}>
            <Text style={styles.stepTitle}>{UI_TEXT.STEP_DOWNLOAD}</Text>
            <View style={styles.stepButton}>
              <ButtonField value={UI_TEXT.STEP_DOWNLOAD} onPress={openMADRLink} />
            </View>
          </View>

          <View style={styles.peerGroupSection}>
            <Text style={styles.peerGroupSectionLabel}>{UI_TEXT.ASSIGNED_PEER_GROUP}</Text>
            {!userPeerGroup ? (
              <View style={styles.noPeerGroupCard}>
                <Text style={styles.noPeerGroupText}>{UI_TEXT.NO_PEER_GROUP_ASSIGNED}</Text>
              </View>
            ) : null}
            {peerGroups.map((group) => {
              const isSelected = selectedPeerGroup === group
              const hasFile = !!selectedFile && selectedFile.group === group
              return (
                <TouchableOpacity
                  key={group}
                  activeOpacity={0.8}
                  style={[styles.peerGroupCard, isSelected && styles.peerGroupSelected]}
                  onPress={() => selectPeerGroup(group)}
                  disabled
                >
                  <View style={styles.peerGroupCardHeader}>
                    <View style={styles.peerGroupCardContent}>
                      <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.peerGroupName}>{UI_TEXT.PEER_GROUP_LABEL(group)}</Text>
                    </View>

                    {isSelected && !hasFile && (
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation()
                          handlePickDocumentForGroup()
                        }}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Text style={styles.uploadActionLabel}>{UI_TEXT.UPLOAD}</Text>
                      </TouchableOpacity>
                    )}
                    {hasFile && <Text style={styles.uploadedLabel}>{UI_TEXT.UPLOADED}</Text>}
                  </View>

                  {hasFile && selectedFile && (
                    <View style={styles.fileContainer}>
                      <View style={styles.fileContainerLeft}>
                        <Image
                          source={Icon.FILE_PDF}
                          style={styles.fileIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.fileName} numberOfLines={1}>
                          {selectedFile.name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={(e) => {
                          e.stopPropagation()
                          removeFileForGroup(group)
                        }}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Image source={Icon.CLOSE} style={styles.removeIcon} resizeMode="contain" />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>

          <ButtonField
            value={isUploading ? UI_TEXT.UPLOADING : UI_TEXT.UPLOAD_PDF_FILE}
            onPress={handleUploadFile}
            isDisabled={!hasValidSelectedFile || isUploading}
            isLoading={isUploading}
            icon={
              <Image
                source={Icon.UPLOAD_FILES}
                style={styles.uploadButtonIcon}
                resizeMode="contain"
              />
            }
          />

          <View style={styles.fileTypeInfo}>
            <Text style={styles.fileTypeInfoText}>{UI_TEXT.FILE_TYPE_INFO}</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
