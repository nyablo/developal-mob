/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/AuthContext';
import {Navigator} from './src/Navigator';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

export default App;
