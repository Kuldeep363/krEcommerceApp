import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { colors } from '../config/theme';

interface ScrollIndicators {
  count: number;
  currentIndex: number;
}

const ScrollIndicators: React.FC<ScrollIndicators> = ({
  count,
  currentIndex,
}) => {
    const indicatorsArray = [...Array(count)];
  return (
    <View style={styles.container}>
      {indicatorsArray.map((_,index) => {
        return <View key={index} style={[styles.indicator, index===currentIndex?styles.activeIndicator:styles.inactiveIndicator]}></View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    zIndex:20
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius:15,
  },
  activeIndicator:{
    backgroundColor:colors.balck
  },
  inactiveIndicator:{
    backgroundColor:colors.subText
  }
  
});

export default ScrollIndicators;
