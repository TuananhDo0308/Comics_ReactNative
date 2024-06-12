import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchChapters, fetchComicDetails } from '../../api/api';  // Bạn cần tạo hàm fetchComicDetails trong file API

const { width, height } = Dimensions.get('window');

const Chapters = () => {
  const route = useRoute();
  const { comicId } = route.params;
  const [chapters, setChapters] = useState([]);
  const [comicDetails, setComicDetails] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    fetchChapters(comicId).then(setChapters);
    fetchComicDetails(comicId).then(setComicDetails);  // Fetch comic details
  }, [comicId]);

  const handlePress = (chapterId) => {
    navigation.navigate('ChapterPages', { chapterId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chapterItem} onPress={() => handlePress(item.id)}>
      <Text style={styles.chapterTitle}>{item.Title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: comicDetails.coverImage }}  // Nền hình ảnh của truyện
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image source={{ uri: comicDetails.ImgURL }} style={styles.comicImage} />
          <View style={styles.comicInfo}>
            <Text style={styles.comicTitle}>{comicDetails.Title}</Text>
            <Text style={styles.comicAuthor}>by {comicDetails.Author}</Text>
          </View>
        </View>
        <FlatList
          data={chapters}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </ImageBackground>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 20, 20, 0.9)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  comicImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  comicInfo: {
    marginLeft: 10,
  },
  comicTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  comicAuthor: {
    color: 'grey',
    fontSize: 16,
  },
  scrollContent: {
    padding: 10,
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
});
