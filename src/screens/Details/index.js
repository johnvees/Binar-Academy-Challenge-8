import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import axios from 'axios';

import {BASE_URL, colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';

const Details = ({navigation, route}) => {
  const [detailPokemon, setDetailPokemon] = useState([]);
  const [species, setSpecies] = useState([]);

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
    getDetailsPokemon();
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
        <Image
          source={{
            uri: `${detailPokemon?.sprites?.other?.home?.front_default}`,
          }}
          style={styles.pokeImg}
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
  },
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
