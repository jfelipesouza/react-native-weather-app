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

export type StackRouters = 'home' | 'weatherScreen';

const NavigationStack: React.FC = () => {
  const [localName] = useMMKVString('location');

  if (typeof localName === 'undefined') {
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="home" component={HomeScreen} />
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
