import Button from "@components/Button";
import { COLORS } from "@constants/colors";
import TransactionDetailHero from "@features/transaction-detail/TransactionDetailHero";
import TransactionInfoSection from "@features/transaction-detail/TransactionInfoSection";
import useTransactionStore from "@stores/transactions";
import currencyConverter from "@utils/currencyConverter";
import moment from "moment";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import type { RawTransaction } from "app/types/transaction";
import AppHeader from "@components/AppHeader";

const TransactionDetailScreen = () => {
  const { getSelectedTransaction } = useTransactionStore();
  const transaction = getSelectedTransaction();

  const isIncome = (transaction?.amount ?? 0) > 0;
  const sign = isIncome ? "+" : "-";
  const formattedAmount = `${sign}${currencyConverter(Math.abs(transaction?.amount ?? 0))}`;

  const fullDate = moment(transaction?.transferDate).format("dddd, DD MMMM YYYY");
  const time = moment(transaction?.transferDate).format("hh:mm A");

  const onShare = async (_transaction?: RawTransaction) => {
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Transaction Detail" showBack />
      <TransactionDetailHero
        recipientName={transaction?.recipientName}
        transferName={transaction?.transferName}
        formattedAmount={formattedAmount}
        isIncome={isIncome}
      />
      <TransactionInfoSection
        fullDate={fullDate}
        time={time}
        recipientName={transaction?.recipientName}
        referenceId={transaction?.refId}
      />
      <View style={styles.footer}>
        <Button
          label="Share"
          textColor={COLORS.text.primary}
          textVariant="label"
          style={styles.shareButton}
          onPress={() => onShare(transaction)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.screen,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  shareButton: {
    borderColor: COLORS.border.strong,
    borderWidth: 1.5,
    backgroundColor: COLORS.background.transparent,
    paddingVertical: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(TransactionDetailScreen);
