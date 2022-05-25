import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Appbar,
  Avatar,
  Banner,
  Button,
  Card,
  Divider,
  HelperText,
  Paragraph,
  Provider,
  Snackbar,
  TextInput,
  Title,
} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogInView from './LogInView';
import CreateAccountView from './CreateAccountView';
import LoggedInView from './LoggedInView';
import AccountContextProvider, {
  AccountContext,
} from '../../Contexts/AccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const style = require('../../styles');

const ProfileView = () => {
  const accountViewStack = createStackNavigator();

  const {setPassword, setUsername, setFoundAccount, loggedIn} =
    useContext(AccountContext);

  useEffect(() => {
    if (loggedIn) {
      return;
    }
    try {
      AsyncStorage.multiGet(['username', 'password']).then(pair => {
        if (pair[0][1] != null && pair[1][1] != null) {
          setUsername(pair[0][1]);
          setPassword(pair[1][1]);

          setFoundAccount(true);
        }
      });
    } catch (e) {}
  }, []);

  return (
    <NavigationContainer independent={true}>
      <accountViewStack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        {!loggedIn ? (
          <accountViewStack.Group>
            <accountViewStack.Screen name="Log In" component={LogInView} />
            <accountViewStack.Screen
              name="Create Account"
              component={CreateAccountView}
            />
          </accountViewStack.Group>
        ) : (
          <accountViewStack.Group>
            <accountViewStack.Screen name="Account" component={LoggedInView} />
          </accountViewStack.Group>
        )}
      </accountViewStack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileView;
