import { Tabs } from "expo-router"

import CustomTabs from "../../components/CustomTabs"

const _layout = () => {
  return (
    <Tabs tabBar={CustomTabs} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ headerTitle: "Home" }} />
      <Tabs.Screen name="Search" />
      <Tabs.Screen name="Add" />
      <Tabs.Screen name="Watch" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  )
}

export default _layout
