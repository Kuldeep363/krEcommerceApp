import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {GoogleLogo} from '../../assets/images';
import {COLORS, FONTS, SHADOWS} from '../../config/theme';

interface GoogleBtn {
  login?: () => void;
}

const GoogleBtn: React.FC<GoogleBtn> = ({login}) => {
  return (
    <TouchableWithoutFeedback onPress={login}>
      <View style={styles.container}>
        <Image
          source={GoogleLogo}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={styles.text}>Continue with Google</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#dedede',
    ...SHADOWS.small,
  },
  text: {
    fontFamily: FONTS.AcronymRegular,
    fontSize: 15,
  },
});

export default GoogleBtn;
