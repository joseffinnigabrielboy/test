import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const guidelineBaseWidth = 390
const guidelineBaseHeight = 844

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size
const moderateScale = (size: number, factor = 1) => size + (horizontalScale(size) - size) * factor

export { horizontalScale, verticalScale, moderateScale }
