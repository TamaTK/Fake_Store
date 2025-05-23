import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserProfileScreen({ isSignUp, setIsSignUp, setIsAuthenticated }) {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileCard}>
        {isSignUp ? (
          <>
            <Text style={styles.profileTitle}>Sign up a new user</Text>
            {/* Add TextInputs here */}
            <View style={styles.buttonRow}>
              <Text onPress={() => setIsSignUp(false)} style={styles.linkText}>
                Already have an account? <Text style={styles.linkAction}>Sign In</Text>
              </Text>
              <Text
                onPress={() => { setIsAuthenticated(true); }}
                style={[styles.linkText, styles.signUpButton]}
              >
                Sign Up
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.profileTitle}>Sign in with your email and password</Text>
            {/* Add TextInputs here */}
            <View style={styles.buttonRow}>
              <Text onPress={() => setIsSignUp(true)} style={styles.linkText}>
                Don't have an account? <Text style={styles.linkAction}>Sign Up</Text>
              </Text>
              <Text
                onPress={() => { setIsAuthenticated(true); }}
                style={[styles.linkText, styles.signInButton]}
              >
                Sign In
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
    gap: 16,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  linkAction: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  signInButton: {
    color: '#28a745',
    fontWeight: 'bold',
    backgroundColor: '#e6ffe6',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  signUpButton: {
    color: '#28a745',
    fontWeight: 'bold',
    backgroundColor: '#e6ffe6',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
});