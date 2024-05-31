import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MovieItem from '../components/MovieInfo';

const movies = [
  { id: 1, title: 'Movie 1', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.0', imDB: '3.0', genre: 'Love', release: '4/10/2002', description: 'Hello Word', director: '', writers: '', actors: '' },
  { id: 2, title: 'Movie 2', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.5', imDB: '4.2', genre: 'Action', release: '5/15/2005', description: 'An action-packed adventure', director: 'Director 1', writers: 'Writer 1, Writer 2', actors: 'Actor 1, Actor 2, Actor 3' },
  { id: 3, title: 'Movie 3', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '3.8', imDB: '3.9', genre: 'Drama', release: '8/20/2010', description: 'A gripping drama', director: 'Director 2', writers: 'Writer 3', actors: 'Actor 4, Actor 5' },
  { id: 4, title: 'Movie 4', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.2', imDB: '3.8', genre: 'Comedy', release: '3/5/2015', description: 'A hilarious comedy', director: 'Director 3', writers: 'Writer 4', actors: 'Actor 6, Actor 7' },
  { id: 5, title: 'Movie 5', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '3.5', imDB: '3.6', genre: 'Thriller', release: '7/12/2018', description: 'A thrilling suspense', director: 'Director 4', writers: 'Writer 5, Writer 6', actors: 'Actor 8, Actor 9' },
  { id: 6, title: 'Movie 6', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '3.9', imDB: '4.1', genre: 'Horror', release: '11/25/2021', description: 'A terrifying horror', director: 'Director 5', writers: 'Writer 7', actors: 'Actor 10, Actor 11' },
  { id: 7, title: 'Movie 7', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.3', imDB: '4.4', genre: 'Sci-Fi', release: '9/30/2017', description: 'A futuristic sci-fi', director: 'Director 6', writers: 'Writer 8', actors: 'Actor 12, Actor 13' },
  { id: 8, title: 'Movie 8', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.8', imDB: '4.9', genre: 'Fantasy', release: '2/14/2014', description: 'An enchanting fantasy', director: 'Director 7', writers: 'Writer 9, Writer 10', actors: 'Actor 14, Actor 15' },
  { id: 9, title: 'Movie 9', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.6', imDB: '4.7', genre: 'Adventure', release: '6/8/2016', description: 'An exciting adventure', director: 'Director 8', writers: 'Writer 11', actors: 'Actor 16, Actor 17' },
  { id: 10, title: 'Movie 10', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '3.7', imDB: '3.8', genre: 'Mystery', release: '10/3/2019', description: 'A mysterious thriller', director: 'Director 9', writers: 'Writer 12', actors: 'Actor 18, Actor 19' },
  { id: 11, title: 'Movie 11', image: require('/Users/tuananhdo/Comics/assets/favicon.png'), meta: '4.1', imDB: '4.3', genre: 'Animation', release: '12/18/2013', description: 'An animated delight', director: 'Director 10', writers: 'Writer 13', actors: 'Actor 20, Actor 21' },
];


const Home = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <MovieItem
      key={item.id}
      movie={item}
      onPress={() => navigation.navigate('Movie Detail', { movie: item })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
