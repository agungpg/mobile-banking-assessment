import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";

import Typography from "@components/Typography";
import { TITLE_DATE_FORMAT, TRANSACTION_FILTER_TABS } from "@constants/transactions";
import TransactionFilter from "@features/transactions/TransactionFilter";
import TransactionList from "@features/transactions/TransactionList";
import type { Transaction, TransactionSection } from "@features/transactions/types";
import useTransactions from "@services/transactions/useTransactions";
import { RawTransaction, TransactionTypeEnum } from "app/types/transaction";


const mapTransaction = (transaction: RawTransaction): Transaction => {
  return {
    id: transaction.refId,
    name: transaction.transferName,
    recipient: transaction.recipientName,
    amount: transaction.amount,
  };
};

const getSectionTitle = (transferDate: string) => {
  const date = moment(transferDate);
  const formattedDate = date.format(TITLE_DATE_FORMAT);
  const now = moment();

  if (date.isSame(now, "day")) {
    return `Today`;
  }

  if (date.isSame(now.clone().subtract(1, "day"), "day")) {
    return `Yesterday`;
  }

  return formattedDate;
};

const getHydratedData = (transactions: RawTransaction[]) => {
  return transactions.reduce<TransactionSection[]>((sections, transaction) => {
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
};

const getTransactionTypeIndex = (type: string) => {
  return TRANSACTION_FILTER_TABS.findIndex((tab) => tab.id === type);
};

const TransactionListScreen = () => {
  const {
    data,
    isLoading,
    onRefresh,
    onLoadMore,
    changeTransactionType,
    filterType,
  } = useTransactions();

  const hydratedData = useMemo(() => {
    return getHydratedData(data);
  }, [data]);

  const onTransactionTypeChange = useCallback((tabIdx: number) => {
    const selectedType = TRANSACTION_FILTER_TABS[tabIdx]?.id;
    if (selectedType) {
      changeTransactionType(selectedType);
    }
  }, [changeTransactionType]);

  const activeTabIndex = useMemo(() => {
    return getTransactionTypeIndex(filterType || TransactionTypeEnum.ALL);
  }, [filterType]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="title">Transactions</Typography>
        <TransactionFilter activeTabIndex={activeTabIndex} onTransactionTypeChange={onTransactionTypeChange} />
      </View>
      <TransactionList isLoading={isLoading} onLoadMore={onLoadMore} onRefresh={onRefresh} data={hydratedData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    flex: 1 
  },
  header: {
    paddingVertical: 16,
  },
});

export default memo(TransactionListScreen);
