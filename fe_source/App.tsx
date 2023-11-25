import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import { Cart, Favourites, LoginPage, NewProducts, Orders, ProductDetail, SignUp } from "./src/screens";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProductDetail'
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NewProducts'
          component={NewProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Favourites'
          component={Favourites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Orders'
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
