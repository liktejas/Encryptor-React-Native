import { StyleSheet, BackHandler, Alert } from 'react-native';
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';
import Encrypt from './src/screens/Encrypt';
import Decrypt from './src/screens/Decrypt';
import AppLoading from 'expo-app-loading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  useFonts,
  JosefinSans_400Regular,
} from '@expo-google-fonts/josefin-sans';
import {
  UbuntuMono_700Bold,
} from '@expo-google-fonts/ubuntu-mono';

const Drawer = createDrawerNavigator();

export default function App() {

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    UbuntuMono_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'
          screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#0080ff' },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "UbuntuMono_700Bold",
            },
            // swipeEnabled: false
          }}
        >
          <Drawer.Screen name="Home" component={Home} cone options={{ title: "Home", drawerIcon: ({ focused }) => <FontAwesome5 name='home' size={focused ? 25 : 20} color={focused ? '#0080ff' : '#999999'} /> }} />
          <Drawer.Screen name="Encrypt" component={Encrypt} options={{ title: "Encrypt", drawerIcon: ({ focused }) => <FontAwesome5 name='lock' size={focused ? 25 : 20} color={focused ? '#0080ff' : '#999999'} /> }} />
          <Drawer.Screen name="Decrypt" component={Decrypt} options={{ title: "Decrypt", drawerIcon: ({ focused }) => <FontAwesome5 name='lock-open' size={focused ? 25 : 20} color={focused ? '#0080ff' : '#999999'} /> }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  drawerlabels: {
    fontFamily: 'JosefinSans_400Regular'
  }
});
