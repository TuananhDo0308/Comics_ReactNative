import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from './firebaseConfig';

import SignIn from './src/screens/SignIn/SignIn';
import SignInForm from './src/screens/SignIn/SignInForm';
import SignUpForm from './src/screens/SignIn/SignUpForm';
import Home from './src/screens/Home/Home';
import Search from './src/screens/Home/Search';
import Profile from './src/screens/Home/Profile';
import ChapterPages from './src/screens/Home/ChapterPage';
import Chapters from './src/screens/Home/Chapter';

const Stack = createStackNavigator();

const noSlideTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 0 } },
    close: { animation: 'timing', config: { duration: 0 } },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [],
      },
    };
  },
};


function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignInForm" component={SignInForm} />
      <Stack.Screen name="SignUpForm" component={SignUpForm} />
      <Stack.Screen name="Chapters" component={Chapters} />
      <Stack.Screen name="ChapterPages" component={ChapterPages} />
      <Stack.Screen name="Home" component={Home} options={noSlideTransition} />
      <Stack.Screen name="Search" component={Search} options={noSlideTransition} />
      <Stack.Screen name="Profile" component={Profile} options={noSlideTransition} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async() => {
        // Check Firebase auth status
        firebase.auth().onAuthStateChanged(user => {
          // if (user) {
          //   setIsLoggedIn(true);
          // } else {
          //   setIsLoggedIn(false);
          // }
          setIsLoggedIn(!!user)
        });
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // Hiển thị màn hình chờ hoặc loading nếu cần thiết
  }

  return (
    <NavigationContainer>
      <StackNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}