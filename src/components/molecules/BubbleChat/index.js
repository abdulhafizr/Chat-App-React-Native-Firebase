import React from 'react';
import Friend from './Friend';
import Me from './Me';

const BubbleChat = ({message, photo, date, onLongPress, isFriend}) => isFriend ? (
                        <Friend 
                            photo={photo}
                            message={message}
                            date={date}
                            onLongPress={onLongPress}
                        />
                    ) : (
                        <Me 
                            message={message}
                            date={date}
                            onLongPress={onLongPress}
                        />
                    );

export default BubbleChat;
