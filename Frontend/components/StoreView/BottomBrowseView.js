import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

const BottomBrowseView = ({currentPage, maxPages, setPage}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
      <Button
        icon={'arrow-left-box'}
        disabled={currentPage === 0}
        onPress={() => setPage(currentPage - 1)}
      />
      <Button
        icon={'arrow-right-box'}
        disabled={currentPage === maxPages - 1}
        onPress={() => setPage(currentPage + 1)}
      />
    </View>
  );
};

export default BottomBrowseView;
