import { Box, colors, Stack } from '@mui/material';
import JoinGameButton from './Buttons/JoinGameButton';
import CreateGameButton from './Buttons/CreateGameButton';
import GameSettings from '../../Settings/GameSettings';
import Footer from '../Footer_header/Footer';

const gameSettings = new GameSettings();

const Accueil = () => {
    return (
        <>
            <Footer navigatePath={`/credits`} buttonText={'Credits :)'} />

            <Box
                display="flex"
                sx={{
                    backgroundImage: { xs: 'url(/images/pages/homeSM.png)', md: 'url(/images/pages/home.png)' },
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: `${gameSettings.getRandomCursor()}, auto`
                }}
            >
                <Stack
                    spacing={{
                        xs: 6,
                        sm: 5,
                        md: 4,
                        lg: 5,
                        xl: 6
                    }}
                    sx={{
                        marginTop: {
                            sm: '0%',
                            md: '15%',
                            lg: '15%'
                        },
                        width: {
                            xs: '50%',
                            sm: '50%',
                            md: '35%',
                            lg: '30%',
                            xl: '30%'
                        },
                        height: 'auto',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        display: 'flex'
                    }}
                >
                    <CreateGameButton />
                    <JoinGameButton />
                </Stack>
            </Box>
        </>
    );
};

export default Accueil;
