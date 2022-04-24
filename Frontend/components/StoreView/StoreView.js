import React, {useContext, useEffect, useState} from 'react';
import {
  Appbar,
  Button,
  Caption,
  Card,
  Divider,
  Headline,
  Menu,
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

const StoreView = ({role}) => {
  const {profileRole} = useContext(AccountContext);

  const [items, setItems] = useState([]);

  const [visible] = useState(true);

  const pageSize = 20;

  async function fetchPage(page) {
    try {
      const response = await sendUrlEncodedRequest('GET', 'products/get-page', {
        page: page,
        pageSize: pageSize,
      });

      let json = await response.json();
      setItems(json.products);
      console.log(items);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    try {
      fetchPage(0);
    } catch (e) {}
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    'italy',
    'spain',
    'barcelona',
    'finland',
  ]);
  const [items2, setItems2] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {
      label: 'Rome',
      value: 'rome',
      parent: 'italy',
    },

    {label: 'Finland', value: 'finland'},
  ]);

  return (
    <Provider>
      <StoreHeader />
      <DropDownPicker
        open={false}
        value={value}
        items={items2}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems2}
        multiple={true}
        multipleText={value.toString()}
        mode="SIMPLE"
      />

      <FlatList
        data={items}
        renderItem={({item}) => (
          <Card
            mode={'outlined'}
            style={{marginVertical: 10, marginHorizontal: 20}}>
            <Card.Title title={item.name} titleStyle={{alignSelf: 'center'}} />
            <Card.Cover
              source={{uri: 'https://picsum.photos/700'}}
              style={{margin: 10, alignSelf: 'stretch'}}
            />

            <Card.Content>
              <Headline>{item.price + '$'}</Headline>
            </Card.Content>
          </Card>
        )}
      />
    </Provider>
  );
};

export default StoreView;
