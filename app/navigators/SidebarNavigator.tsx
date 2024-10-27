import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { RouteName } from "app/constants"
import { observer } from "mobx-react-lite"
import { TabNavigator } from "./TabNavigator"
import { AccountScreen } from "app/screens"

export type SidebarNavigatorParamList = {
  History: undefined
  Account: undefined
  Bookmarks: undefined
  Payout: undefined
  Storybook: undefined
  Calendar: undefined
  Home: undefined
}

const Drawer = createDrawerNavigator<SidebarNavigatorParamList>()

export const SidebarNavigator = observer(function SidebarNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerPosition: "right" }}
      initialRouteName="Home"
    >
      <Drawer.Screen name={"Home"} component={TabNavigator} />
      <Drawer.Screen name={RouteName.Account} component={AccountScreen} />
    </Drawer.Navigator>
  )
})
