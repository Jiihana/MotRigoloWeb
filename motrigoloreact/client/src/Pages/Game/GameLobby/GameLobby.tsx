import { Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from '../../../contexts/GameContext';
import GameLobbyComponents from './GameLobbyComponents';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../../contexts/SocketContext';
import { SynchronizeGameValuesRequest } from '../../../common/socket_messages/SynchronizeGameValues';
import { MotRigoloClient } from '../../../HttpClient/MotRigoloClient';
import { Box, Typography } from '@mui/material';

const GameLobby = () => {
    const location = useLocation();
    const { gridSize, gameId, chosenWords } = location.state || {};
    const { socket } = useContext(SocketContext).SocketState;

    const [isLoading, setIsLoading] = useState(true);
    const [gameExists, setGameExists] = useState<boolean | null>(null);

    useEffect(() => {
        socket?.emit(SynchronizeGameValuesRequest.Message, new SynchronizeGameValuesRequest());

        const checkGameExists = async () => {
            console.log(gameId);
            const result = await MotRigoloClient.CheckGameExists(gameId);

            if (!result.success) {
                setGameExists(false);
            } else {
                setGameExists(result.value.gameExists);
            }
            setIsLoading(false);
        };

        checkGameExists();
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white'
                }}
            >
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    return gameExists ? (
        <GameProvider>
            <GameLobbyComponents gridSize={gridSize} gameId={gameId} chosenWords={chosenWords}></GameLobbyComponents>
        </GameProvider>
    ) : (
        <Navigate to="/" />
    );
};

export default GameLobby;
