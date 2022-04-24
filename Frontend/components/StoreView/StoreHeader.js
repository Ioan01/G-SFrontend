import React, {useState} from 'react';
import {
  Appbar,
  Button,
  Divider,
  Menu,
  Provider,
  Searchbar,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import LogInView from '../AccountView/LogInView';
import CreateAccountView from '../AccountView/CreateAccountView';
import LoggedInView from '../AccountView/LoggedInView';
import App from '../../App';
import {PixelRatio, SafeAreaView, View} from 'react-native';

const StoreHeader = ({}) => {
  const [searching, setSearching] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  function add() {}

  function filter() {}

  return (
    <View>
      <Appbar>
        {!searching ? (
          <>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Appbar.Action
                  icon={'sort'}
                  onPress={() => setMenuVisible(true)}
                />
              }>
              <Menu.Item title={'Price increasing'} />
            </Menu>
            <SafeAreaView>
              <Searchbar />
            </SafeAreaView>
          </>
        ) : (
          <Appbar.Header>
            <Appbar.Action
              icon={'arrow-left'}
              onPress={() => setSearching(false)}
            />
          </Appbar.Header>
        )}
      </Appbar>
    </View>
  );
};

export default StoreHeader;
