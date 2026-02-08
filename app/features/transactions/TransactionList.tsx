import { memo, useCallback } from "react";
import {
  SectionList,
  SectionListRenderItem,
  SectionListData,
  StyleSheet,
  View,
} from "react-native";

import Typography from "@components/Typography";
import { Transaction, TransactionSection } from "./types";
import TransactionCard from "./TransactionCard";

type TransactionListProps = {
  data: TransactionSection[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
};

const TransactionList = ({ data, isLoading = false, onLoadMore, onRefresh }: TransactionListProps) => {
  const renderItem: SectionListRenderItem<Transaction, TransactionSection> =
    useCallback(({ item }) => {
      return <TransactionCard key={item.id} data={item} />;
    }, []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<Transaction, TransactionSection> }) => {
      return (
        <View style={styles.sectionHeaderContainer}>
          <Typography variant="body" style={styles.sectionHeaderText}>
            {section.title}
          </Typography>
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <SectionList
        onEndReached={onLoadMore}
        onRefresh={onRefresh}
        refreshing={isLoading}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.contentContainer}
        sections={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  contentContainer: {
    gap: 8,
  },
  sectionHeaderContainer: {
    backgroundColor: "#F8F9FB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});

export default memo(TransactionList);
