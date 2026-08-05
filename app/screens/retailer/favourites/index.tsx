import { useRef } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import { commonStyles } from "@/theme/styles"

import { FavouriteItemCard } from "./components/favourite-item-card"
import { PeerGroupBottomSheet } from "./components/peer-group-bottom-sheet"
import { useFavourites } from "./hooks/use-favourites"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { isHeader, type FavouritesFlatItem, type FavouritesListItem } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"

export default function Favorites({
  navigation,
  route,
}: {
  navigation: any
  route?: { params?: { peerGroup?: string } }
}) {
  const peerGroupSheetRef = useRef<BottomSheetModal>(null)
  const {
    flatData,
    isLoading,
    isSubscribed,
    currentPeerGroup,
    banner,
    dismissBanner,
    peerGroupsList,
    refreshing,
    onRefresh,
    // canChangePeerGroup,
    selectPeerGroup,
    onItemPress,
    handleUnlike,
    onSubscribePress,
    unlikeLoadingIds,
    // isPeerGroupButtonDisabled,
  } = useFavourites(navigation, route)

  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: FavouritesFlatItem }) => {
    if (isHeader(item)) {
      const categoryTitle = item.title.replace(UI_TEXT.CATEGORY_PREFIX, "")
      return (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>
            {UI_TEXT.CATEGORY_PREFIX}
            <Text style={styles.categoryHeaderValue}>{categoryTitle}</Text>
          </Text>
        </View>
      )
    }
    const row = item as FavouritesListItem
    const displayPrice = isSubscribed ? `$${row.latestPrice}` : "$0"
    return (
      <FavouriteItemCard
        imageUrl={row.image_url}
        productName={row.product_desc}
        productId={row.product_id}
        price={displayPrice}
        onPress={() => onItemPress(row)}
        onUnlikePress={() => handleUnlike(row.product_id)}
        isUnlikeLoading={!!unlikeLoadingIds[row.product_id]}
      />
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.pageHeader}>
          <Pressable style={styles.pageHeaderAction} onPress={() => navigation.goBack()}>
            <Image source={Icon.LeftBackArrow} style={styles.pageHeaderIcon} resizeMode="contain" />
          </Pressable>
          <Text style={styles.pageHeaderTitle}>Favorites</Text>
          <Pressable style={styles.pageHeaderAction} onPress={onRefresh}>
            <Text style={styles.pageHeaderRefresh}>↻</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["bottom"]} style={styles.container}>
        {banner.visible ? (
          <View style={styles.successBanner}>
            <View style={styles.successBannerLeft}>
              <Text style={styles.successBannerText}>✓</Text>
              <Text style={styles.successBannerText}>{banner.message}</Text>
            </View>
            <Pressable onPress={dismissBanner} hitSlop={10}>
              <Image source={Icon.CLOSE} style={styles.successCloseIcon} resizeMode="contain" />
            </Pressable>
          </View>
        ) : null}

        {flatData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{UI_TEXT.NO_FAVOURITES}</Text>
            {!isSubscribed ? (
              <Pressable style={styles.subscribeButton} onPress={onSubscribePress}>
                <Text style={styles.subscribeButtonText}>{UI_TEXT.SUBSCRIBE_CTA}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : (
          <>
            <View style={styles.peerGroupCard}>
              <View>
                <Text style={styles.peerGroupTitle}>{UI_TEXT.PEER_GROUP}</Text>
                <Text style={styles.peerGroupCurrentText}>
                  {UI_TEXT.CURRENT_PEER_GROUP} {currentPeerGroup || "—"}
                </Text>
              </View>
              {/* <Pressable
                style={[
                  styles.changeButton,
                  isPeerGroupButtonDisabled ? styles.changeButtonDisabled : null,
                ]}
                onPress={() => {
                  if (canChangePeerGroup) {
                    peerGroupSheetRef.current?.present()
                  }
                }}
                disabled={isPeerGroupButtonDisabled}
              >
                <Text style={styles.changeButtonText}>{UI_TEXT.CHANGE}</Text>
                <Image
                  source={Icon.DOWN_ARROW_1}
                  style={styles.changeButtonIcon}
                  resizeMode="contain"
                />
              </Pressable> */}
            </View>

            <FlatList
              data={flatData}
              keyExtractor={(item, index) =>
                isHeader(item)
                  ? `header-${item.title}-${index}`
                  : `row-${(item as FavouritesListItem).product_id}-${index}`
              }
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[commonStyles.colors.primaryColor]}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </SafeAreaView>
      <PeerGroupBottomSheet
        ref={peerGroupSheetRef}
        peerGroups={peerGroupsList}
        selectedPeerGroup={currentPeerGroup}
        onSelect={selectPeerGroup}
      />

      <Toast />
    </View>
  )
}
