import React, {useContext, useEffect, useState} from 'react';
import {
  Appbar,
  Button,
  Caption,
  Card,
  Chip,
  Divider,
  Headline,
  Menu,
  Modal,
  Portal,
  Provider,
  Searchbar,
  Text,
} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {sendUrlEncodedRequest} from '../../HttpHandler';
import App from '../../App';
import {AccountContext} from '../../Contexts/AccountContext';
import StoreHeader from './StoreHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon} from 'react-native-vector-icons/dist';
import AvatarIcon from 'react-native-paper/src/components/Avatar/AvatarIcon';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BrowseStoreView from './BrowseView';
import AddScreenView from './AddScreenView';

const StoreView = ({role}) => {
  const storeViewStack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <storeViewStack.Navigator
        screenOptions={({route}) => {
          if (route.name == 'Browse') {
            return {headerShown: false};
          }
          return {headerShown: true};
        }}>
        <storeViewStack.Screen name={'Browse'} component={BrowseStoreView} />
        <storeViewStack.Screen name={'Add'} component={AddScreenView} />
      </storeViewStack.Navigator>
    </NavigationContainer>
  );
};

export default StoreView;
