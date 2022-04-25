import React, {useContext, useState} from 'react';
import {
  Appbar,
  Button,
  Divider,
  Menu,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Searchbar,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import LogInView from '../AccountView/LogInView';
import CreateAccountView from '../AccountView/CreateAccountView';
import LoggedInView from '../AccountView/LoggedInView';
import App from '../../App';
import {PixelRatio, SafeAreaView, View} from 'react-native';
import {AccountContext} from '../../Contexts/AccountContext';

const StoreHeader = ({navigation}) => {
  const {profileRole} = useContext(AccountContext);
  const [searching, setSearching] = useState(false);

  function filter() {}

  return (
    <View>
      {!searching ? (
        <Appbar.Header>
          <Appbar.Action icon={'magnify'} onPress={() => setSearching(true)} />
          <Appbar.Content title={'Store'} />
          {profileRole != null && profileRole !== '' ? (
            <Appbar.Action
              icon={'plus-circle'}
              onPress={() => navigation.navigate('Add')}
            />
          ) : (
            <></>
          )}
        </Appbar.Header>
      ) : (
        <Appbar.Header>
          <Appbar.Action
            icon={'arrow-left'}
            onPress={() => setSearching(false)}
          />
          <Searchbar style={{width: 800 / PixelRatio.get()}} />
          <Appbar.Action icon={'filter'} onPress={() => {}} />
        </Appbar.Header>
      )}
    </View>
  );
};

export default StoreHeader;
