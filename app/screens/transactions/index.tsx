import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";

import Typography from "@components/Typography";
import { COLORS } from "@constants/colors";
import { TITLE_DATE_FORMAT, TRANSACTION_FILTER_TABS } from "@constants/transactions";
import TransactionFilter from "@features/transactions/TransactionFilter";
import TransactionList from "@features/transactions/TransactionList";
import type { Transaction, TransactionSection } from "@features/transactions/types";
import useTransactions from "@services/transactions/useTransactions";
import { RawTransaction, TransactionTypeEnum } from "app/types/transaction";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { AppRoutes } from "@navigations/AppNavigation";
import  { AppNavigationParams } from "@navigations/AppNavigation";
import useTransactionStore from "@stores/transactions";


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
  const { selectTransaction } = useTransactionStore();
  const {navigate} = useNavigation<NavigationProp<AppNavigationParams>>();

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

  const onTransactionPress = useCallback((transactionId: string) => {
    // Navigate to the transaction details screen
    selectTransaction(transactionId);
    navigate(AppRoutes.TransactionDetail);
  }, [navigate, selectTransaction]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="title">Transactions</Typography>
        <TransactionFilter activeTabIndex={activeTabIndex} onTransactionTypeChange={onTransactionTypeChange} />
      </View>
      <TransactionList isLoading={isLoading} onLoadMore={onLoadMore} onRefresh={onRefresh} data={hydratedData} onTransactionPress={onTransactionPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: COLORS.background.screen,
    flex: 1,
    paddingTop: 24,
  },
  header: {
    paddingBottom: 4,
    gap: 4,
  },
});

export default memo(TransactionListScreen);
