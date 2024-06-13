import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import ChapterPagesNavigation from '../../navigations/ChapterPagesNavigation';

const { width, height } = Dimensions.get('window');

const ChapterPages = () => {
  const route = useRoute();
  const { comicId, chapterId } = route.params;
  const [pdfSource, setPdfSource] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(`Chapter ${chapterId}`);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`); // Mảng giả với 10 chương

  useEffect(() => {
    fetchChapterPdf(comicId, chapterId).then((data) => {
      setPdfSource(data);
    });
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
      {pdfSource && (
        <WebView
          source={{ uri: `https://docs.google.com/viewer?url=${pdfSource}&embedded=true` }}
          style={styles.webview}
        />
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
    flex: 1,
    width: width,
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
