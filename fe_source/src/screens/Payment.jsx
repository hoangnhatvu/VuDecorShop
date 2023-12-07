import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './payment.style';
import {COLORS} from '../../constants';
import {Button, OrderList} from '../components';
import { useRoute } from '@react-navigation/native';

const Payment = ({navigation}) => {
  const route = useRoute();
  const {total} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <IonIcon
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Thanh toán</Text>
      </View>
      <OrderList />
      <View style={styles.checkoutContainer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Tổng tiền:</Text>
          <Text style={styles.totalText}>đ {total}</Text>
        </View>
        <Button title="Mua hàng" />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
