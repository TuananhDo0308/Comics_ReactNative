import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated,FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchChapterPages } from '../../api/api';
import ChapterPagesNavigation from '../../navigations/ChapterPagesNavigation';

const { width } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ChapterPages = () => {
  const route = useRoute();
  const { comicId, chapterId } = route.params;
  const [pages, setPages] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
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
        <ChapterPagesNavigation />
      </Animated.View>
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
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80, // Adjust according to your navigation bar height
  },
});
