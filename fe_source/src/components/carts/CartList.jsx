import {View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './cartList.style';
import CartManager from '../../helpers/cartManager';
import CartItem from './CartItem';

const CartList = () => {
  const [data, setData] = useState(null);
  const loadData = async () => {
    const cartList = await CartManager.getCartItems();
    setData(cartList);
  };

  useEffect(() => {
    loadData();
  }, [data]);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <CartItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />      
    </View>
  );
};

export default CartList;
