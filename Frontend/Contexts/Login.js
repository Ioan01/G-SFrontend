import {HttpStatus, sendJsonRequest} from '../HttpHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {AccountContext} from './AccountContext';

export async function login(
  username,
  password,
  setLoggedIn,
  setHelperText,
  setLoading,
) {
  try {
    setLoading(true);
    const resp = await sendJsonRequest(
      'POST',
      'login',
      {username: username, password: password},
      '',
    );
    console.log(username + ' ' + password);
    switch (resp.status) {
      case HttpStatus.OK:
        global.token = await resp.text();
        console.log(global.token);
        setLoggedIn(true);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        setHelperText('Internal server error');
        break;
      default:
        setHelperText('No account found with the password specified');
        break;
    }
  } catch (error) {
    console.log(error);
    setHelperText(error.toString());
  }
  setLoading(false);
}

export async function getProfileData(
  setProfileName,
  setMoney,
  setProfileRole,
  onFail,
) {
  try {
    const response = await sendJsonRequest(
      'GET',
      'user/profile',
      null,
      global.token,
    );

    switch (response.status) {
      case HttpStatus.OK:
        const json = await response.json();
        setProfileName(json.username);
        setMoney(json.money);
        setProfileRole(json.role);
        console.log(JSON.stringify(json));
        break;
      default:
        if (onFail != null) {
          onFail();
        }
        break;
    }
  } catch (e) {
    console.log(e.toString());
  }
}
