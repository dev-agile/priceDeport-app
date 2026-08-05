import { View, TouchableOpacity, Text, Image, Modal } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
// import { SafeAreaView } from "react-native-safe-area-context"

import { AppLogo } from "@/components/common-components"
import { Screen } from "@/components/Screen"

import { useHomeOptionList } from "./hooks/use-home-option-list"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

const getButtonIcon = (buttonLabel: string) => {
  switch (buttonLabel) {
    case "Scan Item":
      return Icon.SCAN
    case "Search Item":
      return Icon.Search
    case "Favorites":
      return Icon.FAVORITE
    case "Upload MADR Peer Group File":
      return Icon.FILE_PDF
    default:
      return null
  }
}

const HomeOptionList = () => {
  const { showPopup, setShowPopup, navigateHome, madrCheckerLink, buttons } = useHomeOptionList()

  return (
    <Screen preset="auto" contentContainerStyle={styles.screenContentContainer}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Icon Container */}
            <View style={styles.logoContainer}>
              <AppLogo imageStyle={styles.image} wrapperStyle={styles.iconWrapper} />
            </View>
            <Text style={styles.guide}>{UI_TEXT.GUIDE_TITLE}</Text>
            <Text style={styles.subtitle}>{UI_TEXT.SUBTITLE_TEXT}</Text>
            <View style={styles.buttonsContainer}>
              {buttons.map((buttonLabel, index) => {
                const iconSource = getButtonIcon(buttonLabel)
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => navigateHome(buttonLabel)}
                  >
                    {iconSource ? (
                      <View style={styles.buttonIconCircle}>
                        <Image source={iconSource} resizeMode="contain" style={styles.buttonIcon} />
                      </View>
                    ) : null}
                    <Text style={styles.textdata}>{buttonLabel}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.footerRow} onPress={madrCheckerLink} activeOpacity={0.8}>
          <Text style={styles.contactUsText}>{UI_TEXT.CONTACT_US_TEXT}</Text>
          {/* <Image source={Icon.UPARROW} resizeMode="contain" style={styles.externalLinkIcon} /> */}
        </TouchableOpacity>
      </View>
      {/* <Image source={Icon.FOOTER} style={styles.footerImage} /> */}
      <Modal transparent={true} visible={showPopup} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{UI_TEXT.MODAL_TITLE}</Text>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔒</Text>
            </View>
            <Text style={styles.modalText}>{UI_TEXT.MODAL_TEXT}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
              <Text style={styles.closeButtonText}>{UI_TEXT.CLOSE_BUTTON_TEXT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Screen>
  )
}

export default HomeOptionList
