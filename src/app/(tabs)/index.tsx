import AntDesign from "@expo/vector-icons/AntDesign"
import Feather from "@expo/vector-icons/Feather"
import { FC } from "react"
import { FlatList, Image, StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import PostItem from "@/src/components/PostItem"
import UserItem from "@/src/components/UserItem"
import { horizontalScale } from "@/src/utils/metrics"
import { Colors } from "@/src/utils/style"

const HEADER_HEIGHT = horizontalScale(50)

const Home: FC = () => {
  const headerTranslateY = useSharedValue(0)
  const prevY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      prevY.value = e.contentOffset.y
    },
    onScroll: (e) => {
      const y = e.contentOffset.y
      const { contentSize, layoutMeasurement } = e

      if (y <= 0) {
        headerTranslateY.value = 0
        prevY.value = 0
        return
      }

      const maxScroll = contentSize.height - layoutMeasurement.height
      if (y >= maxScroll) {
        prevY.value = y
        return
      }

      const dy = y - prevY.value
      const next = headerTranslateY.value - dy
      headerTranslateY.value = Math.max(-HEADER_HEIGHT, Math.min(0, next))
      prevY.value = y
    },
    onEndDrag: () => {
      const threshold = -HEADER_HEIGHT / 2
      headerTranslateY.value = withSpring(headerTranslateY.value < threshold ? -HEADER_HEIGHT : 0, {
        damping: 18,
        stiffness: 220,
      })
    },
    onMomentumEnd: () => {
      const threshold = -HEADER_HEIGHT / 2
      headerTranslateY.value = withSpring(headerTranslateY.value < threshold ? -HEADER_HEIGHT : 0, {
        damping: 18,
        stiffness: 220,
      })
    },
  })

  const headerStyle = useAnimatedStyle(() => {
    const opacity = 1 + headerTranslateY.value / HEADER_HEIGHT
    return {
      transform: [{ translateY: headerTranslateY.value }],
      opacity,
    }
  })

  const data = Array.from({ length: 10 })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Image
          source={require("../../../assets/images/insta.png")}
          style={{ height: horizontalScale(40), width: horizontalScale(120) }}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row", gap: horizontalScale(24) }}>
          <AntDesign name="hearto" size={horizontalScale(24)} color={Colors.white} />
          <Feather name="send" size={horizontalScale(24)} color={Colors.white} />
        </View>
      </Animated.View>

      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <PostItem />}
        ListHeaderComponent={() => (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyleForHorizontalList}
            renderItem={() => <UserItem />}
          />
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        onScroll={scrollHandler}
        onMomentumScrollEnd={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    paddingHorizontal: horizontalScale(16),
    flexDirection: "row",
    height: HEADER_HEIGHT,
    backgroundColor: Colors.black,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  contentContainerStyleForHorizontalList: {
    gap: horizontalScale(16),
    paddingHorizontal: horizontalScale(16),
    paddingTop: horizontalScale(10),
    paddingBottom: horizontalScale(40),
  },
})

export default Home
