import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import axios from 'axios';
import Easing from 'react-native/Libraries/Animated/Easing';

import {BASE_URL, colors, fonts, getData} from '../../utils';
import {Button, Gap, Header} from '../../components';
import {ILFail} from '../../assets/images';
import {Fire} from '../../configs';

const Details = ({navigation, route}) => {
  const [detailPokemon, setDetailPokemon] = useState([]);
  const [species, setSpecies] = useState([]);
  const [profile, setProfile] = useState([]);
  const topValue = useState(new Animated.Value(-100))[0];
  const leftValue = useState(new Animated.Value(-600))[0];
  const opacity = useState(new Animated.Value(1))[0];

  const getDetailsPokemon = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/${route.params.name}`);
      setDetailPokemon(result.data);
      console.log(result.data);
      const resultSpe = await axios.get(`${detailPokemon?.species?.url}`);
      setSpecies(resultSpe.data);
    } catch (error) {
      console.log(error);
    }
  };

  const doCatch = () => {
    const percentage = Math.floor(Math.random() * 101);
    console.log(percentage);
    if (percentage >= 70) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(topValue, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.back(),
      }).start();
      Animated.timing(leftValue, {
        toValue: -800,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.back(),
      }).start();
      dataPokemon = {
        id: detailPokemon.id,
        name: detailPokemon.name,
        height: detailPokemon.height,
        weight: detailPokemon.weight,
        photo: detailPokemon?.sprites?.other?.home?.front_default,
      };
      Fire.database()
        .ref(`users/${profile.uid}/bag/`)
        .push(dataPokemon);
      alert(`Berhasil Menangkap ${detailPokemon.name}`);
      navigation.navigate('Bag');
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(topValue, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.back(),
      }).start();
      Animated.timing(leftValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.back(),
      }).start();
    }
  };

  const getDataUser = () => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      setProfile(data);
    });
  };

  // const getSpeciesPokemon = async () => {
  //   try {
  //     const result = await axios.get(`${detailPokemon?.species?.url}`);
  //     setSpecies(result.data);
  //     console.log(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getDetailsPokemon(), getDataUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={'backHeader'}
        title={'Pokemon Details'}
        onPress={() => navigation.goBack()}
      />
      <Gap height={ms(24)} />
      <View style={{alignItems: 'center'}}>
        <Animated.Image
          source={{
            uri: `${detailPokemon?.sprites?.other?.home?.front_default}`,
          }}
          style={{
            height: ms(100),
            width: ms(100),
            resizeMode: 'cover',
            opacity,
          }}
        />
        <Animated.Image
          source={ILFail}
          style={{
            height: ms(100),
            width: ms(100),
            resizeMode: 'cover',
            marginTop: topValue,
            marginLeft: leftValue,
          }}
        />
        <Gap height={ms(16)} />
        <Text style={styles.pokeName}>{detailPokemon.name}</Text>
      </View>
      <Gap height={ms(16)} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pokeDetailsTitle}>Height</Text>
          <Text style={styles.pokeDetails}>{detailPokemon.height}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pokeDetailsTitle}>Weight</Text>
          <Text style={styles.pokeDetails}>{detailPokemon.weight}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pokeDetailsTitle}>Species</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={species?.egg_groups}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <Text style={styles.pokeDetails}>{item.name} </Text>
            )}
          />
        </View>
      </View>
      <Gap height={ms(16)} />
      <Text style={styles.pokeDetailsTitle}>Type</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={detailPokemon?.types}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <Text style={styles.pokeDetails}>{item.type.name} | </Text>
        )}
      />
      <Gap height={ms(16)} />
      <Text style={styles.pokeDetailsTitle}>Ability</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={detailPokemon?.abilities}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <Text style={styles.pokeDetails}>{item.ability.name} | </Text>
        )}
      />
      <Gap height={ms(16)} />
      <Text style={styles.pokeDetailsTitle}>Moves</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={detailPokemon?.moves}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <Text style={styles.pokeDetails}>{item.move.name} | </Text>
        )}
      />
      <Gap height={ms(32)} />
      <Button type={'fullButton'} title={'Catch'} onPress={doCatch} />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {flex: 1, padding: ms(24), backgroundColor: colors.background},
  pokeImg: opacity => ({
    height: ms(100),
    width: ms(100),
    resizeMode: 'cover',
    opacity,
  }),
  pokeName: {
    color: colors.text.primary,
    fontFamily: fonts.primary[500],
    fontSize: ms(20),
    textTransform: 'capitalize',
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
