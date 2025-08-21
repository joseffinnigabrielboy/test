import { FC } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

import { horizontalScale } from "@/src/utils/metrics"
import { Colors } from "@/src/utils/style"

const HEADER_MAX_HEIGHT = horizontalScale(300)
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? horizontalScale(60) : horizontalScale(73)
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const Search: FC = () => {
  const scrollY = useSharedValue(Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value + (Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0),
      [0, HEADER_SCROLL_DISTANCE],
      [0, -HEADER_SCROLL_DISTANCE],
      Extrapolation.CLAMP
    )
    return { transform: [{ translateY }] }
  })

  const imageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value + (Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0),
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 1, 0],
      Extrapolation.CLAMP
    )
    const translateY = interpolate(
      scrollY.value + (Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0),
      [0, HEADER_SCROLL_DISTANCE],
      [0, 100],
      Extrapolation.CLAMP
    )
    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  const titleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value + (Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0),
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 1, 0.8],
      Extrapolation.CLAMP
    )
    const translateY = interpolate(
      scrollY.value + (Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0),
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [0, 0, -8],
      Extrapolation.CLAMP
    )
    return {
      transform: [{ scale }, { translateY }],
    }
  })

  const renderScrollViewContent = () => {
    const data = Array.from({ length: 15 })
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.fill}>
      <Animated.ScrollView
        style={styles.fill}
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentInset={{ top: HEADER_MAX_HEIGHT }}
        contentOffset={{ x: 0, y: -HEADER_MAX_HEIGHT }}
      >
        {renderScrollViewContent()}
      </Animated.ScrollView>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Image
          style={[styles.backgroundImage, imageStyle]}
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
        />
      </Animated.View>
      <Animated.View style={[styles.bar, titleStyle]}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.blue,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? horizontalScale(28) : horizontalScale(38),
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
  },
  scrollViewContent: {
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: horizontalScale(40),
    margin: horizontalScale(16),
    backgroundColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Search
