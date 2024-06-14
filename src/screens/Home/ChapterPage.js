import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import ChapterPagesNavigation from '../../navigations/ChapterPagesNavigation';
import { fetchChapterPdfUrls, fetchChapters } from '../../api/api';

const { width, height } = Dimensions.get('window');

const ChapterPages = () => {
  const route = useRoute();
  const { comicId, chapterId } = route.params;
  const [currentChapter, setCurrentChapter] = useState(chapterId);
  const [urls, setPdfUrls] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapters = async () => {
      const chaptersList = await fetchChapters(comicId);
      setChapters(chaptersList);
    };

    loadChapters();
  }, [comicId]);

  useEffect(() => {
    const loadPages = async () => {
      const url = await fetchChapterPdfUrls(comicId, currentChapter);
      setPdfUrls(url);
      setLoading(false);
    };
    loadPages();
  }, [comicId, currentChapter]);

  const handleChapterChange = (chapterIndex) => {
    const chapter = chapters[chapterIndex];
    if (chapter) {
      setCurrentChapter(chapter.id);
    }
  };

  return (
    <View style={[styles.container, styles.lightBackground]}>
      {loading ? (
        <Text>Loading...</Text>
      ) : urls.length > 0 ? (
        urls.map((url, index) => (
          <WebView
            key={index}
            source={{ uri: url }}
            style={styles.webview}
          />
        ))
      ) : (
        <Text>No PDFs available</Text>
      )}
      <View style={styles.navigationContainer}>
        <ChapterPagesNavigation
          chapters={chapters}
          currentChapter={currentChapter}
          onChapterChange={handleChapterChange}
        />
      </View>
    </View>
  );
};

export default ChapterPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: width + 200,
    height: height,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80, // Adjust according to your navigation bar height
  },
  lightBackground: {
    backgroundColor: 'white',
  },
});