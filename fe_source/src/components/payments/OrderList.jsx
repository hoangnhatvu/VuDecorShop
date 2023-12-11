import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './orderList.style';
import OrderItem from './OrderItem';
import {useSelector} from 'react-redux';

const OrderList = () => {
  const listOrderItem = useSelector(state => state.listOrderItem.value);

  return (
    <View>
      <FlatList
        data={listOrderItem}
        renderItem={({item}) => <OrderItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default OrderList;
