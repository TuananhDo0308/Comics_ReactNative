import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';

const Home = () => {
  const [mangaList, setMangaList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://api.mangadex.org/manga')
      .then(response => response.json())
      .then(data => {
        setMangaList(data.data);
      })
      .catch(error => {
        console.error('Error fetching manga:', error);
      });
  }, []);

  const handlePress = (mangaId) => {
    navigation.navigate('Chapters', { mangaId });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(29, 29, 29, 0.9)" />
      <FlatList
        data={mangaList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.mangaItem}>
              <Image
                source={{ uri: `https://uploads.mangadex.org/covers/:manga-id/:cover-filename` }}
                style={styles.coverImage}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.attributes.title.en}</Text>
                <Text style={styles.author}>{item.attributes.author}</Text>
                <Text style={styles.genre}>{item.attributes.tags.map(tag => tag.attributes.name.en).join(', ')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
      />
      <HomeBottomNavigation currentRoute="Home" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29, 29, 29, 0.95)',
  },
  scrollContent: {
    marginTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
    paddingBottom: 60, // Adjust this value based on the height of the bottom navigation
  },
  mangaItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  coverImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  genre: {
    fontSize: 14,
    color: 'gray',
  },
});
