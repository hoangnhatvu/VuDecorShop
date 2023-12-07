import {View, Text, TouchableOpacity, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import styles from './addressItem.style';
import {API_URL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {RadioButton} from 'react-native-paper';

import {COLORS} from '../../../constants';

const AdressItem = ({item, loadData}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.radioButton}>
          <RadioButton />
        </View>

        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productTitle}>
            fdsfds
          </Text>
          <Text style={styles.option}>sdfsd</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="trash-outline" size={24} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdressItem;
