/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  Button,
  Clickable,
  ContentSafeAreaView,
  HStack,
  IconButton,
  ImageBanner,
  Input,
  Screen,
  Text,
  VStack,
} from '@/components';
import {clearAllVideos} from '@/store/services/savedVideoSlices';
import {AppDispatch} from '@/store/store';
import theme from '@/theme';
import {
  AccountStackScreenProps,
  RootNavigatorScreenProps,
} from '@/types/navigation';
import {getImage} from '@assets/constants/images';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from '@react-native-firebase/auth';
import {type CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

type UserProfile = {
  displayName: string;
  email: string;
  photoURL: string;
};

const DEFAULT_USER: UserProfile = {
  displayName: '',
  email: '',
  photoURL: '',
};

interface AccounScreenProps
  extends CompositeScreenProps<
    AccountStackScreenProps<'Account'>,
    RootNavigatorScreenProps<'AuthenticatedStack'>
  > {}

const AccountScreen: FC<AccounScreenProps> = ({navigation}) => {
  const auth = getAuth();
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  //handlers
  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel || !result.assets?.[0]?.uri) {
        return;
      }

      const asset = result.assets[0];
      setSelectedAsset(asset);
      setUser(prev => ({...prev, photoURL: asset.uri!}));
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Image selection failed',
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) {
      return;
    }

    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: user.displayName.trim(),
        photoURL: selectedAsset?.uri || user.photoURL,
      });
      setSelectedAsset(null);
      setIsEditing(false);
      Toast.show({type: 'success', text1: 'Profile updated'});
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Failed to update profile.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearAllVideos());
      navigation.navigate('AuthenticatedStack', {screen: 'Login'});
    } catch (error: any) {
      console.log(error);
      Toast.show({type: 'error', text1: error?.message || 'Failed to log out'});
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
        });
      }
    });
    return unsubscribe;
  }, []);

  if (!user?.email) {
    return (
      <Screen safeAreaEdges={['top']}>
        <ContentSafeAreaView flex={1} justifyContent="center" g={5}>
          <Text textAlign="center">Please Login your account</Text>
          <Button
            onPress={() =>
              navigation.navigate('AuthenticatedStack', {screen: 'Login'})
            }>
            <Button.Text title="Login" />
          </Button>
        </ContentSafeAreaView>
      </Screen>
    );
  }

  return (
    <Screen safeAreaEdges={['top']}>
      <ContentSafeAreaView g={3} mt={5}>
        <Box
          alignSelf="center"
          alignItems="center"
          width={theme.sizes.width / 4}
          height={theme.sizes.width / 4}
          borderRadius="rounded-full"
          borderWidth={1}
          mb={4}>
          <ImageBanner
            source={user.photoURL || getImage('avatar')}
            variant={user.photoURL ? 'remote' : 'local'}
            width={theme.sizes.width / 4}
            height={theme.sizes.width / 4}
            borderRadius="rounded-full"
            resizeMode="cover"
          />
          <Box position="absolute" right={-10} zIndex={10}>
            <IconButton
              color="primary"
              onPress={handlePickImage}
              icon="camera"
              type="entypo"
              variant="vector"
            />
          </Box>
        </Box>

        <Box alignItems="center" mb={3}>
          {isEditing ? (
            <Input
              size="sm"
              autoFocus
              value={user.displayName}
              onChangeText={displayName =>
                setUser(prev => ({...prev, displayName}))
              }
              onBlur={() => setIsEditing(false)}
              placeholder="Enter your name"
              returnKeyType="done"
              right={() => (
                <IconButton
                  onPress={() => setIsEditing(false)}
                  color="success"
                  icon="check"
                  type="entypo"
                  variant="vector"
                />
              )}
            />
          ) : (
            <Clickable onPress={() => setIsEditing(true)}>
              <Text textAlign="center" variant="heading2">
                {user.displayName || 'Your name here'}
              </Text>
            </Clickable>
          )}
        </Box>

        <Text textAlign="center" mb={4}>
          {user.email || 'No email associated'}
        </Text>

        <VStack g={5}>
          <Button
            size="sm"
            loading={loading}
            onPress={handleUpdateProfile}
            disabled={loading}>
            <Button.Text title="Update Profile" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() =>
              navigation.navigate('UnAuthenticatedStack', {
                screen: 'Root',
                params: {
                  screen: 'VideoStack',
                  params: {
                    screen: 'Video',
                  },
                },
              })
            }>
            <Button.Text title="Saved videos" />
          </Button>
          <Button size="sm" variant="danger" onPress={handleLogout}>
            <Button.Text title="Log Out" />
          </Button>
        </VStack>
      </ContentSafeAreaView>
    </Screen>
  );
};

export default AccountScreen;
