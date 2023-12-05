import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

//Seleccionar y retornar color de Avatar
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

//Dividir iniciales de nombre y apellido
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 90,
      height: 90,
      fontSize: 35
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[2][0]}`,
  };
}

export default function LetterAvatar(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(`${props.name} ${props.lastName}`)} />
    </Stack>
  );
}
