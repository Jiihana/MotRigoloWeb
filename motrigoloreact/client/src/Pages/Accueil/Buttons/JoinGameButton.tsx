import React, { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, colors, Stack, TextField, Typography } from '@mui/material';
import MenuButton from '../../Shared/MenuButton';
import SocketContext from '../../../contexts/SocketContext';
import { JoinGameRequest } from '../../../common/socket_messages/JoinGame';
import { Navigate } from 'react-router-dom';

interface JoinGameProps {
    // onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const JoinGameButton = (props: JoinGameProps) => {
    const background = 'url(/images/buttons/menuButton1.png)';

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const { socket } = useContext(SocketContext).SocketState;

    const handleJoinGame = () => {
        socket?.emit(JoinGameRequest.Message, new JoinGameRequest(inputValue));
    };

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
            <MenuButton text="Join game ->" buttonWidth="60%" textSize="h4" onClick={handleJoinGame} background={background}></MenuButton>
            <Box
                display="flex"
                sx={{
                    backgroundImage: 'url(/images/cards/cardWord.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: 'auto',
                    width: '25%'
                }}
            >
                <TextField
                    value={inputValue}
                    onChange={handleChange}
                    required
                    placeholder="Game code"
                    variant="standard"
                    margin="normal"
                    inputProps={{ maxLength: 4, style: { fontSize: 25, textAlign: 'center' } }}
                    InputLabelProps={{ style: { fontSize: 25 } }}
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
