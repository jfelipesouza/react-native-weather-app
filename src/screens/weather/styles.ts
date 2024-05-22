import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/fonts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  content: {
    paddingVertical: 10,
    gap: 40,
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: fontSize.title,
    color: colors.textWhite,
  },
  headerSubTitle: {
    fontWeight: '600',
    fontSize: fontSize.subtitle,
    color: colors.textGray,
  },
  weatherContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTemp: {
    fontWeight: '700',
    fontSize: fontSize.weatherTemp,
    color: colors.textWhite,
  },
  weatherInfo: {
    width: width - 30,
    backgroundColor: colors.bgItem,
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default styles;
