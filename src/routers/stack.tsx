import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useMMKVString} from 'react-native-mmkv';

import {HomeScreen} from '../screens/home';
import {WeatherScreen} from '../screens/weather';

const {Navigator, Screen} = createStackNavigator<StackParams>();

export type StackParams = {
  home: undefined;
  weatherScreen: undefined;
};

const NavigationStack: React.FC = () => {
  const [routerName, setRouterName] = useState<'home' | 'weatherScreen'>();
  const [localName] = useMMKVString('location');

  useEffect(() => {
    if (typeof localName !== 'undefined') {
      setRouterName('weatherScreen');
    } else {
      setRouterName('home');
    }
  }, []);

  if (typeof localName === 'undefined') {
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="home" component={HomeScreen} />
        <Screen name="weatherScreen" component={WeatherScreen} />
      </Navigator>
    );
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="weatherScreen" component={WeatherScreen} />
    </Navigator>
  );
};

export {NavigationStack};
