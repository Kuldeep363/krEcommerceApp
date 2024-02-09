import auth from '@react-native-firebase/auth';

export async function _SignupUser(
  email: string,
  password: string,
): Promise<{status: boolean; msg: string; data: any}> {
  const res = auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      console.log('User account created & signed in!');
      return {
        status: true,
        msg: '',
        data: res.user,
      };
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        return {
          status: false,
          msg: 'That email address is already in use!',
          data: null,
        };
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return {
          status: false,
          msg: 'That email address is invalid!',
          data: null,
        };
      }

      return {
        status: false,
        msg: error.code,
        data: null,
      };

      console.error(error);
    });

  return res;
}

export async function _SigninUser(
  email: string,
  password: string,
): Promise<{status: boolean; msg: string; data: any}> {
  const res = auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      console.log('User account created & signed in!');
      return {
        status: true,
        msg: '',
        data: res.user,
      };
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credential') {
        console.log('Wrong password');
        return {
          status: false,
          msg: 'Wrong email and password',
          data: null,
        };
      }

      return {
        status: false,
        msg: error.code,
        data: null,
      };
    });

  return res;
}

export async function _Signout() {
  const response = auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      return {
        status: true,
        msg: 'Signed out',
      };
    });
  return response;
}
