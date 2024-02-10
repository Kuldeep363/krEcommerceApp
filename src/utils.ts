import AsyncStorage from "@react-native-async-storage/async-storage";

export const validateFormData = (formData: {
  email: string;
  password: string;
}): {
  status: boolean;
  msg: string;
} => {
  const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!formData.email && !formData.password) {
    return {
      status: false,
      msg: 'Please enter email and password',
    };
  }
  if (!formData.email) {
    return {
      status: false,
      msg: 'Please enter email',
    };
  } else if (emailRegx.test(formData.email) === false) {
    return {
      status: false,
      msg: 'Please enter correct email',
    };
  }
  if (!formData.password) {
    return {
      status: false,
      msg: 'Please enter password',
    };
  }
  return {
    status: true,
    msg: '',
  };
};

export const checkIsOnBoardingDone = async()=>{
  try{
    const onboarding = await AsyncStorage.getItem("onboarding");
    if(onboarding === "1") return true;
    return false;
  }catch(e){
    console.log(`=> on-boarding check: ${e}`);
    return false;
  }
}

export const getName = (data:string)=>{
      return data[0]?.toUpperCase() + data?.slice(1);
}