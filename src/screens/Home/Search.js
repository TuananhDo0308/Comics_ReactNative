import React, { useRef } from 'react';
import { View, Text, Dimensions, Platform, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';

const Search = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const passwordInputRef = useRef(null);  
  return (
    <ImageBackground 
    source={require('../../assets/background.jpg')} 
    style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          
          <View style={styles.content}>
            <Text style={styles.contentText}>Your Content Here</Text>

          </View>
          <HomeBottomNavigation currentRoute={currentRoute} />        
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Search;

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
    backgroundColor: 'rgba(20, 20, 20, 0.9)', 
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
