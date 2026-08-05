import { useRef, useCallback } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { SafeAreaView } from "react-native-safe-area-context"

import type { Product } from "@/api/retailer/product/types"
import SearchField from "@/components/common-components/search-field/search-field"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { commonStyles } from "@/theme/styles"

import { SelectionBottomSheet } from "./components/selection-bottom-sheet"
import { useSearch } from "./hooks/use-search"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"
import { Images } from "../../../../assets/Images/wholeSeller"

export default function Search({ navigation }: any) {
  const categorySheetRef = useRef<BottomSheetModal>(null)
  const subcategorySheetRef = useRef<BottomSheetModal>(null)

  const {
    categoryDescArray,
    debouncedSearch,
    filteredData,
    handleClearSearch,
    handleSearch,
    isCategoryAll,
    isLoading,
    isLoadingTrendingData,
    isSubCategoryEnabled,
    itemsArray,
    onCategorySelect,
    onRefresh,
    onSubCategorySelect,
    peerGroup,
    query,
    refreshing,
    selectedCategory,
    selectedSubCategory,
    setQuery,
    subCategoryDescArray,
    trendingArray,
  } = useSearch()

  const listData = (itemsArray?.length ?? 0) > 0 ? itemsArray : (trendingArray ?? [])
  const showCategoryHeader = isLoading || !(itemsArray?.length ?? 0) || !query

  const handleCategorySelect = useCallback(
    (category: string) => {
      onCategorySelect(category)
      categorySheetRef.current?.dismiss()
      if (category !== "All (trending)") {
        subcategorySheetRef.current?.present()
      }
    },
    [onCategorySelect],
  )

  const handleSubcategorySelect = useCallback(
    (subcategory: string) => {
      onSubCategorySelect(subcategory)
      subcategorySheetRef.current?.dismiss()
    },
    [onSubCategorySelect],
  )

  const renderCardItem = (modifyValue: Product) => {
    const priceInfo = modifyValue?.adminPrice && modifyValue?.adminPrice[peerGroup]
    const sortedPriceInfo = priceInfo?.length
      ? [...priceInfo].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      : null
    const categorySubcategory =
      modifyValue?.subCategory_desc != null && modifyValue?.subCategory_desc !== ""
        ? `${modifyValue?.category_desc || ""} • ${modifyValue?.subCategory_desc || ""}`
        : modifyValue?.category_desc || ""

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
            productDetails: modifyValue,
            singleProductId: modifyValue?.product_id,
          })
        }
        style={styles.cardBox}
      >
        <View style={styles.cardBoxLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={modifyValue?.image_url ? { uri: modifyValue?.image_url } : Images.SoyaMilk}
              style={styles.image}
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.helperText1}>{modifyValue?.product_desc}</Text>
            <Text style={styles.helperText2}>{categorySubcategory}</Text>
            <Text style={styles.helperText2}>ID: {modifyValue?.product_id}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.helperText3}>
              ${sortedPriceInfo ? sortedPriceInfo[0].price : 0.0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderListHeader = () => {
    if (!showCategoryHeader) return null
    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.peerGroupButton}
          onPress={() => categorySheetRef.current?.present()}
        >
          <Text style={styles.peerGroupButtonText}>{selectedCategory ?? isCategoryAll}</Text>
          <Image source={Icon.LeftBackArrow} resizeMode="contain" style={styles.dropdownArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.peerGroupButton,
            !isSubCategoryEnabled ? styles.peerGroupButtonDisabled : null,
          ]}
          onPress={() => isSubCategoryEnabled && subcategorySheetRef.current?.present()}
          disabled={!isSubCategoryEnabled}
        >
          <Text
            style={[
              styles.peerGroupButtonText,
              !isSubCategoryEnabled ? styles.peerGroupButtonTextDisabled : null,
            ]}
          >
            {selectedSubCategory ??
              (isSubCategoryEnabled ? "Subcategory" : "Select category first")}
          </Text>
          <Image source={Icon.LeftBackArrow} resizeMode="contain" style={styles.dropdownArrow} />
        </TouchableOpacity>
      </View>
    )
  }

  const renderListEmpty = () => {
    if (isLoading || isLoadingTrendingData) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
        </View>
      )
    }
    if (query && filteredData?.data?.length === 0) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.emptyText}>No Products found</Text>
        </View>
      )
    }
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.emptyText}>No Products found</Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <SearchField
          setQuery={setQuery}
          query={query}
          handleOnSearchIcon={() => query && query.trim().length >= 2 && handleSearch(query)}
          isLoading={isLoading}
          handleDelete={handleClearSearch}
          debouncedSearch={debouncedSearch}
        />
      </SafeAreaView>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={({ item }) => renderCardItem(item)}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <SelectionBottomSheet
        ref={categorySheetRef}
        title="Select Category"
        items={categoryDescArray}
        selectedValue={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <SelectionBottomSheet
        ref={subcategorySheetRef}
        title="Select Subcategory"
        items={subCategoryDescArray}
        selectedValue={selectedSubCategory}
        onSelect={handleSubcategorySelect}
      />
    </View>
  )
}
