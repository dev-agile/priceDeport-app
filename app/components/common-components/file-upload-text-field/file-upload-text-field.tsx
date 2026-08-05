import { FC } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
// import { responsiveHeight } from "react-native-responsive-dimensions"

import { WholeSellerRoutes } from "@/navigators/wholeSeller/routes"

import { DATE_CONTAINER_TEXT_PADDING_LEFT, DATE_LABEL_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import type { FileUploadTextFieldProps } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"

const FileUploadTextField: FC<FileUploadTextFieldProps> = ({ value }) => {
  const timestamp = value?.Date
  const date = timestamp?.split("T")[0]
  const navigation = useNavigation()
  const handleSingleProduct = () => {
    const fileInfo = value
    navigation.navigate(WholeSellerRoutes.Order, { fileInfo })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleSingleProduct}>
      <View style={styles.subContainer}>
        <Image source={Icon.File} style={styles.image} />
        <Text style={styles.fileText}>{value?.file_name}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateContainerText}>{DATE_LABEL_TEXT}</Text>
        <Text style={[styles.dateContainerText, { paddingLeft: DATE_CONTAINER_TEXT_PADDING_LEFT }]}>
          {" "}
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default FileUploadTextField
