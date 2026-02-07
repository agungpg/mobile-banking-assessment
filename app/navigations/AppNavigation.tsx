import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionListScreen from "../screens/transaction-list";
import TransactionListDetailScreen from "../screens/transaction-list";

export type AppNavigationParams = {
  TransactionList: undefined;
  TransactionDetail: {id:string}
};

export const AppRoutes = {
  TransactionList: "TransactionList",
  TransactionDetail: "TransactionDetail",
} as const;

const Stack = createNativeStackNavigator<AppNavigationParams>();

const AppNavigation = () => (
  <Stack.Navigator initialRouteName={AppRoutes.TransactionList} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AppRoutes.TransactionList} component={TransactionListScreen} />
    <Stack.Screen name={AppRoutes.TransactionDetail} component={TransactionListDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigation;
