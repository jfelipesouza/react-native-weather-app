import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 25,
    color: colors.textWhite,
    alignSelf: 'flex-start',
  },
  input: {
    color: colors.textWhite,
    backgroundColor: colors.bgItem,
    width: Dimensions.get('screen').width * 0.8,
    paddingHorizontal: 10,
    fontSize: 18,
    paddingVertical: 20,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
  },
});

export default styles;
