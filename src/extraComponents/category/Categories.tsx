import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {_getAllCategories} from '../../api/products';
import CategoryCard from './CategoryCard';
import {COLORS, FONTS, SAFE_AREA} from '../../config/theme';
import AntDesign from '../../assets/Icons';
import LottieView from 'lottie-react-native';
import {Loading} from '../lottieAnimations';

const Categories = () => {
  const {width} = Dimensions.get('screen');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    const data = await _getAllCategories();
    setCategories(data);
    // setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{
            alignItems:"center",
            flex:1
        }}>
          <LottieView
            source={{
              uri: Loading,
            }}
            style={styles.animation}
            autoPlay
          />
        </View>
      ) : (
        <>
          {categories.slice(0, 8).map((item: any, index) => {
            return (
              <CategoryCard
                key={`${item.name}-${index}`}
                imgURL={item.image}
                url=""
                name={item.name}
                width={width}
              />
            );
          })}

          <TouchableWithoutFeedback
            style={{
              alignItems: 'center',
            }}>
            <View style={[styles.btn, {width: (width - 55) / 3}]}>
              <Text style={styles.btnText}>See All</Text>
              <AntDesign name="rightcircle" color={COLORS.white} size={16} />
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: COLORS.primary1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  btnText: {
    fontFamily: FONTS.AcronymMedium,
    color: COLORS.white,
    fontSize: 16,
  },
  animation: {
    width: 100,
    height: 100,
  },
});

export default Categories;
