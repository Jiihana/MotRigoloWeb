import React, { useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, Paper, Grid, Avatar, Typography, colors, Stack } from '@mui/material';
import CardWithText from '../Cards/CardWithText/CardWithText';
import CardIndexStatique from '../Cards/CardIndex/CardIndexStatique';
import CardPioche from '../Cards/CardPioche/CardPioche';
import CardInventory from '../Cards/CardInventory/CardInventory';

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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <CardInventory></CardInventory>
                <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
                <CardPioche></CardPioche>
            </Box>
        </Box>
    );
};

export default GameLobby;
