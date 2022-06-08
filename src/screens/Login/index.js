import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import {Button, Gap, Header} from '../../components';
import {colors, fonts} from '../../utils';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type={'logo'} />
        <Text style={styles.title}>Welcome Back</Text>
        <Gap height={ms(16)} />
        <TextInput
          style={styles.textInput}
          placeholder="Email Here"
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.tertiary}
          value={email}
          onChangeText={value => {
            setEmail(value);
          }}
        />
        <Gap height={ms(16)} />
        <TextInput
          style={styles.textInput}
          placeholder="Password Here"
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.tertiary}
          secureTextEntry={true}
          value={password}
          onChangeText={value => {
            setPassword(value);
          }}
        />
        <Gap height={ms(32)} />
        <Button
          type={'fullButton'}
          title={'Login'}
          onPress={() => navigation.replace('Home')}
        />
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'textOnly'}
          secondaryTitle={"Don't Have an Account Yet?"}
          primaryTitle={' Register Here'}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
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
  title: {
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    fontSize: ms(32),
  },
  textInput: {
    borderRadius: ms(6),
    borderWidth: ms(1),
    borderColor: colors.button.background,
    backgroundColor: colors.background.secondary,
    height: ms(44),
    paddingHorizontal: ms(16),
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(14),
  },
});
