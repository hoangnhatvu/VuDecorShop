import { View, Text, StyleSheet } from "react-native"
import { StatusBar } from "react-native"
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello world !</Text>
      <StatusBar barStyle="default" backgroundColor="transparent" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStyle: {
    fontFamily: "Poppins-LightItalic",
    fontSize: 50
  }
})