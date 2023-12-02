import {TouchableOpacity, Text, View, StatusBar, Image, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';
import {useState, useEffect} from 'react';
import styles from './profile.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel", onPress: () => {}
        },
        {
          text: "Continute", onPress: () => {}
        },
      ]
    )
  }
  const clearCache = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel", onPress: () => {}
        },
        {
          text: "Continute", onPress: () => {}
        },
        {defaultIndex: 1}
      ]
    )
  }
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
            source={require('../../assets/images/userDefault.png')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true ? 'Vũ' : 'Vui lòng đăng nhập'}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>vu@gmaul.com</Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Cart</Text>
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
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="logout"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
