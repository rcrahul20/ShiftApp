import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const {isLogin,setLogin} = useContext(CartContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    // Simple email and password validation for test purposes
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^\d{6,}$/; // Assuming a 6-digit password

    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);

    if (isEmailValid && isPasswordValid) {
      // Perform actual login logic here (e.g., API call, authentication)
      console.log('Login successful');
      setLogin(true)
      setLoginError(false);
      navigation.navigate("MainScreen")
      
    } else {
      console.log('Login failed');
      setLoginError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        placeholderTextColor={'black'}

      />
      <TextInput
        style={styles.input}
        placeholder="Password (6 digits)"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor={'black'}
      />
      {loginError && <Text style={styles.errorText}>Invalid email or password format</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    color:'black'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
