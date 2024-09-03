import React from 'react';
import { Box, Button } from '@mui/material';
import GameSettings from '../../Settings/GameSettings';

const Footer = () => {
    const gameSettings = new GameSettings();
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 'auto',
                p: 2,
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                pointerEvents: 'none'
            }}
        >
            <Box sx={{ pointerEvents: 'auto' }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#5dadb0',
                        '&:hover': {
                            bgcolor: '#4e9b98'
                        },
                        cursor: `${gameSettings.getRandomCursor()}, auto`
                    }}
                >
                    Credits :)
                </Button>
            </Box>
        </Box>
    );
};

export default Footer;
