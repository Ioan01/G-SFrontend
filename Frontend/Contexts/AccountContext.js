import React, {createContext, useState} from 'react';

export const AccountContext = createContext({
  username: '',
  setUsername: username => {},

  password: '',
  setPassword: password => {},

  loggedIn: false,
  setLoggedIn: loggedIn => {},

  profileName: '',
  setProfileName: profileName => {},
  profileRole: '',
  setProfileRole: profileRole => {},
  money: 0,
  setMoney: money => {},
});
