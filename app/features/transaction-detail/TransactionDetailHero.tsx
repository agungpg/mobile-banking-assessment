import Typography from "@components/Typography";
import { StyleSheet, View } from "react-native";
import { COLORS } from "@constants/colors";

type TransactionDetailHeroProps = {
  recipientName?: string;
  transferName?: string;
  formattedAmount: string;
  isIncome: boolean;
};

const TransactionDetailHero = ({
  recipientName,
  transferName,
  formattedAmount,
  isIncome,
}: TransactionDetailHeroProps) => {
  return (
    <View style={styles.heroSection}>
      <Typography variant="body" style={styles.merchantLabel}>
        {recipientName}
      </Typography>
      <Typography variant="title" style={styles.transferTitle}>
        {transferName}
      </Typography>
      <Typography
        variant="title"
        style={[styles.amount, isIncome ? styles.amountIncome : styles.amountExpense]}
      >
        {formattedAmount}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: COLORS.background.primary,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.border.subtle,
  },
  merchantLabel: {
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
  },
  transferTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  amount: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 12,
  },
  amountIncome: {
    color: COLORS.text.success,
  },
  amountExpense: {
    color: COLORS.text.primary,
  },
});

export default TransactionDetailHero;
