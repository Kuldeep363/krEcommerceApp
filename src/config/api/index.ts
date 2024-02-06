import { _getJSONDataFromAsyncStorage } from "../asyncStorage"

const BASE_URL = ""

export const checkLogin = async ()=>{
    const user = await _getJSONDataFromAsyncStorage("userInfo");
    return user?true:false;
}