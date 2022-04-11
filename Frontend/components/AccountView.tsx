import React, {Component} from 'react';
import {View} from 'react-native';
import {Avatar} from 'react-native-paper';

class AccountView extends Component {
  render() {
    return (
      <View>
        <Avatar.Text size={24} label={'B'} />
      </View>
    );
  }
}

export default AccountView;
