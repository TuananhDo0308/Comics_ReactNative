import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchChapters, fetchComicsList } from '../../api/api';  // Bạn cần tạo hàm fetchComicDetails trong file API
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const Chapters = () => {
  const route = useRoute();
  const { comicId } = route.params;
  const [chapters, setChapters] = useState([]);
  const [comicsList, setComicsList] = useState({});
  const navigation = useNavigation();
  const [isRead, setIsRead] = useState(true);  // Biến isRead để kiểm soát hiển thị
  const [isFavorite, setIsFavorite] = useState(false);  // Biến isFavorite để kiểm soát icon heart

  useEffect(() => {
    fetchChapters(comicId).then(setChapters);
    fetchComicsList().then(comics => {
      const comic = comics.find(c => c.id === comicId);
      setComicsList(comic);
    });
  }, [comicId]);

  const handlePress = (chapterId) => {
    const currentChapterIndex = chapters.findIndex(chapter => chapter.id === chapterId);
    const currentChapter = chapters[currentChapterIndex];
    navigation.navigate('ChapterPages', { comicId, chapterId, chapters, currentChapter });
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chapterItem} onPress={() => handlePress(item.id)} key={item.id}>
      <Text style={styles.chapterTitle}>{item.Title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: comicsList.ImgURL }} style={styles.comicImage} resizeMode="cover">
        <BlurView intensity={50} style={styles.blurView} />
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Image style={styles.buttonImg} source={require('../../assets/icon/backIcon.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsFavorite(!isFavorite)}>
            <Image style={styles.buttonImg} source={isFavorite ? require('../../assets/icon/heartIconActive.png') : require('../../assets/icon/heartIcon.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={[styles.detailsContainer]}>
          <View style={styles.details}>
            <Image source={{ uri: comicsList.ImgURL }} style={styles.detailImage}></Image>
            <Text style={styles.comicTitle}>{comicsList.Title}</Text>
            <Text style={styles.comicAuthor}>Author: {comicsList.Author}</Text>
            <Text style={styles.comicInfo}>Genre: {comicsList.Genre}</Text>
          </View>
          {isRead && (
            <>
              <Text style={styles.Chapters}>Continue Reading:</Text>
              <TouchableOpacity style={[styles.chapterItem, { marginHorizontal: 20 }]}>
                <Text style={styles.chapterTitle}>item</Text>
              </TouchableOpacity>
            </>
          )}
          <Text style={styles.Chapters}>Chapters:</Text>
          <FlatList
            contentContainerStyle={styles.scrollContent}
            data={chapters}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
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
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingTop: 20,
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
    marginVertical: 10,
  },
  Chapters: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 20,
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
    gap: 15,
    height: 400,
    marginHorizontal: 20,
  },
  chapterItem: {
    padding: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  chapterTitle: {
    fontSize: 18,
    color: 'white',
  },
  topNav: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
  },
  button: {
    height: 25,
    marginHorizontal: 20,
    width: 25,
  },
  buttonImg: {
    height: 25,
    width: 25,
  },
});
