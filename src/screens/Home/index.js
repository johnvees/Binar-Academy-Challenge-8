import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {BASE_URL, colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const navigation = useNavigation();

  const getListPokemon = async () => {
    try {
      setPokemon('');
      const result = await axios.get(`${BASE_URL}`);
      setPokemon(result.data.results);
      // const getURL = result.data.results.map(name => {
      //   return name.name;
      // });
      // console.log(getURL);
      // const hasil2 = await axios.get(`${BASE_URL}/pokemon/${getURL.map}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListPokemon();
  }, []);

  console.log(pokemon);

  const cardPokemon = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Details',
            {name: `${item.name}`},
            console.log(item.name),
          )
        }>
        <View style={styles.background}>
          <Image
            source={{
              uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
            }}
            style={styles.pokeImg}
          />
          <Text style={styles.pokeName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={pokemon}
        keyExtractor={(item, index) => index}
        renderItem={cardPokemon}
      />

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
    marginBottom: ms(16),
    marginEnd: ms(16),
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
    textTransform: 'capitalize',
  },
});
