import React, {FC, ReactNode, createContext, useEffect, useMemo} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContext {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  getJWT: () => Promise<string | null>;
  signOut: () => Promise<void>;
  signIn: (phoneNumber: string) => Promise<void>;
  confirmSignIn: (code: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
  const [confirmation, setConfirmation] =
    React.useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userObj = auth().currentUser || null;
      setUser(userObj);
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (userObj: FirebaseAuthTypes.User | null) => {
        setUser(userObj);
        setLoading(false);
      },
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  const authContext = useMemo(
    () => ({
      getJWT: async () => {
        const userObj = auth().currentUser;
        if (userObj) {
          const idToken = await userObj.getIdToken();
          return idToken;
        }
        return null;
      },
      signOut: async () => {
        await auth().signOut();
      },
      signIn: async (phoneNumber: string) => {
        const res = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirmation(res);
      },
      confirmSignIn: async (code: string) => {
        if (confirmation) {
          await confirmation.confirm(code);
        }
      },
    }),
    [confirmation],
  );

  return (
    <AuthContext.Provider value={{...authContext, user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
