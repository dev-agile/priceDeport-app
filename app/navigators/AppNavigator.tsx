/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
// import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { MenuProvider } from "react-native-popup-menu"
import { responsiveHeight } from "react-native-responsive-dimensions"
// import SplashScreen from "react-native-splash-screen"
import Toast from "react-native-toast-message"

// import NoInternetConnection from "@/components/no-internet-connection/no-internet-connection"
import toastConfig from "@/components/common-components/custom-toast/custom-toast"
import { Text } from "@/components/Text"
import { UpgradeModal } from "@/components/upgradeVersion"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { useRole } from "@/context/RoleContext"
import { OptionScreen } from "@/screens/common-screens/option-screen"
import { ThemeProvider } from "@/theme/context"
import { commonStyles } from "@/theme/styles"
import { role } from "@/utils/role"
import { useVersionCheck } from "@/utils/VersionContext"

import { RetailerStackNavigation } from "./components/retailer-stack-navigation"

// const Tab = createBottomTabNavigator()

// const Stack = createNativeStackNavigator()

// const TabBarIcon = ({ icon, focused }: { icon: ImageSourcePropType; focused: boolean }) => {
//   return (
//     <Image
//       source={icon}
//       style={[styles.tabBarIcon, { tintColor: focused ? color.GREEN : "gray" }]}
//     />
//   )
// }

// const BottomTabNavigator = () => {
//   const navigation = useNavigation();
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarHideOnKeyboard: true,
//         tabBarActiveTintColor: color.GREEN,
//       }}>
//       <Tab.Screen
//         name={Constant.ScreenName.HOME}
//         component={Home}
//         options={{
//           headerShown: true,
//           headerTitleStyle: {
//             display: 'none',
//           },
//           tabBarIcon: ({focused}) => <TabBarIcon icon={Icon.HOME} focused={focused} />,
//           headerStyle: {
//             height: 80,
//             elevation: 5,
//             shadowColor: 'rgba(0, 0, 0, 0.25)',
//           },
//           header: () => <HeaderComponent value="Home" />,
//         }}
//       />

//       <Tab.Screen
//         name={Constant.ScreenName.PROFILE}
//         component={Profile}
//         options={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: color.WHITE,
//             height: 100,
//           },
//           headerTitleStyle: {
//             color: color.BLACK,
//             fontFamily: CommonStyles.fontFamily.fontFamily,
//             fontSize: 20,
//           },
//           headerRightContainerStyle: {
//             paddingRight: 10,
//           },
//           headerTitleAlign: 'center',
//           // -----------Need to be navigate ---- navigation.navigate(Constant.ScreenName.EDIT_PROFILE)
//           headerRight: () => (
//             <TouchableOpacity onPress={() => navigation.navigate(Constant.ScreenName.EDIT_PROFILE)}>
//               <TabBarIcon icon={Icon.EDIT} />
//             </TouchableOpacity>
//           ),
//           headerTintColor: colors.palette.neutral100,
//           tabBarIcon: ({focused}) => <TabBarIcon icon={Icon.PROFILE} focused={focused} />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
// const WholeSellerStackNavigation = ({
//   role,
//   authToken,
// }: {
//   role: string | unknown | undefined;
//   authToken: string | unknown | undefined;
// }) => {
//   let initialRouteName =
//     role && authToken ? Constant.ScreenName.TAB_CONTAINER : Constant.ScreenName.LOGIN;
//   return (
//     <Stack.Navigator initialRouteName={initialRouteName}>
//       <Stack.Screen
//         name={Constant.ScreenName.OPTION}
//         component={Option}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.LOGIN}
//         component={Login}
//         options={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: color.WHITE,
//             height: 100,
//           },
//           headerTitleStyle: styles.headerTitle,
//           headerTitleAlign: 'center',
//           headerTintColor: colors.palette.neutral100,
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.CREATE_NEW_ACCOUNT}
//         component={CreateNewAccount}
//         options={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: color.WHITE,
//             height: 100,
//           },
//           headerTitleStyle: styles.headerTitle,
//           headerTitle: 'Create New Account',
//           headerTitleAlign: 'center',
//           headerTintColor: colors.palette.neutral100,
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.EMAIL_VERIFICATION}
//         component={EmailVerification}
//         options={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: color.WHITE,
//             height: 100,
//           },
//           headerTitleStyle: styles.headerTitle,
//           headerTitle: 'Verify',
//           headerTitleAlign: 'center',
//           headerTintColor: colors.palette.neutral100,
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.RESET_PASSWORD}
//         options={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: color.WHITE,
//             height: 100,
//           },
//           headerTitleStyle: styles.headerTitle,
//           headerTitle: 'Reset Password',
//           headerTitleAlign: 'center',
//           headerTintColor: colors.palette.neutral100,
//         }}>
//         {() => <ResetPassword role={role} />}
//       </Stack.Screen>
//       <Stack.Screen
//         name={Constant.ScreenName.UPLOAD_FILE}
//         component={UploadFile}
//         options={{
//           headerShown: true,
//           headerTitleStyle: {
//             display: 'none',
//           },
//           headerStyle: {
//             height: 80,
//             elevation: 5,
//             shadowColor: 'rgba(0, 0, 0, 0.25)',
//           },
//           header: () => <HeaderComponent value="Upload Files" />,
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.Order}
//         component={Order}
//         options={{
//           headerShown: true,
//           headerTitleStyle: {
//             display: 'none',
//           },
//           headerStyle: {
//             height: 80,
//             elevation: 5,
//             shadowColor: 'rgba(0, 0, 0, 0.25)',
//           },
//           header: () => <HeaderComponent value="View Data" />,
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.EDIT_PROFILE}
//         component={EditProfile}
//         options={{
//           headerShown: true,
//           headerTitleStyle: {
//             display: 'none',
//           },
//           headerStyle: {
//             backgroundColor: 'white',
//           },
//           header: () => WithoutImageHeader('Edit Profile'),
//         }}
//       />
//       <Stack.Screen
//         name={Constant.ScreenName.TAB_CONTAINER}
//         component={BottomTabNavigator}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

