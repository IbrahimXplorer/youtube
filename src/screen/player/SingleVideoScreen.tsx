/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  Button,
  Clickable,
  CommentCard,
  HStack,
  Icon,
  IconButton,
  Input,
  Screen,
  Text,
} from '@/components';
import { saveVideo } from '@/store/services/savedVideoSlices';
import { AppDispatch, RootState } from '@/store/store';
import theme from '@/theme';
import { AuthenticatedStackNavigatorScreenProps } from '@/types/navigation';
import { VideoItemType } from '@/types/youtube';
import { getAuth } from '@react-native-firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore';
import { FlashList } from '@shopify/flash-list';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { useDispatch, useSelector } from 'react-redux';

interface SingleVideoScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'SingleVideo'> {}

const SingleVideoScreen: FC<SingleVideoScreenProps> = ({route, navigation}) => {
  const {video} = route.params || {};
  const videoId = video?.id;
  const db = getFirestore();
  const dispatch = useDispatch<AppDispatch>();
  const {savedVideos} = useSelector((state: RootState) => state.savedVideos);

  const isSaved = savedVideos.find(
    (item: VideoItemType) => item.id === video.id,
  )
    ? true
    : false;

  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  const playerRef = useRef<YoutubeIframeRef>(null);

  const getUser = () => getAuth().currentUser;

  const getLikeDocRef = (uid: string) =>
    doc(collection(doc(collection(db, 'likes'), videoId), 'likedBy'), uid);

  const fetchLikes = async () => {
    const user = getUser();
    if (!user || !videoId) {
      return;
    }

    try {
      const likeDoc = await getDoc(getLikeDocRef(user.uid));
      setLiked(likeDoc.exists());

      const snapshot = await getDocs(
        collection(doc(collection(db, 'likes'), videoId), 'likedBy'),
      );
      setLikeCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching like info:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, 'comments', videoId, 'commentList'),
      );
      const data = snapshot.docs.map(doc => doc.data());
      const sorted = data.sort(
        (a, b) => b.timestamp?.seconds - a.timestamp?.seconds,
      );
      setComments(sorted);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    const user = getUser();
    if (!user || !videoId) {
      navigation.navigate('Login');
      return;
    }

    try {
      const ref = getLikeDocRef(user.uid);
      if (liked) {
        await deleteDoc(ref);
        setLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        await setDoc(ref, {liked: true, timestamp: serverTimestamp()});
        setLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleAddComment = async () => {
    const user = getUser();
    const trimmedText = commentText.trim();

    if (!user || !trimmedText) {
      return;
    }

    try {
      const ref = collection(db, 'comments', videoId, 'commentList');
      await setDoc(doc(ref), {
        userId: user.uid,
        userMail: user.email,
        userName: user.displayName ?? 'Anonymous',
        text: trimmedText,
        photoURL:
          user.photoURL ||
          'https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg',
        timestamp: serverTimestamp(),
      });

      setCommentText('');
      fetchComments();
    } catch {
      Alert.alert('Error', 'Failed to post comment');
    }
  };

  const handelSave = () => {
    dispatch(saveVideo(video));
  };

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, []);

  console.log(comments);

  return (
    <Screen safeAreaEdges={['top']}>
      <IconButton
        icon="chevron-left"
        type="feather"
        variant="vector"
        iconStyle="contained"
        position="absolute"
        top={10}
        left={10}
        zIndex={20}
        color="primary"
        onPress={() => navigation.goBack()}
      />

      <Box zIndex={10}>
        <YoutubePlayer
          ref={playerRef}
          height={230}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
        />
      </Box>
      <Text numberOfLines={2} variant="b3semiBold" my={3} mx={4}>
        {video?.snippet?.title}
      </Text>

      <Box g={3}>
        <HStack justifyContent="space-between" mx={5} g={4}>
          <Text numberOfLines={1} variant="heading3">
            {video?.snippet?.channelTitle}
          </Text>
          <Button disabled size="sm" px={3} width={theme.sizes.width / 5}>
            <Button.Text title="Subscribe" />
          </Button>
        </HStack>
      </Box>

      <HStack ml={5} g={3}>
        <Clickable onPress={handleLike} mt={4}>
          <Box
            bg="primary50"
            flexDirection="row"
            borderWidth={1}
            borderColor="primary"
            g={2}
            px={4}
            py={2}
            alignItems="center"
            justifyContent="center"
            borderRadius="rounded-full">
            <Icon
              icon={liked ? 'thumb-up-alt' : 'thumb-up-off-alt'}
              type="material"
              variant="vector"
              color="primary"
              size={7}
            />
            <Text variant="b3bold" color="primary">
              {likeCount}
            </Text>
          </Box>
        </Clickable>
        <Clickable onPress={handelSave} disabled={isSaved} mt={4}>
          <Box
            bg={isSaved ? 'neutral100' : 'primary50'}
            borderWidth={1}
            borderColor={isSaved ? 'neutral100' : 'primary'}
            px={4}
            py={2}
            flexDirection="row"
            g={2}
            alignItems="center"
            justifyContent="center"
            borderRadius="rounded-full">
            <Icon
              icon={liked ? 'bookmark-o' : 'bookmark'}
              type="fa"
              variant="vector"
              color="primary"
              size={7}
            />
            <Text variant="b3bold" color="primary">
              Save
            </Text>
          </Box>
        </Clickable>
      </HStack>

      <Box
        mx={4}
        mt={6}
        bg="primary50"
        flex={1}
        p={4}
        borderRadius="rounded-sm">
        <HStack g={3} alignItems="center" mb={4}>
          <Input
            size="sm"
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <IconButton
            iconStyle="contained"
            onPress={handleAddComment}
            icon="send"
            variant="vector"
            color="primary"
          />
        </HStack>

        <FlashList
          data={comments}
          estimatedItemSize={50}
          removeClippedSubviews={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <CommentCard {...item} />}
          ItemSeparatorComponent={() => <Box height={theme.spacing[3]} />}
          ListEmptyComponent={
            <Text textAlign="center">No comments found!</Text>
          }
        />
      </Box>
    </Screen>
  );
};

export default SingleVideoScreen;
