import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { _getJSONDataFromAsyncStorage, _removeFromAsyncStorage } from '../../config/asyncStorage';
import { COLORS } from '../../config/theme';
import Loader from '../../extraComponents/lottieAnimations/Loader';
import { _Signout } from '../../config/firebase/SigningSignup';
import { useToast } from 'react-native-toast-notifications';

interface Home{
  navigation:any
}

const Home:React.FC<Home> = ({navigation}) => {
  const toast = useToast();
  const [userData, setUserData] = useState<any>({});
  const fetchUserData = useCallback(async()=>{
    const data = await _getJSONDataFromAsyncStorage("userInfo")
    if(data) setUserData(data?.user)
  },[])

  const signout = async()=>{
    console.log("signing out")
    const response = await _Signout();
    if(response.status){
      const removed = await _removeFromAsyncStorage("userInfo");
      if(removed){
        toast.show(response.msg,{
          type:"success",
          duration:500
        })
        setTimeout(()=>{
          navigation.replace("Signin")
        },600)
      }
    }
    return;
  }
  useEffect(()=>{
    fetchUserData() 
  },[])
  return (
    <View>
      <Text>{userData?.givenName}</Text>
      <TouchableOpacity onPress={signout}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home