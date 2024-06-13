import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ComicItem = ({ item }) => {
  return (
    <View style={styles.comicItem}>
      <Image
        source={{ uri: item.ImgURL }}
        style={styles.coverImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.author}>Author: {item.Author}</Text>
        <Text style={styles.chapters}>Chapters: {item.chapterCount}</Text>
      </View>
    </View>
  );
};

export default ComicItem;

const styles = StyleSheet.create({
  comicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    borderRadius: 10,
    width: width - 20,
    marginHorizontal: 10,
  },
  coverImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    color: 'grey',
    fontSize: 14,
    marginBottom: 5,
  },
  chapters: {
    color: 'grey',
    fontSize: 14,
  },
});
