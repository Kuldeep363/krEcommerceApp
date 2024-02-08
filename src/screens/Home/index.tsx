import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { _getJSONDataFromAsyncStorage } from '../../config/asyncStorage';
import { COLORS } from '../../config/theme';
import Loader from '../../extraComponents/lottieAnimations/Loader';

const Home:React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const fetchUserData = useCallback(async()=>{
    const data = await _getJSONDataFromAsyncStorage("userInfo")
    if(data) setUserData(data?.user)
  },[])
  useEffect(()=>{
    fetchUserData() 
  },[])
  return (
    <View>
      <Text>{userData?.givenName}</Text>
      <Loader />
    </View>
  )
}

export default Home