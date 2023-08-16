import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/auth';
import { LinkProvider } from './context/link';
import ScreensNav from './components/nav/ScreensNav';


const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LinkProvider>
          <ScreensNav />
        </LinkProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;