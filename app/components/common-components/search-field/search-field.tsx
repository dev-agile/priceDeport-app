import { FC } from "react"
import { Image, KeyboardAvoidingView, Platform, TextInput, View } from "react-native"
import { TouchableOpacity as GestureTouchableOpacity } from "react-native-gesture-handler"

import { PLACEHOLDER_TEXT, PLACEHOLDER_TEXT_COLOR, SEARCH_TEXT_PADDING } from "./lib/constants"
import { CONTAINER_PADDING, styles } from "./lib/styles"
import type { SearchFieldProps } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"

const SearchField: FC<SearchFieldProps | any> = ({
  setQuery,
  handleOnSearchIcon,
  query,
  // isLoading,
  handleDelete,
  debouncedSearch,
}) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ padding: CONTAINER_PADDING }}>
        <View style={styles.container}>
          <View style={styles.leftPart}>
            <GestureTouchableOpacity activeOpacity={0} onPress={handleOnSearchIcon}>
              <Image source={Icon.Search} style={styles.image} />
            </GestureTouchableOpacity>

            <TextInput
              placeholder={PLACEHOLDER_TEXT}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              style={styles.searchText}
              onChangeText={(text) => {
                setQuery(text.trimEnd())
                debouncedSearch(text)
              }}
              value={query}
            />
          </View>
          {query && (
            <GestureTouchableOpacity activeOpacity={0} onPress={handleDelete}>
              <Image
                source={Icon.CLOSE}
                style={[styles.image, { paddingTop: SEARCH_TEXT_PADDING }]}
              />
            </GestureTouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SearchField
