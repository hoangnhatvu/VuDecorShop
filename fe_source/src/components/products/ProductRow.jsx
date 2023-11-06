import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../apis/productApi';

const ProductRow = () => {
  const {data, isLoading, error} = useFetch();
  const products = [1, 2, 3, 4];
  return (
    <View style={{marginTop: SIZES.small, marginHorizontal: 12}}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          renderItem={({item}) => <ProductCardView item = {item}/>}
          horizontal
          contentContainerStyle={{columnGap: 4}}
        />
      )}
    </View>
  );
};

export default ProductRow;
