import {TouchableOpacity, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, SIZES} from '../../constants';
import styles from './productDetail.style';
import {useRoute} from '@react-navigation/native';
import CartManager from '../helpers/cartManager';
import {API_URL} from '@env';
import {formatCurrency} from '../helpers/formatCurrency';
import {OptionsList} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {setOptionProduct} from '../redux/slices/optionProduct.slice';
import {useToastMessage} from '../hook/showToast';

const ProductDetail = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const {showToast} = useToastMessage();
  const optionProduct = useSelector(state => state.optionProduct.value);
  const dispatch = useDispatch();

  const warning = () => {
    Alert.alert(
      'Bạn chưa chọn thuộc tính sản phẩm !',
      'Vui lòng chọn thuộc tính cho sản phẩm',
      [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ],
    );
  };

  useEffect(() => {
    setCount(1);
    setPrice(
      optionProduct
        ? formatCurrency(optionProduct.price)
        : formatCurrency(item.options[0].price) +
            ' - đ ' +
            formatCurrency(item.options[item.options.length - 1].price),
    );
    setUrlImage(
      optionProduct ? optionProduct.option_image : item.product_image,
    );
  }, [optionProduct]);

  const increment = () => {
    if (item.options.length === 1) {
      dispatch(setOptionProduct(item.options[0]));
    }
    if (!optionProduct) {
      warning();
    } else {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const addCartHandle = async product => {
    if (item.options.length === 1) {
      dispatch(setOptionProduct(item.options[0]));
    }
    if (!optionProduct) {
      warning();
    } else {
      try {
        await CartManager.addToCart(product, count, optionProduct);
        showToast('Đã thêm sản phẩm vào giỏ hàng !', 'success');
      } catch (error) {
        showToast(`${error}`, 'danger');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <IonIcon name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: API_URL + urlImage,
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.product_name}</Text>
        </View>

        <View style={styles.priceWrapperRow}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>đ {price}</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <OptionsList options={item.options} />

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map(index => (
              <IonIcon key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <Text>Đã bán: {item.order_number}</Text>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Mô tả sản phẩm</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
        <View style={{marginBottom: SIZES.xLarge + 12}}>
          <View style={styles.location}>
            <View style={{flexDirection: 'row'}}>
              <IonIcon name="location-outline" size={20} />
              <Text>HCM</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text style={{paddingLeft: 5}}>Free Ship</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>Mua Ngay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addCartHandle(item)}
            style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
