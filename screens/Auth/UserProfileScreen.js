import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import UserProfileDetailsScreen from './UserProfileDetailsScreen';
import { setUser, clearUser, updateUserName } from '../../stores/authSlice';

export default function UserProfileScreen({ isSignUp, setIsSignUp }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showProfile, setShowProfile] = useState(false);

  const handleSignInSuccess = (userInfo) => {
    dispatch(setUser(userInfo));
    setShowProfile(true);
  };
  const handleSignUpSuccess = (userInfo) => {
    dispatch(setUser(userInfo));
    setShowProfile(true);
  };
  const handleSignOut = () => {
    dispatch(clearUser());
    setShowProfile(false);
    setIsSignUp(false);
  };
  const handleUpdateUser = async (newName, newPassword) => {
    try {
      const res = await fetch('http://10.0.2.2:3000/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name: newName, password: newPassword }),
      });
      const result = await res.json();
      if (result.status === 'OK') {
        dispatch(updateUserName(newName));
      }
      return result;
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