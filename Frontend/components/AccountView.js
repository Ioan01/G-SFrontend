import React, {Component, useState} from 'react';
import {Button, Image, Modal, Text, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Banner,
  Card,
  Divider,
  Paragraph,
  Portal,
  Provider,
  Title,
} from 'react-native-paper';
import App from '../App';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const style = require('../styles');

const AccountView = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [tab, setCurrent] = useState('B');

  const selectedTab = () => {
    if (!loggedIn) {
      return <LogInView />;
    } else {
      return <LoggedInView />;
    }
  };

  const CreateAccount = () => {
    return (
      <View>
        <Button title={'log'} />
      </View>
    );
  };

  const LogIn = () => {
    return (
      <View>
        <Button title={'log2'} />
      </View>
    );
  };

  const LogInView = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator tabBarPosition={'top'}>
          <Tab.Screen name="Home" component={CreateAccount} />
          <Tab.Screen name="Settings" component={LogIn} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  const LoggedInView = () => {
    return (
      <View>
        <Button title={'bb'} onPress={() => setCurrent('A')} />
      </View>
    );
  };

  return <View>{selectedTab()}</View>;
};

export default AccountView;
