import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const vw = Math.round(width);
const vh = Math.round(height);
const isAboveBreakpoint = (vh > 600);

export const theme = {
  colors: {
    green: "#60A781",
    fadedGreen: "#CEE4D8",
    darkGrey: "#67686B",
    lightGrey: "#999B9E",
    fadedGrey: "#E5E5E6",
    white: "#FFFFFF",
    red: "#FF0000",
    lightRed: "rgb(255, 230, 230)",
    yellow: "#FFA500"
  }, 
  fonts: {
    body: "OpenSans-Regular",
    header: "OpenSans-SemiBold",
    numeral: "Prompt-Regular",
  }, 
  fontSizes: {
    xsmall: 14,
    small: 16,
    medium: 18,
    large: isAboveBreakpoint? 24 : 20,
    xlarge: 72,
  },
  iconSizes: {
    header: 28,
    body: 24,
  },
  layout: {
    padding: 4,
    margin: 16,
    headerHeight: isAboveBreakpoint? 90 : 70,
    segmentHeight: 40,
    errorTextHeight: 26,
  },
  buttons: {
    buttonPressOpacity: 0.5,
    iconSize: isAboveBreakpoint? 42 : 32,
  },
  animation: {
    fast: 300,
  }
}

export default theme;
