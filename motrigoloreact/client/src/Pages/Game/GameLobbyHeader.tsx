import React, { useState } from 'react';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import MenuButton from '../Shared/MenuButton';

const GameLobbyHeader = () => {
    return (
        <Stack
            display="flex"
            direction="row"
            spacing={0}
            sx={{
                height: 'auto',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '0.5%'
            }}
        >
            <MenuButton text="<- Home" buttonWidth="13%" textSize="h5" pageRedirection="/"></MenuButton>
            <Typography variant="h6" sx={{ color: 'white' }}>
                1255
            </Typography>
        </Stack>
    );
};
export default GameLobbyHeader;
