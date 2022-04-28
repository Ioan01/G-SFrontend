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
import React, {useEffect, useState} from 'react';

const style = require('../Frontend/styles');

import ProfileView from './components/AccountView/ProfileView';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import StoreView from './components/StoreView/StoreView';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {AccountContext} from './Contexts/AccountContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HttpStatus, sendJsonRequest} from './HttpHandler';
import {getProfileData, login} from './Contexts/Login';

const App = () => {
  const Tab = createMaterialBottomTabNavigator();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [foundAccount, setFoundAccount] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileRole, setProfileRole] = useState('');
  const [money, setMoney] = useState(0);

  const [profilePhoto, setProfilePhoto] = useState('');

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      AsyncStorage.multiGet(['username', 'password']).then(pair => {
        if (pair[0][1] != null && pair[1][1] != null) {
          setUsername(pair[0][1]);
          setPassword(pair[1][1]);

          login(pair[0][1], pair[1][1], setLoggedIn, () => {}, setLoading).then(
            () =>
              getProfileData(
                setProfileName,
                setMoney,
                setProfileRole,
                setProfilePhoto,
                null,
              ),
          );
        }
      });
    } catch (e) {}
  }, []);

  return (
    <AccountContext.Provider
      value={{
        username: username,
        setUsername: setUsername,

        foundAccount: foundAccount,
        setFoundAccount: setFoundAccount,

        password: password,
        setPassword: setPassword,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        profileName: profileName,
        setProfileName: setProfileName,
        profileRole: profileRole,
        setProfileRole: setProfileRole,
        money: money,
        setMoney: setMoney,
        profilePhoto: profilePhoto,
        setProfilePhoto: setProfilePhoto,
      }}>
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
    </AccountContext.Provider>
  );
};

export default App;
