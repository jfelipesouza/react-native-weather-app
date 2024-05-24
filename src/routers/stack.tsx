import React from 'react';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';

import {StackParams} from '../@types/screens';
import {HomeScreen} from '../screens/home';
import {WeatherScreen} from '../screens/weather';
import {useMMKVString} from 'react-native-mmkv';
import {TOKENS} from '../services/tokens';
import {SearchScreen} from '../screens/search';

const {Navigator, Screen} = createStackNavigator<StackParams>();

const configScreen: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.BottomSheetSlideInSpec,
    close: TransitionSpecs.BottomSheetSlideOutSpec,
  },
};

const NavigationStack: React.FC = () => {
  const [locationName] = useMMKVString(TOKENS.LOCATION_NAME);

  if (typeof locationName === 'undefined' || locationName.trim() === '') {
    return (
      <Navigator screenOptions={configScreen}>
        <Screen name="home" component={HomeScreen} />
      </Navigator>
    );
  }
  return (
    <Navigator screenOptions={configScreen} initialRouteName="weatherScreen">
      <Screen name="weatherScreen" component={WeatherScreen} />
      <Screen name="searchScreen" component={SearchScreen} />
    </Navigator>
  );
};

export {NavigationStack};
