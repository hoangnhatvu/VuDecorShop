import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './cart.style';
import {COLORS, SIZES} from '../../constants';
import {CartList} from '../components';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {setIsCheckAll} from '../redux/slices/isCheckAll.slice';
import { setCartNumber } from '../redux/slices/cartNumber.slice';
import CartManager from '../helpers/cartManager';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const isCheckAll = useSelector(state => state.isCheckAll.value);
  const listOrderItem = useSelector(state => state.listOrderItem.value);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (listOrderItem) {
      setTotal(
        listOrderItem.reduce(
          (orderTotal, item) => orderTotal + item.price * item.quantity,
          0,
        ),
      );
    }
  }, [listOrderItem]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            dispatch(setIsCheckAll(false));
          }}>
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
              value={isCheckAll}
              onValueChange={newValue => dispatch(setIsCheckAll(newValue))}
            />
            <Text>Chọn tất cả</Text>
          </View>
          <View style={styles.checkBoxWrapper}>
            <Text style={styles.totalText}>Tổng tiền:</Text>
            <Text style={styles.totalText}>đ {total}</Text>
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
