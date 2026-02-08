import { memo, type ReactNode } from "react";
import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from "react-native";

type TypographyVariant = "title" | "label" | "body" | "caption";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  weight?: TextStyle["fontWeight"];
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

const BASE_COLOR = "#111827";

const Typography = ({
  variant = "body",
  color = BASE_COLOR,
  weight,
  style,
  children,
  ...textProps
}: TypographyProps) => {
  const variantStyle = VARIANT_STYLES[variant];
  const weightStyle = weight ? { fontWeight: weight } : null;
  const colorStyle = color ? { color } : null;

  return (
    <Text
      {...textProps}
      style={[variantStyle, weightStyle, colorStyle, style]}
    >
      {children}
    </Text>
  );
};

const VARIANT_STYLES = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "PoppinsSemiBold",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "PoppinsMedium",
  },
  body: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "PoppinsRegular",
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "PoppinsRegular",
  },
});

export type { TypographyProps, TypographyVariant };
export default memo(Typography);
