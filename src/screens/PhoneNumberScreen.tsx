import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, ScrollView} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';

const PHONE_NUMBER_REGEX =
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .label('Phone number')
      .matches(PHONE_NUMBER_REGEX, 'Please enter a valid phone number')
      .required(),
  })
  .required();

export const PhoneNumberScreen: FC = () => {
  // TODO eliminate any
  const navigation = useNavigation<any>();

  const {signIn} = React.useContext(AuthContext);

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async ({phoneNumber}: {phoneNumber: string}) => {
    setSubmitting(true);

    await signIn('+1' + phoneNumber);

    setSubmitting(false);
    navigation.navigate('OTPScreen');
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
            label="Phone number"
            mode="outlined"
            autoFocus={true}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            value={value}
            error={!!errors.phoneNumber}
            left={<TextInput.Affix text="+1" />}
          />
        )}
        name="phoneNumber"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
      )}

      <Button
        style={styles.button}
        mode="contained"
        disabled={submitting}
        onPress={handleFormSubmit(handleSubmit)}>
        {submitting ? 'Signing in...' : 'Sign in'}
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
  errorText: {
    color: '#ba1a1a',
    marginTop: 5,
  },
});
