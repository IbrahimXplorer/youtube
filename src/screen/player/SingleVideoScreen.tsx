import {
  Box,
  Button,
  Clickable,
  HStack,
  Icon,
  IconButton,
  Screen,
  Text,
} from '@/components';
import theme from '@/theme';
import {AuthenticatedStackNavigatorScreenProps} from '@/types/navigation';
import React, {FC, useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';

interface SingleVideoScreenProps
  extends AuthenticatedStackNavigatorScreenProps<'SingleVideo'> {}

export const SingleVideoScreen: FC<SingleVideoScreenProps> = ({route}) => {
  const {video} = route?.params || {};
  const [playing, setPlaying] = useState(true); // autoplay enabled
  const playerRef = useRef<YoutubeIframeRef>(null);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  return (
    <Screen safeAreaEdges={['top']}>
      <YoutubePlayer
        ref={playerRef}
        height={230}
        play={playing}
        videoId={video?.id?.videoId || 'iee2TATGMyI'}
        onChangeState={onStateChange}
      />
      <Text numberOfLines={2} variant="b3semiBold">
        {video?.snippet?.title}
      </Text>
      <HStack justifyContent="space-between" mx={5} g={4}>
        <Text numberOfLines={1} variant="b4bold">
          {video?.snippet?.channelTitle}
        </Text>
        <Button size="sm" px={3}>
          <Button.Text title="Subscribe" />
        </Button>
      </HStack>
      <Clickable bg="primary100" flexDirection="row" g={3}>
        <Icon icon="like" type="evil" variant="vector" color="white" />
        <Text variant="b5regular">3.2k</Text>
      </Clickable>
    </Screen>
  );
};

export default SingleVideoScreen;
