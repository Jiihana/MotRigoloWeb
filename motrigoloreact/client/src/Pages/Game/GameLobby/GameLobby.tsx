import React, { useContext, useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, colors, Stack } from '@mui/material';
import CardPioche from '../Cards/CardPioche/CardPioche';
import CardInventory from '../Cards/CardInventory/CardInventory';
import SocketContext from '../../../contexts/SocketContext';
import { CheckGameExistsRequest } from '../../../common/socket_messages/GameExistsCheck';
import GameLobbyHeader from '../GameLobbyHeader';

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
                justifyContent: 'center',
                alignItems: 'center'
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
                            justifyContent: 'center',
                            backgroundColor: colors.amber[200]
                        }}
                    >
                        {/* <CardInventory></CardInventory> */}
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '60%',
                            justifyContent: 'center',
                            backgroundColor: colors.pink[200]
                        }}
                    >
                        <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />
                    </Box>

                    <Box
                        sx={{
                            alignItems: 'center',
                            height: '100%',
                            width: '20%',
                            backgroundColor: colors.blue[200]
                        }}
                    >
                        {/* <CardPioche></CardPioche> */}
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default GameLobby;
