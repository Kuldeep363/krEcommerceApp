import React from 'react';
import SplashScreen from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import OnBoardingScreens from './src/screens/Onboarding';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <SplashScreen {...props}  />}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
