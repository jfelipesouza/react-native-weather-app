import React from 'react';
import {View, Text} from 'react-native';

import {WeatherDayProps} from '../../@types/weather';
import styles from './styles';

export const WeatherDay: React.FC<WeatherDayProps> = ({
  day,
  maxTemp,
  minTemp,
}) => {
  return (
    <View style={styles.container}>
      <Text maxFontSizeMultiplier={1.1} style={styles.day}>
        {day}
      </Text>
      <Text maxFontSizeMultiplier={1.1} style={styles.temp}>
        Min: {minTemp}°C
      </Text>
      <Text maxFontSizeMultiplier={1.1} style={styles.temp}>
        Max: {maxTemp}°C
      </Text>
    </View>
  );
};
