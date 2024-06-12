import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ComicGerne = ({ item }) => {
  return (
    <View style={styles.comicItem}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.ImgURL }}
          style={styles.coverImage}
        />
      </View>
      <View style={styles.comicInfo}>
        <Text style={styles.comicTitle}>{item.Title}</Text>
      </View>
    </View>
  );
};

export default ComicGerne;

const styles = StyleSheet.create({
  comicItem: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    flexDirection: 'column',
    padding: 10,
    height: 250,
    width: 150,
  },
  imageContainer: {
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    shadowOpacity: 0.3,
    justifyContent: 'flex-end',
    shadowRadius: 12,
    elevation: 10,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  comicInfo: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  comicTitle: {
    color: 'white',
    fontSize: 18,
  },
});
