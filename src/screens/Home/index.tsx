import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  _getJSONDataFromAsyncStorage,
  _removeFromAsyncStorage,
} from '../../config/asyncStorage';
import {COLORS, FONTS, SAFE_AREA, SHADOWS} from '../../config/theme';
import Loader from '../../extraComponents/lottieAnimations/Loader';
import {_Signout} from '../../config/firebase/SigningSignup';
import {useToast} from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../../extraComponents/Avatar';
import AntDesign from '../../assets/Icons';
import {getName} from '../../utils';
import Banners from '../../components/Home/Banners';
import Categories from '../../extraComponents/category/Categories';
import Heading from '../../extraComponents/Heading';

interface Home {
  navigation: any;
}

const Home: React.FC<Home> = ({navigation}) => {
  const toast = useToast();
  const [shadow, setShadow] = useState({});
  const [userData, setUserData] = useState<any>({});
  const fetchUserData = useCallback(async () => {
    const data = await _getJSONDataFromAsyncStorage('userInfo');
    if (data) {
      let name =
        data.user?.givenName ||
        data.user?.displayName ||
        data.user?.name ||
        data.user?.email?.split('@')[0];
      name = getName(name);
      data.user.username = name;
      setUserData(data?.user);
    }
  }, []);

  const signout = async () => {
    console.log('signing out');
    const response = await _Signout();
    if (response.status) {
      const removed = await _removeFromAsyncStorage('userInfo');
      if (removed) {
        toast.show(response.msg, {
          type: 'success',
          duration: 500,
        });
        setTimeout(() => {
          navigation.replace('Signin');
        }, 600);
      }
    }
    return;
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      onScroll={event => {
        const y = event.nativeEvent.contentOffset.y;
        if (y >= 50) setShadow({...SHADOWS.bottom});
        else setShadow({});
      }}>
      {/* top of home page */}
      <LinearGradient
        colors={['#BBBEDD', '#BBBEDD00']}
        style={styles.headerSection}
        locations={[0, 0.8]}>
        <View style={styles.user}>
          <Avatar />
          <Text style={styles.welcome}>
            Hello,{'\n'}
            <Text style={styles.name}>{userData?.username}</Text>
          </Text>
        </View>
        <View style={styles.notification}>
          <TouchableWithoutFeedback>
            <AntDesign name="bells" size={18} color={COLORS.primary1} />
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>

      {/* search bar section */}
      <View style={[styles.section, styles.search, shadow]}>
        <TouchableOpacity
          style={styles.searchBox}
          onPressIn={() => navigation.navigate('Search')}>
          <AntDesign name="search1" size={16} />
          <Text
            style={{
              fontFamily: FONTS.AcronymRegular,
              color: COLORS.gray,
            }}>
            Search for "parada perfumes"
          </Text>
        </TouchableOpacity>
      </View>

      {/* Banner section */}
      <View style={[styles.section, {marginTop: 10}]}>
        <Banners />
      </View>

      {/* Category section */}
      <View style={styles.categories}>
        <Heading startText='Your Favourite' endText=' Categories' imgURL='https://i.ibb.co/NZDBdMX/line-stroke.png' />
        <Categories />
      </View>

      {/* Products for you section */}
      <View style={styles.section}>
            <Heading startText='Products for' endText=' You' imgURL='https://i.ibb.co/NZDBdMX/line-stroke.png' />
      </View>

      <TouchableOpacity onPress={signout}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    paddingVertical: 20,
    paddingHorizontal: SAFE_AREA,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  welcome: {
    fontFamily: FONTS.AcronymRegular,
    fontSize: 16,
  },
  name: {
    fontFamily: FONTS.AcronymMedium,
    fontSize: 20,
    color: COLORS.primary1,
  },
  notification: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  search: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.white,
  },
  section: {
    paddingHorizontal: SAFE_AREA,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  categories: {
    paddingHorizontal: SAFE_AREA,
  },
  categoriesTitle: {
    color: COLORS.balck,
    fontFamily: FONTS.AcronymMedium,
    fontSize: 16,
  },
  categoriesTitleInnerText: {
    fontFamily: FONTS.AcronymMedium,
    fontSize: 16,
    color: COLORS.primary1,
  },
  
});

export default Home;
