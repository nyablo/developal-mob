import {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../AuthContext';
import {DOMAIN} from '../config';

interface Contact {
  email: string;
  imageUrl: string;
  message: string;
  name: string;
}

export const useContacts = (): [
  boolean,
  string | null,
  Contact[],
  () => void,
] => {
  const {getJWT} = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<any>(null);

  const fetchData = useCallback(async () => {
    const userToken = await getJWT();
    try {
      const res = await fetch(`${DOMAIN}/contacts`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const json = await res.json();
      setContacts(json);
    } catch (e) {
      setError('Unable to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, [getJWT]);

  const refetch = () => fetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData, navigation]);

  return [loading, error, contacts, refetch];
};

export const useAddContact = () => {
  const {getJWT} = useContext(AuthContext);

  const addContact = useCallback(
    async ({
      pictureUri,
      ...contactInput
    }: {
      pictureUri: string;
      email: string;
      message: string;
      name: string;
    }) => {
      try {
        const userToken = await getJWT();

        let filename = pictureUri.substring(pictureUri.lastIndexOf('/') + 1);
        const uploadRef = storage().ref(filename);
        const task = uploadRef.putFile(pictureUri);
        await task; // can track progress here
        const imageUrl = await uploadRef.getDownloadURL();

        await fetch(`${DOMAIN}/contacts`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...contactInput, imageUrl}),
        });
      } catch (e) {
        console.debug(e);
        throw new Error('Unable to add contact');
      }
    },
    [getJWT],
  );

  return addContact;
};
