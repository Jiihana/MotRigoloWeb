import React, { useContext, useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, colors, Stack } from '@mui/material';
import CardPioche from '../Cards/CardPioche/CardPioche';
import SocketContext from '../../../contexts/SocketContext';
import { CheckGameExistsRequest } from '../../../common/socket_messages/GameExistsCheck';
import GameLobbyHeader from './GameLobbyHeader';
import CardsInventory from '../Cards/CardInventory/CardInventory';

const gameSettings = new GameSettings();

const GameLobby = () => {
    const randomCursor = gameSettings.getRandomCursor();
    console.log(randomCursor);

    return (
        <Box
            display="flex"
            sx={{
                backgroundImage: 'url(/images/pages/gameLobbyBackgound.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: `${randomCursor}, auto` // Spécifiez l'URL de votre image de curseur ici
            }}
        >
            <Stack
                direction="column"
                sx={{
                    justifyItems: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
                <GameLobbyHeader />
                <Stack
                    direction="row"
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Stack
                        direction="column"
                        sx={{
                            height: '100%',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CardsInventory cardsInInventory={{ A: 1, D: 5, C: 1 }}></CardsInventory>
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '60%',
                            justifyContent: 'center'
                        }}
                    >
                        <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
                    </Box>

                    <Box
                        sx={{
                            height: '100%',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex'
                        }}
                    >
                        <CardPioche></CardPioche>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default GameLobby;
