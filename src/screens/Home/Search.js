import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Dimensions, ImageBackground, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';
import { fetchComicsList, fetchGenresList } from '../../api/api';
import ComicItem from '../../components/searchComic';
const { width } = Dimensions.get('window');

const Search = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const [searchText, setSearchText] = useState('');
  const [comicsList, setComicsList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchGenresList().then(data => {
      setGenres(data);
    });

    fetchComicsList().then(data => {
      setComicsList(data);
      setFilteredComics(data);
    });
  }, []);

  useEffect(() => {
    let filteredComics = comicsList;

    if (searchText) {
      filteredComics = filteredComics.filter(comic => comic.Title.toLowerCase().includes(searchText.toLowerCase()));
    }

    if (selectedGenre) {
      filteredComics = filteredComics.filter(comic => comic.Genre === selectedGenre);
    }

    setFilteredComics(filteredComics);
  }, [searchText, comicsList, selectedGenre]);

  const handleSearch = () => {
    Keyboard.dismiss();
    // Thực hiện hành động tìm kiếm dựa trên searchText
    console.log('Searching for:', searchText);
  };

  const handleGenreSelect = genre => {
    setSelectedGenre(genre === selectedGenre ? null : genre); // Toggle selection
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="white" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
            />
          </View>
          <View style={styles.genreListContainer}>
            <FlatList
              data={genres}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.genreItem, 
                  { backgroundColor: item.Genre === selectedGenre ? 'rgba(100, 100, 100, 0.7)' : 'rgba(50, 50, 50, 0.7)' }
                  ]}
                  onPress={() => handleGenreSelect(item.Genre)}>
                  <Text style={styles.genreText}>{item.Genre}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.genreList}
            />
          </View>
          <View style={styles.content}>
            <FlatList
              data={filteredComics}
              renderItem={({ item }) => <ComicItem item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[{paddingBottom:20}]}
            />
          </View>
          <HomeBottomNavigation currentRoute={currentRoute} />        
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(20, 20, 20, 0.9)', 
    justifyContent: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
  },
  genreListContainer: {
    marginVertical: 10,
  },
  genreList: {
    paddingLeft: 20,
  },
  genreItem: {
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
  },
  genreText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comicList: {
    paddingHorizontal: 10,
  },
  contentText: {
    color: 'white',
    fontSize: 24,
  },
});
