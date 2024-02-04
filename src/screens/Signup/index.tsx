import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../config/theme';
import {Logo, SignupImg} from '../../assets/images';
import PrimaryButton from '../../extraComponents/PrimaryButton';
import InputField from '../../extraComponents/InputField';
import Separator from '../../extraComponents/Separator';
import GoogleBtn from '../../extraComponents/socialMediaSignup/GoogleBtn';
import SocialMediaLogin from '../../extraComponents/socialMediaSignup/SocialMediaLogin';
import { _signinWithGoogle } from '../../config/firebase/GoogleSignin';

interface Signup {
  navigation: any;
}
const Signup: React.FC<Signup> = ({navigation}) => {
  const navigateToSignin = () => {
    navigation.navigate('Signin');
  };
  const googleSignup = async()=>{
    _signinWithGoogle().then(data=>{
      if(!data){
        console.log("=> Google Login error::No data found",)
      }else{
        console.log("=> Google login success::",data)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
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
          <InputField placeholder="Email" keyboardType="email-address" />
          <InputField placeholder="Password" secureTextEntry={true} />
          <PrimaryButton text="Create now" onPress={() => {}} />
          <TouchableWithoutFeedback onPress={navigateToSignin}>
            <Text style={styles.signinText}>
              Already have an account?
              <Text style={styles.signinLink}> Signin</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Separator text={"or"} />
        <View style={{width:"100%",marginTop:10}}>
          <SocialMediaLogin googleLogin={googleSignup}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flex: 0.5,
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
    textAlign:"center"
  },
  signinLink: {
    color: COLORS.primary1,
    fontWeight: 'bold',
  },
});
export default Signup;
