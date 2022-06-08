import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';

const Details = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header type={'backHeader'} title={'Pokemon Details'} />
      <Gap height={ms(24)} />
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
          }}
          style={styles.pokeImg}
        />
        <Gap height={ms(16)} />
        <Text style={styles.pokeName}>Pokemon Name</Text>
      </View>
      <Gap height={ms(16)} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pokeDetailsTitle}>Height</Text>
          <Text style={styles.pokeDetails}>8</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pokeDetailsTitle}>Weight</Text>
          <Text style={styles.pokeDetails}>13</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pokeDetailsTitle}>Species</Text>
          <Text style={styles.pokeDetails}>Flying</Text>
        </View>
      </View>
      <Gap height={ms(16)} />
      <Text style={styles.pokeDetailsTitle}>Type</Text>
      <Text style={styles.pokeDetails}>Normal, flying</Text>
      <Gap height={ms(16)} />
      <Text style={styles.pokeDetailsTitle}>Ability</Text>
      <Text style={styles.pokeDetails}>13</Text>
      <Gap height={ms(16)} />
      <Text style={styles.pokeDetailsTitle}>Moves</Text>
      <Text style={styles.pokeDetails}>Flying</Text>
      <Gap height={ms(32)} />
      <Button type={'fullButton'} title={'Catch'} />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {flex: 1, padding: ms(24), backgroundColor: colors.background},
  pokeImg: {
    height: ms(100),
    width: ms(100),
    resizeMode: 'cover',
    backgroundColor: 'red',
  },
  pokeName: {
    color: colors.text.primary,
    fontFamily: fonts.primary[500],
    fontSize: ms(20),
  },
  pokeDetailsTitle: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: ms(18),
    marginBottom: ms(8),
  },
  pokeDetails: {
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(16),
  },
});
