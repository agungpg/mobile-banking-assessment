import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "@constants/colors";

import Typography from "@components/Typography";
import currencyConverter from "@utils/currencyConverter";
import { Transaction } from "./types";

type TransactionCardProps = {
  data: Transaction;
  onPress?: (id: string) => void;
};

const TransactionCard = ({ data, onPress }: TransactionCardProps) => {
  const { name, recipient, amount } = data;
  const isPositive = amount > 0;
  const amountColor = isPositive ? COLORS.text.success : COLORS.text.primary;
  const formattedAmount = `${isPositive ? '+' : ''}${currencyConverter(amount)}`;

  return (
    <TouchableOpacity onPress={() => onPress?.(data.id)} style={styles.container}>
      <View>
        <Typography style={styles.title}>
          {name}
        </Typography>
        <Typography color={COLORS.text.secondary} variant="caption">
          {recipient}
        </Typography>
      </View>
      <Typography color={amountColor} style={styles.amount}>
        {formattedAmount}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
  },
  title: {
    fontWeight: "700",
  },
  amount: {
    fontWeight: "700",
  },
});

export default memo(TransactionCard);
