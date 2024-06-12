import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, StatusBar, ImageBackground, FlatList, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';
import { fetchComicsList } from '../../api/api';
import ComicItem from '../../components/HighlightComic';
import ComicGerne from '../../components/ComicGerne';
import { BlurView } from 'expo-blur'
import MyCarousel from '../../components/continueRead';
const { width, height } = Dimensions.get('window');

const Home = () => {
  const [comicsList, setComicsList] = useState([]);
  const [currentComicId, setCurrentComicId] = useState(null);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  


  useEffect(() => {
    fetchComicsList().then(comics => {
      setComicsList(comics);
      if (comics.length > 0) {
        setCurrentComicId(comics[0].id);
      }
    });
  }, []);

  const handlePress = (comicId) => {
    navigation.navigate('Chapters', { comicId });
  };

  const topNavTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -90], // Trượt lên 90 pixel
    extrapolate: 'clamp'
  });

  const bottomNavTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [100, 0], // Trượt xuống 100 pixel
    extrapolate: 'clamp'
  });

  const safeHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, Constants.statusBarHeight], 
    extrapolate: 'clamp'
  });


  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentComicId(viewableItems[0].item.id);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="rgba(29, 29, 29, 0.9)" />
        <Animated.View style={[styles.safe, { height: safeHeight }]}>
          <BlurView intensity={50} style={styles.blurView} />
        </Animated.View>
        <Animated.View style={[styles.topNav, { transform: [{ translateY: topNavTranslateY }] }]}>
          <Image style={styles.navLogo} source={require('../../assets/imglogo.png')} />
          <Image style={styles.navLogotext}  source={require('../../assets/applogo.png')} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image style={styles.navProfile} source={require('../../assets/img1.jpg')}/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.hotTrend}>
            <FlatList
              data={comicsList}
              renderItem={({ item }) => item ? <ComicItem item={item} /> : null}
              horizontal
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={width}
              decelerationRate="fast"
              keyExtractor={item => item.id}
              contentContainerStyle={styles.horizontalScroll}
              pagingEnabled
              onViewableItemsChanged={handleViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />
            <TouchableOpacity style={styles.readButton} onPress={() => handlePress(currentComicId)}>
              <Text style={styles.readButtonText}>Read</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.continueRead}>
            <Text style={styles.continueReadTitle}>
              CONTINUE READING
            </Text>
            <MyCarousel data={comicsList} />
          </View>
          <View style={styles.continueRead}>
            <Text style={styles.continueReadTitle}>
              CONTINUE READING
            </Text>
            <FlatList
                data={comicsList}
                renderItem={({ item }) => item ? <ComicGerne item={item} /> : null}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                keyExtractor={item => item.id}
                contentContainerStyle={styles.horizontalScroll2}
                pagingEnabled
              />
          </View>
          
          
          
        </Animated.ScrollView>
        <Animated.View style={[styles.bottomNav, { transform: [{ translateY: bottomNavTranslateY }] }]}>
          <HomeBottomNavigation currentRoute="Home" />
        </Animated.View>
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(20, 20, 20, 0.9)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotTrend:{
    height: height , 
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
  },
  horizontalScroll: {
    marginTop: Platform.OS === 'ios' ? 44 +80 : StatusBar.currentHeight + 80,
  },
  horizontalScroll2: {
    width:width,
  },
  safe:{
    backgroundColor: 'rgba(0,0, 0, 0.85)', 
    position: 'absolute',
    top: 0,
    zIndex: 16,
    left: 0,
    right: 0,
  },
  blurView: {
  },
  topNav: {
    marginHorizontal:20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navLogo: {
    height:30,
    width:30
    
  },
  navLogotext: {
    height:12,
    width:80
  },
  navProfile: {
    height: 40,
    width: 40,
    borderRadius: 1000,
  },
  trendComics: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  coverImageVertical: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  
  readButton: {
    backgroundColor: '#ff4b25',
    width: 170,
    height: 50,
    borderRadius: 100,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  readButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  continueRead:{
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    width:width-20,
    marginVertical:20,
    marginHorizontal:10,
  },
  continueReadTitle:{
    fontSize:16,
    fontWeight:'500',
    color:'grey',
    marginLeft:5
  },
});
