import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { WebView } from "react-native-webview"

import { HeaderComponent } from "@/components/common-components"
import ButtonField from "@/components/common-components/button/button"
import { commonStyles } from "@/theme/styles"

import { useSubscriptionPlans } from "./hooks/use-subscription-plans"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

export default function SubscriptionPlans() {
  const {
    plans,
    isLoading,
    selectedPlan,
    showWebView,
    paymentUrl,
    handlePlanSelect,
    handleBuyNow,
    handleWebViewClose,
    handleWebViewNavigation,
    isCreatingSession,
  } = useSubscriptionPlans()

  return (
    <View style={styles.container}>
      <HeaderComponent value="Subscriptions Plans" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView edges={["bottom"]}>
          <Text style={styles.title}>{UI_TEXT.TITLE}</Text>
          <Text style={styles.subtitle}>{UI_TEXT.SUBTITLE}</Text>

          {isLoading ? (
            <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
          ) : (
            <>
              {plans.map((plan) => {
                const isSelected = selectedPlan?.planId === plan.planId
                return (
                  <TouchableOpacity
                    key={plan.id}
                    style={[styles.planCard, isSelected && styles.planCardSelected]}
                    onPress={() =>
                      handlePlanSelect({
                        planId: plan.planId,
                        name: plan.name,
                        amount: plan.amount,
                        interval: plan.interval,
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planPrice}>
                        ${plan.amount}/{plan.interval}
                      </Text>
                    </View>
                    <Text style={styles.planInterval}>Valid for {plan.interval}</Text>
                    <Text style={styles.planDescription}>{UI_TEXT.PLAN_DESCRIPTION}</Text>
                  </TouchableOpacity>
                )
              })}

              <View style={styles.buttonContainer}>
                <ButtonField
                  value={isCreatingSession ? "Processing..." : UI_TEXT.BUY_NOW}
                  onPress={handleBuyNow}
                  isDisabled={!selectedPlan || isCreatingSession}
                  isLoading={isCreatingSession}
                />
              </View>
            </>
          )}
        </SafeAreaView>
      </ScrollView>

      {/* Payment Gateway WebView Modal */}
      <Modal
        visible={showWebView}
        animationType="slide"
        onRequestClose={handleWebViewClose}
        presentationStyle="pageSheet"
      >
        <View style={styles.webViewContainer}>
          <View style={styles.webViewHeader}>
            <Text style={styles.webViewTitle}>Payment Gateway</Text>
            <TouchableOpacity onPress={handleWebViewClose} style={styles.closeButton}>
              <Image source={Icon.CLOSE} style={styles.closeButtonIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          {paymentUrl ? (
            <WebView
              source={{ uri: paymentUrl }}
              onNavigationStateChange={handleWebViewNavigation}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.webViewLoadingContainer}>
                  <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
                </View>
              )}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  )
}
