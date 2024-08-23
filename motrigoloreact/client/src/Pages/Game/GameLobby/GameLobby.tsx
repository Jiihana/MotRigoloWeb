import { Navigate, useLocation } from 'react-router-dom';
import { GameContext, GameProvider } from '../../../contexts/GameContext';
import GameLobbyComponents from './GameLobbyComponents';
import { useContext, useEffect, useState } from 'react';
import { MotRigoloClient } from '../../../HttpClient/MotRigoloClient';
import { Box, Typography } from '@mui/material';
import { AlertContext } from '../../../contexts/AlertContext';

const GameLobby = () => {
    const location = useLocation();
    const { gridSize, gameId, chosenWords } = location.state || {};

    const [isLoading, setIsLoading] = useState(true);
    const [gameExists, setGameExists] = useState<boolean | null>(null);

    useEffect(() => {
        const checkGameExists = async () => {
            const result = await MotRigoloClient.CheckGameExists(gameId);
            setGameExists(result.success);

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
            <GameLobbyComponents gridSize={gridSize} gameId={gameId} chosenWords={chosenWords} />
        </GameProvider>
    ) : (
        <Navigate to="/" />
    );
};

export default GameLobby;
