import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import {colors, fonts, ImageNull} from '../../utils';
import {Button, Gap, Header} from '../../components';
import {launchImageLibrary} from 'react-native-image-picker';
import Fire from '../../configs/Fire';

const FinalRegist = ({navigation, route}) => {
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(ImageNull);

  const {fullName, uid} = route.params;
  const [photoForDB, setPhotoForDB] = useState(ImageNull);

  const getImage = () => {
    launchImageLibrary({includeBase64: true, quality: 0.5}, response => {
      console.log('response :', response);
      if (response.didCancel === true || response.error === true) {
        alert('Failed To Choos Photo');
      } else {
        // const source = {uri: };
        setPhotoForDB(
          `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
        );

        setPhoto(response.assets[0].uri);
      }
    });
  };

  const uploadAndContinue = () => {
    Fire.database()
      .ref('users/' + uid + '/')
      .update({avatar: photoForDB, bio: bio});

    const data = route.params;
    data.avatar = photoForDB;
    data.bio = bio;
    console.log(data);

    navigation.replace('Home');
  };

  const BioValue = () => {
    if (bio.length > 1) {
      return (
        <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
          {bio}
        </Text>
      );
    } else {
      return (
        <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
          This Gonna Be Your Bio
        </Text>
      );
    }
  };

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
          <Image source={{uri: photo}} style={styles.profilePhoto} />
        </View>

        <Gap height={ms(24)} />
        <View style={styles.nameContent}>
          <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={2}>
            {fullName}
          </Text>
          <BioValue ellipsizeMode={'tail'} numberOfLines={2} />
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
          <Button type={'fullButton'} title={'Add Photo'} onPress={getImage} />
        </View>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'fullButton'}
          title={'Upload and Continue'}
          onPress={uploadAndContinue}
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
