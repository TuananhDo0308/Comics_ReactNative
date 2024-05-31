import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Chapters = () => {
  const route = useRoute();
  const { mangaId } = route.params;
  const [chapters, setChapters] = useState([]);
  const navigation = useNavigation();

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
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.chapterItem}>
              <Text style={styles.chapterTitle}>Chapter {item.attributes.chapter}: {item.attributes.title}</Text>
            </View>
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
});
