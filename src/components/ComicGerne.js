import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ComicGerne = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Chapters', { comicId: item.id });
  };

  return (
    <TouchableOpacity style={styles.comicItem} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.ImgURL }}
          style={styles.coverImage}
        />
      </View>
      <View style={styles.comicInfo}>
        <Text style={styles.comicTitle}>{item.Title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ComicGerne;

const styles = StyleSheet.create({
  comicItem: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    flexDirection: 'column',
    padding: 10,
    height: 300, // Cố định chiều cao của mục truyện tranh
    width: 150,
  },
  imageContainer: {
    borderRadius: 10,
    width: '100%',
    height: 200, // Cố định chiều cao của khung hình ảnh
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
