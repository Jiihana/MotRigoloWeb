import React, { useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, colors, Stack } from '@mui/material';
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
            >
                <Box
                    display="flex"
                    sx={{
                        height: '100%',
                        width: '20%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardInventory></CardInventory>
                </Box>

                <Box
                    display="flex"
                    sx={{
                        height: '100%',
                        width: '60%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
                </Box>

                <Box
                    display="flex"
                    sx={{
                        justifyContent: 'center',
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
