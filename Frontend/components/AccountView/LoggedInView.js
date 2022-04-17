import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Badge, Button, List, Surface, Title} from 'react-native-paper';
import {PixelRatio, View} from 'react-native';
import {AccountContext} from '../../Contexts/AccountContext';
import {HttpStatus, sendJsonRequest} from '../../HttpHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
    setFoundAccount,
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
      setFoundAccount(false);
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
          setMoney(json.money);
          setProfileRole(json.role);
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
      <Surface
        style={{
          marginBottom: 100 / PixelRatio.get(),
          elevation: 40,
          borderRadius: 100,
          borderWidth: 2,
        }}>
        <Avatar.Text
          label={profileName.slice(0, 2)}
          size={250 / PixelRatio.get()}
        />
      </Surface>
      <Surface
        style={{
          elevation: 10,
          alignSelf: 'stretch',
          borderRadius: 10,
        }}>
        <List.Section title={'Profile Details'}>
          <List.Item
            title={profileName}
            description={'This is your public profile name'}
            left={props => <List.Icon icon={'tag'} />}
          />
          <List.Item
            title={money.toString()}
            description={'This is your current balance'}
            left={props => <List.Icon icon={'bitcoin'} />}
          />
          <List.Item
            title={profileRole}
            description={'This is your role'}
            left={props => (
              <List.Icon
                icon={profileRole === 'client' ? 'face-man' : 'toolbox'}
              />
            )}
          />
        </List.Section>
        <List.Subheader>Change account details</List.Subheader>
        <List.Item
          onPress={() => {}}
          title={'Change username'}
          left={props => <List.Icon icon={'pen'} />}
        />
        <List.Item
          onPress={() => {}}
          title={'Change password'}
          left={props => <List.Icon icon={'lock'} />}
        />
        <List.Item
          onPress={() => {}}
          title={'Delete account'}
          left={props => <List.Icon icon={'delete'} />}
        />
      </Surface>
    </View>
  );
};

export default LoggedInView;
