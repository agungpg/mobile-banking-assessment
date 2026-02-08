export type Transaction = {
  id: string;
  name: string;
  recipient: string;
  amount: number;
};

export type TransactionSection = {
  title: string;
  data: Transaction[];
};
