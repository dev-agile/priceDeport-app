import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { HeaderComponent } from "@/components/common-components"
import { OptionScreen } from "@/screens/common-screens/option-screen"
import {
  CreateNewAccount,
  EditProfile,
  EmailVerification,
  Favourites,
  HomeOptionList,
  Login,
  Order,
  PaymentFailure,
  PaymentLoading,
  PaymentSuccess,
  PriceHistory,
  PreviewPDF,
  ProductDescription,
  Profile,
  ResetPassword,
  SaveOrder,
  SalesGraph,
  Scanner,
  Search,
  SubscriptionPlans,
  UploadFiles,
} from "@/screens/retailer"
import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

import { Icon } from "../../../assets/icons/wholeSeller"
import { RetailerRoutes } from "../retailer/routes"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabBarIcon = ({ icon, focused }: { icon: ImageSourcePropType; focused: boolean }) => {
  return (
    <Image
      source={icon}
      style={[
        styles.tabBarIcon,
        { tintColor: focused ? commonStyles.colors.primaryColor : colors.palette.grey500 },
      ]}
    />
  )
}

// Only the five persistent tabs belong here. All "detail" screens (ProductDescription,
// Favourites, EditProfile, PreviewPDF, etc.) live in the Stack so that goBack()
// returns to whichever tab launched them.
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: commonStyles.colors.primaryColor,
      }}
    >
      <Tab.Screen
        name={RetailerRoutes.OPTIONS}
        component={HomeOptionList}
        options={{
          headerShown: false,
          headerTitleStyle: {
            display: "none",
          },
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.HOME} focused={focused} />,
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.SEARCH}
        component={Search}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          headerStyle: {
            backgroundColor: colors.palette.neutral100,
            borderBottomColor: colors.palette.neutral300,
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Search" />,
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.SEARCH_ICON} focused={focused} />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.CART}
        component={Order}
        options={{
          headerShown: false,
          tabBarLabel: "My Cart",
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.SHOPINGCART} focused={focused} />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.SCAN}
        component={Scanner}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.SCAN} focused={focused} />,
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Scanner" />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.SAVE_ORDER}
        component={SaveOrder}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          tabBarLabel: "Orders",
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.ORDER} focused={focused} />,
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Orders" />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.PROFILE}
        component={Profile}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.palette.neutral100,
            height: 100,
          },
          headerTitleStyle: {
            color: colors.palette.charcoal500,
            fontFamily: CommonStyles.fontFamily.fontFamily,
            fontSize: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 10,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(RetailerRoutes.EDIT_PROFILE)}>
              <TabBarIcon icon={Icon.EDIT} focused={false} />
            </TouchableOpacity>
          ),
          headerTintColor: "#FFF",
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.PROFILE} focused={focused} />,
        })}
      />
    </Tab.Navigator>
  )
}

export const RetailerStackNavigation = ({
  role,
  authToken,
}: {
  role: string | null
  authToken: string | unknown | undefined
}) => {
  const isAuthenticated = !!(role && authToken)

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name={RetailerRoutes.TAB_CONTAINER}
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={RetailerRoutes.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RetailerRoutes.OPTION}
            component={OptionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RetailerRoutes.CREATE_NEW_ACCOUNT}
            component={CreateNewAccount}
            options={{
              headerShown: true,
              headerTitleStyle: {
                // @ts-expect-error - display property not in type but works at runtime
                display: "none",
              },
              headerStyle: {
                backgroundColor: commonStyles.colors.secondaryColor,
                // @ts-expect-error - height property not in type but works at runtime
                height: 80,
                elevation: 5,
                shadowColor: colors.palette.grey400,
              },
              header: () => <HeaderComponent value="Create Account" />,
            }}
          />
          <Stack.Screen
            name={RetailerRoutes.EMAIL_VERIFICATION}
            component={EmailVerification}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: colors.customColors.WHITE,
              },
              headerTitleStyle: {
                color: colors.palette.charcoal500,
                fontFamily: CommonStyles.fontFamily.fontFamily,
                fontSize: 20,
              },
              headerTitle: "Verify",
              headerTitleAlign: "center",
              headerTintColor: colors.palette.neutral100,
            }}
          />
        </>
      )}
      <Stack.Screen
        name={RetailerRoutes.RESET_PASSWORD}
        options={{
          headerShown: false,
        }}
      >
        {({ navigation }) => <ResetPassword role={role} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name={RetailerRoutes.SAVE_ORDER}
        component={SaveOrder}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Orders" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.SALES_GRAPH}
        component={SalesGraph}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Sales Graph" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.FAILURE}
        component={PaymentFailure}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.SUCCESS}
        component={PaymentSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.LOADING}
        component={PaymentLoading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.SUBSCRIPTIONPLAN}
        component={SubscriptionPlans}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Subscriptions Plans" />,
        }}
      />
      {/*
        Detail screens pushed onto the stack from tab screens.
        goBack() / hardware back pops the stack and returns to the exact
        tab screen that navigated here — no explicit backTo needed.
      */}
      <Stack.Screen
        name={RetailerRoutes.PRODUCT_DESCRIPTION}
        component={ProductDescription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.PRICEHISTORY}
        component={PriceHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.FAVOURITES}
        component={Favourites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.UPLOAD_FILE}
        component={UploadFiles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RetailerRoutes.EDIT_PROFILE}
        component={EditProfile}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Edit Profile" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.PREVIEW_PDF}
        component={PreviewPDF}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: "rgba(0, 0, 0, 0.25)",
          },
          header: () => <HeaderComponent value="Preview PDF" />,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarIcon: { height: 25, margin: 20, padding: 10, width: 25 },
})