const MainStack = () => {
  const { userAuth } = useRetailerAuth()
  const { userRole: selectedRole, isLoading: isRoleLoading } = useRole()
  const [loading] = useState(false)
  const authToken = userAuth?.accessToken
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true)
  //       const userInfo = await AsyncStorage.getItem("userInfo")
  //       if (userInfo !== null) {
  //         const jsonUserInfo = JSON.parse(userInfo)
  //         dispatch(updateUserRoleAction(jsonUserInfo?.role))
  //       }
  //     } catch (error) {
  //       setLoading(false)
  //       console.error("Error fetching data:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])
  let componentToRender
  switch (true) {
    case loading || isRoleLoading:
      componentToRender = (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={commonStyles.colors.primaryColor} />
        </View>
      )
      break
    case selectedRole === role.WHOLE_SELLER:
      componentToRender = (
        // <WholeSellerStackNavigation role={selectedRole} authToken={userDetails?.accessToken} />
        <View>
          <Text>Whole Seller</Text>
        </View>
      )
      break
    case selectedRole === role.RETAILER:
      componentToRender = <RetailerStackNavigation role={selectedRole} authToken={authToken} />
      break
    default:
      componentToRender = <OptionScreen />
  }
  return componentToRender
}

export const AppNavigator = () => {
  const { needsUpdate, details, forceUpdate, setNeedsUpdate } = useVersionCheck()

  if (needsUpdate) {
    return (
      <UpgradeModal
        isVisible={needsUpdate}
        details={details}
        forceUpdate={forceUpdate}
        setNeedsUpdate={setNeedsUpdate}
      />
    )
  }

  // useEffect(() => {
  //   SplashScreen.hide()
  // }, [])

  return (
    <ThemeProvider>
      {/* <MenuProvider> */}
      <MainStack />
      <Toast config={toastConfig} />
      {/* <NoInternetConnection /> */}
      {/* </MenuProvider> */}
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  // tabBarIcon: { height: 25, width: 25 },
  // gradient: {
  //   flex: 1,
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // headerTitle: {
  //   color: colors.palette.charcoal500,
  //   fontFamily: CommonStyles.fontFamily.fontFamily,
  //   fontSize: 20,
  // },
  loaderContainer: {
    alignSelf: "center",
    paddingTop: responsiveHeight(30),
  },
})
