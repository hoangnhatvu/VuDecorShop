import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './welcome.style'
import { COLORS, SIZES } from '../../../constants'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles().container}>
        <Text style={styles(COLORS.black, SIZES.xSmall).welcomeTxt}>
          {" "}
          Find The Most
        </Text>

        <Text style={styles(COLORS.primary, 0).welcomeTxt}>
          {" "}
          Luxurious Furniture
        </Text>
      </View>
      <View style={styles().searchContainer}>
        <TouchableOpacity>
          <Feather name='search' size={24} style={styles().searchIcon} />
        </TouchableOpacity>
        <View style={styles().searchWrapper}>
          <TextInput
            style={styles().searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder='What are you looking for?'></TextInput>
        </View>
        <View>
          <TouchableOpacity style={styles().searchBtn}>
            <Ionicons name='camera-outline' size={SIZES.xLarge} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Welcome