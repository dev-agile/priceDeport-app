import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"

import { CommonStyles } from "@/theme/common-styles"

import {
  DROPDOWN_MARGIN_TOP_VALUE,
  DROPDOWN_SAVE_VALUE,
  PLACEHOLDER_TEXT_COLOR,
} from "./lib/constants"
import { styles, TEXT_INPUT_PADDING_HORIZONTAL_VALUE } from "./lib/styles"
import type { IProps } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"

export const InputFieldContianer = ({
  title,
  textContainerStyle,
  showIcon = false,
  onChangeText,
  onTogglePassword,
  secureTextEntry,
  editable,
  dropdownData,
  defaultOption,
  setSelectedValue,
  titleStyle,
  ...rest
}: IProps) => {
  return (
    <View style={textContainerStyle}>
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
      {dropdownData ? (
        <View style={{ marginTop: DROPDOWN_MARGIN_TOP_VALUE }}>
          <SelectList
            setSelected={(val: any) => {
              if (setSelectedValue) {
                setSelectedValue(val)
              }
              if (onChangeText) {
                onChangeText(val)
              }
            }}
            data={dropdownData}
            defaultOption={defaultOption}
            inputStyles={styles.titleText}
            boxStyles={styles.dropdownBox}
            save={DROPDOWN_SAVE_VALUE}
            dropdownTextStyles={styles.titleText}
            dropdownStyles={styles.dropdownBox}
          />
        </View>
      ) : (
        <View
          style={[
            styles.textInputContainer,
            { paddingHorizontal: TEXT_INPUT_PADDING_HORIZONTAL_VALUE },
          ]}
        >
          <TextInput
            style={[styles.textInput, CommonStyles.customFontSize]}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && secureTextEntry}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            editable={editable && editable}
            {...rest}
          />
          {showIcon && (
            <TouchableOpacity style={styles.iconContainer} onPress={onTogglePassword}>
              <Image
                source={!secureTextEntry ? Icon.HIDE_PASSWORD : Icon.SHOWPASSWORD}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}
