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
import theme from '@/theme';
import {AuthenticatedStackNavigatorScreenProps} from '@/types/navigation';
import {getAuth} from '@react-native-firebase/auth';
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
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';

interface SingleVideoScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'SingleVideo'> {}

export const SingleVideoScreen: FC<SingleVideoScreenProps> = ({
  route,
  navigation,
}) => {
  const {video} = route?.params || {};
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const videoId = video.id;
  const db = getFirestore();

  // like, comments fetching
  const fetchLikes = async () => {
    const user = getAuth().currentUser;
    if (!user || !videoId) {
      return;
    }

    try {
      const likeDocRef = doc(
        collection(doc(collection(db, 'likes'), videoId), 'likedBy'),
        user.uid,
      );

      const likeDoc = await getDoc(likeDocRef);
      setLiked(likeDoc.exists());

      const snapshot = await getDocs(
        collection(doc(collection(db, 'likes'), videoId), 'likedBy'),
      );

      setLikeCount(snapshot.size);
    } catch (err) {
      console.error('Error fetching like info:', err);
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
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  //handlers
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  const handleLike = async () => {
    const user = getAuth().currentUser;
    if (!user || !video?.id) {
      navigation.navigate('Login');
      return;
    }

    const likeDocRef = doc(
      collection(doc(collection(db, 'likes'), videoId), 'likedBy'),
      user.uid,
    );

    try {
      if (liked) {
        await deleteDoc(likeDocRef);
        setLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        await setDoc(likeDocRef, {
          liked: true,
          timestamp: serverTimestamp(),
        });
        setLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleAddComment = async () => {
    const user = getAuth().currentUser;
    if (!user || !commentText.trim()) {
      return;
    }

    try {
      const commentRef = collection(db, 'comments', videoId, 'commentList');
      await setDoc(doc(commentRef), {
        userId: user.uid,
        username: user.email,
        text: commentText.trim(),
        timestamp: serverTimestamp(),
      });

      setCommentText('');
      fetchComments();
    } catch (err) {
      Alert.alert('Error', 'Failed to post comment');
    }
  };

  //side effects
  useEffect(() => {
    fetchComments();
    fetchLikes();
  }, []);

  return (
    <Screen safeAreaEdges={['top']}>
      <IconButton
        icon="chevron-left"
        type="feather"
        variant="vector"
        iconStyle="contained"
        position="absolute"
        top={10}
        color="primary"
        zIndex={10}
        left={10}
      />
      <YoutubePlayer
        ref={playerRef}
        height={230}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />

      <Text numberOfLines={2} variant="b3semiBold" my={3} mx={4}>
        {video?.snippet?.title}
      </Text>
      <Box g={3}>
        <HStack justifyContent="space-between" mx={5} g={4}>
          <Text numberOfLines={1} variant="heading3">
            {video?.snippet?.channelTitle}
          </Text>
          <Button size="sm" px={3} width={theme.sizes.width / 5}>
            <Button.Text title="Subscribe" />
          </Button>
        </HStack>
      </Box>
      <Box ml={5}>
        <Clickable onPress={handleLike} mt={4} mx={2}>
          <Box
            bg="primary50"
            flexDirection="row"
            g={3}
            width={theme.spacing[20]}
            alignItems="center"
            justifyContent="center"
            borderRadius="rounded-sm">
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
      </Box>
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

        <FlatList
          data={comments}
          ListEmptyComponent={()=><Text textAlign="center">No comments found!</Text>}
          ItemSeparatorComponent={() => <Box height={theme.spacing[3]} />}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => <CommentCard {...item} />}
        />
      </Box>
    </Screen>
  );
};

export default SingleVideoScreen;
