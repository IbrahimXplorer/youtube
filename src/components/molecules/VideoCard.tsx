import {
  Box,
  Clickable,
  HStack,
  IconButton,
  ImageBanner,
  Text,
} from '@/components';
import theme from '@/theme';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';

type VideoCardProps = {
  item: any;
} & TouchableOpacityProps;

export const VideoCard = ({item, onPress}: VideoCardProps) => {
  const {title, channelTitle, thumbnails} = item.snippet;

  return (
    <Clickable onPress={onPress}>
      <Box g={3}>
        <ImageBanner
          source={thumbnails.medium.url}
          width={theme.sizes.width}
          variant="remote"
          height={theme.sizes.width / 2}
          resizeMode="cover"
        />
        <Box px={3} g={3}>
          <HStack justifyContent="space-between">
            <Box>
              <Text numberOfLines={2} variant="b3semiBold">
                {title}
              </Text>
              <Text numberOfLines={1} variant="b4bold">
                {channelTitle}
              </Text>
            </Box>
            <IconButton
              icon="dots-three-vertical"
              type="entypo"
              variant="vector"
            />
          </HStack>
        </Box>
      </Box>
    </Clickable>
  );
};

export default VideoCard;
