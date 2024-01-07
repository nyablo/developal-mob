import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';

const schema = yup
  .object({
    otp: yup.string().label('OTP').required(),
  })
  .required();

export const OTPScreen: FC = () => {
  const navigation = useNavigation();

  const {confirmSignIn} = React.useContext(AuthContext);

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: '',
    },
  });

  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async ({otp}: {otp: string}) => {
    setSubmitting(true);

    try {
      await confirmSignIn(otp);
    } catch (e) {
      Alert.alert('Could not sign in', 'Try again later');
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
            label="OTP"
            mode="outlined"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            autoFocus={true}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            value={value}
            error={!!errors.otp}
          />
        )}
        name="otp"
      />
      {errors.otp && <Text style={styles.errorText}>{errors.otp.message}</Text>}

      <Button
        style={styles.button}
        disabled={submitting}
        mode="text"
        onPress={navigation.goBack}>
        Edit phone number
      </Button>
      <Button
        style={styles.button}
        disabled={submitting}
        mode="contained"
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
