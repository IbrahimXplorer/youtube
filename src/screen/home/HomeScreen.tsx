/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import { Box, Screen, Text, VideoCard } from '@/components';
import { useGetVideosQuery } from '@/store/services/apiSlice';
import theme from '@/theme';
import {
  RootNavigatorScreenProps,
} from '@/types/navigation';
import { VideoItemType } from '@/types/youtube';
import { FlashList } from '@shopify/flash-list';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

interface HomeScreenProps
  extends RootNavigatorScreenProps<
    'AuthenticatedStack' | 'UnAuthenticatedStack'
  > {}

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [videos, setVideos] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const {data, error, isLoading, isFetching, refetch} = useGetVideosQuery({
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    chart: 'mostPopular',
    regionCode: 'us',
    pageToken,
  });

  // Append or reset list
  useEffect(() => {
    if (data?.items) {
      setVideos(prev =>
        pageToken && !isRefreshing ? [...prev, ...data.items] : data.items,
      );
      setHasNextPage(!!data.nextPageToken);
    }
  }, [data]);

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPageToken(undefined);
    await refetch();
    setIsRefreshing(false);
  };

  // Handle infinite scroll
  const handleEndReached = () => {
    if (data?.nextPageToken && !isFetching) {
      setPageToken(data.nextPageToken);
    }
  };

  const handleVideoPress = (video:VideoItemType) => {
    navigation.navigate('AuthenticatedStack', {
      screen: 'SingleVideo',
      params: {video},
    });
  };

  // Footer loader
  const renderFooter = () => {
    if (!hasNextPage || isRefreshing) {
      return null;
    }
    return (
      <Box paddingVertical={10} alignItems="center">
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </Box>
    );
  };

  return (
    <Screen preset="fixed" safeAreaEdges={['top']}>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error fetching videos</Text>}

      {!isLoading && !error && (
        <FlashList
          data={videos}
          ListEmptyComponent={()=><Text textAlign="center" marginTop={10}>No videos found!</Text>}
          keyExtractor={item => item.id?.toString()}
          estimatedItemSize={100}
          renderItem={({item}) => (
            <VideoCard item={item} onPress={() => handleVideoPress(item)} />
          )}
          ItemSeparatorComponent={() => <Box height={theme.spacing[5]} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={renderFooter}
        />
      )}
    </Screen>
  );
};

export default HomeScreen;
