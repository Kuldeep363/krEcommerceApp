import {View, Image, Animated, Dimensions, FlatList, ImageBackground} from 'react-native';
import React, {createRef, useRef, useState} from 'react';
import {HomeBanners} from '../../config/localAppData';
import ScrollIndicators from '../../extraComponents/ScrollIndicators';
import {FallbackImage} from '../../assets/images';

interface Banner {
  url: string | undefined;
}

const Banner: React.FC<Banner> = ({url}) => {
  const {width} = Dimensions.get('screen');
  return (
    <ImageBackground
    source={FallbackImage}
    resizeMode='cover'
      style={{
        width: width - 42,
        aspectRatio: 92 / 30,
        marginRight: 10,
        borderRadius:10,
        overflow:"hidden"
      }}>
      <Image
        source={{
          uri: url,
        }}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </ImageBackground>
  );
};

const Banners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = createRef<FlatList<any>>();

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Animated.FlatList
        ref={flatListRef}
        data={HomeBanners}
        keyExtractor={item => item.url}
        renderItem={({item}) => <Banner url={item.url} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50, // Adjust as needed
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          paddingVertical: 3,
          paddingHorizontal: 5,
          backgroundColor: '#fefefe56',
          borderRadius: 10,
        }}>
        <ScrollIndicators
          count={HomeBanners.length}
          currentIndex={currentIndex}
        />
      </View>
    </View>
  );
};

export default Banners;
