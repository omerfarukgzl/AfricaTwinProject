import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import styles from './signIn.styles';
import Users from '../../../RegisteredUsers';
import { CheckDataWarning } from "../SignInWarning/checkDataWarning";


const SignIn = (props) => {
  const [users, setUsers] = useState(new Users().users);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [checkRegisteredUser, setCheckRegisteredUser] = useState(false);

  const [checkEmail, setcheckEmail] = useState(false);
  const [checkPassword, setcheckPassword] = useState(false);
  let userID = Number;

  useEffect(() => {
    setCheckRegisteredUser(false);
  }, []);

  function NavigateToSignUp() {
    props.navigation.navigate('SignUp', { user: users });
  };

  function NavigateToMaps() {
    props.navigation.navigate('Maps', { user: users[userID]});
  };

  function ControlEmtpy() {
    let controlTextInputs = false;
    if (username === '') {
      controlTextInputs = true;
      setcheckEmail(true);
    }
    else
      setcheckEmail(false);

    if (password === '') {
      controlTextInputs = true;
      setcheckPassword(true);
    }
    else
      setcheckPassword(false);

    return controlTextInputs;
  };

  function RegistiredUserControl() {
    let isRegistired = false;

    users.forEach((item) => {
      if ((item.username === username) && (item.password === password))
      {
        isRegistired = true;
        userID = item.id;
      }
       
      else
        setCheckRegisteredUser(true);

    });
    return isRegistired;
  };
  function Login() {
    if (!ControlEmtpy()) {
      if (RegistiredUserControl()) {
        setcheckEmail(false);
        setcheckPassword(false);
        setCheckRegisteredUser(false);
        NavigateToMaps();
      }
    }
    else
      setCheckRegisteredUser(false);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username..'
        value={username}
        onChangeText={value => { setUsername(value) }}
        style={styles.textInputStyle}
        inlineImageLeft="user"
        inlineImagePadding={40} />
      {CheckDataWarning("Username cannot be empty..", checkEmail, styles.errorMsg)}
      <TextInput
        placeholder='Password'
        onChangeText={value => { setPassword(value) }}
        value={password}
        style={styles.textInputStyle}
        inlineImageLeft="key"
        inlineImagePadding={40} />
      {CheckDataWarning("Password cannot be empty..", checkPassword, styles.errorMsg)}
      {CheckDataWarning("Username or password is wrong..", checkRegisteredUser, styles.errorMsg)}

      <TouchableOpacity
        onPress={Login}
        style={styles.buttonStyle}>
        <Text style ={{color:'white'}}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.baseText}>
        Don't have an account? 
        <Text style={styles.innerText}
         onPress={NavigateToSignUp}
        > Sign up</Text>
      </Text>
    </View>
  );
};
export default SignIn;