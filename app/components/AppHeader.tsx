// @components/AppHeader.js
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from './Typography';
import { useNavigation } from '@react-navigation/native';
import { LeftArrowIcon } from 'app/assets/icons/LeftArrowIcon';
import { COLORS } from "@constants/colors";

const AppHeader = ({ title, showBack = true, rightComponent }: { title: string; showBack?: boolean; rightComponent?: React.ReactNode; }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSlot}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <LeftArrowIcon />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSlot}>
        <Typography variant="body" style={styles.headerTitle}>{title}</Typography>
      </View>

      <View style={styles.rightSlot}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.default,
  },
  leftSlot: { flex: 1, alignItems: 'flex-start' },
  centerSlot: { flex: 2, alignItems: 'center' },
  rightSlot: { flex: 1, alignItems: 'flex-end' },
  headerTitle: { fontWeight: '700', fontSize: 16 },
});

export default AppHeader;
