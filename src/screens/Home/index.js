import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header type={'main'} primaryTitle={'PokeDex'} secondaryTitle={'Bag'} />
      <Image
        source={{
          uri: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
        }}
        style={styles.logo}
      />
      <Gap height={ms(24)} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.background}>
          <Image
            source={{
              uri: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
            }}
            style={styles.pokeImg}
          />
          <Text style={styles.pokeName}>Nama Pokemon</Text>
        </View>
        <View style={styles.background}>
          <Image
            source={{
              uri: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
            }}
            style={styles.pokeImg}
          />
          <Text style={styles.pokeName}>Nama Pokemon</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Button type={'fullButton'} title={'Previous'} />
        <Text>1</Text>
        <Button type={'fullButton'} title={'Next'} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: ms(24),
  },
  logo: {
    height: ms(60),
    resizeMode: 'contain',
  },
  background: {
    width: widthPercentageToDP('40%'),
    borderRadius: ms(4),
    height: ms(40),
    padding: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pokeImg: {
    height: ms(30),
    width: ms(30),
    resizeMode: 'contain',
    marginEnd: ms(8),
  },
  pokeName: {
    fontSize: ms(12),
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
});
