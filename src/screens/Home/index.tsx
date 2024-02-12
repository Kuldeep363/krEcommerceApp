import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  _getJSONDataFromAsyncStorage,
  _removeFromAsyncStorage,
} from '../../config/asyncStorage';
import {COLORS, FONTS, SAFE_AREA} from '../../config/theme';
import Loader from '../../extraComponents/lottieAnimations/Loader';
import {_Signout} from '../../config/firebase/SigningSignup';
import {useToast} from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../../extraComponents/Avatar';
import AntDesign from '../../assets/Icons';
import {getName} from '../../utils';
import Banners from '../../components/Home/Banners';

interface Home {
  navigation: any;
}

const Home: React.FC<Home> = ({navigation}) => {
  const toast = useToast();
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
    <View>
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
      <View style={styles.section}>
        <TouchableOpacity style={styles.searchBox} onPressIn={()=>navigation.navigate("Search")}>
          <AntDesign name='search1' size={16} />
          <Text
          style={{
            fontFamily:FONTS.AcronymRegular,
            color:COLORS.gray
          }}
          >Search for "parada perfumes"</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Banners />
      </View>
      <TouchableOpacity onPress={signout}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
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
  section:{
    paddingHorizontal:SAFE_AREA
  },
  searchBox:{
    borderWidth:1,
    borderColor:COLORS.gray2,
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:10,
    marginBottom:10,
    marginRight:10,
    backgroundColor:COLORS.white,
    flexDirection:"row",
    gap:15,
    alignItems:"center"
  }
});

export default Home;
