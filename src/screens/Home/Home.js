import React, { useRef } from 'react';
import { View, Text, Dimensions, Platform, Image, ImageBackground, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import HighlightComic from '../../components/HighlightComic';
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';

const Home = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const passwordInputRef = useRef(null);  

  return (
    <ImageBackground 
      source={require('../../assets/img5.jpg')} 
      style={styles.background}
    >
      <StatusBar translucent background="rgba(29, 29, 29, 0.9)"  backgroundColor="rgba(29, 29, 29, 0.9)" />
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.topBlur}/>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <HighlightComic/>
            <Image source={require('../../assets/img5.jpg')} style={styles.image}></Image>
            <Text style={styles.contentText}>Your Content Here</Text>
          </ScrollView>
          <HomeBottomNavigation currentRoute={currentRoute} />        
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topBlur:{
    top: 0,
    width: width,
    position: 'absolute',
    backgroundColor: 'rgba(29, 29, 29, 0.9)', 
    height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight, // Adjust height based on platform
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(29, 29, 29, 0.95)', // Semi-transparent background for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  image: {
  },
  contentText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
});
