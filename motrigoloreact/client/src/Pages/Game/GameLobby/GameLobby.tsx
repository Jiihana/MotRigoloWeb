import React, { useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, Paper, Grid, Avatar, Typography, colors } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

const gameSettings = new GameSettings();

const GameLobby = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/gameLobbyBackgound.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                display: 'flex', // Utiliser Flexbox
                justifyContent: 'center', // Centrer horizontalement
                alignItems: 'center' // Centrer verticalement
            }}
        >
            <Box
                sx={{
                    display: 'flex', // Utiliser Flexbox
                    justifyContent: 'center', // Centrer horizontalement
                    alignItems: 'center' // Centrer verticalement,
                }}
            >
                <GameGrid numberOfCardPerRow={gameSettings.nombreCartesParRangees} />

                <Box sx={{ height: '8%', width: '8%', marginRight: '-20%', marginLeft: '10%' }}>
                    <CardWithText
                        cardText="Pioche"
                        backgroundImage="/images/cardIndexBack.png"
                        height="100%"
                        width="100%"
                        cardTextSize="h3"
                    ></CardWithText>
                </Box>
            </Box>
        </Box>
    );
};

export default GameLobby;
