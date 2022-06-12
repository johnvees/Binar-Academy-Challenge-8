import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import codePush from 'react-native-code-push';

import Root from './routes';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

const App = () => {
  return <Root />;
};

export default codePush(codePushOptions)(App);

const styles = StyleSheet.create({});
