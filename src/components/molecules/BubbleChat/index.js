import React from 'react';
import Friend from './Friend';
import Me from './Me';

const BubbleChat = ({message, photo, date, isFriend}) => isFriend ? (
                        <Friend 
                            photo={photo}
                            message={message}
                            date={date}
                        />
                    ) : (
                        <Me 
                            message={message}
                            date={date}
                        />
                    );

export default BubbleChat;
