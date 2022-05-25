import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';

const ProductView = ({navigation, route}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Button mode={'outlined'}>{route.params.item.name}</Button>
    </View>
  );
};

export default ProductView;
