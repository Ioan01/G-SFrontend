import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button} from 'react-native-paper';
import {PixelRatio, View} from 'react-native';
import {AccountContext} from '../../Contexts/AccountContext';
import {HttpStatus, sendJsonRequest} from '../../HttpHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoggedInView = ({navigation}) => {
  const {
    profileName,
    setProfileName,
    profileRole,
    setProfileRole,
    money,
    setMoney,
    setPassword,
    setUsername,
    setLoggedIn,
  } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon={'logout'}
          compact={true}
          onPress={async () => await logout()}
        />
      ),
    });
  });

  async function logout() {
    try {
      await AsyncStorage.multiRemove(['username', 'password']);
      setUsername('');
      setPassword('');
      setLoggedIn(false);
    } catch (e) {}
  }

  async function getProfileData() {
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
          console.log(JSON.stringify(json));
          break;
        default:
          console.log('fail');
          break;
      }
    } catch (e) {
      console.log(e.toString());
    }
  }

  function logOut() {}

  useEffect(() => {
    if (global.token == null) {
      console.log('cannot find token');

      // more to be added later
    }
    getProfileData();
  }, []);
  return (
    <View
      style={{
        marginHorizontal: 30,
        marginTop: 100 / PixelRatio.get(),
        alignItems: 'center',
      }}>
      <Avatar.Text
        label={profileName.slice(0, 2)}
        size={250 / PixelRatio.get()}
      />
    </View>
  );
};

export default LoggedInView;
