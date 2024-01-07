import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from './AuthContext';
import {SplashScreen} from './screens/SplashScreen';
import {SignInStack} from './SignInStack';
import {MainStack} from './MainStack';

const Stack = createNativeStackNavigator();

export const Navigator: FC = () => {
  const {loading, user} = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      {loading ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      ) : !user ? (
        <Stack.Screen
          name="SignInStack"
          component={SignInStack}
          options={{
            title: 'Sign in',
            headerShown: false,
            animationTypeForReplace: 'pop',
          }}
        />
      ) : (
        <Stack.Screen
          options={{
            title: 'Home',
            headerShown: false,
          }}
          name="MainStack"
          component={MainStack}
        />
      )}
    </Stack.Navigator>
  );
};
