import React, { useContext } from 'react';
import { Box, Button, colors, Stack } from '@mui/material';
import JoinGameButton from './Buttons/JoinGameButton';
import SocketContext from '../../contexts/SocketContext';
import { CreateGameRequest } from '../../common/socket_messages/CreateGame';
import CreateGameButton from './Buttons/CreateGameButton';

const Accueil = () => {
    const { socket, uid, users } = useContext(SocketContext).SocketState;

    const handleCreateGame = () => {
        console.log('c');
        socket?.emit(CreateGameRequest.Message);
    };

    return (
        <Box
            display="flex"
            sx={{
                backgroundImage: 'url(/images/home.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Stack
                spacing={4}
                sx={{
                    marginTop: '10%',
                    width: '40%',
                    height: '20%',
                    alignItems: 'center'
                }}
                display="flex"
            >
                <Box display="flex" sx={{ width: '60%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <CreateGameButton />
                </Box>
                <Box display="flex" sx={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <JoinGameButton />
                </Box>
            </Stack>
        </Box>
    );
};

export default Accueil;
