import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

const ChapterPagesNavigation = ({ totalChapters, currentChapter, onChapterChange }) => {
  const navigation = useNavigation();
  const [selectedChapter, setSelectedChapter] = useState(currentChapter);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleChapterChange = (chapter) => {
    setSelectedChapter(chapter);
    onChapterChange(chapter);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Image style={styles.image} source={require('../assets/icon/logoutIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleChapterChange(selectedChapter - 1)}>
          <Image style={styles.image} source={require('../assets/icon/logoutIcon.png')} />
        </TouchableOpacity>
        <Picker
          selectedValue={selectedChapter}
          style={styles.picker}
          onValueChange={(itemValue) => handleChapterChange(itemValue)}
        >
          {Array.from({ length: totalChapters }, (_, i) => (
            <Picker.Item key={i + 1} label={`Chapter ${i + 1}`} value={i + 1} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.navButton} onPress={() => handleChapterChange(selectedChapter + 1)}>
          <Image style={styles.image} source={require('../assets/icon/logoutIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => {
          const newColorScheme = isDarkMode ? 'light' : 'dark';
          // Handle theme change here
        }}>
          <Image style={styles.image} source={require('../assets/icon/logoutIcon.png')} />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    width: width - 80,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    }),
  },
  navBar: {
    flexDirection: 'row',
    padding: 8,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    overflow: 'hidden',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    tintColor: 'white',
    width: 24,
    height: 24,
  },
  picker: {
    flex: 3,
    color: 'white',
    height: 50,
  },
});

export default ChapterPagesNavigation;
