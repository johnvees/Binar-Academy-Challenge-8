import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../utils';
import {ms} from 'react-native-size-matters';

const Button = ({onPress, type, title, primaryTitle, secondaryTitle}) => {
  if (type === 'fullButton') {
    return (
      <TouchableOpacity style={styles.fullButton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  } else if (type === 'textOnly') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.secondaryTitle}>
          {secondaryTitle}{' '}
          <Text style={styles.primaryTitle}>{primaryTitle}</Text>
        </Text>
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
  secondaryTitle: {
    fontSize: ms(14),
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textAlign: 'center',
  },
  primaryTitle: {
    fontSize: ms(14),
    fontFamily: fonts.primary[600],
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
