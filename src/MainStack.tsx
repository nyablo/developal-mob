import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {AddContactScreen} from './screens/AddContactScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Contacts'}}
      />
      <Stack.Screen
        name="AddContactScreen"
        component={AddContactScreen}
        options={{title: 'Add contact'}}
      />
    </Stack.Navigator>
  );
};
