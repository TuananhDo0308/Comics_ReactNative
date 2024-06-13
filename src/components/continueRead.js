import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.comicItem} onPress={() => navigation.navigate('Chapters', { comicId: item.id })}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.ImgURL }}
          style={styles.coverImage}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        width={screenWidth}
        height={300}
        mode='horizontal-stack'
        modeConfig={{
          stackInterval: 80,
          horizontalOffset: 100,
        }}
        loop={true}
        sliderWidth={screenWidth}
        containerCustomStyle={styles.carouselContainer}
        onSnapToItem={(index) => setCurrentIndex(index)} // Cập nhật vị trí hiện tại
      />
      <View style={styles.comicInfo}>
        <Text style={styles.comicTitle}>{data[currentIndex]?.Title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  carouselContainer: {
    paddingLeft: 10,
    paddingTop: 0,
  },
  comicItem: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    flexDirection: 'column',
    padding: 10,
    height: 300,
    width: 200,
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
    marginLeft: 10,
    alignItems: 'flex-start',
    width: screenWidth,
  },
  comicTitle: {
    color: 'white',
    fontSize: 18,
  },
});

export default MyCarousel;
