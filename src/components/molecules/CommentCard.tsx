import { getImage } from '@assets/constants/images';
import React, { FC } from 'react';
import { Box } from '../ui/layout/Box';
import HStack from '../ui/layout/HStack';
import ImageBanner from '../ui/media-icons/ImageBanner';
import { Text } from '../ui/typography/Text';

type CommentCardProps = {
  userName: string;
  text: string;
  photoURL: string;
};

export const CommentCard: FC<CommentCardProps> = ({
  userName,
  text,
  photoURL,
}) => {
  return (
    <Box mt={3} bg="white" borderRadius="rounded-sm" p={4} g={3}>
      <HStack g={3}>
        <ImageBanner
          source={photoURL || getImage('avatar')}
          variant={photoURL ? 'remote' : 'local'}
          width={20}
          height={20}
          borderRadius="rounded-full"
          resizeMode="cover"
        />
        <Text variant="b4bold" color="black">
          {userName || 'Annonymus'}
        </Text>
      </HStack>
      <Text color="black300" variant="b4regular">
        {text}
      </Text>
    </Box>
  );
};

export default CommentCard;
