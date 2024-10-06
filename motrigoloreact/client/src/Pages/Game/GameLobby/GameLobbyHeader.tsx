import { useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import MenuButton from '../../Shared/MenuButton';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../contexts/GameContext';

interface GameLobbyHeaderProps {
    staticCursorImage: string;
}

const GameLobbyHeader = (props: GameLobbyHeaderProps) => {
    const gameContext = useContext(GameContext);

    const backgroundButton = 'url(/images/buttons/menuButton2.png)';
    const backgroundButtonHover = 'url(/images/buttons/menuButton2_hover.png)';

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
            <Box
                sx={{
                    width: {
                        xs: '30%',
                        sm: '25%',
                        md: '20%',
                        lg: '20%',
                        xl: '15%'
                    }
                }}
            >
                <MenuButton
                    text="Accueil"
                    textSize="h5"
                    onClick={backToMenuHandler}
                    background={backgroundButton}
                    hoverBackground={backgroundButtonHover}
                    dynamicCursor={false}
                    staticCursorImage={props.staticCursorImage}
                    disabled={false}
                />
            </Box>
            <Typography variant="h6" sx={{ color: 'white' }}>
                {gameContext.gameId}
            </Typography>
        </Stack>
    );
};

export default GameLobbyHeader;
