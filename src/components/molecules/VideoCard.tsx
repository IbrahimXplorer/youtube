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
  onDelete?: (id: string) => void;
  showDeleteIcon?: boolean;
} & TouchableOpacityProps;

export const VideoCard = ({
  item,
  showDeleteIcon = false,
  onPress,
  onDelete,
}: VideoCardProps) => {
  const {title, channelTitle, thumbnails} = item.snippet;

  return (
    <Clickable onPress={onPress}>
      {showDeleteIcon && (
        <Box zIndex={10} position="absolute" right={10} top={10}>
          <IconButton
            onPress={() => onDelete?.(item?.id)}
            type="ant"
            icon="delete"
            color="danger"
            variant="vector"
            iconStyle="contained"
          />
        </Box>
      )}
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
              <Text numberOfLines={1} color="primary" variant="b4bold">
                {channelTitle}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Clickable>
  );
};

export default VideoCard;
