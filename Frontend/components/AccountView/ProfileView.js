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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [foundAccount, setFoundAccount] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileRole, setProfileRole] = useState('');
  const [money, setMoney] = useState(0);

  useEffect(() => {
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
      }}>
      <AccountContext.Consumer>
        {({loggedIn}) => {
          return (
            <NavigationContainer independent={true}>
              <accountViewStack.Navigator
                screenOptions={{
                  headerShown: true,
                }}>
                {!loggedIn ? (
                  <accountViewStack.Group>
                    <accountViewStack.Screen
                      name="Log In"
                      component={LogInView}
                    />
                    <accountViewStack.Screen
                      name="Create Account"
                      component={CreateAccountView}
                    />
                  </accountViewStack.Group>
                ) : (
                  <accountViewStack.Group>
                    <accountViewStack.Screen
                      name="Account"
                      component={LoggedInView}
                    />
                  </accountViewStack.Group>
                )}
              </accountViewStack.Navigator>
            </NavigationContainer>
          );
        }}
      </AccountContext.Consumer>
    </AccountContext.Provider>
  );
};

export default ProfileView;