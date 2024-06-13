import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchChapterPages } from '../../api/api';
import ChapterPagesNavigation from '../../navigations/ChapterPagesNavigation';

const { width } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ChapterPages = () => {
  const route = useRoute();
  const { comicId, chapterId } = route.params;
  const [pages, setPages] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(`Chapter ${chapterId}`);
  const [isDarkMode, setIsDarkMode] = useState(false); // Thêm trạng thái để quản lý chế độ nền
  const scrollY = useRef(new Animated.Value(0)).current;
  const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`); // Mảng giả với 10 chương

  useEffect(() => {
    fetchChapterPages(comicId, chapterId).then((data) => {
      setPages(data);
    });
  }, [comicId, chapterId]);

  const navigationTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const handleChapterChange = (chapter) => {
    const chapterIndex = chapters.indexOf(chapter) + 1;
    setCurrentChapter(chapter);
    // Fetch new chapter pages
    fetchChapterPages(comicId, chapterIndex).then((data) => {
      setPages(data);
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Chuyển đổi chế độ nền
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <AnimatedFlatList
        data={pages}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.pageImage} resizeMode="contain" />
        )}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
      <Animated.View style={[styles.navigationContainer, { transform: [{ translateY: navigationTranslateY }] }]}>
        <ChapterPagesNavigation
          chapters={chapters}
          currentChapter={currentChapter}
          onChapterChange={handleChapterChange}
          onToggleDarkMode={toggleDarkMode} // Truyền hàm chuyển đổi chế độ nền
          isDarkMode={isDarkMode} // Truyền trạng thái nền hiện tại
        />
      </Animated.View>
    </View>
  );
};

export default ChapterPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageImage: {
    width: width,
    height: undefined,
    aspectRatio: 0.75, // Bạn có thể điều chỉnh aspectRatio theo tỷ lệ của ảnh
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
