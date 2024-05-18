import {
  AsteriskIcon,
  CloudRain,
  Droplet,
  Thermometer,
  Wind,
} from 'lucide-react-native';

import {WeatherTypes} from '../../@types/weather';
import {colors} from '../../theme/colors';

export const Icon = (type: WeatherTypes) => {
  if (type === 'droplet') {
    return <Droplet size={24} color={colors.icon} />;
  } else if (type === 'rain') {
    return <CloudRain size={24} color={colors.icon} />;
  } else if (type === 'thermometer') {
    return <Thermometer size={24} color={colors.icon} />;
  } else if (type === 'wind') {
    return <Wind size={24} color={colors.icon} />;
  }

  return <AsteriskIcon size={24} color={colors.icon} />;
};
