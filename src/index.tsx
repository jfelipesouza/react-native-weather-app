import React from 'react';
import {StatusBar} from 'react-native';
import {MainNavigation} from './routers';
import {colors} from './theme/colors';
import {BannerComponent} from './components/Banner';

export const MyApp: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.bg} barStyle={'light-content'} />
      <BannerComponent />
      <MainNavigation />
    </>
  );
};
