import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../config/theme';
import {AvatarImg} from '../assets/images';
import {Image} from 'react-native';

const Avatar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={AvatarImg} resizeMode="contain" style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.primary1,
    borderRadius: 55,
    overflow:"hidden"
  },
  img: {
    width: 55,
    height: 55,
  },
});

export default Avatar;
