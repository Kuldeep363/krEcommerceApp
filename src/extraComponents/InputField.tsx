import {View, Text, StyleSheet, TextInput, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../config/theme';

interface InputField{
    placeholder:string,
    keyboardType?: KeyboardTypeOptions | undefined,
    secureTextEntry?: boolean
}

const InputField: React.FC<InputField> = ({placeholder,keyboardType="default",secureTextEntry=false}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput 
      placeholder={placeholder} 
      style={styles.inputField} 
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputWrapper: {
    borderColor: COLORS.primary1,
    borderBottomWidth: 1,
    paddingVertical:5
  },
  inputField: {
    padding: 0,
    fontFamily:FONTS.AcronymRegular
  },
});

export default InputField;
