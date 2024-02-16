import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SHADOWS} from '../../config/theme';
import {FallbackImage} from '../../assets/images';

interface CategoryCard {
  url: string;
  imgURL: string;
  name: string;
  width: number;
}

const CategoryCard: React.FC<CategoryCard> = ({url, imgURL, name, width}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={FallbackImage}
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: COLORS.gray2,
          }}>
          <Image
            source={{
              uri: imgURL,
            }}
            style={[
              {
                width: (width - 75) / 3,
                height: 100,
              },
              styles.image,
            ]}
          />
          <Text style={[styles.text, {maxWidth: (width - 75) / 3}]}>
            {name}
          </Text>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  image: {
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: FONTS.AcronymMedium,
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.balck,
    marginVertical: 5,
    position: 'absolute',
    bottom: -5,
    backgroundColor: '#fefefe90',
    padding: 5,
    left: 0,
    right: 0,
  },
});

export default CategoryCard;
