import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import styles from './addressList.style';
import AddressItem from './AddressItem';

const AddressList = ({data}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <View>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <AddressItem
            item={item}
            selected={selectedItem === item}
            onSelect={handleSelectItem}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default AddressList;
