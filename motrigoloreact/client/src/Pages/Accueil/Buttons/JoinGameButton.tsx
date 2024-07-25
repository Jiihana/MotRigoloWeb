import React from 'react';
import { Box, Button, colors, Stack, TextField, Typography } from '@mui/material';
import MenuButton from '../../Shared/MenuButton';

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
            <MenuButton text="Join game ->" buttonWidth="60%" textSize="h3" pageRedirection="/"></MenuButton>
            <Box
                display="flex"
                sx={{
                    backgroundImage: 'url(/images/cardWord.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: 'auto',
                    width: '25%'
                }}
            >
                <TextField
                    required
                    placeholder="Game code"
                    variant="standard"
                    margin="normal"
                    inputProps={{ maxLength: 4, style: { fontSize: 30, textAlign: 'center' } }}
                    InputLabelProps={{ style: { fontSize: 30 } }}
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
