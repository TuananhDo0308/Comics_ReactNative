import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { fetchChapters, fetchComicDetails } from '../../api/api';  // Bạn cần tạo hàm fetchComicDetails trong file API
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const Chapters = () => {
  const route = useRoute();
  const { comicId } = route.params;
  const [chapters, setChapters] = useState([]);
  const [comicDetails, setComicDetails] = useState({});
  const navigation = useNavigation();
  
  const translateY = useSharedValue(0);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    fetchChapters(comicId).then(setChapters);
    fetchComicDetails(comicId).then(setComicDetails);  // Fetch comic details
  }, [comicId]);

  const handlePress = (chapterId) => {
    navigation.navigate('ChapterPages', { comicId, chapterId });
  };

  const onGestureEvent = (event) => {
    translateY.value = event.translationY;
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY < -50) {
        setShowFull(true);
      } else {
        translateY.value = withSpring(0);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: showFull ? -height / 2 : translateY.value }],
    };
  });

  const renderItem = (item) => (
    <TouchableOpacity style={styles.chapterItem} onPress={() => handlePress(item.id)} key={item.id}>
      <Text style={styles.chapterTitle}>{item.Title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: comicDetails.ImgURL }} style={styles.comicImage} resizeMode="cover">
        <BlurView intensity={50} style={styles.blurView} />
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.buttonImg} source={require('../../assets/icon/backIcon.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.buttonImg} source={require('../../assets/icon/backIcon.png')}></Image>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.detailsContainer, animatedStyle]}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.details}>
              <Image source={{uri:comicDetails.ImgURL}} style={styles.detailImage}></Image>
              <Text style={styles.comicTitle}>{comicDetails.Title}</Text>
              <Text style={styles.comicAuthor}>Series: {comicDetails.Author}</Text>
              <Text style={styles.comicInfo}>Genre</Text>
            </View>
            {chapters.map(renderItem)}
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  comicImage: {
    width: width,
    height: height,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderTopStartRadius:30,
    borderTopEndRadius:30,
    paddingTop:20,
  },
  details: {
    padding: 20,
    alignItems: 'center',
  },
  detailImage: {
    height: 150,
    width: 100,
    borderRadius: 20,
  },
  comicTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comicAuthor: {
    fontSize: 16,
    color: 'grey',
  },
  comicInfo: {
    fontSize: 14,
    color: 'grey',
    marginVertical: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  chapterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chapterTitle: {
    fontSize: 18,
    color: 'white',
  },
  topNav: {
    paddingTop: Constants.statusBarHeight ,
    paddingBottom:20,
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
  },
  button: {
    height: 25,
    marginHorizontal:20,
    width: 25,
  },
  buttonImg: {
    height: 25,
    width: 25,
  },
});
