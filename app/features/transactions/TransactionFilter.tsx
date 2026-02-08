import { memo } from "react";
import { StyleSheet, View } from "react-native";

import Tabs from "@components/Tabs";
import { TRANSACTION_FILTER_TABS } from "@constants/transactions";

const TransactionFilter = () => {
  return (
    <View style={styles.container}>
      <Tabs list={TRANSACTION_FILTER_TABS} activeTabIndex={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F9FAFB",
  },
});

export default memo(TransactionFilter);
