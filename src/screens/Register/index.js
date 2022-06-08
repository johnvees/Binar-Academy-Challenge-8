import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import {colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';

const Register = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type={'logo'} />
        <TextInput
          style={styles.textInput}
          placeholder="Full Name Here"
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.tertiary}
          value={fullName}
          onChangeText={value => {
            setFullName(value);
          }}
        />
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
          title={'Save and Continue'}
          onPress={() => navigation.navigate('FinalRegist')}
        />
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'textOnly'}
          secondaryTitle={'Already Have An Account?'}
          primaryTitle={' Login Here'}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {flex: 1, padding: ms(24), backgroundColor: colors.background},
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
