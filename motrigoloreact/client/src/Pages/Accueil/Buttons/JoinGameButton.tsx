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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            handleJoinGame();
        }
    };

    const navigate = useNavigate();

    const handleJoinGame = async () => {
        if (inputValue.trim()) {
            navigate(`/game/${inputValue}`);
        }
    };

    return (
        <Stack
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center'
            }}
            spacing={1}
        >
            <MenuButton
                text="Rejoindre"
                textSize="h4"
                onClick={handleJoinGame}
                background={background}
                hoverBackground={backgroundHover}
                dynamicCursor={true}
                staticCursorImage={''}
                disabled={!inputValue.trim()} // Désactiver si le champ est vide
            />
            <Box
                display="flex"
                sx={{
                    backgroundImage: 'url(/images/buttons/inputMenu.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 'auto',
                    maxWidth: { xs: '120px', sm: '130px', md: '140px', lg: '150px', xl: '160px' },
                    minHeight: { xs: '40px', sm: '45px', md: '55px', lg: '60px', xl: '70px' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundImage: 'url(/images/buttons/inputMenu_hovered.png), url(/images/buttons/inputMenu.png)'
                    }
                }}
            >
                <TextField
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    required
                    placeholder="Code"
                    variant="standard"
                    margin="none"
                    inputProps={{
                        maxLength: 4,
                        style: { textAlign: 'center' },
                        sx: {
                            fontSize: {
                                xs: 12,
                                sm: 14,
                                md: 16,
                                lg: 16,
                                xl: 18
                            }
                        }
                    }}
                    sx={{
                        input: { color: 'black' },
                        width: '70%'
                    }}
                    InputProps={{
                        disableUnderline: true
                    }}
                />
            </Box>
        </Stack>
    );
};

export default JoinGameButton;
