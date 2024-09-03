import { ChangeEvent, useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';
import MenuButton from '../../Shared/MenuButton';
import { useNavigate } from 'react-router-dom';

const JoinGameButton = () => {
    const background = 'url(/images/buttons/menuButton1.png)';
    const backgroundHover = 'url(/images/buttons/menuButton1_hover.png)';

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const navigate = useNavigate();

    const handleJoinGame = async () => {
        navigate(`/game/${inputValue}`);
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
            <MenuButton
                text="Rejoindre ->"
                buttonWidth="60%"
                textSize="h4"
                onClick={handleJoinGame}
                background={background}
                hoverBackground={backgroundHover}
            ></MenuButton>
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
                        disableUnderline: true
                    }}
                />
            </Box>
        </Stack>
    );
};

export default JoinGameButton;
