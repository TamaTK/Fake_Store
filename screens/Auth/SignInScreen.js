import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { fetchHelper } from '../../helpers/fetchHelper';

const API_BASE_URL = 'http://10.0.2.2:3000';

export default function SignInScreen({ onSignInSuccess, onSwitchToSignUp }) {
  console.log('SignInScreen rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await fetchHelper(`${API_BASE_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 'OK' && response.token) {
        console.log('Sign in successful:', response);
        onSignInSuccess(response); // Pass user info/token up to parent
      } else {
        Alert.alert('Sign In Failed', response.message || 'Unknown error.');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your email and password</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonRow}>
        <Button title="Clear" onPress={handleClear} disabled={loading} />
        <Button title="Sign In" onPress={handleSignIn} disabled={loading} />
      </View>
      <TouchableOpacity onPress={onSwitchToSignUp}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center'
   },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, width: '100%' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  switchText: { color: 'blue', textAlign: 'center', marginTop: 12 },
});