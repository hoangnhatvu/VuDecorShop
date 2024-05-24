import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './design.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const Design = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Design</Text>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate('ARDesignView')}>
        <Ionicons name="cube" size={52} color={COLORS.primary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Design;
