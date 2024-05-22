import {
  AsteriskIcon,
  CloudRain,
  Droplet,
  Thermometer,
  Wind,
} from 'lucide-react-native';

import {WeatherTypes} from '../../@types/weather';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/fonts';

export const Icon = (type: WeatherTypes) => {
  if (type === 'droplet') {
    return <Droplet size={fontSize.icon} color={colors.icon} />;
  } else if (type === 'rain') {
    return <CloudRain size={fontSize.icon} color={colors.icon} />;
  } else if (type === 'thermometer') {
    return <Thermometer size={fontSize.icon} color={colors.icon} />;
  } else if (type === 'wind') {
    return <Wind size={fontSize.icon} color={colors.icon} />;
  }

  return <AsteriskIcon size={fontSize.icon} color={colors.icon} />;
};
