import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, ImageBackground, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { fetchComicsList } from '../../api/api';
import ComicGerne from '../../components/ComicGerne';
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';
import Modal from 'react-native-modal';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Profile = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const [comicsList, setComicsList] = useState([]);
  const [currentComicId, setCurrentComicId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    fetchComicsList().then(comics => {
      setComicsList(comics);
      if (comics.length > 0) {
        setCurrentComicId(comics[0].id);
      }
    });
  }, []);

  const handleGesture = (event) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 0) {
      setTranslateY(translationY);
    }
  };

  const handleGestureEnd = (event) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 100) {
      setModalVisible(false);
    }
    setTranslateY(0);
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.infoSpace}>
                <Image style={styles.avatar} source={require('../../assets/img1.jpg')}/>
                <Text style={styles.userName}>TuananhDo</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={[styles.userName,{fontSize:16},{marginTop:0},{fontWeight:'bold'}]}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.continueRead}>
              <Text style={styles.continueReadTitle}>CONTINUE READING</Text>
              <FlatList
                  data={comicsList}
                  renderItem={({ item }) => item ? <ComicGerne item={item} /> : null}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.horizontalScroll2}
                  pagingEnabled
                />
            </View>

            <View style={styles.continueRead}>
              <Text style={styles.continueReadTitle}>CONTINUE READING</Text>
              <FlatList
                  data={comicsList}
                  renderItem={({ item }) => item ? <ComicGerne item={item} /> : null}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.horizontalScroll2}
                  pagingEnabled
                />
            </View>
          </ScrollView>
          <HomeBottomNavigation currentRoute={currentRoute} />        
        </SafeAreaView>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onEnded={handleGestureEnd}
        >
          <View style={[styles.modalContent, { transform: [{ translateY }] }]}>
            <View style={styles.modalHandle} />
            <Image style={styles.avatar} source={require('../../assets/img1.jpg')}/>
            <Text style={styles.modalText}>Name</Text>
            {/* Thêm các thành phần khác cho bảng thông tin của bạn ở đây */}
          </View>
        </PanGestureHandler>
      </Modal>
    </ImageBackground>
  );
};

export default Profile;

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
    backgroundColor: 'rgba(20, 20, 20, 0.9)', 
    width: '100%',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom:80,
  },
  userName: {
    color: 'white',
    marginTop:20,
    fontSize: 24,
  },
  infoSpace:{
    flexDirection:'column',
    marginTop:20,
    alignItems:'center',
  },
  avatar:{
    height:100,
    width:100,
    borderRadius:1000,
  },
  editButton:{
    marginTop:20,
    borderRadius:100,
    height:40,
    width:90,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(200, 200, 200, 0.5)', 
  },
  horizontalScroll2: {
    width:width,
  },
  continueRead:{
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    width:width-20,
    marginVertical:20,
    marginHorizontal:10,
  },
  continueReadTitle:{
    fontSize:16,
    fontWeight:'500',
    color:'grey',
    marginLeft:5
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
