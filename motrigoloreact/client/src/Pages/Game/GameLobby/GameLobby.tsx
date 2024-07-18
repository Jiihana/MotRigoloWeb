import React from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, Paper, Grid } from '@mui/material';

const gameSettings = new GameSettings();

const GameLobby = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/gameLobbyBackgound.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div>
                <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
            </div>
        </Box>
    );
};

export default GameLobby;
