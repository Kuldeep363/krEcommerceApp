import { View, Text, Platform } from 'react-native'
import React from 'react'
import GoogleBtn from './GoogleBtn'
import AppleBtn from './AppleBtn'

interface SocialMediaLogin{
    googleLogin?:()=>void,
    appleLogin?:()=>void
}

const SocialMediaLogin:React.FC<SocialMediaLogin> = ({googleLogin,appleLogin}) => {
    function renderBtns(){
        switch(Platform.OS){
            case "android":
                return <GoogleBtn login={googleLogin} />
            case "ios":
                return <AppleBtn login={appleLogin}/>
            case "macos":
                return (
                    <>
                    <GoogleBtn login={googleLogin} />
                    <AppleBtn login={appleLogin} />
                    </>
                )
            case "web":
                return (
                    <>
                    <GoogleBtn login={googleLogin} />
                    <AppleBtn login={appleLogin} />
                    </>
                )
            case "windows":
                return (
                    <>
                    <GoogleBtn login={googleLogin} />
                    <AppleBtn login={appleLogin} />
                    </>
                )
            default:
                return null;
        }
    }
  return (
    <View style={{gap:10}}>
        {renderBtns()}
    </View>
  )
}

export default SocialMediaLogin