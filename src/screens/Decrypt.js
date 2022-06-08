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
  const [output, setoutput] = useState('Your Encrypted Message will be Decrypted here...')
  var [msg, setmsg] = useState()
  const [disable, setdisable] = useState(false)

  var bin
  var decipheredText = ''
  const sign = ['$', '#', '@', '%']
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

  const Decipher = () => {
    if (msg === '') {
      Alert.alert('Warning', 'Message cannot be empty')
    }
    else if (!sign.includes(msg[0])) {
      Alert.alert('Warning', 'Message is not encrypted')
    }
    else {
      let secretSymbol = msg[0]
      if (secretSymbol == '$') {
        decipherMsg(key0, msg)
      }
      if (secretSymbol == '#') {
        decipherMsg(key1, msg)
      }
      if (secretSymbol == '@') {
        decipherMsg(key2, msg)
      }
      if (secretSymbol == '%') {
        decipherMsg(key3, msg)
      }
    }
  }

  const decipherMsg = (keyID, encryptedmsg) => {
    for (let i = 1; i < encryptedmsg.length; i++) {
      let keyVal = keyID.indexOf(encryptedmsg[i])
      decipheredText = decipheredText.concat(alphabet.charAt(keyVal))
    }
    setoutput(decipheredText)
    setdisable(true)
    decipheredText = ''
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
            <Pressable android_ripple={{ color: 'black' }} style={disable ? [styles.button, {backgroundColor:'#6c757d'}] : [styles.button, styles.decrypt] } onPress={() => Decipher()} disabled={disable}>
              <Text style={styles.text}>Decrypt</Text>
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
  decrypt: {
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