import React, {useContext, useState} from 'react';
import {FlatList, Image, PixelRatio, ScrollView, View} from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  TextInput,
  ToggleButton,
} from 'react-native-paper';
import {AccountContext} from '../../Contexts/AccountContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import image from '../../img/img.png';
import {HttpStatus, sendJsonRequest} from '../../HttpHandler';
import SuccessfulAlertView from '../SuccessfulAlertView';

const AddScreenView = ({route, navigation}) => {
  const [name, setName] = useState('');

  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');

  const [tag, setTag] = useState('');

  const [image, setImage] = useState('asset:/img.png');

  const [imageData, setImageData] = useState('');

  const [type, setType] = useState('good');

  const {profileRole} = useContext(AccountContext);

  const [tags, setTags] = useState([]);

  const [addedProduct, setAddedProduct] = useState(false);

  const pickImage = async method => {
    // No permissions request is necessary for launching the image library
    let result = await method({
      mediaTypes: 'photo',
      allowsEditing: true,
      includeBase64: true,
    });

    console.log(result);

    if (!result.didCancel) {
      console.log(
        'data:image/' +
          result.assets[0].type +
          ',base64,' +
          result.assets[0].base64,
      );
      setImage(
        'data:image/' +
          result.assets[0].type +
          ';base64,' +
          result.assets[0].base64,
      );
      setImageData(result.assets[0].base64);
    }
  };

  function addTag() {
    tags.map(item => console.log(item));

    if (!tags.some(val => val.key === tag)) {
      setTags(tags.concat({key: tag}));
    } else {
      console.log(tag);
    }
    console.log(tags);
  }

  function removeTag(tag) {
    console.log(tag);
    setTags(tags.filter(item => item.key !== tag));
  }

  async function addProduct() {
    const response = await sendJsonRequest(
      'POST',
      'products/add',
      {
        name: name,
        price: parseInt(price, 10),
        description: description,
        type: type,
        tags: tags.map(i => i.key),
        image: imageData,
      },
      global.token,
    );

    if (response.status === HttpStatus.OK) {
      setAddedProduct(true);
    } else {
      console.log(response);
    }
  }

  return (
    <ScrollView style={{margin: 30 / PixelRatio.get()}}>
      <SuccessfulAlertView
        title={'Successfully added product'}
        visible={addedProduct}
        navigation={navigation}
        paragraph={'You can now go back to the store'}
        buttonText={'Go back to store'}
        onPress={() => navigation.goBack()}
      />
      {profileRole === 'provider' ? (
        // add product/service
        <>
          <TextInput
            left={<TextInput.Icon name={'label'} />}
            mode={'outlined'}
            placeholder={'Product name'}
            onChangeText={i => setName(i)}
            style={{marginBottom: 50 / PixelRatio.get()}}
          />
          <TextInput
            left={<TextInput.Icon name={'currency-usd'} />}
            mode={'outlined'}
            onChangeText={i => setPrice(i)}
            placeholder={'Price'}
            style={{marginBottom: 50 / PixelRatio.get()}}
          />
          <TextInput
            left={<TextInput.Icon name={'book'} />}
            mode={'outlined'}
            placeholder={'Description'}
            onChangeText={i => setDescription(i)}
            numberOfLines={3}
            multiline={true}
            style={{marginBottom: 100 / PixelRatio.get()}}
          />

          <ToggleButton.Row
            onValueChange={value => setType(value)}
            value={type}
            style={{
              alignSelf: 'center',
              scaleX: 4 / PixelRatio.get(),
              scaleY: 4 / PixelRatio.get(),
              marginBottom: 50 / PixelRatio.get(),
            }}>
            <ToggleButton icon="archive" value="good" />
            <ToggleButton icon="account-hard-hat" value="service" />
          </ToggleButton.Row>

          <TextInput
            left={<TextInput.Icon name={'tag'} />}
            right={
              <TextInput.Icon
                icon={'plus'}
                onPress={() => {
                  addTag();
                  setTag('');
                }}
              />
            }
            value={tag}
            mode={'outlined'}
            placeholder={'Tags'}
            style={{marginBottom: 100 / PixelRatio.get()}}
            onChangeText={text => {
              setTag(text);
            }}
          />
          <FlatList
            contentContainerStyle={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginBottom: 20 / PixelRatio.get(),
            }}
            data={tags}
            renderItem={({item}) => (
              <Chip
                style={{
                  marginHorizontal: 5,
                  marginBottom: 5,
                  height: 120 / PixelRatio.get(),
                }}
                icon={'close'}
                disabled={false}
                onPress={() => removeTag(item.key)}>
                {item.key}
              </Chip>
            )}
          />
          <Card mode={'outlined'} style={{marginBottom: 50 / PixelRatio.get()}}>
            <Card.Title
              title={'Pick an image'}
              titleStyle={{alignSelf: 'center'}}
            />
            <Divider />
            <Card.Cover
              style={{}}
              source={{
                uri: image,
              }}
            />
            <Divider />
            <Card.Actions style={{justifyContent: 'flex-end'}}>
              <Button
                icon={'camera'}
                mode={'outlined'}
                style={{marginHorizontal: 40 / PixelRatio.get()}}
                onPress={async () => await pickImage(launchCamera)}>
                Take photo
              </Button>
              <Divider />
              <Button
                icon={'image'}
                mode={'outlined'}
                onPress={async () => await pickImage(launchImageLibrary)}>
                Pick image
              </Button>
            </Card.Actions>
          </Card>

          <Button
            mode={'outlined'}
            icon={'plus-circle'}
            style={{flexDirection: 'column-reverse'}}
            onPress={async () => await addProduct()}>
            Add {type}
          </Button>
        </>
      ) : (
        // user role == 'client'
        <Button>Client add request not implemented</Button>
      )}
    </ScrollView>
  );
};

export default AddScreenView;
