import {Image, ImageBackground, StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {SplashScreenBkg, WhiteLogo} from '../../assets/images';
import Font from '../../assets/fonts'; 

const SplashScreen = () => {
  return (
    <ImageBackground
      source={SplashScreenBkg}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      resizeMode={'cover'}>
      <View style={styles.logoContainer}>
        <Image
          source={WhiteLogo}
          resizeMode={'contain'}
          style={styles.logo}
        />
        <Text style={styles.text}>Emporium</Text>
      </View>
      <Text style={styles.enterpriseText}>A product by KR enterprises</Text>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    logoContainer:{
        gap:10,
        alignItems:"center",
    }
    ,
    logo:{
        width: 75,
        height: 75,
    },
    text:{
        ...Font.Montserrat,
        color:"#fefefe",
        fontSize:18,
      },
      enterpriseText:{
        position:"absolute",
        bottom:5,
        color:"#fefefe",
        textTransform:"uppercase",
        fontSize:12,
        ...Font.Caveat
      }
})