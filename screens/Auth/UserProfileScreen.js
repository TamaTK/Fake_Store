import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import UserProfileDetailsScreen from './UserProfileDetailsScreen';

export default function UserProfileScreen({ isSignUp, setIsSignUp, setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleSignInSuccess = (userInfo) => {
    setUser(userInfo);
    setIsAuthenticated(true);
    setShowProfile(true);
  };
  const handleSignUpSuccess = (userInfo) => {
    setUser(userInfo);
    setIsAuthenticated(true);
    setShowProfile(true);
  };
  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowProfile(false);
    setIsSignUp(false);
  };
  const handleUpdateUser = async (newName, newPassword) => {
    try {
      const res = await fetch('/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name: newName, password: newPassword }),
      });
      return await res.json();
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileCard}>
        {showProfile && user ? (
          <UserProfileDetailsScreen
            user={user}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
          />
        ) : isSignUp ? (
          <SignUpScreen
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToSignIn={() => setIsSignUp(false)}
          />
        ) : (
          <SignInScreen
            onSignInSuccess={handleSignInSuccess}
            onSwitchToSignUp={() => setIsSignUp(true)}
          />
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  profileContainer: {
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
    alignItems: 'stretch',
  },
});