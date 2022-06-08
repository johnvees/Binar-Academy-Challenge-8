import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../utils';
import {ms} from 'react-native-size-matters';

const Button = ({onPress, type, title, primaryTitle, secondaryTitle}) => {
  if (type === 'fullButton') {
    return (
      <TouchableOpacity style={styles.fullButton}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

export default Button;

const styles = StyleSheet.create({
  fullButton: {
    backgroundColor: colors.button.background,
    borderRadius: ms(8),
    paddingVertical: ms(10),
    paddingHorizontal: ms(24),
  },
  buttonText: {
    fontSize: ms(16),
    fontFamily: fonts.primary[600],
    color: colors.button.text,
    textAlign: 'center',
  },
});
