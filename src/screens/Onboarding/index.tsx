import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {createRef, useRef, useState} from 'react';
import {OnBoardingScreensData} from '../../config/localAppData';
import {COLORS, FONTS} from '../../config/theme';
import ScrollIndicators from '../../extraComponents/ScrollIndicators';
import PrimaryButton from '../../extraComponents/PrimaryButton';

interface OnBoardingScreens {
  navigation: any;
} 
const OnBoardingScreens: React.FC<OnBoardingScreens> = ({navigation})=> {
  const {width, height} = Dimensions.get('screen');

  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = createRef<FlatList<any>>();

  const scrollToEnd = () => {
    console.log('object');
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const navigateToSigning = ()=>{
    navigation.replace("Signin")
  }
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const OnBoardingItem = ({item}: {item: any}) => {
    return (
      <View
        style={{
          width: width,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            width: width - 50,
            height: width,
          }}
        />
        <Text
          style={{fontFamily: FONTS.AcronymRegular, fontSize: 20, color: COLORS.balck}}>
          {item.heading}
        </Text>
        <Text
          style={{
            fontFamily:FONTS.AcronymRegular,
            fontSize: 14,
            textAlign: 'center',
            paddingHorizontal: 10,
            color: COLORS.subText,
          }}>
          {item.subHeading}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentIndex !== OnBoardingScreensData.length-1 ? (
        <TouchableWithoutFeedback onPress={scrollToEnd}>
          <View style={styles.skipBtn}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      <View
        style={{
          height: (height * 3) / 4,
          alignItems: 'center',
        }}>
        <Animated.FlatList
          ref={flatListRef}
          data={OnBoardingScreensData}
          keyExtractor={item => item.id.toString()}
          renderItem={item => <OnBoardingItem item={item.item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50, // Adjust as needed
          }}
        />
        <View>
          <ScrollIndicators
            count={OnBoardingScreensData.length}
            currentIndex={currentIndex}
          />
        </View>
      </View>
      {
        currentIndex === OnBoardingScreensData.length-1 ? 
        <View style={styles.button}>
          <PrimaryButton text="Get started" onPress={navigateToSigning} />
        </View>
        :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  button: {
    marginBottom: 15,
    paddingHorizontal: 16,
    width: '100%',
  },
  skipBtn: {
    padding: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  },
  skipBtnText: {
    fontFamily: FONTS.AcronymRegular,
  },
});

export default OnBoardingScreens