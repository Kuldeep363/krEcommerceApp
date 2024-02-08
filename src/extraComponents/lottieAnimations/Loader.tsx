import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { FONTS } from '../../config/theme';
import { Loading } from '.';
interface Loader{
    text?:string,
    textColor?:string
}

const Loader: React.FC<Loader> = ({text,textColor}) => {
    return (
        <View style={styles.container}>
          <LottieView
            source={{
                uri:Loading
            }}
            style={styles.animation}
            autoPlay
          />
          <Text style={[styles.text, {color:textColor}]}>{text}</Text>
        </View>
      );
}
const styles = StyleSheet.create({
    container:{
        gap:5,
        alignItems:"center"
    },
    animation: {
      width: 100,
      height: 100,
    },
    text:{
        fontFamily:FONTS.AcronymMedium
    }
  });
export default Loader