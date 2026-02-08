import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";

import Typography from "@components/Typography";
import { TRANSACTION_LIST } from "@constants/transactions";
import TransactionFilter from "@features/transactions/TransactionFilter";
import TransactionList from "@features/transactions/TransactionList";
import { Transaction } from "@features/transactions/types";

type TransactionSection = {
  title: string;
  data: Transaction[];
};

type RawTransaction = (typeof TRANSACTION_LIST)[number];

const DATE_FORMAT = "D MMM YYYY";

const mapTransaction = (transaction: RawTransaction): Transaction => {
  return {
    id: transaction.refId,
    name: transaction.transferName,
    recipient: transaction.recipientName,
    amount: transaction.amount,
  };
};

const getSectionTitle = (transferDate: string) => {
  return moment(transferDate).format(DATE_FORMAT);
};

const TransactionListScreen = () => {
  const hydratedData = useMemo(() => {
    return TRANSACTION_LIST.reduce<TransactionSection[]>((sections, transaction) => {
      const sectionTitle = getSectionTitle(transaction.transferDate);
      const mappedTransaction = mapTransaction(transaction);
      const existingSection = sections.find((section) => section.title === sectionTitle);

      if (existingSection) {
        existingSection.data.push(mappedTransaction);
        return sections;
      }

      sections.push({
        title: sectionTitle,
        data: [mappedTransaction],
      });

      return sections;
    }, []);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="title">Transactions</Typography>
        <TransactionFilter />
      </View>
      <TransactionList data={hydratedData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingVertical: 16,
  },
});

export default memo(TransactionListScreen);
