import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import {Button, Header} from '../../components';
import {colors} from '../../utils';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={'logo'}
        src={
          'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png'
        }
      />
      <Text>Login</Text>
      <Button type={'fullButton'} title={'Login'} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(24),
    backgroundColor: colors.background,
  },
});
