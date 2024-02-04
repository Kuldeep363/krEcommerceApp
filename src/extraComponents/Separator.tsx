import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../config/theme';

interface Separator {
  text?: string;
}
const Separator: React.FC<Separator> = ({text}) => {
  return (
    <View style={styles.line}>
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    position: 'relative',
    width: '100%',
    height: 1,
    backgroundColor: '#dedede',
    marginVertical: 10,
  },
  text: {
    position: 'absolute',
    paddingHorizontal: 5,
    backgroundColor: '#f1f1f1',
    left: '50%',
    top: -10,
  },
});

export default Separator;
