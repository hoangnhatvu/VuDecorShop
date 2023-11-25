import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './cart.style';
import {COLORS, SIZES} from '../../constants';
import {CartList} from '../components';
import CheckBox from '@react-native-community/checkbox';

const Cart = ({navigation}) => {
  const [checkAll, setCheckAll] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Giỏ hàng</Text>
      </View>
      <CartList />
      <View style={styles.checkoutContainer}>
        <View style={styles.total}>
          <View style={styles.checkBoxWrapper}>
            <CheckBox
              disabled={false}
              value={checkAll}
              onValueChange={newValue => setCheckAll(newValue)}
            />
            <Text>Chọn tất cả</Text>
          </View>
          <View style={styles.checkBoxWrapper}>
            <Text style={styles.totalText}>Tổng tiền:</Text>
            <Text style={styles.totalText}>đ 234324</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonCheckout}>
            <Text style={styles.textCheckout}>Mua Hàng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
