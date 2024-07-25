import React from 'react';
import { Box, Button, colors, Stack, TextField, Typography } from '@mui/material';

interface JoinGameProps {
    // onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const JoinGameButton = (props: JoinGameProps) => {
    return (
        <Stack
            display="flex"
            direction="row"
            sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center'
            }}
            spacing={4}
        >
            <Button
                // onClick={props.onClick}
                sx={{
                    width: '60%',
                    height: '100%',
                    backgroundImage: 'url(/images/menuButton1.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Typography variant="h3" color="black" textTransform="none">
                    Join game
                </Typography>
            </Button>
            <Box
                display="flex"
                sx={{
                    backgroundImage: 'url(/images/menuButton1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '30%'
                }}
            >
                <TextField
                    required
                    placeholder="Game code"
                    variant="standard"
                    margin="normal"
                    inputProps={{ maxLength: 4, style: { fontSize: 40, textAlign: 'center' } }}
                    InputLabelProps={{ style: { fontSize: 40 } }}
                    sx={{ input: { color: 'black' }, width: '100%', height: '100%', paddingTop: '2%' }}
                    InputProps={{
                        disableUnderline: true // Désactive le trait par défaut si vous souhaitez personnaliser entièrement le trait
                    }}
                />
            </Box>
        </Stack>
    );
};

export default JoinGameButton;
