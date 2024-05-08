import {Thermometer, Droplet, Wind, CloudRain} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

type WeatherItemProps = {
  type?: 'thermometer' | 'droplet' | 'wind' | 'rain';
  border?: boolean;
  category: string;
  value: string;
};

const Icon = (type: 'thermometer' | 'droplet' | 'wind' | 'rain') => {
  if (type === 'droplet') {
    return <Droplet size={24} color={colors.icon} />;
  } else if (type === 'rain') {
    return <CloudRain size={24} color={colors.icon} />;
  } else if (type === 'thermometer') {
    return <Thermometer size={24} color={colors.icon} />;
  } else if (type === 'wind') {
    return <Wind size={24} color={colors.icon} />;
  }

  return;
};

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
    fontSize: 18,
    alignItems: 'center',
    color: colors.textGray,
  },
  weatherItemValeu: {
    color: colors.textGray,
    fontSize: 18,
  },
});
