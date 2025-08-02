import {Box, Screen, Text, VideoCard} from '@/components';
import {removeVideo} from '@/store/services/savedVideoSlices';
import {AppDispatch, RootState} from '@/store/store';
import theme from '@/theme';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const VideoScreen = () => {
  const videos = useSelector(
    (state: RootState) => state.savedVideos.savedVideos,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteVideo = (id: string) => {
    dispatch(removeVideo(id));
  };

  return (
    <Screen safeAreaEdges={['top']}>
      <FlashList
        data={videos}
        keyExtractor={item => item.id?.toString()}
        ListEmptyComponent={() => (
          <Text textAlign="center" mt={5}>
            No videos found!
          </Text>
        )}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <VideoCard
            showDeleteIcon={true}
            onDelete={id => handleDeleteVideo(id)}
            item={item}
          />
        )}
        ItemSeparatorComponent={() => <Box height={theme.spacing[5]} />}
        onEndReachedThreshold={0.5}
      />
    </Screen>
  );
};

export default VideoScreen;
