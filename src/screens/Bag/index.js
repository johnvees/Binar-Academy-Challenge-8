import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors, fonts, getData} from '../../utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {FlatList} from 'react-native-gesture-handler';
import {Gap, Header} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fire} from '../../configs';

const Bag = () => {
  const [profile, setProfile] = useState([]);
  const [listPokemon, setListPokemon] = useState([]);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      setProfile(data);
    });

    Fire.database()
      .ref(`users/${profile.uid}/bag/`)
      .once('value')
      .then(res => {
        console.log('data lama :', Object.values(res.val()));
        console.log('uid data lama: ', profile.uid);
        if (res.val()) {
          // const oldData = res.val();
          // const nextOldData = Object.keys(oldData).map(key => listUser[key]);
          // console.log('test res val :', oldData, nextOldData);
          setListUser(
            Object.values(res.val()).filter(it => it.uid != profile.uid),
          );
          console.log(
            'tes set list user',
            Object.values(res.val()).filter(it => it.uid != profile.uid),
          );
          // setListUser(console.log(Object.values(res.val())));
        } else {
          // console.log('list user: ', listUser);
        }
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  const myData = Object.keys(listUser).map(key => listUser[key]);
  console.log(myData);

  const cardPokemon = ({item}) => {
    return (
      <View style={styles.background}>
        <Image
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
          }}
          style={styles.pokeImg}
        />
        <Text style={styles.pokeName}>{item.name}</Text>
      </View>
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
        data={myData}
        keyExtractor={(item, index) => index}
        renderItem={cardPokemon}
      />
    </SafeAreaView>
  );
};

export default Bag;

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
