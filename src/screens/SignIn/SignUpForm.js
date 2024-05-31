import React, { useState, useRef } from 'react';
import { View, Text, TextInput,Dimensions,Platform, TouchableOpacity, Image, StyleSheet, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');


const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Create an</Text>
        <Text style={styles.header_title}>account!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or phone number"
          placeholderTextColor="#aaa"
          keyboardType="email-address" 
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 },{backgroundColor:'none'}]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            ref={passwordInputRef}  
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)} 
            style={styles.showButton}
          >
            <Text style={styles.showButtonText}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
          </TouchableOpacity>
          
        </View>
        <View style={[styles.passwordContainer,{marginTop:0}]}>
          <TextInput
            style={[styles.input, { flex: 1 },{backgroundColor:'none'}]}
            placeholder="Confirm password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            ref={passwordInputRef}  
          />
        </View>
          <Text style={styles.forgotPasswordText}>By clicking the Register button, you agree to the public offer</Text>
        
      </View>
      
      <View style={styles.signInContainer}>
          <Text style={styles.sigIn_title}> Register</Text>
          <TouchableOpacity style={styles.signInButton}>
            <Image style={styles.signInButtonIcon} source={require('../../assets/icon/nextIcon.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.otherSignIn}>
      
        <Text style={styles.footerText}>Sign up with</Text>
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

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    paddingHorizontal: 20,
  },
  header: {
    flex:5,
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
    flex: 4,
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
    marginBottom: 15,
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
 
  forgotPasswordText: {
    color: '#aaa',
    marginLeft:10,
    width:width-100,
    alignItems:'flex-start'
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
    textAlign:'center',
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
