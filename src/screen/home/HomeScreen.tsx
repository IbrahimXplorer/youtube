/* eslint-disable react/no-unstable-nested-components */
// screens/HomeScreen.tsx
import {Box, Screen, Text, VideoItem} from '@/components';
import {useGetVideosQuery} from '@/store/services/apiSlice';
import theme from '@/theme';
import {FlashList} from '@shopify/flash-list';
import React from 'react';

const HomeScreen = () => {
  const {data, error, isLoading} = useGetVideosQuery({
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    chart: 'mostPopular',
    regionCode: 'us',
  });

  const videos = data?.items ?? [];

  return (
    <Screen preset="fixed" safeAreaEdges={['top']}>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error fetching videos</Text>}
      {!isLoading && !error && (
        <FlashList
          data={videos}
          keyExtractor={item => item.id?.toString()}
          estimatedItemSize={100}
          renderItem={({item}) => <VideoItem item={item} />}
          ItemSeparatorComponent={() => <Box height={theme.spacing[5]} />}
        />
      )}
    </Screen>
  );
};

export default HomeScreen;
