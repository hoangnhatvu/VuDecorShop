import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const Button = ({tittle, onPress, isValid}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}>
      <Text style={styles.btnTxt}>{tittle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: backgroundColor => ({
    height: 50,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  }),
});
