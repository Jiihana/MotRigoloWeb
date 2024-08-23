import { Navigate, useLocation, useParams } from 'react-router-dom';
import { GameProvider } from '../../../contexts/GameContext';
import GameLobbyComponents from './GameLobbyComponents';
import { useEffect, useState } from 'react';
import { MotRigoloClient } from '../../../HttpClient/MotRigoloClient';
import { Box, Typography } from '@mui/material';

const GameLobby = () => {
    const { gameid } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [gameExists, setGameExists] = useState<boolean | null>(null);

    useEffect(() => {
        const checkGameExists = async () => {
            const result = await MotRigoloClient.CheckGameExists(gameid as string);

            setGameExists(result.success);

            setIsLoading(false);
        };
        checkGameExists();
    }, [gameExists]);

    if (isLoading || gameExists == null) {
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
            <GameLobbyComponents gameId={gameid as string} />
        </GameProvider>
    ) : (
        <Navigate to="/" />
    );
};

export default GameLobby;
