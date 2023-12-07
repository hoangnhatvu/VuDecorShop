import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './address.style';
import {AddressList, Button, Heading, OrderList} from '../components';
import {useRoute} from '@react-navigation/native';

const Address = ({navigation}) => {
  const route = useRoute();
  const {total} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Heading
        navigation={navigation}
        text="Sổ địa chỉ"
        handleBack={() => {}}
      />
      <AddressList />
      <View style={styles.checkoutContainer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Tổng tiền:</Text>
          <Text style={styles.totalText}>đ {total}</Text>
        </View>
        <Button title="Thêm địa chỉ" loader={false} />
      </View>
    </SafeAreaView>
  );
};

export default Address;
