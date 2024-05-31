import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ChapterPages = () => {
  const route = useRoute();
  const { chapterId } = route.params;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch(`https://api.mangadex.org/at-home/server/${chapterId}`)
      .then(response => response.json())
      .then(data => {
        const baseUrl = data.baseUrl;
        const hash = data.chapter.hash;
        const pageFiles = data.chapter.data;
        const pageUrls = pageFiles.map(page => `${baseUrl}/data/${hash}/${page}`);
        setPages(pageUrls);
      })
      .catch(error => {
        console.error('Error fetching chapter pages:', error);
      });
  }, [chapterId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pages}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.pageImage} />
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
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});
