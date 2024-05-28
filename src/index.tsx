import React from 'react';
import {StatusBar, View} from 'react-native';
import {MainNavigation} from './routers';
import {colors} from './theme/colors';
import {BannerComponent} from './components/Banner';

export const MyApp: React.FC = () => {
  return (
    <View style={{backgroundColor: colors.bg, flex: 1}}>
      <StatusBar backgroundColor={colors.bg} barStyle={'light-content'} />
      <BannerComponent />
      <MainNavigation />
    </View>
  );
};
