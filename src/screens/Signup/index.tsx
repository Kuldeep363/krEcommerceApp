import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../../config/theme';
import {Logo, SignupImg} from '../../assets/images';
import PrimaryButton from '../../extraComponents/PrimaryButton';
import InputField from '../../extraComponents/InputField';
import Separator from '../../extraComponents/Separator';
import SocialMediaLogin from '../../extraComponents/socialMediaSignup/SocialMediaLogin';
import {_signinWithGoogle} from '../../config/firebase/GoogleSignin';
import {_storeJSONDataIntoAsyncStorage} from '../../config/asyncStorage';
import {useToast} from 'react-native-toast-notifications';
import Loader from '../../extraComponents/lottieAnimations/Loader';
import { validateFormData } from '../../utils';
import { _SignupUser } from '../../config/firebase/SigningSignup';

interface Signup {
  navigation: any;
}
const Signup: React.FC<Signup> = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const navigateToSignin = () => {
    navigation.replace('Signin');
  };

  const handleFormDataChange = (key: string, value: string) => {
    console.log(value);
    setFormData({...formData, [key]: value});
  };

  const signup = async () => {
    setLoading(true);
    const validation = validateFormData(formData)
    if (!validation.status) {
      setLoading(false);
      toast.show(validation.msg,{
        type:"danger"
      })
      return;
    };
    const response = await _SignupUser(formData.email,formData.password)
    // console.log(response);
    if(response.status){
      _storeJSONDataIntoAsyncStorage("userInfo",{user:response?.data})
      toast.show("Account created",{
        type:"success",
        duration:800
      })
      setTimeout(() => {
        toast.show("Logging in",{
          type:"success",
          duration:800
        })
      }, 801);
      setTimeout(() => {
        navigation.replace('BottomTab');
      }, 1602);
    }else{
      toast.show(response.msg,{
        type:"danger"
      });
    }
    setLoading(false);
  };
  
  const googleSignup = async () => {
    setLoading(true);
    _signinWithGoogle()
      .then(data => {
        if (!data) {
          console.log('=> Google Login error::No data found');
        } else {
          _storeJSONDataIntoAsyncStorage('userInfo', data);
          toast.show('Created successfully', {
            type: 'success',
          });
          setTimeout(() => {
            navigation.replace('BottomTab');
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
          source={SignupImg}
          style={{
            width: '100%',
            height: '70%',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.heading}>Create an account</Text>
        <Text style={styles.subHeading}>
          Join <Text style={{color: COLORS.primary1}}>Emporium</Text> and get
          exclusive discounts and deals available only to our members!
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
          <PrimaryButton text="Create now" onPress={signup} />
          <TouchableWithoutFeedback onPress={navigateToSignin}>
            <Text style={styles.signinText}>
              Already have an account?
              <Text style={styles.signinLink}> Signin</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Separator />
        <View style={{width: '100%', marginTop: 10}}>
          <SocialMediaLogin googleLogin={googleSignup} />
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
    flex: 0.6,
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
  signupForm: {
    marginVertical: 10,
    width: '100%',
    gap: 15,
  },
  signinText: {
    fontFamily: FONTS.AcronymLight,
    textAlign: 'center',
  },
  signinLink: {
    color: COLORS.primary1,
    fontWeight: 'bold',
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
export default Signup;
