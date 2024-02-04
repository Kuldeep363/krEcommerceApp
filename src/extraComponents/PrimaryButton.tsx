import {StyleSheet, Text, Touchable, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {colors} from '../config/theme';
import Font from '../assets/fonts';

interface PrimaryGradientButton {
  text: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryGradientButton> = ({text, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.button}>
      <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
    backgroundColor: colors.primary1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '100%',
    shadowColor: colors.primary1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    ...Font.AcronymRegular,
  },
});

export default PrimaryButton;
