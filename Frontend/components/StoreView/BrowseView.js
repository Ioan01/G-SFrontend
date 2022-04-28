import React, {createContext, useEffect, useState} from 'react';
import StoreHeader from './StoreHeader';
import {FlatList, PixelRatio, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  Provider,
} from 'react-native-paper';
import {sendUrlEncodedRequest, server} from '../../HttpHandler';
import BottomBrowseView from './BottomBrowseView';

const BrowseView = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  function addItems(items) {
    setItems(items.concat(items));
  }

  async function fetchPage() {
    setLoading(true);
    try {
      const response = await sendUrlEncodedRequest('GET', 'products/get-page', {
        page: page,
        pageSize: pageSize,
      });

      let json = await response.json();
      console.log(json);

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
      console.log(items);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    try {
      fetchPage(0);
    } catch (e) {}
  }, []);

  return (
    <Provider>
      <StoreHeader navigation={navigation} />

      <FlatList
        refreshing={false}
        ListFooterComponent={<BottomBrowseView />}
        onRefresh={async () => {
          await fetchPage();
        }}
        data={items}
        renderItem={({item}) => (
          <Card
            mode={'outlined'}
            style={{marginVertical: 5, marginHorizontal: 20}}>
            <Card.Title
              title={item.name}
              titleStyle={{alignSelf: 'center', fontSize: 30}}
            />
            <Divider />
            <Card.Cover
              source={{
                uri: server + 'image/?id=' + item.image,
              }}
              style={{
                margin: 10,
                alignSelf: 'stretch',
              }}
            />

            <Card.Content>
              <Divider />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Chip icon={'currency-usd'}>{item.price}</Chip>
                <Chip icon={'clock'}>{item.date}</Chip>
                <Chip icon={'map-marker'}>Galati</Chip>
              </View>
            </Card.Content>
          </Card>
        )}
      />
      <ActivityIndicator animating={loading} />
    </Provider>
  );
};

export default BrowseView;
