import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const Button = ({tittle, onPress, isValid, loader}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}>
      {loader === false ? (
        <Text style={styles.btnTxt}>{tittle}</Text>
      ) : (
        <ActivityIndicator />
      )}
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
