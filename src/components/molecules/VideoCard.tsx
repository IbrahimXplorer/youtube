import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Box,
  Clickable,
  HStack,
  IconButton,
  Text,
} from '@/components';
import theme from '@/theme';

type VideoCardProps = {
  item: any;
  onDelete?: (id: string) => void;
  showDeleteIcon?: boolean;
} & React.ComponentProps<typeof Clickable>;

export const VideoCard = ({
  item,
  showDeleteIcon = false,
  onPress,
  onDelete,
}: VideoCardProps) => {
  const { title, channelTitle, thumbnails } = item.snippet;

  const [loadedImages, setLoadedImages] = useState({
    medium: false,
    maxres: false,
  });

  const handleLoad = useCallback((key: keyof typeof loadedImages) => {
    setLoadedImages(prev => ({ ...prev, [key]: true }));
  }, []);

  const imageSources = [
    { uri: thumbnails?.default?.url, key: 'default' },
    { uri: thumbnails?.medium?.url, key: 'medium' },
    { uri: thumbnails?.maxres?.url, key: 'maxres' },
  ];

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
        <Box style={styles.imageContainer}>
          {imageSources.map(({ uri, key }) => {
            const isVisible =
              key === 'default' ||
              (key === 'medium' && loadedImages.medium) ||
              (key === 'maxres' && loadedImages.maxres);

            return (
              uri && (
                <FastImage
                  key={key}
                  source={{ uri }}
                  style={[
                    styles.image,
                    isVisible ? styles.visible : styles.hidden,
                  ]}
                  onLoad={() =>
                    key !== 'default' && handleLoad(key as keyof typeof loadedImages)
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              )
            );
          })}
        </Box>

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

const styles = StyleSheet.create({
  imageContainer: {
    width: theme.sizes.width,
    height: theme.sizes.width / 2,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

export default VideoCard;
