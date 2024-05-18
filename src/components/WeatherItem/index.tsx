import React from 'react';
import {Text, View} from 'react-native';

import {WeatherItemProps} from '../../@types/weather';
import {Icon} from './icon';
import styles from './styles';

export const WeatherItem: React.FC<WeatherItemProps> = ({
  type,
  category,
  value,
  border,
}) => {
  return (
    <View style={[styles.weatherItemContainer, border && styles.border]}>
      <View style={styles.weatherItemCategoryContainer}>
        {type && Icon(type)}
        <Text style={styles.weatherItemCategoryValue}>{category}</Text>
      </View>
      <Text style={styles.weatherItemValeu}>{value}</Text>
    </View>
  );
};
