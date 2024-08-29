/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
    >
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})


/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
// import {
//   DarkTheme,
//   DefaultTheme,
//   NavigationContainer,
// } from "@react-navigation/native"
// import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
// import { observer } from "mobx-react-lite"
// import React from "react"
// import { useColorScheme,View, Image, Text, TouchableOpacity } from "react-native"
// import * as Screens from "../screens"
// import { EmergencyScreen } from "../screens/EmergencyScreen";
// import Config from "../config"
// import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
// import { colors } from "app/theme"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import tw from '../lib/tw'; 

// /**
//  * This type allows TypeScript to know what routes are defined in this navigator
//  * as well as what properties (if any) they might take when navigating to them.
//  *
//  * If no params are allowed, pass through `undefined`. Generally speaking, we
//  * recommend using your MobX-State-Tree store(s) to keep application state
//  * rather than passing state through navigation params.
//  *
//  * For more information, see this documentation:
//  *   https://reactnavigation.org/docs/params/
//  *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
//  *   https://reactnavigation.org/docs/typescript/#organizing-types
//  */

// const Tab = createBottomTabNavigator();

// const CustomTabBarButton = ({ children, onPress }: { children: React.ReactNode, onPress: () => void }) => {
//   return (
//     <TouchableOpacity
//       style={tw`absolute bottom-4 bg-purple-500 rounded-full p-4`}
//       onPress={onPress}
//     >
//       {children}
//     </TouchableOpacity>
//   );
// };

// export type AppStackParamList = {
//   Welcome: undefined
//   MainTabs: undefined
//   // 🔥 Your screens go here
//   // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
// }

// /**
//  * This is a list of all the route names that will exit the app if the back button
//  * is pressed while in that screen. Only affects Android.
//  */
// const exitRoutes = Config.exitRoutes

// export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
//   AppStackParamList,
//   T
// >

// // Documentation: https://reactnavigation.org/docs/stack-navigator/
// const Stack = createNativeStackNavigator<AppStackParamList>()

// const AppStack = observer(function AppStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
//     >
//       <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
//       {/* Add your new MainTabs as the main screen */}
//       <Stack.Screen name="MainTabs" component={MainTabs} />
//     </Stack.Navigator>
//   );
// })

// const MainTabs = observer(function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: tw`absolute h-20 bg-white rounded-full bottom-4 mx-4`,
//       }}
//     >
//       <Tab.Screen
//         name="Emergency"
//         component={EmergencyScreen} 
//         options={{
//           tabBarIcon: ({ focused }: { focused: boolean }) => (
//             <View style={tw`justify-center items-center`}>
//               <Image
//                 source={{ uri: "https://img.icons8.com/ios-filled/50/000000/bell.png" }}
//                 resizeMode="contain"
//                 style={[
//                   tw`w-6 h-6`,
//                   focused ? tw`tint-purple-500` : tw`tint-black`,
//                 ]}
//               />
//               <Text style={tw`text-black text-xs`}>Emergency</Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Compass"
//         component={EmergencyScreen} // Create this screen if not exists
//         options={{
//           tabBarIcon: ({ focused }: { focused: boolean }) => (
//             <Image
//               source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/compass.png" }}
//               resizeMode="contain"
//               style={[tw`w-8 h-8`, focused ? tw`tint-white` : tw`tint-white`]}
//             />
//           ),
//           tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={EmergencyScreen} // Create this screen if not exists
//         options={{
//           tabBarIcon: ({ focused }: { focused: boolean }) => (
//             <View style={tw`justify-center items-center`}>
//               <Image
//                 source={{ uri: "https://img.icons8.com/ios-filled/50/000000/user.png" }}
//                 resizeMode="contain"
//                 style={[
//                   tw`w-6 h-6`,
//                   focused ? tw`tint-purple-500` : tw`tint-black`,
//                 ]}
//               />
//               <Text style={tw`text-black text-xs`}>Profile</Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// });

// export interface NavigationProps
//   extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

// export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
//   const colorScheme = useColorScheme()

//   useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

//   return (
//     <NavigationContainer
//       ref={navigationRef}
//       theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//       {...props}
//     >
//       <AppStack />
//     </NavigationContainer>
//   )
// })
