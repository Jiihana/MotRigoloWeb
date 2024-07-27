import React, { useContext, useEffect } from 'react';
import { Box, Button, colors, Stack } from '@mui/material';
import JoinGameButton from './Buttons/JoinGameButton';
import SocketContext from '../../contexts/SocketContext';
import { CreateGameRequest, CreateGameResponse } from '../../common/socket_messages/CreateGame';
import CreateGameButton from './Buttons/CreateGameButton';
import { useNavigate } from 'react-router-dom';
import { JoinGameResponse } from '../../common/socket_messages/JoinGame';
import GameSettings from '../../Settings/GameSettings';

interface JoinCreateGameProps {
    // onClickCreate: React.MouseEventHandler<HTMLButtonElement>;
    // onClickJoin: React.MouseEventHandler<HTMLButtonElement>;
}

const gameSettings = new GameSettings();

const Accueil = (props: JoinCreateGameProps) => {
    const { socket } = useContext(SocketContext).SocketState;
    const navigate = useNavigate();

    useEffect(() => {
        socket?.on(CreateGameResponse.Message, (args: CreateGameResponse) => {
            navigate(`/game/${args.gameId}`);
        });

        socket?.on(JoinGameResponse.Message, (args: JoinGameResponse) => {
            navigate(`/game/${args.gameId}`);
        });
    }, []);

    return (
        <Box
            display="flex"
            sx={{
                backgroundImage: 'url(/images/pages/home.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: `${gameSettings.getRandomCursor()}, auto`
            }}
        >
            <Stack
                spacing={10}
                sx={{
                    marginTop: '20%',
                    width: '35%',
                    height: '40%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
                display="flex"
            >
                <Box display="flex" sx={{ width: '60%', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <CreateGameButton />
                </Box>
                <Box display="flex" sx={{ width: '100%', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <JoinGameButton />
                </Box>
            </Stack>
        </Box>
    );
};

export default Accueil;
