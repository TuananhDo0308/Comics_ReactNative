import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput,Dimensions,Platform, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert} from 'react-native';
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
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Welcome</Text>
        <Text style={styles.header_title}>Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or phone number"
          placeholderTextColor="#aaa"
          keyboardType="email-address" 
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 },{backgroundColor:'none'}]}
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
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
      </View>
      
      <View style={styles.signInContainer}>
          <Text style={styles.sigIn_title}> Sign In</Text>
          <TouchableOpacity style={styles.signInButton} onPress={signIn}>
            <Image style={styles.signInButtonIcon} source={require('../../assets/icon/nextIcon.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.otherSignIn}>
      
        <Text style={styles.footerText}>Sign in with</Text>
        <View style={styles.listLoginMethod}>
        <TouchableOpacity style={styles.otherSignInButton}>
          <Image style={styles.otherSignInButtonIcon} source={require('../../assets/icon/googleIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherSignInButton}>
          <Image style={[styles.otherSignInButtonIcon,{height:35}]} source={require('../../assets/icon/appleIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherSignInButton}>
          <Image style={[styles.otherSignInButtonIcon, {tintColor:'white'}]} source={require('../../assets/icon/facebookIcon.png')} />
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.footerText}>
          or
        </Text>
      <TouchableOpacity  onPress={() => navigation.navigate('SignUpForm')}>
        <Text style={[styles.footerText,{color:'white'}]}>
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
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    paddingHorizontal: 20,
  },
  header: {
    flex:4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding:30
  },
  header_title:{
    fontSize:40,
    color:'white',
    fontWeight:'800',

  },
  signInContainer:{
    flex:1,
    margin:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  otherSignIn: {
    flex: 5,
    justifyContent: 'center',
    alignItems:'center',
  },
  input: {
    marginTop:20,
    width: width-60,
    backgroundColor: '#333',
    fontSize: 16,
    color: '#fff',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 15,
  },
  passwordContainer: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
  },
  showButton: {
    right: 10,
    height:50,
    justifyContent:'center',
    alignItems:'center',
  },
  showButtonText: {
    color: '#aaa',
    fontSize: 15,
  },
  sigIn_title:{
    fontSize:30,
    fontWeight:'700',
    color:'white'
  },

  signInButton: {
    backgroundColor: '#ff4b25', 
    height: 50,
    width:50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
  signInButtonIcon:{
    height:30,
    width:30,
    tintColor:'white',
  },
  forgotPasswordContainer:{
    width:width-60,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  forgotPasswordText: {
    color: '#ff4b25',
    flexDirection:'row',
    padding:10,
  },

  listLoginMethod:{
    flexDirection:'row',
    padding:10,
    gap:20
  },

  otherSignInButton:{
    height:50,
    width: 50,
    backgroundColor:'#333',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
  },

  otherSignInButtonIcon:{
    height:30,
    width: 30,
  },

  footer: {
    paddingVertical: 10,
  },
  footerText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
  },
  learnMoreText: {
    textDecorationLine: 'underline',
  },

  signUpContainer:{
    flex:1,
    flexDirection:'row',
    gap:10,
    justifyContent:'center'
    },
});
