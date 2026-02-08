import { TRANSACTION_LIMIT, TRANSACTION_LIST } from "@constants/transactions";
import useTransactionStore from "@stores/transactions";
import { TransactionTypeEnum } from "app/types/transaction";
import { useCallback, useEffect, useRef, useState } from "react";

const getFilteredTransactions = (type?: TransactionTypeEnum) => {
  if (!type || type === TransactionTypeEnum.ALL) {
    return TRANSACTION_LIST;
  }

  return TRANSACTION_LIST.filter((tx) =>
    type === TransactionTypeEnum.INCOMING ? tx.amount > 0 : tx.amount < 0
  );
};

const useTransactions = () => {
  const { transactions, filter, setFilter, setTransactions } = useTransactionStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isHasMore, setIsHasMore] = useState(true);
  const requestIdRef = useRef(0);

  const fetchTransactions = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    // add delay to simulate loading
    setError(null);
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 2000));

      if (requestId !== requestIdRef.current) {
        return;
      }

      const { page, limit, type } = filter;
      const start = (page - 1) * limit;
      const end = start + limit;
      const filteredList = getFilteredTransactions(type);
      const paginatedData = filteredList.slice(start, end);
      const currentTransactions = page === 1 ? [] : useTransactionStore.getState().transactions;

      setTransactions(paginatedData.length > 0 ? [...currentTransactions, ...paginatedData] : currentTransactions);
      setIsHasMore(end < filteredList.length);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch transactions"));
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [filter, setTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const onRefresh = useCallback(() => {
    const currentFilter = useTransactionStore.getState().filter;
    setTransactions([]);
    setIsHasMore(true);
    setFilter({
      page: 1,
      limit: TRANSACTION_LIMIT,
      type: currentFilter.type,
    });
  }, [setFilter, setTransactions]);

  const onLoadMore = useCallback(() => {
    if (isHasMore && !isLoading) {
      const currentFilter = useTransactionStore.getState().filter;
      setFilter({ ...currentFilter, page: currentFilter.page + 1 });
    }
  }, [isHasMore, isLoading, setFilter]);

  const changeTransactionType = useCallback((type: TransactionTypeEnum) => {
    setTransactions([]);
    setIsHasMore(true);
    setFilter({ page: 1, limit: TRANSACTION_LIMIT, type });
  }, [setFilter, setTransactions]);

  return {
    data: transactions,
    filterType: filter.type,
    isLoading,
    error,
    isHasMore,
    onRefresh,
    onLoadMore,
    changeTransactionType,
  };
}

export default useTransactions
