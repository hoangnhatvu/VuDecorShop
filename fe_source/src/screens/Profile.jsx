import {
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../constants';
import styles from './profile.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {clearUserData, getUserData} from '../helpers/userDataManager';
import {logout} from '../helpers/handleAuthApis';
import {useToastMessage} from '../hook/showToast';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../redux/slices/isLogin.slice';
import {API_URL} from '@env';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const isLogin = useSelector(state => state.isLogin.value);
  const {showToast} = useToastMessage();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const logoutAlert = () => {
    Alert.alert('Đăng xuất tài khoản', 'Bạn có chắc muốn đăng xuất không ?', [
      {
        text: 'Hủy',
        onPress: () => {},
      },
      {
        text: 'Tiếp tục',
        onPress: () => handleLogout(),
      },
    ]);
  };

  const getDataUser = async () => {
    const data = await getUserData();
    if (isLogin && data) {
      setUserData(data);
    } else if (data) {
      dispatch(setIsLogin(true));
    }
  };

  useEffect(() => {
    getDataUser();
  }, [isLogin]);

  const clearCache = () => {
    Alert.alert('Logout', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Continute',
        onPress: () => {},
      },
      {defaultIndex: 1},
    ]);
  };
  handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      showToast('Đăng xuất thành công!', 'success');
      clearUserData();
      dispatch(setIsLogin(false));
    } catch (error) {
      showToast(`${error}`, 'danger');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{width: '100%'}}>
          <Image
            source={require('../../assets/images/coverProfile.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={
              userData?.user_image
                ? {uri: API_URL + userData?.user_image}
                : require('../../assets/images/userDefault.png')
            }
            style={styles.profile}
          />
          <Text style={styles.name}>
            {isLogin === true ? userData?.user_name : 'Vui lòng đăng nhập'}
          </Text>
          {isLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData?.email}</Text>
            </View>
          )}

          {isLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Yêu thích</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Đơn hàng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Giỏ hàng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Delete account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logoutAlert()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" color={COLORS.primary} size={24} />
                  <Text style={styles.menuText}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={80} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default Profile;
