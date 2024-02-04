import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

interface GradientButton{
  onPress:()=>void,
  text:string,
  colors: string[]
}

const GradientButton:React.FC<GradientButton> = ({ onPress, text, colors }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors} style={styles.gradient}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GradientButton;
