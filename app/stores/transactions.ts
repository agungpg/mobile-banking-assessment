import { TRANSACTION_LIMIT } from '@constants/transactions';
import { TransactionStore, TransactionTypeEnum } from 'app/types/transaction';
import { create } from 'zustand';



const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  selectedId: null,
  filter: { page: 1, limit: TRANSACTION_LIMIT, type: TransactionTypeEnum.ALL },
  
  // Actions
  setFilter: (filter) => set({ filter }),
  setTransactions: (data) => set({ transactions: data }),
  selectTransaction: (id) => set({ selectedId: id }),
  getSelectedTransaction: () => {
    const { transactions, selectedId } = get();
    return transactions.find((tx) => tx.refId === selectedId);
  }
}));

export default useTransactionStore;