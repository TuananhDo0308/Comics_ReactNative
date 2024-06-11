import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Chapters = () => {
  const route = useRoute();
  const { mangaId } = route.params;
  const [chapters, setChapters] = useState([]);
  const navigation=useNavigation()

  useEffect(() => {
    fetch(`https://api.mangadex.org/manga/${mangaId}/feed?limit=500`)
      .then(response => response.json())
      .then(data => {
        setChapters(data.data);
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
      });
  }, [mangaId]);

  const handlePress = (chapterId) => {
    navigation.navigate('ChapterPages', { chapterId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chapters}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.chapterItem}>
            <Text style={styles.chapterTitle}>Chapter {item.attributes.chapter}: {item.attributes.title}</Text>
            {item.attributes.background ? (
              <Image source={{ uri: item.attributes.background }} style={styles.chapterBackground} />
            ) : (
              <Text style={styles.noBackground}>No background available</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 10,
  },
  chapterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chapterTitle: {
    fontSize: 18,
  },
  chapterBackground: {
    width: width - 20,
    height: height * 0.4,
    borderRadius: 10,
    marginTop: 10,
  },
  noBackground: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'gray',
  },
});
