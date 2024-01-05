/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {PhoneSignIn} from './PhoneSignIn';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <PhoneSignIn />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
