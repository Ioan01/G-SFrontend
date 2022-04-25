import React, {useState} from 'react';
import {PixelRatio, Text, View} from 'react-native';
import {
  Banner,
  Button,
  Caption,
  Card,
  Chip,
  Headline,
  HelperText,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Surface,
  TextInput,
  Avatar,
  Title,
  ActivityIndicator,
} from 'react-native-paper';
import {sendJsonRequest, HttpStatus} from '../../HttpHandler';
import {Icon} from 'react-native-vector-icons/index';
import SuccessfulAlertView from '../SuccessfulAlertView';

const CreateAccountView = ({navigation}) => {
  const [passwordHidden, hidePassword] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [response, setResponse] = useState('');

  const [role, setRole] = useState('');

  const [registered, setRegistered] = useState(false);

  const [loading, setLoading] = useState(false);

  async function register({username, password, role}) {
    try {
      setLoading(true);
      const resp = await sendJsonRequest(
        'POST',
        'register',
        {
          username: username,
          password: password,
          role: role,
        },
        '',
      );
      switch (resp.status) {
        case HttpStatus.OK:
          setRegistered(true);
          break;
        default:
          await resp.json().then(json => setResponse(json.message));
      }
    } catch (error) {
      console.log(error);
      setResponse(error.toString());
    }
    setLoading(false);
  }

  return (
    <Provider>
      <View style={{marginHorizontal: 30, marginTop: 30 / PixelRatio.get()}}>
        <Title
          style={{alignSelf: 'center', marginBottom: 100 / PixelRatio.get()}}>
          Create a new account
        </Title>
        <TextInput
          mode={'outlined'}
          style={{marginBottom: 30 / PixelRatio.get()}}
          onChangeText={text => {
            setUsername(text);
            setResponse('');
          }}
          placeholder={'Enter a new username'}
        />
        <SuccessfulAlertView
          onPress={() => navigation.goBack()}
          title={'Account successfully created'}
          navigation={navigation}
          visible={registered}
          paragraph={''}
          buttonText={'Go back to login'}
        />
        <TextInput
          mode={'outlined'}
          secureTextEntry={passwordHidden}
          placeholder={'Enter a new password'}
          onChangeText={text => {
            setPassword(text);
            setResponse('');
          }}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => hidePassword(!passwordHidden)}
              style={{marginHorizontal: 40}}
            />
          }
        />

        <HelperText
          type={'error'}
          style={{marginBottom: 30}}
          visible={response.length !== 0}>
          {response}
        </HelperText>

        <Headline>I want to be a : </Headline>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 50 / PixelRatio.get(),
            marginTop: 20,
            scaleX: 1.25,
            scaleY: 1.25,
          }}>
          <Chip
            icon={'face-man'}
            onPress={() => {
              setRole('client');
              setResponse('');
            }}
            selected={role === 'client'}
            style={{marginEnd: 60 / PixelRatio.get()}}>
            Client
          </Chip>
          <Chip
            icon={'toolbox'}
            onPress={() => {
              setRole('provider');
              setResponse('');
            }}
            selected={role === 'provider'}>
            Provider
          </Chip>
        </View>
        <Button
          mode={'outlined'}
          onPress={async () => {
            if (username === '' || password === '') {
              setResponse('A valid username and password was not found');
              return;
            }

            if (role === '') {
              setResponse('No role selected');
              return;
            }
            setResponse('');
            await register({username, password, role});
          }}
          style={{marginBottom: 50 / PixelRatio.get()}}>
          Create Account
        </Button>
        <ActivityIndicator animating={loading} />
      </View>
    </Provider>
  );
};

export default CreateAccountView;
