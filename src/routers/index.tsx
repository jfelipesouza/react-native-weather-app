import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {NavigationStack} from './stack';

export const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};
