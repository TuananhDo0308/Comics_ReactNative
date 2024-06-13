import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, ImageBackground, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import { fetchComicsList, fetchFavoriteComics } from '../../api/api';
import ComicGerne from '../../components/ComicGerne';
import HomeBottomNavigation from '../../navigations/HomeBottomNavigation';
import Modal from 'react-native-modal';
import { PanGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width } = Dimensions.get('window');

const Profile = () => {
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  const [comicsList, setComicsList] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [currentComicId, setCurrentComicId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchComicsList().then(comics => {
      setComicsList(comics);
      if (comics.length > 0) {
        setCurrentComicId(comics[0].id);
      }
    });
  }, []);

  useEffect(() => {
    fetchFavoriteComics().then(setFavoriteComics);
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

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedIn'); // Xóa trạng thái đăng nhập
    navigation.navigate('SignIn'); // Điều hướng đến màn hình đăng nhập
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.topNav}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Image style={styles.buttonImg} source={require('../../assets/icon/logoutIcon.png')}></Image>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.infoSpace}>
                <Image style={styles.avatar} source={require('../../assets/img1.png')}/>
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
                  decelerationRate="normal"
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.horizontalScroll2}
                  initialNumToRender={10}
                />
            </View>

            <View style={styles.continueRead}>
              <Text style={styles.continueReadTitle}>FAVOURITE</Text>
              <FlatList
                  data={favoriteComics}
                  renderItem={({ item }) => item ? <ComicGerne item={item} /> : null}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="normal"
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.horizontalScroll2}
                  initialNumToRender={10}
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
            <Image style={styles.avatar} source={require('../../assets/img1.png')}/>
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
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  userName: {
    color: 'white',
    marginTop: 20,
    fontSize: 24,
  },
  infoSpace: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 1000,
  },
  editButton: {
    marginTop: 20,
    borderRadius: 100,
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.5)', 
  },
  horizontalScroll2: {
    paddingLeft: 10, // Thêm khoảng cách giữa các mục
  },
  continueRead: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: width - 20,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  continueReadTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
    marginLeft: 5,
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
  topNav: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  button: {
    height: 20,
    marginHorizontal: 20,
    width: 20,
  },
  buttonImg: {
    height: 20,
    width: 20,
    tintColor: 'white', // Đảm bảo biểu tượng có màu trắng
  },
});
