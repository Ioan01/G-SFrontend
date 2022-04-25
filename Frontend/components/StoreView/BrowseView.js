import React, {useEffect, useState} from 'react';
import StoreHeader from './StoreHeader';
import {FlatList, View} from 'react-native';
import {
  ActivityIndicator,
  Card,
  Chip,
  Divider,
  Provider,
} from 'react-native-paper';
import {sendUrlEncodedRequest, server} from '../../HttpHandler';

const BrowseView = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const pageSize = 5;

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
      addItems(json.products);
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
        onRefresh={async () => {
          setItems([]);
          setPage(0);
          await fetchPage();
        }}
        onEndReached={async () => {
          setPage(page + 1);
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
                <Chip icon={'clock'}>Today</Chip>
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
