import React from 'react';
import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

const {width} = Dimensions.get('window');

type WeatherDayProps = {
  day: string;
  minTemp: number;
  maxTemp: number;
};
export const WeatherDay: React.FC<WeatherDayProps> = ({
  day,
  maxTemp,
  minTemp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.temp}>Min: {minTemp}°C</Text>
      <Text style={styles.temp}>Max: {maxTemp}°C</Text>
    </View>
  );
};

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
    fontSize: 22,
    color: colors.textGray,
    fontWeight: '900',
    marginBottom: 10,
  },
  temp: {fontSize: 16, color: colors.textGray, fontWeight: '700'},
});
