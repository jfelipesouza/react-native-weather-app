import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

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
    fontSize: 30,
    color: colors.textWhite,
  },
  headerSubTitle: {
    fontWeight: '600',
    fontSize: 24,
    color: colors.textGray,
  },
  weatherContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTemp: {
    fontWeight: '700',
    fontSize: 80,
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
