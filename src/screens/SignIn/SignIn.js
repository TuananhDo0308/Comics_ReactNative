import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Image, StyleSheet, Platform, Text, Dimensions, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';

const items = [
  { id: '1', title: 'Discover high-quality free comics!' },
  { id: '2', title: 'Experience the best reading ever!' },
  { id: '3', title: 'Unlimited reading, anytime, anywhere!' },
  { id: '4', title: 'A rich collection of genres to explore!' },
  { id: '5', title: 'Daily updates, never miss a chapter!' },
  { id: '6', title: 'User-friendly interface, easy to use!' },
  { id: '7', title: 'Save your favorite stories, read offline!' },
  { id: '8', title: 'Customize your reading experience!' },
  { id: '9', title: 'Join a vibrant community of readers!' },
  { id: '10', title: 'Smooth reading experience, no ads!' },
];

const { width, height } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % items.length;
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 3000); // 5000ms = 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar />
          <View style={styles.topNav}>
            <View style={styles.ImgPlaceholder}>
              <Image source={require('../../assets/imglogo.png')} style={styles.Img} />            
            </View>
            <View style={styles.topNavSup}>
              <TouchableOpacity style={styles.topNavSup_Button}>
                <Text style={styles.topNavSup_Text}>Privacy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topNavSup_Button}>
                <Text style={styles.topNavSup_Text}>Help</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            <FlatList 
              ref={flatListRef}
              data={items}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.item}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
              )}
              snapToInterval={width}
              decelerationRate="normal"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            />
          </View>
          <View style={styles.botNav}>
            <TouchableOpacity style={styles.botNav_Button} onPress={() => navigation.navigate('SignInForm')}>
              <Text style={styles.botNav_Button_Text}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topNav: {
    height: 50,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImgPlaceholder: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  Img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  topNavSup: {
    flexDirection: 'row',
  },
  topNavSup_Button: {
    marginHorizontal: 5,
  },
  topNavSup_Text: {
    color: '#FFF',
  },
  body: {
    justifyContent: 'center',
    height: height - 300,
    alignItems: 'center',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: width - 40,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  botNav: {
    width: width,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botNav_Button: {
    backgroundColor: '#ff4b25',
    width: width - 90,
    height: 55,
    borderRadius: 10,
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
  botNav_Button_Text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
