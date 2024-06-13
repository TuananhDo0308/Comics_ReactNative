import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

const ChapterPagesNavigation = ({ chapters, currentChapter, onChapterChange, onToggleDarkMode, isDarkMode }) => {
  const navigation = useNavigation();
  const [selectedChapter, setSelectedChapter] = useState(currentChapter);
  const colorScheme = useColorScheme();

  const handleChapterChange = (chapter) => {
    setSelectedChapter(chapter);
    onChapterChange(chapter);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Image style={styles.image} source={require('../assets/icon/closeIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => {
          const index = chapters.indexOf(selectedChapter);
          if (index > 0) {
            handleChapterChange(chapters[index - 1]);
          }
        }}>
          <Image style={styles.image} source={require('../assets/icon/backIcon.png')} />
        </TouchableOpacity>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedChapter}
            style={styles.picker}
            onValueChange={(itemValue) => handleChapterChange(itemValue)}
          >
            {chapters.map((chapter, index) => (
              <Picker.Item key={index} label={chapter} value={chapter} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.navButton} onPress={() => {
          const index = chapters.indexOf(selectedChapter);
          if (index < chapters.length - 1) {
            handleChapterChange(chapters[index + 1]);
          }
        }}>
          <Image style={[styles.image, styles.imageRotate]} source={require('../assets/icon/backIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onToggleDarkMode}>
          <Image style={styles.image} source={isDarkMode ? require('../assets/icon/darkIcon.png') : require('../assets/icon/lightIcon.png')} />
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
  imageRotate: {
    transform: [{ rotate: '180deg' }],
  },
  pickerContainer: {
    flex: 3,
    height: '100%',
    justifyContent: 'center',
  },
  picker: {
    color: 'white',
    width: '100%',
  },
});

export default ChapterPagesNavigation;
