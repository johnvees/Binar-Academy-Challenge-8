import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import Gap from '../Gap';

const Header = ({title, type, onPress, src}) => {
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
  }
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    height: ms(100),
    resizeMode: 'contain',
  },
});
