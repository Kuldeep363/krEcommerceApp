import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {Logo, SigninImg} from '../../assets/images';
import {COLORS} from '../../config/theme';

export default function Signin() {
  useEffect(() => {
    const backAction = () => {
      // Disable back button functionality
      return true; // Prevent default behavior (exit the app)
    };

    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Clean up event listener
    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary1} />
      <View style={styles.topSection}>
        <View style={styles.logoSection}>
          <Image
            source={Logo}
            style={{
              width: 35,
              height: 35,
            }}
            resizeMode="contain"
          />
          <Text style={styles.logoSectionText}>Emporium</Text>
        </View>
        <Image
          source={SigninImg}
          style={{
            width: '100%',
            height:"90%",
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"flex-start",
    gap: 10,
    width:"100%"
  },
  logoSectionText:{
    
  }
});
