import React, {FC} from 'react';
import { Box } from '../ui/layout/Box';
import { Text } from '../ui/typography/Text';

type CommentCardProps = {
  username: string;
  text: string;
};

export const CommentCard: FC<CommentCardProps> = ({username, text}) => {
  return (
    <Box mt={3} bg="white" borderRadius="rounded-sm" p={4} g={3}>
      <Text variant="b4bold" color="black">
        {username || 'User'}
      </Text>
      <Text color="black300" variant="b4regular">
        {text}
      </Text>
    </Box>
  );
};

export default CommentCard;
