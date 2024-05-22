import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/fonts';

const styles = StyleSheet.create({
  weatherItemContainer: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomWidth: 1.5,
    borderColor: colors.border,
  },
  weatherItemCategoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  weatherItemCategoryValue: {
    fontSize: fontSize.input,
    alignItems: 'center',
    color: colors.textGray,
  },
  weatherItemValeu: {
    color: colors.textGray,
    fontSize: fontSize.input,
  },
});

export default styles;
