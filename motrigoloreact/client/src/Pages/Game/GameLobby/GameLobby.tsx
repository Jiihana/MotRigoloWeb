import React, { useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, Paper, Grid, Avatar, Typography } from '@mui/material';

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
                display: 'flex', // Utiliser Flexbox
                justifyContent: 'center', // Centrer horizontalement
                alignItems: 'center' // Centrer verticalement
            }}
        >
            <Box
                sx={{
                    display: 'flex', // Utiliser Flexbox
                    justifyContent: 'center', // Centrer horizontalement
                    alignItems: 'center' // Centrer verticalement
                }}
            >
                <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
            </Box>
        </Box>
    );
};

export default GameLobby;
