import AppHeader from "@components/AppHeader";
import Button from "@components/Button";
import { COLORS } from "@constants/colors";
import TransactionDetailHero from "@features/transaction-detail/TransactionDetailHero";
import TransactionInfoSection from "@features/transaction-detail/TransactionInfoSection";
import useTransactionStore from "@stores/transactions";
import currencyConverter from "@utils/currencyConverter";
import moment from "moment";
import { memo, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";

const FULL_DATE_FORMAT = "dddd, DD MMMM YYYY";
const TIME_FORMAT = "hh:mm A";
const SHARE_OPTIONS = {
  title: "Share Transaction Receipt",
  type: "image/png",
  failOnCancel: false,
} as const;

const TransactionDetailScreen = () => {
  const { getSelectedTransaction } = useTransactionStore();
  const transaction = getSelectedTransaction();
  const shotRef = useRef<ViewShot>(null);

  const amount = transaction?.amount ?? 0;
  const isIncome = amount > 0;
  const sign = isIncome ? "+" : "-";
  const formattedAmount = `${sign}${currencyConverter(Math.abs(amount))}`;
  const fullDate = moment(transaction?.transferDate).format(FULL_DATE_FORMAT);
  const time = moment(transaction?.transferDate).format(TIME_FORMAT);
  const receiptFileName = `transaction-receipt-${transaction?.refId ?? "detail"}-`;

  const captureAndShare = useCallback(async () => {
    try {
      if (!shotRef.current?.capture) {
        console.error("ViewShot reference is null");
        return;
      }
      const uri = await shotRef.current.capture();
      await Share.open({
        ...SHARE_OPTIONS,
        filename: receiptFileName,
        url: uri,
      });
    } catch (error) {
      console.error("Capture or Share failed:", error);
    }
  }, [receiptFileName]);

  return (
    <View style={styles.container}>
      <AppHeader title="Transaction Detail" showBack />
      <ViewShot
        ref={shotRef}
        options={{ fileName: receiptFileName, format: "jpg", quality: 0.9 }}
        style={styles.captureArea}
      >
        <TransactionDetailHero
          recipientName={transaction?.recipientName}
          transferName={transaction?.transferName}
          formattedAmount={formattedAmount}
          isIncome={isIncome}
        />
        <TransactionInfoSection
          fullDate={fullDate}
          time={time}
          recipientName={transaction?.recipientName}
          referenceId={transaction?.refId}
        />
      </ViewShot>
      <View style={styles.footer}>
        <Button
          label="Share"
          textColor={COLORS.text.primary}
          textVariant="label"
          style={styles.shareButton}
          onPress={captureAndShare}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.screen,
  },
  captureArea: {
    backgroundColor: COLORS.background.screen,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  shareButton: {
    borderColor: COLORS.border.strong,
    borderWidth: 1.5,
    backgroundColor: COLORS.background.transparent,
    paddingVertical: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(TransactionDetailScreen);
