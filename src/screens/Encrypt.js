import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import {
  useFonts,
  JosefinSans_400Regular,
  JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans';
import AppLoading from 'expo-app-loading';
import {alphabet, key0, key1, key2, key3} from '../ConstantsKeys'

const Encrypt = () => {
  const [output, setoutput] = useState('Your Encrypted Message will appear here...')
  var [msg, setmsg] = useState('')
  const [disable, setdisable] = useState(false)

  var bin
  var cipheredText = ''

  const randomBin = Math.random()
  if (randomBin < 0.2) {
    bin = 0
  } else if (randomBin > 0.2 && randomBin < 0.5) {
    bin = 1
  } else if (randomBin > 0.5 && randomBin < 0.8) {
    bin = 2
  } else {
    bin = 3
  }

  const Cipher = () => {
    if (msg === '') {
      Alert.alert('Warning', 'Message cannot be empty')
    }
    else {
      for (let i = 0; i < msg.length; i++) {
        let keyVal = alphabet.indexOf(msg[i])
        if (bin == 0) {
          if (cipheredText == '') {
            cipheredText = cipheredText.concat('$')
          }
          cipheredText = cipheredText.concat(key0.charAt(keyVal))
        }
        if (bin == 1) {
          if (cipheredText == '') {
            cipheredText = cipheredText.concat('#')
          }
          cipheredText = cipheredText.concat(key1.charAt(keyVal))
        }
        if (bin == 2) {
          if (cipheredText == '') {
            cipheredText = cipheredText.concat('@')
          }
          cipheredText = cipheredText.concat(key2.charAt(keyVal))
        }
        if (bin == 3) {
          if (cipheredText == '') {
            cipheredText = cipheredText.concat('%')
          }
          cipheredText = cipheredText.concat(key3.charAt(keyVal))
        }
      }
      setoutput(cipheredText)
      setdisable(true)
      cipheredText = ''
    }
  }

  const Clear = () => {
    setmsg('')
    setoutput('Your Encrypted Message will appear here...')
    setdisable(false)
  }

  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar StatusBarStyle='default' />
        <View style={styles.innerContainer}>
          <Text style={styles.labels}>Enter Message:</Text>
          <TextInput style={styles.input} multiline={true} placeholder="Enter Message" textAlign='center' value={msg} onChangeText={(value) => {setmsg(value); setdisable(false)}} autoCapitalize='none' />
          <View style={styles.buttonView}>
            <Pressable android_ripple={{ color: 'black' }} style={disable ? [styles.button, {backgroundColor:'#6c757d'}] : [styles.button, styles.encrypt] } onPress={() => Cipher()} disabled={disable}>
              <Text style={styles.text}>Encrypt</Text>
            </Pressable>
            <Pressable android_ripple={{ color: 'black' }} style={[styles.button, styles.clear]} onPress={() => Clear()}>
              <Text style={styles.text}>Clear</Text>
            </Pressable>
          </View>
          <View style={styles.messageArea}>
            <Text style={styles.message} selectionColor="#ffc107" selectable={true}>{output}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Encrypt

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  innerContainer: {
    marginHorizontal: '10%',
    marginTop: '10%'
  },
  labels: {
    fontSize: 20,
    marginLeft: '10%',
    fontFamily: 'JosefinSans_400Regular'
  },
  input: {
    marginHorizontal: '10%',
    borderRadius: 5,
    height: 60,
    borderWidth: 1,
    marginTop: 10
  },
  button: {
    width: '30%',
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: '5%'
  },
  encrypt: {
    backgroundColor: '#28a745'
  },
  clear: {
    backgroundColor: '#dc3545'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'JosefinSans_700Bold'
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageArea: {
    marginTop: '20%',
    borderWidth: 1,
    marginHorizontal: '10%',
    borderRadius: 5,
  },
  message: {
    marginVertical: 10,
    marginHorizontal: 10
  }
});