import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import JoinLobbyButton from './JoinLobbyButton/JoinLobbyButton';
import SocketContext from '../../contexts/SocketContext';
import { CreateGameRequest } from '../../common/socket_messages/CreateGame';

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
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                display="flex"
                sx={{
                    backgroundColor: '#f0f0f0',
                    padding: '20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Ajouté pour centrer les enfants horizontalement
                    gap: 8
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateGame}
                    sx={{
                        width: '70%',
                        maxWidth: '300px',
                        height: 'auto',
                        fontSize: '1.2rem'
                    }}
                >
                    Create game
                </Button>
                <JoinLobbyButton />
            </Box>
        </Box>
    );
};

export default Accueil;
