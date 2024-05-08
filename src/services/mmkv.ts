import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'WeatherApp',
  path: `/storage`,
});
