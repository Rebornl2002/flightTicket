import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    const words = name.split(' ').filter((word) => word !== ''); // Remove empty words
    const firstName = words[0][0];
    const lastName = words[words.length - 1][0];
    const initials = `${firstName}${lastName}`;
    return {
        sx: {
            bgcolor: stringToColor(name),
            fontSize: 14,
            width: 32,
            height: 32,
        },
        children: initials.toUpperCase(),
    };
}

export default function AvatarPeople({ string, height, width, fontSize }) {
    const avatarProps = stringAvatar(string);
    console.log(string, height, width);

    if (height) {
        avatarProps.sx.height = height;
    }

    if (width) {
        avatarProps.sx.width = width;
    }

    if (fontSize) {
        avatarProps.sx.fontSize = fontSize;
    }

    return <Avatar {...avatarProps} />;
}
