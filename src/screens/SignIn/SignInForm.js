import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Dimensions, Platform, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('loggedIn', 'true');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Your email or password is incorrect');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_title}>Welcome</Text>
            <Text style={styles.header_title}>Back!</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email or phone number"
                placeholderTextColor="#aaa"
                keyboardType="email-address" 
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                ref={passwordInputRef}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)} 
                style={styles.showButton}
              >
                <Text style={styles.showButtonText}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
              </TouchableOpacity>
            </View>
        
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={signIn}>
            <Image style={styles.signInButtonIcon} source={require('../../assets/icon/nextIcon.png')} />
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.footerText}>
              or
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpForm')}>
              <Text style={[styles.footerText, { color: 'white' }]}>
                create an account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerText}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 30,
  },
  header_title: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.7)', // Semi-transparent background for input
    borderRadius: 5,
    marginTop: 20,
    width: width - 60,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    height: 50,
    paddingHorizontal: 15,
  },
  showButton: {
    marginRight: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButtonText: {
    color: '#aaa',
    fontSize: 15,
  },
  signInButton: {
    backgroundColor: '#ff4b25', 
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 30,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 0, 0, 0.75)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: 'rgba(255, 0, 0, 0.75)',
      },
    }),
  },
  signInButtonIcon: {
    height: 30,
    width: 30,
    tintColor: 'white',
  },
  forgotPasswordContainer: {
    width: width - 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#ff4b25',
    flexDirection: 'row',
    padding: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  footer: {
    paddingVertical: 10,
    marginTop:20
  },
  footerText: {

    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
  },
});
