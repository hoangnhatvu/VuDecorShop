import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  NativeModules,
  NativeEventEmitter,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from '../../components';
const axios = require('axios').default; // npm install axios
import CryptoJS from 'crypto-js';
import {Linking} from 'react-native';

const {PayZaloBridge} = NativeModules;

export default function TestZaloPay() {
  const [money, setMoney] = React.useState('10000');
  const [token, setToken] = React.useState('');
  const [returncode, setReturnCode] = React.useState('');

  useEffect(() => {
    const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
    const subscription = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      data => {
        if (data.returnCode === 1) {
          console.log("thành công")
        } else {
          console.log("thất bại")
        }
      },
    );

    return () => subscription.remove();
  }, []);

  const getCurrentDateYYMMDD = () => {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  };

  const createOrder = () => {
    const config = {
      appid: '2554',
      key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };

    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
    let appid = config.appid;
    let amount = 15000;
    let appuser = 'ZaloPayDemo';
    let apptime = new Date().getTime();
    let embeddata = '{"redirecturl": "vudecorshop://payment"}';
    let item = '[]';
    let description = 'Merchant description for order #' + apptransid;
    let hmacInput =
      appid +
      '|' +
      apptransid +
      '|' +
      appuser +
      '|' +
      amount +
      '|' +
      apptime +
      '|' +
      embeddata +
      '|' +
      item;
    let mac = CryptoJS.HmacSHA256(hmacInput, config.key1);

    var order = {
      app_id: appid,
      app_user: appuser,
      app_time: apptime,
      amount: amount,
      app_trans_id: apptransid,
      embed_data: embeddata,
      item: item,
      description: description,
      mac: mac,
      bank_code: "CC"
    };
    console.log(order);

    axios
      .post(config.endpoint, null, {params: order})
      .then(res => {
        console.log(res.data);
        if (res.data.order_url !== '') {
          // var payZP = NativeModules.PayZaloBridge;
          // payZP.payOrder(res.data.zp_trans_token);
          Linking.openURL(res.data.order_url);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.welcomeHead}>ZaloPay App To App Demo</Text>
        <Text style={styles.welcome}>Amount:</Text>
        <TextInput
          onChangeText={value => setMoney(value)}
          value={money}
          placeholder="Input amount"
          style={styles.inputText}
        />
        <Button
          title="Create order"
          loader={false}
          onPress={() => {
            createOrder();
          }}
        />
        {/* <Text style={styles.welcome}>ZpTranstoken: {token}</Text>
        <Text style={styles.welcome}>returncode: {returncode}</Text>
        {returncode == 1 ? (
          <Button
            title="Pay order"
            loader={false}
            onPress={() => {
              payOrder();
            }}
          />
        ) : null} */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  welcomeHead: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});
