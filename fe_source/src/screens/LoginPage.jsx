import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackBtn, Button} from '../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './login.style';
import {COLORS} from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
    .required('Đây là trường bắt buộc'),
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Đây là trường bắt buộc'),
});

const LoginPage = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const inValidForm = () => {
    Alert.alert('Invald Form', 'Please provide all required fields', [
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

  const login = async values => {
    setLoader(true);
    try {
      const endpoint = '';
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data)
        await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData))
        const newUser = await AsyncStorage.getItem(`user${responseData._id}`)
        navigation.replace("Bottom Navigation")
      } else {
        Alert.alert('Lỗi đăng nhập', 'Please provide all required fields', [
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
      }
    } catch (error) {
      Alert.alert('Lỗi', `Lỗi ${error}`, [
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
    } finally {
      setLoader(false)
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../../assets/images/bk.png')}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}>
            {({
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Nhập email"
                      onFocus={() => {
                        setFieldTouched('email');
                      }}
                      onBlur={() => {
                        setFieldTouched('email', '');
                      }}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="Nhập mật khảu"
                      onFocus={() => {
                        setFieldTouched('password');
                      }}
                      onBlur={() => {
                        setFieldTouched('password', '');
                      }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}>
                      <MaterialCommunityIcons
                        name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  loader={loader}
                  title={'ĐĂNG NHẬP'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}>
                  Đăng ký
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
