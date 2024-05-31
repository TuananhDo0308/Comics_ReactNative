import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Platform, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const HighlightComic = ({comic}) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.navText}>hekki</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color:'blue'
  },
  navBar: {
    flexDirection: 'row',
    padding: 8,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    overflow: 'hidden',
  },
  slidingBackground: {
    marginHorizontal: 8,
    position: 'absolute',
    height: 45,
    width: (width - 110) / 3,
    backgroundColor: 'rgba(255, 75, 37, 0.8)',
    borderRadius: 1000,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  activeButton: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
  },
  image: {
    tintColor: 'white',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 8,
  },
  squareImage: {
    height: 20,
    width: 20,
  },
  rectangleImage: {
    height: 20,
    width: 17,
  },
});

export default HighlightComic;
