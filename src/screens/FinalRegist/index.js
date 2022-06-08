import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import {colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';

const FinalRegist = ({navigation}) => {
  const [bio, setBio] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={'backHeader'}
        title={'Upload Photo'}
        onPress={() => navigation.navigate('Register')}
      />
      <Gap height={ms(32)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photoContent}>
          <Image
            source={{
              uri: 'https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png',
            }}
            style={styles.profilePhoto}
          />
        </View>
        <Gap height={ms(24)} />
        <View style={styles.nameContent}>
          <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={2}>
            Tempat Name
          </Text>
          <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
            Tempat Bio
          </Text>
        </View>
        <Gap height={ms(64)} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.textInput}
            placeholder="Bio Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.tertiary}
            secureTextEntry={true}
            value={bio}
            onChangeText={value => {
              setBio(value);
            }}
          />
          <Gap height={ms(16)} />
          <Button type={'fullButton'} title={'Add Photo'} />
        </View>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'fullButton'}
          title={'Upload and Continue'}
        />
        <Gap height={ms(8)} />
        <Button type={'textOnly'} secondaryTitle={'Skip this step'} />
      </View>
    </SafeAreaView>
  );
};

export default FinalRegist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(24),
    backgroundColor: colors.background,
  },
  photoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: ms(150),
    height: ms(150),
    borderRadius: ms(150 / 2),
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
  nameContent: {
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.primary[500],
    color: colors.text.primary,
    fontSize: ms(24),
    textAlign: 'center',
  },
  bio: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(16),
    textAlign: 'center',
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
