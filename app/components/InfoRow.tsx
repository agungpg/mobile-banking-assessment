import { StyleSheet, View } from "react-native";
import { COLORS } from "@constants/colors";
import Typography from "./Typography";

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.rowContainer}>
      <Typography variant="body" style={styles.rowLabel}>
        {label}
      </Typography>
      <Typography variant="body" style={styles.rowValue}>
        {value}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.default,
  },
  rowLabel: {
    color: COLORS.text.secondary,
  },
  rowValue: {
    fontWeight: "600",
  },
});

export default InfoRow;
