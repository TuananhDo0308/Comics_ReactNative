import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Dimensions, Platform, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase, db } from '../../../firebaseConfig';

const { width } = Dimensions.get('window');

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Lưu thông tin người dùng vào Firestore
        db.collection('users').doc(user.uid).set({
          email: user.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('User data saved to Firestore');
          Alert.alert('Success', 'Sign Up Success', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        })
        .catch((error) => {
          console.error('Error saving user data to Firestore:', error);
          Alert.alert('Error', error.message);
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        Alert.alert('Error', error.message);
      });
  }

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_title}>Create an</Text>
            <Text style={styles.header_title}>account!</Text>
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
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirm password"
                placeholderTextColor="#aaa"
                secureTextEntry={true}
                ref={passwordInputRef}  
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <Text style={styles.forgotPasswordText}>By clicking the Register button, you agree to the public offer</Text>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={signUp}>
              <Image style={styles.signInButtonIcon} source={require('../../assets/icon/nextIcon.png')} />
            </TouchableOpacity>
         
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

export default SignUpForm;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    backgroundColor: 'rgba(51, 51, 51, 0.5)', // Semi-transparent background for input
    borderRadius: 5,
    marginTop: 10,
    width: width - 60,
  },
  input: {
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
    marginBottom: 15,
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
  forgotPasswordText: {
    color: '#aaa',
    marginLeft: 10,
    width: width - 100,
    alignItems: 'flex-start'
  },
  footer: {
    paddingVertical: 10,
  },
  footerText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
  },
  sigIn_title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white'
  },
  signInContainer: {
    flex: 1,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
