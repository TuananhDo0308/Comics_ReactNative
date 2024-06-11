import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
const { width, height } = Dimensions.get('window');

const ComicItem = ({ item }) => {
  return (
    <View style={styles.comicItem}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.ImgURL }}
          style={styles.coverImage}
        />
        <Text style={styles.comicTitle}>{item.Title}</Text>
        <Text style={styles.comicAuthor}>{item.Author}</Text>
        {/* <BlurView intensity={30} style={[styles.tagContainer]}>
          <Text style={styles.tag}>{tagToDisplay}</Text>
        </BlurView> */}
      </View>
    </View>
  );
};

// const ComicItem = ({ item }) => {
//   // Lấy 1 thể loại
//   const tagToDisplay = item.tags[0];
  
//   // Lấy tên tác giả

//   return (
//     <View style={styles.comicItem} >
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: `https://uploads.mangadex.org/covers/${item.id}/${item.coverFileName}` }}
//           style={styles.coverImage}
//         />
//         <BlurView intensity={30} style={[styles.tagContainer]}>
//           <Text style={styles.tag}>{tagToDisplay}</Text>
//         </BlurView>
//       </View>
//       <View style={styles.comicInfo}>
//         <Text style={styles.comicTitle}>{item.attributes.title.en}</Text>
//       </View>
//     </View>
//   );
// };

export default ComicItem;

const styles = StyleSheet.create({
  comicItem: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    display: 'flex',
    marginHorizontal: 20,
    gap:20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    height: height-250,
    width: width - 40,
  },
  imageContainer: {
    width: '90%',
    height: '90%',
    borderRadius: 30,
    alignItems: 'center',
    shadowOpacity: 0.3,
    justifyContent: 'flex-end',
    shadowRadius: 12,
    elevation: 10,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  comicInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  comicTitle: {
    color: 'white',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  comicAuthor: {
    color: 'gray',
    fontSize: 14,
    marginVertical: 5,
  },
  tagContainer: {
    bottom: 20, 
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  tag: {
    color: 'white',
    fontSize: 12,
    borderRadius: 50,    
    paddingVertical: 10,
  },
  readButton: {
    marginTop: 20,
    backgroundColor: '#ff4b25',
    width: 170,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 0, 0, 0.75)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: 'rgba(255, 0, 0, 0.75)',
      },
    }),
  },
  readButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});