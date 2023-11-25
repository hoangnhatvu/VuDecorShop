import {View, Text, TouchableOpacity, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import styles from './cartItem.style';
import {API_URL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {COLORS} from '../../../constants';
const CartItem = ({item}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.checkBox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
        </View>
        <View style={styles.image}>
          <Image
            source={
              item.image
                ? {uri: API_URL + item?.image}
                : require('../../../assets/images/no_image.png')
            }
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productTitle}>{item?.productName}</Text>
          <Text style={styles.category}>{item?.categoryName}</Text>
          <Text style={styles.category}>{item?.price}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity >
            <Ionicons name="trash-outline" size={24} color={COLORS.req} />
          </TouchableOpacity>
          <View style={styles.quantityAction}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item?.quantity}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
