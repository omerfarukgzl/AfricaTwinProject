import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import styles from './signUp.styles';
import { CheckDataWarning } from "../SignUpWarning/checkDataWarning";

const SignUp = (props) => {

  const [users, setUsers] = useState(props.route.params.user);
  const [userData, setUserData] = useState(
    {
      email: '',
      name_surname: '',
      password: '',
      username: '',
    }
  );
  
  //empty validation 
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkNameSurname, setCheckNameSurname] = useState(false);

  //is registered Users
  const [checkRegisteredUserEmail, setCheckRegisteredUserEmail] = useState(false);
  const [checkRegisteredUserUsername, setCheckRegisteredUserUsername] = useState(false);

//checking all texInputs for registration
  let controlTextInputs = false;

  function NavigateToSignIn() {
    props.navigation.navigate('SignIn', {users});
  };

  function ControlData(userdata, regex, setceheckData) {
    if (userdata === '' || !regex.test(userdata)) {
      setceheckData(true);
      controlTextInputs = true;
    }
    else
      setceheckData(false);
  }

  function Control() {
    //Checking textinput value for error message and boolean value assignment

    let regex_email = /^.+@[^\.].*\.[a-z]{2,}$/
    let regex_name_surname = /^[a-zA-Z'\-\pL]+(?:(?! {2})[a-zA-Z'\-\pL ])*[a-zA-Z'\-\pL]+$/
    let regex_username = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/
    let regex_password = /^\S*$/

    ControlData(userData.email, regex_email, setCheckEmail);
    ControlData(userData.username, regex_username, setCheckUsername);
    ControlData(userData.name_surname, regex_name_surname, setCheckNameSurname);
    ControlData(userData.password, regex_password, setCheckPassword);

    return controlTextInputs;
  };

  function AddUser() {
    let isRegisteredEmail=false;
    let isRegisteredUsername=false;

    //user assignment with user control
    if (!Control()) {
      users.forEach((item) => {
        if (item.email === userData.email)  //Is email registered?
        {
          isRegisteredEmail = true;
          setCheckRegisteredUserEmail(true);
        }
        if (item.username === userData.username) //Is username registered?
        {
          isRegisteredUsername = true;
          setCheckRegisteredUserUsername(true);
        }
      });
      if(!isRegisteredEmail) 
      setCheckRegisteredUserEmail(false);
      if(!isRegisteredUsername)
      setCheckRegisteredUserUsername(false);

      if (!isRegisteredEmail && !isRegisteredUsername) // save to list if username is not registered
      {
        let dataUser = { id: users.length, name: userData.name_surname, email: userData.email, password: userData.password,username:userData.username };
        let newUsersList = users;
        newUsersList.push(dataUser);
        setUsers(newUsersList);
        NavigateToSignIn();
      }
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='E-mail..'
        value={userData.email}
        onChangeText={value => { setUserData({ ...userData, email: value }) }}
        style={styles.textInputStyle}
        inlineImageLeft="mail"
        inlineImagePadding={40}
      />
      {CheckDataWarning("Please enter a valid email..", checkEmail, styles.errorMsg)}
      {CheckDataWarning("This e-mail is already registered", checkRegisteredUserEmail, styles.errorMsg)}

      <TextInput
        placeholder='Username..'
        value={userData.username}
        onChangeText={value => { setUserData({ ...userData, username: value }) }}
        style={styles.textInputStyle}
        inlineImageLeft="user"
        inlineImagePadding={40} 
        />
      {CheckDataWarning("Please enter a valid username..", checkUsername, styles.errorMsg)}
      {CheckDataWarning("This username is already registered", checkRegisteredUserUsername, styles.errorMsg)}

      <TextInput
        placeholder='Name-Surname..'
        value={userData.name_surname}
        onChangeText={value => { setUserData({ ...userData, name_surname: value }) }}
        style={styles.textInputStyle} 
        inlineImageLeft="name"
        inlineImagePadding={40}
        />
      {CheckDataWarning("Please enter a valid name-surname ..", checkNameSurname,  styles.errorMsg)}

      <TextInput
        placeholder='Password'
        onChangeText={value => { setUserData({ ...userData, password: value }) }}
        value={userData.password}
        style={styles.textInputStyle}
        inlineImageLeft="key"
        inlineImagePadding={40} 
        />
      {CheckDataWarning("Please enter a valid password..", checkPassword,  styles.errorMsg)}

      <TouchableOpacity
        onPress={AddUser}
        style={styles.buttonStyle}>
        <Text style={{color:'white'}}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
};
export default SignUp;