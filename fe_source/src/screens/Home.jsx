import { TouchableOpacity, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './home.style'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Welcome } from '../components';

const Home = () => {
  return (
      <SafeAreaView>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <IonIcon name='location-outline' size={24} />
            <Text style={styles.location}>Việt Nam</Text>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}> 8 </Text>
              </View>
              <TouchableOpacity>
                <Fontisto name='shopping-bag' size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <Welcome/>
        </ScrollView>
      </SafeAreaView>
  )
}

export default Home
