import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {Formik} from 'formik';
import * as yup from 'yup';

import {colors, fonts, storeData} from '../../utils';
import {Button, Gap, Header} from '../../components';
import Fire from '../../configs/Fire';

const Register = ({navigation}) => {
  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const postRegister = values => {
    Fire.auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(success => {
        const data = {
          email: values.email,
          fullName: values.fullName,
          uid: success.user.uid,
        };

        Fire.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data);
        console.log('register success: ', success);
        navigation.navigate('FinalRegist', data);
      })
      .catch(error => {
        console.log('error register: ', error);
      });
  };

  const registerValidationSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type={'logo'} />
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{fullName: '', email: '', password: ''}}
          onSubmit={postRegister}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <TextInput
                name="fullName"
                style={styles.textInput}
                placeholder="Full Name Here"
                placeholderTextColor={colors.text.secondary}
                selectionColor={colors.text.tertiary}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
              />
              {errors.fullName && touched.fullName && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.fullName}
                </Text>
              )}
              <Gap height={ms(16)} />
              <TextInput
                name="email"
                style={styles.textInput}
                placeholder="Email Here"
                placeholderTextColor={colors.text.secondary}
                selectionColor={colors.text.tertiary}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
              )}
              <Gap height={ms(16)} />
              <TextInput
                name="password"
                style={styles.textInput}
                placeholder="Password Here"
                placeholderTextColor={colors.text.secondary}
                selectionColor={colors.text.tertiary}
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {errors.password && touched.password && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.password}
                </Text>
              )}
              <Gap height={ms(32)} />
              <Button
                type={'fullButton'}
                title={'Save and Continue'}
                onPress={handleSubmit}
                // () => navigation.navigate('FinalRegist')
              />
            </>
          )}
        </Formik>
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
