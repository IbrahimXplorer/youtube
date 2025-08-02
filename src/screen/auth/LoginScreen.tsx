import {
  Animation,
  Button,
  ContentSafeAreaView,
  Input,
  Screen,
  Text,
} from '@/components';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';

const auth = getAuth();

const LoginScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Enter email and password');
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Enter email and password');
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  if (initializing) {
    return <Animation animation="loader" />;
  }

  if (user) {
    return (
      <Screen safeAreaEdges={['top']}>
        <Text>Welcome, {user.email}</Text>
        <Button onPress={handleLogout}>
          <Button.Text title="Logout" />
        </Button>
      </Screen>
    );
  }

  return (
    <Screen safeAreaEdges={['top']}>
      <ContentSafeAreaView g={5} mt={5}>
        <Text variant="heading1" textAlign="center">
          {isLogin ? 'Login Your Account' : 'Register Your Account'}
        </Text>

        <Input
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button onPress={isLogin ? handleLogin : handleRegister}>
            <Button.Text title={isLogin ? 'Login' : 'Register'} />
          </Button>
        )}

        <Button onPress={() => setIsLogin(prev => !prev)} variant="secondary">
          <Button.Text
            title={
              isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Login'
            }
          />
        </Button>
      </ContentSafeAreaView>
    </Screen>
  );
};

export default LoginScreen;
