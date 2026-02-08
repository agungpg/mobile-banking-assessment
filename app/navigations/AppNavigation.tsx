import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionsScreen from "@screens/transactions";
import TransactionListDetailScreen from "@screens/transaction-detail";

export type AppNavigationParams = {
  Transactions: undefined;
  TransactionDetail: undefined;
};

export const AppRoutes = {
  Transactions: "Transactions",
  TransactionDetail: "TransactionDetail",
} as const;

const Stack = createNativeStackNavigator<AppNavigationParams>();

const AppNavigation = () => (
  <Stack.Navigator initialRouteName={AppRoutes.Transactions} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AppRoutes.Transactions} component={TransactionsScreen} />
    <Stack.Screen name={AppRoutes.TransactionDetail} component={TransactionListDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigation;
