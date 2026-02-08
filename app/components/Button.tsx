import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TouchableOpacityProps, TextStyle } from "react-native";
import { COLORS } from "@constants/colors";
import Typography, { TypographyVariant } from "./Typography";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textVariant?: TypographyVariant;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  label,
  disabled = false,
  backgroundColor = COLORS.background.accent,
  textColor = COLORS.text.inverse,
  textVariant = "label",
  outline = false,
  style,
  textStyle = {},
  ...props
}: ButtonProps) => {
  const buttonColor = disabled ? COLORS.background.disabled : backgroundColor;
  const borderStyle = outline ? { borderWidth: 1.5, borderColor: textColor } : null;
  const bgColorStyle = {
    backgroundColor: outline ? COLORS.background.transparent : buttonColor,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      style={[
        styles.button,
        bgColorStyle,
        borderStyle,
        style,
      ]}
      {...props}
    >
      <Typography style={textStyle} variant={textVariant} color={textColor} >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

export type { ButtonProps };
export default memo(Button);
