import React, { useEffect } from 'react';
import GameGrid from '../GameGrid/GameGrid';
import GameSettings from '../../../Settings/GameSettings';
import { Box, Paper, Grid } from '@mui/material';
import { CardType } from '../CardGrid/CardGrid';

const gameSettings = new GameSettings();

const GameLobby = () => {
    useEffect(() => {
        // Code pour exécuter des effets secondaires, comme le logging, après le rendu du composant
        const specialCards = document.querySelectorAll(`[id="${CardType.Number}"]`);
        console.log(specialCards);
    }, []); // Le tableau vide [] signifie que cet effet s'exécute une seule fois, après le premier rendu

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
