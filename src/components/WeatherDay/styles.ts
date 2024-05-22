import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/fonts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgItem,
    width: width * 0.32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    gap: 5,
    height: '100%',
  },
  tempContainer: {
    flexDirection: 'row',
  },
  day: {
    fontSize: fontSize.day,
    color: colors.textGray,
    fontWeight: '900',
    marginBottom: 10,
  },
  temp: {
    fontSize: fontSize.temp,
    color: colors.textGray,
    fontWeight: '700',
  },
});

export default styles;
