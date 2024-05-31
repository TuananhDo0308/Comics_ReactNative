import React, { useRef } from 'react';
import { View, Text, Dimensions, Platform, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';

const Profile = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const passwordInputRef = useRef(null);  
  return (
    <ImageBackground 
      source={require('../../assets/img1.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            {/* Your content here */}
            <Text style={styles.contentText}>Your Content Here</Text>
          </View>
          <HomeBottomNavigation currentRoute={currentRoute} />        
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Semi-transparent background for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: 'white',
    fontSize: 24,
  },
});
