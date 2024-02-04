import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const _signinWithGoogle = async()=>{
    try{
        GoogleSignin.configure({
            offlineAccess:false,
            webClientId:"489028456-amk0bafie2kj3620ifqduermh2upg3gi.apps.googleusercontent.com",
            scopes:["profile","email"]
        })
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userProfile  = await GoogleSignin.signIn();
        console.log(userProfile);
        const {idToken} = userProfile;
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential);
        return userProfile;
    }catch(err){
        console.log("Google signin::",err)
        return null;
    }
}