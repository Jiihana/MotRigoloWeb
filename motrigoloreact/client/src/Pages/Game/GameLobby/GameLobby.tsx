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
            display="flex"
            sx={{
                backgroundImage: 'url(/images/gameLobbyBackgound.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center'
            }}
        >
            <Stack
                direction="row"
                display="flex"
                sx={{
                    justifyItems: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
                spacing={10}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: '20%'
                    }}
                >
                    <CardInventory></CardInventory>
                </Box>

                <Box
                    sx={{
                        height: '100%',
                        width: '60%'
                    }}
                >
                    <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
                </Box>

                <Box
                    display="flex"
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '20%'
                    }}
                >
                    <CardPioche></CardPioche>
                </Box>
            </Stack>
        </Box>
    );
};

export default GameLobby;
