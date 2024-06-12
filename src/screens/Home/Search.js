import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Dimensions, Platform, ImageBackground, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng Ionicons cho icon tìm kiếm
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';
import { fetchComicsList, fetchGenresList } from '../../api/api';

const { width } = Dimensions.get('window');

const Search = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const [searchText, setSearchText] = useState('');
  // const [genres, setGenres] = useState([
  //   { id: '1', name: 'Action' },
  //   { id: '2', name: 'Romance' },
  //   { id: '3', name: 'Horror' },
  //   { id: '4', name: 'Comedy' },
  //   { id: '5', name: 'Sci-Fi' },
  //   // Add more genres as needed
  // ]);

  const [genres, setGenres] = useState([])
  useEffect(() => {
    fetchGenresList().then(data => {
      setGenres(data);
    });
  }, []);

  // const [comicsList, setComicsList] = useState([
  //   // Dummy data for comics
  //   { id: '1', title: 'Comic 1', genre: 'Action' },
  //   { id: '2', title: 'Comic 2', genre: 'Romance' },
  //   { id: '3', title: 'Comic 3', genre: 'Horror' },
  //   { id: '4', title: 'Comic 4', genre: 'Comedy' },
  //   { id: '5', title: 'Comic 5', genre: 'Sci-Fi' },
  //   // Add more comics as needed
  // ]);


  const [comicsList, setComicsList] = useState([])

  useEffect(() => {
    fetchComicsList().then(data => {
      setComicsList(data);
      setFilteredComics(data);
    });
  }, []);


  const passwordInputRef = useRef(null);

  const handleSearch = () => {
    Keyboard.dismiss();
    // Thực hiện hành động tìm kiếm dựa trên searchText
    console.log('Searching for:', searchText);
    // Cập nhật comicsList dựa trên kết quả tìm kiếm (ví dụ dưới đây chỉ là giả lập)
    const filteredComics = comicsList.filter(comic => comic.title.toLowerCase().includes(searchText.toLowerCase()));
    setComicsList(filteredComics);
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
              onSubmitEditing={handleSearch} // Thực hiện tìm kiếm khi nhấn Enter
            />
          </View>
          <View style={styles.genreListContainer}>
            <FlatList
              data={genres}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.genreItem}>
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
              data={comicsList}
              renderItem={({ item }) => (
                <View style={styles.comicItem}>
                  <Text style={styles.comicTitle}>{item.Title}</Text>
                  <Text style={styles.comicGenre}>{item.Genre}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
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
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Semi-transparent background for blur effect
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
    paddingVertical:10,
    marginHorizontal:20,
    marginVertical:10,
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
  comicItem: {
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: width - 40,
  },
  comicTitle: {
    color: 'white',
    fontSize: 18,
  },
  comicGenre: {
    color: 'grey',
    fontSize: 14,
  },
  contentText: {
    color: 'white',
    fontSize: 24,
  },
});
