import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './productCardView.style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", {item})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn.pocket-lint.com/r/s/970x/assets/images/161530-speakers-review-marshall-emberton-ii-review-image1-kfy6a3wegn.jpg',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.product_name}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
          {item.category.category_name}
          </Text>
          <Text style={styles.price}>đ{item.pice}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
<IonIcon name='add-circle' size={35} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;