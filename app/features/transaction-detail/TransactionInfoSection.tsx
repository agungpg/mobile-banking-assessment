import InfoRow from "@components/InfoRow";
import Typography from "@components/Typography";
import { StyleSheet, View } from "react-native";
import { COLORS } from "@constants/colors";

type TransactionInfoSectionProps = {
  fullDate: string;
  time: string;
  recipientName?: string;
  referenceId?: string;
};

const TransactionInfoSection = ({
  fullDate,
  time,
  recipientName,
  referenceId,
}: TransactionInfoSectionProps) => {
  return (
    <>
      <Typography color={COLORS.text.secondary} style={styles.sectionLabel}>
        TRANSACTION INFORMATION
      </Typography>
      <View style={styles.infoContent}>
        <InfoRow label="Status" value="Successful" />
        <InfoRow label="Date" value={fullDate} />
        <InfoRow label="Time" value={time} />
        <InfoRow label="Recipient" value={recipientName || "-"} />
        <InfoRow label="Reference ID" value={referenceId || "-"} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionLabel: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: "700",
    fontSize: 12,
  },
  infoContent: {
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
});

export default TransactionInfoSection;
