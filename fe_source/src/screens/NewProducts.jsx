import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './newProducts.style';
import {COLORS} from '../../constants';
import { ProductList } from '../components';

const NewProducts = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcon
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>All Products</Text>
        </View>
        <ProductList/>
      </View>
    </SafeAreaView>
  );
};

export default NewProducts;
