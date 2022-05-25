'use strict';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

module.exports = StyleSheet.create({
  TabColor: '#FF7173',
  TabHighlightColor: '#F72932',

  TabBarIcon: ({route, focused, color}) => {
    let icon = 'user';
    switch (route.name) {
      case 'Store':
        icon = 'store';
        break;
      case 'Search':
        icon = 'search';
        break;
      case 'Profile':
        icon = 'user';
        break;
    }
    color = focused ? '#272932' : '#E7ECEF';
    return <Icon name={icon} size={20} color={color} />;
  },

  Page: {
    backgroundColor: '#E7ECEF',
  },

  Button: {
    style: {
      allignSelf: 'stretch',
    },
    color: '#272932',
  },
});
