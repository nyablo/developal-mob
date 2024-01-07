import React, {FC, useContext, useEffect} from 'react';
import {FlatList, Image, Platform, StyleSheet, View} from 'react-native';
import {AuthContext} from '../AuthContext';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useContacts} from '../hooks/contacts';

export const HomeScreen: FC = () => {
  // TODO eliminate any
  const navigation = useNavigation<any>();

  const {signOut} = useContext(AuthContext);
  const [loading, error, contacts, refetch] = useContacts();

  const handleAddContact = () => {
    navigation.navigate('AddContactScreen', {});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  return (
    <View style={styles.screen}>
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <FlatList
        data={contacts}
        style={styles.contactsList}
        renderItem={({item}) => (
          <View style={styles.contact}>
            <Image
              alt={item.name}
              style={styles.thumbnail}
              source={{uri: item.imageUrl}}
            />
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.bottomPanel}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleAddContact}>
          Add contact
        </Button>
        <Button mode="text" style={styles.button} onPress={signOut}>
          Sign Out
        </Button>
      </View>
    </View>
  );
};

const bottomPanelHeight = Platform.OS === 'ios' ? 150 : 130;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    marginTop: 20,
  },
  contactsList: {
    marginBottom: bottomPanelHeight,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  thumbnail: {
    marginRight: 8,
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'lightgrey',
  },
  bottomPanel: {
    backgroundColor: 'white',
    height: bottomPanelHeight,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  error: {
    color: '#ba1a1a',
    padding: 20,
  },
  loading: {
    padding: 20,
  },
});
