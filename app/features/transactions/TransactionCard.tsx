import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Typography from "@components/Typography";
import currencyConverter from "@utils/currencyConverter";
import { Transaction } from "./types";

type TransactionCardProps = {
  data: Transaction;
};

const POSITIVE_AMOUNT_COLOR = "#10B981";
const NEGATIVE_AMOUNT_COLOR = "#111827";
const RECIPIPIENT_COLOR = "#6B7280";  

const TransactionCard = ({ data }: TransactionCardProps) => {
  const { name, recipient, amount } = data;
  const isPositive = amount > 0;
  const amountColor = isPositive ? POSITIVE_AMOUNT_COLOR : NEGATIVE_AMOUNT_COLOR;
  const formattedAmount = `${isPositive ? '+' : ''}${currencyConverter(amount)}`;

  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Typography style={styles.title}>
          {name}
        </Typography>
        <Typography color={RECIPIPIENT_COLOR} variant="caption">
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
    backgroundColor: "#ffff",
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
