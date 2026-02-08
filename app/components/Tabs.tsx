import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

import Button from "./Button";

type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  list: TabItem[];
  activeTabIndex: number;
  onTabChange: (tabIndex: number) => void;
};

const Tabs = ({ list, activeTabIndex = 0, onTabChange }: TabsProps) => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {list.map((tab, index) => {
        const isActive = activeTabIndex === index;
        const textStyle = isActive ? styles.labelActive : styles.label;
        const textColor = isActive ? COLORS.text.inverse : COLORS.text.tertiary;
        const backgroundColor = isActive
          ? COLORS.text.primary
          : COLORS.border.default;

        return (
          <Button
            key={tab.id}
            label={tab.label}
            style={styles.tab}
            textVariant="caption"
            textStyle={textStyle}
            textColor={textColor}
            backgroundColor={backgroundColor}
            onPress={() => onTabChange?.(index)}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingVertical: 12,
  },
  tab: {
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  label: {
    fontWeight: "600",
  },
  labelActive: {
    fontWeight: "700",
  },
});

export default memo(Tabs);
