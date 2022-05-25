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
import {sendUrlEncodedRequest} from '../../HttpHandler';

const StoreHeader = ({
  navigation,
  setLoading,
  setTotalPages,
  setPage,
  setItems,
  pageSize,
}) => {
  const {profileRole} = useContext(AccountContext);
  const [searching, setSearching] = useState(false);

  const [searchedType, setSearchedType] = useState('good');

  async function fetchFilteredPage(text) {
    setLoading(true);
    setPage(0);
    try {
      const response = await sendUrlEncodedRequest(
        'GET',
        'products/get-filtered-page',
        {
          page: 0,
          pageSize: pageSize,
          name: text,
          tags: '',
          type: searchedType,
          minPrice: 0,
          maxPrice: 9999,
        },
      );
      console.log(response);
      let json = await response.json();

      json.products.forEach(item => {
        const now = Date.now();

        const dateDelta = new Date(now - item.time);

        const [days, months, years] = [
          dateDelta.getUTCDate(),
          dateDelta.getMonth(),
          dateDelta.getFullYear() - 1970,
        ];
        if (years > 0) {
          item.date = years + ' years ago';
        } else if (months > 0) {
          item.date = months + ' months ago';
        } else {
          days === 1 ? (item.date = 'Today') : (item.date = days + ' days ago');
        }
      });

      setItems(json.products);
      setTotalPages(json.totalPages);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

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
          <Searchbar
            style={{width: 800 / PixelRatio.get()}}
            onChangeText={async text => {
              await fetchFilteredPage(text);
            }}
          />
          <Appbar.Action
            icon={searchedType === 'good' ? 'archive' : 'room-service'}
            onPress={() => {
              searchedType === 'good'
                ? setSearchedType('service')
                : setSearchedType('good');
            }}
          />
        </Appbar.Header>
      )}
    </View>
  );
};

export default StoreHeader;
