import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './payment.style';
import {Button, DropdownComponent, Heading, OrderList} from '../components';
import {useRoute} from '@react-navigation/native';
import {formatCurrency} from '../helpers/formatCurrency';
import AddressItem from '../components/addresses/AddressItem';
import {getUserData} from '../helpers/userDataManager';
import {SIZES} from '../../constants';

const Payment = ({navigation}) => {
  const route = useRoute();
  const {total} = route.params;
  const [data, setData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const paymentMethod = [
    {label: 'Thanh toán khi nhận hàng', value: 1},
    {label: 'Thanh toán qua Momo', value: 2},
  ];

  loadData = async () => {
    const userData = await getUserData();
    setData(userData);
    if (userData.ship_infos.length > 0) {
      const defaultAddress = userData.ship_infos.filter(
        item => item.is_default === true,
      )[0];
      console.log();
      setSelectedAddress(defaultAddress);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Heading text="Thanh toán" navigation={navigation} />
      <View style={{marginBottom: SIZES.medium}}>
        <Text style={styles.subText}>Thông tin giao hàng </Text>
        {!selectedAddress ? (
          <View style={styles.addAddressText}>
            <Text>Bạn chưa có địa chỉ, vui lòng thêm địa chỉ </Text>
            <Text>tại đây</Text>
          </View>
        ) : (
          <AddressItem item={selectedAddress} mode="payment" />
        )}
      </View>
      <View style={{marginBottom: SIZES.medium}}>
        <Text style={styles.subText}>Danh sách sản phẩm </Text>
        <OrderList />
      </View>
      <View>
        <Text style={styles.subText}>Phương thức thanh toán</Text>
        <DropdownComponent
          data={paymentMethod}
          onValueChange={(label, value) => {}}
          mode="payment"
          placeholder="Vui lòng chọn phương thức thanh toán"
        />
      </View>
      <View style={styles.checkoutContainer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Tổng tiền:</Text>
          <Text style={styles.totalText}>đ {formatCurrency(total)}</Text>
        </View>
        <Button title="Mua hàng" />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
