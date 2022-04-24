/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const style = require('../Frontend/styles');

import ProfileView from './components/AccountView/ProfileView';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import StoreView from './components/StoreView/StoreView';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const App = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarIndicatorStyle: {
              backgroundColor: style.TabHighlightColor,
            },
            tabBarStyle: {
              backgroundColor: style.TabColor,
            },
            tabBarIcon: ({focused, color}) =>
              style.TabBarIcon({route, focused, color}),
          })}>
          <Tab.Screen name={'Store'} component={StoreView} />
          <Tab.Screen name={'Profile'} component={ProfileView} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
