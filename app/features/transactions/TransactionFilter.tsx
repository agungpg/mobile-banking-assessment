import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "@constants/colors";

import Tabs from "@components/Tabs";
import { TRANSACTION_FILTER_TABS } from "@constants/transactions";

type TransactionFilterProps = {
  onTransactionTypeChange: (tabIndex: number) => void;
  activeTabIndex?: number;
};

const TransactionFilter = ({
  onTransactionTypeChange,
  activeTabIndex = 0,
}: TransactionFilterProps) => {
  return (
    <View style={styles.container}>
      <Tabs
        list={TRANSACTION_FILTER_TABS}
        activeTabIndex={activeTabIndex}
        onTabChange={onTransactionTypeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.background.screen,
  },
});

export default memo(TransactionFilter);
