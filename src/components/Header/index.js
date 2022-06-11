import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import Gap from '../Gap';
import {colors, fonts} from '../../utils';
import {Fire} from '../../configs';

const Header = ({title, primaryTitle, secondaryTitle, type, onPress, src}) => {
  const navigation = useNavigation();
  const postLogout = () => {
    Fire.auth()
      .signOut()
      .then(res => {
        console.log('logout :', res);
        navigation.replace('Login');
      })
      .catch(err => {
        alert(err);
      });
  };

  if (type === 'logo') {
    return (
      <SafeAreaView>
        <Image
          source={{
            uri: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
          }}
          style={styles.logo}
        />
        <Gap height={ms(32)} />
      </SafeAreaView>
    );
  } else if (type === 'backHeader') {
    return (
      <SafeAreaView style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onPress}>
          <Feather name="chevron-left" size={ms(24)} color={colors.black} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginStart: ms(-24),
          }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </SafeAreaView>
    );
  } else if (type === 'main') {
    return (
      <SafeAreaView style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={postLogout}>
          <Text style={styles.secondaryTitle}>Logout</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginEnd: ms(24),
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.title}>{primaryTitle}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Bag')}>
          <Text style={styles.secondaryTitle}>{secondaryTitle}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    height: ms(100),
    resizeMode: 'contain',
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[500],
    fontSize: ms(24),
  },
  secondaryTitle: {
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(16),
  },
});
