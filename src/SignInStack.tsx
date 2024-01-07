import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PhoneNumberScreen} from './screens/PhoneNumberScreen';
import {OTPScreen} from './screens/OTPScreen';

const Stack = createNativeStackNavigator();

export const SignInStack = () => {
  return (
    <Stack.Navigator initialRouteName="PhoneNumberScreen">
      <Stack.Screen
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
        options={{title: 'Sign in with phone number'}}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
          title: 'Confirm with OTP',
        }}
        name="OTPScreen"
        component={OTPScreen}
      />
    </Stack.Navigator>
  );
};
