import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { _getJSONDataFromAsyncStorage } from '../../config/asyncStorage';

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
    </View>
  )
}

export default Home