import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeIntoAsyncStorage = async (
  key: string,
  value: any,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log('=>Error while storing in async storage', error);
    return false;
  }
};
export const _storeJSONDataIntoAsyncStorage = async (
  key: string,
  value: object,
): Promise<boolean> => {
  try {
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue);
    return true;
  } catch (error) {
    console.log('=>Error while storing in async storage', error);
    return false;
  }
};
export const _getFromAsyncStorage = async (
  key: string,
): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) return value;
    return null;
  } catch (error) {
    console.log('=>Error while getting from async storage', error);
    return null;
  }
};
export const _getJSONDataFromAsyncStorage = async (
  key: string,
): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  } catch (error) {
    console.log('=>Error while getting from async storage', error);
    return null;
  }
};

export const _removeFromAsyncStorage = async (key:string):Promise<any|null>=>{
  try{
    await AsyncStorage.removeItem(key);
    return true;
  }catch(e){  
    console.log(e);
    return false
  }
}

export const _removeMultipleFromAsyncStorage = async (key:Array<string>):Promise<any|null>=>{
  try{
    await AsyncStorage.multiRemove(key);
    return true;
  }catch(e){  
    console.log(e);
    return false
  }
}

export const _setOnboardingTrue = async()=>{
  try{
    await AsyncStorage.setItem("onboarding","1");
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}
