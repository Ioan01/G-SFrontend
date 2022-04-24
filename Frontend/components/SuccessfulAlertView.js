import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
} from 'react-native-paper';
import {View} from 'react-native';

function SuccessfulAlertView({
  title,
  paragraph,
  buttonText,
  registered,
  navigation,
  onPress,
}) {
  return (
    <Portal>
      <Modal visible={registered} onDismiss={() => navigation.goBack()}>
        <View>
          <Card>
            <Card.Title title={title} titleStyle={{alignSelf: 'center'}} />
            <Card.Content>
              <Avatar.Icon
                icon={'check'}
                style={{
                  backgroundColor: 'green',
                  alignSelf: 'center',
                  marginVertical: 50,
                  scaleX: 2,
                  scaleY: 2,
                }}
              />
              <Paragraph>{paragraph}</Paragraph>
            </Card.Content>
            <Card.Actions style={{justifyContent: 'flex-end'}}>
              <Button mode={'contained'} onPress={onPress}>
                {buttonText}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </Portal>
  );
}

export default SuccessfulAlertView;
