// ChapterPages.js
import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchChapterPages } from '../../api/api';

const { width } = Dimensions.get('window');

const ChapterPages = () => {
  const route = useRoute();
  const { comicId, chapterId } = route.params;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchChapterPages(comicId, chapterId).then((data) => {
      setPages(data);
    });
  }, [comicId, chapterId]);

  return ( 
    <View style={styles.container}>
      <FlatList
        data={pages}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.pageImage} resizeMode="contain" />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ChapterPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pageImage: {
    width: width,
    height: undefined,
    aspectRatio: 0.75, // Bạn có thể điều chỉnh aspectRatio theo tỷ lệ của ảnh
  },
});
