import {Theme} from '@/theme';
import {TextProps} from '@shopify/restyle';
import React, {FC} from 'react';
import {Text} from '../ui/typography/Text';

type EmtpyListCardProps = {
  title?: string;
} & TextProps<Theme>;

export const EmtpyListCard: FC<EmtpyListCardProps> = ({title = 'No Items Found!', ...rest}) => {
  return <Text {...rest} textAlign="center">{title}</Text>;
};

export default EmtpyListCard;
