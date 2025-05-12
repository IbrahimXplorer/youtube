import {Header, Screen, Text} from '@/components';
import useHeader from '@/hooks/useHeader';
import React from 'react';

const HomeScreen = () => {
    useHeader(()=><Header >
        <Header.BackAction />
        <Header.Content title="hellow" subTitle="John Doe"/>
        <Header.Action variant="vector" icon="bell" />
    </Header>);
  return (
    <Screen preset="auto" safeAreaEdges={['top']}>
      <Text>This is home screen</Text>
    </Screen>
  );
};

export default HomeScreen;
