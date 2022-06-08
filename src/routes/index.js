import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './MainStack';

const Root = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
