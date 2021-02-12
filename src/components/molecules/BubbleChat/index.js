import React from 'react';
import Friend from './Friend';
import Me from './Me';

const BubbleChat = ({isFriend}) => isFriend ? <Friend /> : <Me />;

export default BubbleChat;
