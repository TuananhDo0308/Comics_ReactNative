import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import ChapterPagesNavigation from '../../navigations/ChapterPagesNavigation';
import { fetchChapterPdfUrls } from '../../api/api';

const { width, height } = Dimensions.get('window');

const ChapterPages = () => {
  const route = useRoute();
  const { comicId, chapterId } = route.params;
  const [pdfSource, setPdfSource] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(`Chapter ${chapterId}`);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [urls, setPdfUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`); // Mảng giả với 10 chương

  useEffect(() => {
    fetchChapterPdf(comicId, chapterId).then((data) => {
      setPdfSource(data);
    });

  }, [comicId, chapterId]);

  useEffect(() => {
    const loadPages = async () => {
      const url = await fetchChapterPdfUrls(comicId, chapterId);
      console.log('PDF URLs:', url); // Kiểm tra chiều dài của mảng URLs
      setPdfUrls(url);
      setLoading(false);
    };
    loadPages();
  }, [comicId, chapterId]);

  const handleChapterChange = (chapter) => {
    const chapterIndex = chapters.indexOf(chapter) + 1;
    setCurrentChapter(chapter);
    fetchChapterPdf(comicId, chapterIndex).then((data) => {
      setPdfSource(data);
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Chuyển đổi chế độ nền
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      {/* {urls.length > 0 ? (
        <FlatList
          data={urls}
          renderItem={({ item }) => (
            <WebView
              source={{ uri: `https://docs.google.com/viewer?url=${encodeURIComponent(item)}&embedded=true` }}
              style={styles.webview}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Loading...</Text>
      )} */}
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
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </View>
    </View>
  );
};

export default ChapterPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: width-20,
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
  darkBackground: {
    backgroundColor: 'black',
  },
});

// Mock function to fetch PDF source URL
const fetchChapterPdf = async (comicId, chapterId) => {
  // Replace this with your actual logic to fetch the PDF URL
  // Here we use a placeholder PDF file for demonstration
  return '';
};
