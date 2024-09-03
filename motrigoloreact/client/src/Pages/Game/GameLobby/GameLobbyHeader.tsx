import { useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import MenuButton from '../../Shared/MenuButton';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../contexts/GameContext';

const GameLobbyHeader = () => {
    const gameContext = useContext(GameContext);

    const backgroundButton = 'url(/images/buttons/menuButton2.png)';

    const navigate = useNavigate();

    const backToMenuHandler = async () => {
        await gameContext.getClient().LeaveGame();
        navigate('/');
    };

    return (
        <Stack
            display="flex"
            direction="row"
            spacing={0}
            sx={{
                height: 'auto',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '0.5%'
            }}
        >
            <MenuButton
                text="Home"
                buttonWidth="15%"
                textSize="h5"
                onClick={backToMenuHandler}
                background={backgroundButton}
                hoverBackground={backgroundButton}
            />
            <Typography variant="h6" sx={{ color: 'white' }}>
                {gameContext.gameId}
            </Typography>
        </Stack>
    );
};

export default GameLobbyHeader;
