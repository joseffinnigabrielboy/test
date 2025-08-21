import { FC } from "react"
import { StyleSheet, Text, View } from "react-native"

import { horizontalScale, moderateScale } from "../utils/metrics"
import { Colors } from "../utils/style"

const ListItem: FC = () => {
  const data = Array.from({ length: 4 })
  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <Text style={styles.text}>0</Text>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.dotsContainer}>
          {data.map((_, index) => {
            return (
              <View
                key={index}
                style={
                  index === 0
                    ? [styles.dotItem, { backgroundColor: Colors.blue }]
                    : index === data.length - 1
                    ? [styles.dotItem, { width: horizontalScale(6), height: horizontalScale(6) }]
                    : styles.dotItem
                }
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
  container: {},
  text: {
    color: Colors.grey,
    fontSize: moderateScale(40),
  },
  topBlock: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark,
  },
  bottomBlock: {
    height: horizontalScale(80),
    backgroundColor: Colors.black,
    paddingTop: horizontalScale(20),
  },
  dotsContainer: {
    flexDirection: "row",
    gap: horizontalScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  dotItem: {
    width: horizontalScale(10),
    height: horizontalScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: Colors.dark,
  },
})
