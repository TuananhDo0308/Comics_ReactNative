import React from 'react';
import { View, SafeAreaView, Image, StyleSheet, Platform, FlatList, Text, Dimensions, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';

const images = [
  { id: '1', src: require('../../assets/img1.png') },
  { id: '2', src: require('../../assets/img2.png') },
  { id: '3', src: require('../../assets/img3.png') },
];

const { width, height } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar />
          <View style={styles.topNav}>
            <Image source={require('../../assets/imglogo.png')} style={styles.Img} />
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
              style={styles.listImg}
              data={images}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Image source={item.src} style={styles.image} />
              )}
              snapToInterval={width}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
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
  Img: {
    width: 30,
    height: 30,
  },
  image: {
    width: width,
    height: height,
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
