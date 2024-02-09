import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, {useState} from 'react';
import {Logo, SigninImg} from '../../assets/images';
import {COLORS, FONTS} from '../../config/theme';
import Separator from '../../extraComponents/Separator';
import InputField from '../../extraComponents/InputField';
import PrimaryButton from '../../extraComponents/PrimaryButton';
import SocialMediaLogin from '../../extraComponents/socialMediaSignup/SocialMediaLogin';
import {_signinWithGoogle} from '../../config/firebase/GoogleSignin';
import {_storeJSONDataIntoAsyncStorage} from '../../config/asyncStorage';
import {useToast} from 'react-native-toast-notifications';
import Loader from '../../extraComponents/lottieAnimations/Loader';
import {validateFormData} from '../../utils';
import {_SigninUser} from '../../config/firebase/SigningSignup';

interface Signin {
  navigation: any;
}

const Signin: React.FC<Signin> = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleFormDataChange = (key: string, value: string) => {
    console.log(value);
    setFormData({...formData, [key]: value});
  };
  const navigateToSignup = () => {
    navigation.replace('Signup');
  };
  const toast = useToast();

  const signin = async () => {
    setLoading(true);
    const validation = validateFormData(formData);
    if (!validation.status) {
      setLoading(false);
      toast.show(validation.msg, {
        type: 'danger',
      });
      return;
    }
    const response = await _SigninUser(formData.email, formData.password);
    // console.log(response);
    if (response.status) {
      _storeJSONDataIntoAsyncStorage('userInfo', response?.data);
      toast.show('Logged in', {
        type: 'success',
        duration: 500,
      });
      setTimeout(() => {
        navigation.replace('Home');
      }, 600);
    } else {
      toast.show(response.msg, {
        type: 'danger',
      });
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    setLoading(true);
    _signinWithGoogle()
      .then(data => {
        if (!data) {
          console.log('=> Google Login error::No data found');
        } else {
          _storeJSONDataIntoAsyncStorage('userInfo', data);
          toast.show('Logged in', {
            type: 'success',
          });
          setTimeout(() => {
            navigation.replace('Home');
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary1} />
      <View style={styles.topSection}>
        <View style={styles.logoSection}>
          <Image
            source={Logo}
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode="contain"
          />
        </View>
        <Image
          source={SigninImg}
          style={{
            width: '100%',
            height: '70%',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.heading}>Welcome to Emporium</Text>
        <Text style={styles.subHeading}>
          Your one-stop destination for all your needs.
        </Text>
        <View style={styles.signupForm}>
          <InputField
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            handleChange={handleFormDataChange}
            name={'email'}
          />
          <InputField
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            handleChange={handleFormDataChange}
            name={'password'}
          />

          <PrimaryButton text="Login" onPress={signin} />
          <TouchableWithoutFeedback onPress={navigateToSignup}>
            <Text style={styles.signupText}>
              Don't have an account?
              <Text style={styles.signupLink}> Signup</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Separator text="or" />
        <View style={{width: '100%', marginTop: 10}}>
          <SocialMediaLogin googleLogin={googleLogin} />
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingWrapper}>
          <Loader />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flex: 0.65,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    width: '100%',
  },
  logoSectionText: {
    fontFamily: FONTS.AcronymRegular,
    fontSize: 18,
    color: COLORS.primary1,
  },
  bottomSection: {
    flex: 0.5,
    alignItems: 'center',
  },
  heading: {
    fontFamily: FONTS.AcronymMedium,
    fontSize: 24,
    color: COLORS.balck,
  },
  subHeading: {
    fontFamily: FONTS.AcronymRegular,
    fontSize: 16,
    color: COLORS.subText,
    textAlign: 'center',
  },
  signupText: {
    fontFamily: FONTS.AcronymLight,
    textAlign: 'center',
  },
  signupLink: {
    color: COLORS.primary1,
    fontWeight: 'bold',
  },
  signupForm: {
    marginVertical: 10,
    width: '100%',
    gap: 15,
  },
  loadingWrapper: {
    position: 'absolute',
    backgroundColor: COLORS.lightModalBkg,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Signin;
