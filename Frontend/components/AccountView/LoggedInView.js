import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Badge, Button, List, Surface, Title} from 'react-native-paper';
import {PixelRatio, SafeAreaView, ScrollView, View} from 'react-native';
import {AccountContext} from '../../Contexts/AccountContext';
import {HttpStatus, sendJsonRequest, server} from '../../HttpHandler';
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
    profilePhoto,
    setProfilePhoto,
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
      setProfileRole(null);
    } catch (e) {}
  }
  return (
    <SafeAreaView
      style={{
        marginTop: 50 / PixelRatio.get(),
      }}>
      <ScrollView on>
        <Avatar.Image
          source={{uri: server + 'image/?id=' + profilePhoto}}
          size={400 / PixelRatio.get()}
          style={{alignSelf: 'center'}}
        />

        <List.Section title={'Profile details'}>
          <List.Item
            title={profileName}
            description={'This is your public profile name'}
            left={props => <List.Icon icon={'bitcoin'} />}
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
          title={'Change password'}
          left={props => <List.Icon icon={'lock'} />}
        />
        <List.Item
          onPress={() => {}}
          title={'Delete account'}
          left={props => <List.Icon icon={'delete'} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoggedInView;
