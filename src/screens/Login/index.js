import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {Formik} from 'formik';
import * as yup from 'yup';

import {Fire} from '../../configs';
import {Button, Gap, Header} from '../../components';
import {colors, fonts, storeData} from '../../utils';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   useEffect(() => {
     const unsubscribe = Fire.auth().onAuthStateChanged(user => {
       if (user) {
         console.log('user: ', user);
         navigation.replace('Home');
       }
     });
     return () => unsubscribe();
   }, [navigation]);

  const postLogin = values => {
    Fire.auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        console.log('success: ', res);
        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            console.log('data user: ', resDB.val());
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('Home');
            }
          });
      })
      .catch(err => {
        console.log('error: ', err);
        alert(err);
      });
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type={'logo'} />
        <Text style={styles.title}>Welcome Back</Text>
        <Gap height={ms(16)} />
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={postLogin}>
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
                title={'Login'}
                onPress={handleSubmit}
                // () => navigation.replace('Home')
              />
            </>
          )}
        </Formik>
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
