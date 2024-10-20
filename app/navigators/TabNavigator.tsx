import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { colors } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { TAB_ROUTES } from "app/constants"
import { Text } from "app/components"

export type TabParamList = {
  Account: undefined
  Bookmarks: undefined
  Downloads: undefined
  History: undefined
  MyCourses: undefined
  Storybook: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

// TODO: Can be maintained to list all the components [#issue]
// const TABS = [...TAB_ROUTES]

// if (__DEV__) {
//   TABS.push({
//     routeName: "Storybook",
//     component: StorybookScreen,
//     translationKey: "tabNavigator.storybook",
//     icon: BookIcon,
//   })
// }

const renderTabs = () => {
  return TAB_ROUTES.map((route) => {
    const { name: routeName, component, icon: Icon } = route
    return (
      <Tab.Screen
        component={component}
        key={routeName}
        name={routeName}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#4A90E2" : colors.background.secondary,
                fontSize: 10,
                paddingLeft: 15,
              }}
            >
              {focused ? route.name : ""}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? colors.content.brand : colors.content.secondary} size={24} />
          ),
        }}
      />
    )
  })
}

/**
 * This is the main navigator for the screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `TabNavigator`.
 */
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar],
        tabBarActiveTintColor: colors.content.brand,
        tabBarInactiveTintColor: colors.content.secondary,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarLabelPosition: "beside-icon",
      }}
    >
      {renderTabs()}
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background.secondary,
  borderTopWidth: 1,
  elevation: 0,
  height: 60,
  // TODO: Can make an issue for this [#issue]
  // borderTopRightRadius: spacing.md,
  // borderTopLeftRadius: spacing.md,
}

const $tabBarItem: ViewStyle = {}

const $tabBarLabel: TextStyle = {}
