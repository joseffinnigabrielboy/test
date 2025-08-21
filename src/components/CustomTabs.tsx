import AntDesign from "@expo/vector-icons/AntDesign"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Octicons from "@expo/vector-icons/Octicons"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"

import { horizontalScale } from "../utils/metrics"
import { Colors } from "../utils/style"

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const tabbarIcons: any = {
    index: (isFocused: boolean) => (
      <FontAwesome6
        name="house"
        size={horizontalScale(24)}
        color={isFocused ? Colors.white : Colors.grey}
      />
    ),
    Search: (isFocused: boolean) => (
      <AntDesign
        name="search1"
        size={horizontalScale(26)}
        color={isFocused ? Colors.white : Colors.grey}
      />
    ),
    Add: (isFocused: boolean) => (
      <Octicons
        name="diff-added"
        size={horizontalScale(26)}
        color={isFocused ? Colors.white : Colors.grey}
      />
    ),
    Watch: (isFocused: boolean) => (
      <Octicons
        name="video"
        size={horizontalScale(26)}
        color={isFocused ? Colors.white : Colors.grey}
      />
    ),
    Profile: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="account-circle-outline"
        size={horizontalScale(28)}
        color={isFocused ? Colors.white : Colors.grey}
      />
    ),
  }

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={styles.tabbarItem}
          >
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CustomTabs

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? horizontalScale(75) : horizontalScale(60),
    backgroundColor: Colors.black,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabbarItem: {
    marginBottom: Platform.OS === "ios" ? horizontalScale(10) : horizontalScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
})
