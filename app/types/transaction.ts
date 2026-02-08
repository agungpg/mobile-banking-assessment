export type RawTransaction = {
  refId: string;
  amount: number;
  transferDate: string;
  recipientName: string;
  transferName: string;
};

export enum TransactionTypeEnum {
  ALL = "all",
  INCOMING = "incoming",
  OUTGOING = "outgoing",
}

type TransactionFilter = {
  page: number;
  limit: number;
  type?: TransactionTypeEnum;
};

export interface TransactionStore {
  transactions: RawTransaction[];
  selectedId: string | null;
  setTransactions: (data: RawTransaction[]) => void;
  selectTransaction: (id: string) => void;
  getSelectedTransaction: () => RawTransaction | undefined;
  filter: TransactionFilter,
  setFilter: (filter: TransactionFilter) => void;
}