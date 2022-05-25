import React, {useEffect, useState} from 'react';
import {Button, Card, Chip, Divider, Text} from 'react-native-paper';
import {View} from 'react-native';
import {server} from '../../HttpHandler';

const ProductView = ({navigation, route}) => {
  return (
    <View>
      <Card mode={'outlined'} style={{marginVertical: 5, marginHorizontal: 20}}>
        <Card.Title
          title={route.params.item.name}
          titleStyle={{alignSelf: 'center', fontSize: 30}}
        />
        <Divider />
        <Card.Cover
          source={{
            uri: server + 'image/?id=' + route.params.item.image,
          }}
          style={{
            margin: 10,
            alignSelf: 'stretch',
          }}
        />

        <Card.Content>
          <Divider />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Chip icon={'currency-usd'}>{route.params.item.price}</Chip>
            <Chip icon={'clock'}>{route.params.item.date}</Chip>
            <Chip icon={'map-marker'}>Galati</Chip>
          </View>
        </Card.Content>

        <Card.Content>
          <Text>{route.params.item.description}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProductView;
