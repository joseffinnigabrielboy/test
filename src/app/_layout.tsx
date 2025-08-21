import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, StatusBar as RNStatusBar, SafeAreaView, StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { Colors } from "../utils/style"

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />

        <RootNavigation />
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
})

export default App
