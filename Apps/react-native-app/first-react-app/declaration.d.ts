declare module "*.scss" {
    import { StyleProp, ViewStyle } from "react-native";
    const content: Record<string, StyleProp<ViewStyle>>;
    export default content;
  }