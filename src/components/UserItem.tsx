import { FC } from "react"
import { StyleSheet, View } from "react-native"

import { horizontalScale, moderateScale } from "../utils/metrics"
import { Colors } from "../utils/style"

const UserItem: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
      <View style={styles.line}></View>
    </View>
  )
}

export default UserItem

const styles = StyleSheet.create({
  container: {},
  circle: {
    width: horizontalScale(70),
    height: horizontalScale(70),
    borderRadius: moderateScale(100),
    backgroundColor: Colors.dark,
  },
  line: {
    width: horizontalScale(70),
    height: horizontalScale(10),
    marginTop: horizontalScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: Colors.dark,
  },
})
