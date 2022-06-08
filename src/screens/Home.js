import { StyleSheet, Text, View, StatusBar, Button, Pressable } from 'react-native'
import React from 'react'
import {
  useFonts,
  JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans';
import AppLoading from 'expo-app-loading';

const Home = ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar StatusBarStyle='default' />
        <Pressable android_ripple={{ color: 'black' }} style={[styles.button, styles.encrypt]} onPress={() => navigation.navigate('Encrypt')}>
          <Text style={styles.text}>Encrypt</Text>
        </Pressable>
        <Pressable android_ripple={{ color: 'black' }} style={[styles.button, styles.decrypt]} onPress={() => navigation.navigate('Decrypt')}>
          <Text style={styles.text}>Decrypt</Text>
        </Pressable>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 5,
    paddingVertical: 15,
    marginVertical: 20
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontFamily:'JosefinSans_700Bold'
  },
  encrypt: {
    backgroundColor: '#28a745'
  },
  decrypt: {
    backgroundColor: '#dc3545'
  }
});