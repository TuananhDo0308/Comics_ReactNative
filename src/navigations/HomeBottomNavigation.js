import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Platform, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeBottomNavigation = ({ currentRoute }) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const routeIndex = useRef(['Home', 'Search', 'Profile'].indexOf(currentRoute));

  useEffect(() => {
    const newIndex = ['Home', 'Search', 'Profile'].indexOf(currentRoute);
    if (newIndex >= 0) {
      animation.setValue(routeIndex.current * (width - 100) / 3);
      Animated.timing(animation, {
        toValue: newIndex * (width - 100) / 3,
        duration: 300,
        easing: Easing.out(Easing.quad), // Smooth easing function
        useNativeDriver: true,
      }).start();
      routeIndex.current = newIndex;
    }
  }, [currentRoute]);

  const getImageSource = (routeName) => {
    switch (routeName) {
      case 'Home':
        return currentRoute === 'Home' ? require('../assets/icon/home_active.png') : require('../assets/icon/home_inactive.png');
      case 'Search':
        return currentRoute === 'Search' ? require('../assets/icon/search_active.png') : require('../assets/icon/search_inactive.png');
      case 'Profile':
        return currentRoute === 'Profile' ? require('../assets/icon/profile_active.png') : require('../assets/icon/profile_inactive.png');
      default:
        return null;
    }
  };

  const renderButton = (routeName, label) => {
    const imageSource = getImageSource(routeName);
    const isSquare = routeName === 'Home' || routeName === 'Search';
    const imageSizeStyle = isSquare ? styles.squareImage : styles.rectangleImage;

    return (
      <TouchableOpacity
        key={routeName}
        style={styles.navButton}
        onPress={() => navigation.navigate(routeName)}
      >
        <Image style={[styles.image, imageSizeStyle]} source={imageSource} />
        {currentRoute === routeName && <Text style={styles.navText}>{label}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} style={styles.navBar}>
        <Animated.View style={[styles.slidingBackground, {
          transform: [{ translateX: animation }]
        }]} />
        {['Home', 'Search', 'Profile'].map(routeName => renderButton(routeName, routeName))}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    width: width - 80,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    }),
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

export default HomeBottomNavigation;
