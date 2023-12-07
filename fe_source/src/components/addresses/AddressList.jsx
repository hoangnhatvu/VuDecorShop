import {View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './addressList.style';
import CartItem from './CartItem';
import { getUserData } from '../../helpers/userDataManager';
import AdressItem from './AddressItem';

const AddressList = () => {
  const [data, setData] = useState(null);
  const loadData = async () => {
    const userData = await getUserData()
    setData(userData.ship_infos);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <AdressItem item={item}/>}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />      
    </View>
  );
};

export default AddressList;
