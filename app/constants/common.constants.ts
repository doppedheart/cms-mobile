import { Dimensions, Platform } from "react-native"

export const HIT_SLOP_5 = { top: 5, left: 5, right: 5, bottom: 5 }
export const HIT_SLOP_10 = { top: 10, left: 10, right: 10, bottom: 10 }
export const IS_IOS = Platform.OS === "ios"
export const SCREEN_HEIGHT = Dimensions.get("window").height
export const SCREEN_WIDTH = Dimensions.get("window").width
export const CELL_COUNT = 4
export const RESEND_TIME = 5 // in seconds
export const AUTO_COMPLETE_MAP = { android: "sms-otp", default: "one-time-code" } as const
