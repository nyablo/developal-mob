import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useAddContact} from '../hooks/contacts';
import {launchImageLibrary} from 'react-native-image-picker';

const schema = yup
  .object({
    name: yup.string().label('Name').required(),
    email: yup.string().label('Email').email().required(),
    message: yup.string().label('Message').required(),
    pictureUri: yup.string().label('Contact picture').required(),
  })
  .required();

export const AddContactScreen: FC = () => {
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: {errors},
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      pictureUri: '',
    },
  });

  // TODO eliminate any
  const navigation = useNavigation<any>();
  const addContact = useAddContact();

  const [submitting, setSubmitting] = React.useState(false);

  const handleAddPicture = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      setValue('pictureUri', result.assets[0].uri || '');
      clearErrors('pictureUri');
    }
  };

  const handleClearPicture = () => setValue('pictureUri', '');

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      await addContact(data);
      navigation.pop();
    } catch (e) {
      Alert.alert('Error', 'Could not add contact');
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Name"
            mode="outlined"
            autoFocus={true}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            value={value}
            error={!!errors.name}
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            value={value}
            error={!!errors.email}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Message"
            mode="outlined"
            style={[styles.input, styles.inputMultiLine]}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            value={value}
            error={!!errors.message}
          />
        )}
        name="message"
      />
      {errors.message && (
        <Text style={styles.errorText}>{errors.message.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {value}}) => {
          return (
            <View style={styles.contactPictureContainer}>
              {value ? (
                <>
                  <Image style={styles.imagePreview} source={{uri: value}} />
                  <Button onPress={handleClearPicture}>Clear picture</Button>
                </>
              ) : (
                <>
                  <Button onPress={handleAddPicture}>
                    Select contact picture
                  </Button>
                </>
              )}
            </View>
          );
        }}
        name="pictureUri"
      />
      {errors.pictureUri && (
        <Text style={styles.errorText}>{errors.pictureUri.message}</Text>
      )}

      <Button
        style={styles.button}
        mode="contained"
        disabled={submitting}
        onPress={handleFormSubmit(handleSubmit)}>
        {submitting ? 'Submitting...' : 'Submit new contact'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    marginTop: 20,
  },
  inputMultiLine: {
    minHeight: 100,
  },
  errorText: {
    color: '#ba1a1a',
    marginTop: 5,
  },
  contactPictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
});
