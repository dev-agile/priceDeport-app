import { useCallback } from "react"
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { WebView } from "react-native-webview"

import { RetailerRoutes } from "@/navigators/retailer/routes"
import { commonStyles } from "@/theme/styles"

import { usePreviewPDF } from "./hooks/use-preview-pdf"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function PreviewPDF({ route, navigation }: any) {
  const { order, vendorData } = route.params ?? {}
  const { isLoading, isDownloading, error, htmlContent, generatePDF, sharePDF, downloadPDF } =
    usePreviewPDF(order ?? null, vendorData ?? null)

  const goBackToOrders = useCallback(() => {
    navigation.navigate(RetailerRoutes.SAVE_ORDER)
  }, [navigation])

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={generatePDF}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.previewCard}>
          {htmlContent ? (
            <WebView
              source={{ html: htmlContent }}
              style={styles.webView}
              scrollEnabled
              originWhitelist={["*"]}
            />
          ) : (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
              <Text style={styles.loaderText}>{UI_TEXT.GENERATING}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, (isLoading || isDownloading) && styles.buttonDisabled]}
            onPress={downloadPDF}
            disabled={isLoading || isDownloading}
          >
            {isDownloading && (
              <ActivityIndicator size="small" color="#fff" style={styles.buttonLoader} />
            )}
            <Text style={styles.buttonText}>
              {isDownloading ? UI_TEXT.DOWNLOADING : UI_TEXT.DOWNLOAD_PDF}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonShare]}
            onPress={sharePDF}
            disabled={isLoading || isDownloading}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>{UI_TEXT.SHARE_PDF}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={goBackToOrders}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back to Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        {isLoading && !htmlContent ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
            <Text style={styles.loaderText}>{UI_TEXT.GENERATING}</Text>
          </View>
        ) : (
          renderContent()
        )}
      </SafeAreaView>
    </View>
  )
}
