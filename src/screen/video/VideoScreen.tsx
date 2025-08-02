import { Box, Screen, Text, VideoCard } from '@/components';
import { RootState } from '@/store/store';
import theme from '@/theme';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { useSelector } from 'react-redux';

export const VideoScreen = () => {
  const videos = useSelector(
    (state: RootState) => state.savedVideos.savedVideos,
  );

  return (
    <Screen safeAreaEdges={['top']}>
      <FlashList
        data={videos}
        keyExtractor={item => item.id?.toString()}
        ListEmptyComponent={()=><Text textAlign="center" mt={5}>No videos found!</Text>}
        estimatedItemSize={100}
        renderItem={({item}) => <VideoCard item={item} />}
        ItemSeparatorComponent={() => <Box height={theme.spacing[5]} />}
        onEndReachedThreshold={0.5}
      />
    </Screen>
  );
};

export default VideoScreen;
