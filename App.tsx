import React from 'react';
import SplashScreen from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import OnBoardingScreens from './src/screens/Onboarding';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import {ToastProvider} from 'react-native-toast-notifications';
import { FONTS } from './src/config/theme';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <ToastProvider
      placement="bottom"
      duration={2000}
      animationType="slide-in"
      successColor="#2DB263"
      dangerColor="red"
      warningColor="orange"
      textStyle={{ fontFamily:FONTS.AcronymRegular }}
      normalColor="gray">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            options={{
              headerShown: false,
            }}>
            {props => <SplashScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreens}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

export default App;
