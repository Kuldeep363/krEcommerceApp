import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SplashScreenBkg, WhiteLogo} from '../../assets/images';
import { FONTS } from '../../config/theme';
import { checkLogin } from '../../config/api';
import { checkIsOnBoardingDone } from '../../utils';

interface SplashScreen {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreen> = ({navigation}) => {
  setTimeout(() => {
    checkUser();
  }, 2000);
  async function checkUser() {
    checkLogin()
    .then(res=>{
      if(res) navigation.replace('Home');
      else {
        checkIsOnBoardingDone()
        .then(res=>{
          if(res) navigation.replace('Signin');
          else navigation.replace('Onboarding');
        })

      };
    })
  }
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
        <Image source={WhiteLogo} resizeMode={'contain'} style={styles.logo} />
        <Text style={styles.text}>Emporium</Text>
      </View>
      <Text style={styles.enterpriseText}>A product by KR enterprises</Text>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logoContainer: {
    gap: 10,
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75,
  },
  text: {
    fontFamily:FONTS.AcronymRegular,
    color: '#fefefe',
    fontSize: 18,
  },
  enterpriseText: {
    position: 'absolute',
    bottom: 5,
    color: '#fefefe',
    textTransform: 'uppercase',
    fontSize: 12,
    fontFamily:FONTS.Caveat,
  },
});
