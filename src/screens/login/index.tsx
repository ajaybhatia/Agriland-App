// import type { FormType } from './login-form';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';

import { LoginForm } from './login-form';

// import { useAuth } from '@/core';

export const Login = () => {
  //const signIn = useAuth.use.signIn();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '373177193117-6e1o2tfhl7slviapb2u7qt6l1djt4hcu.apps.googleusercontent.com',
    });
  }, []);

  // const onSubmit = (data: FormType) => {
  //   console.log(data);
  //   signIn({ access: 'access-token', refresh: 'refresh-token' });
  // };
  // onSubmit={onSubmit}
  return <LoginForm />;
};
