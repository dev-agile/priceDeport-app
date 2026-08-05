import "@expo/metro-runtime" // this is for fast refresh on web w/o expo-router
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"

import { App } from "@/app"
import { sentryWrapRoot } from "@/services/monitoring/sentry"

void SplashScreen.preventAutoHideAsync().catch(() => {
  /* native splash may be unavailable in some environments */
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(sentryWrapRoot(App))
