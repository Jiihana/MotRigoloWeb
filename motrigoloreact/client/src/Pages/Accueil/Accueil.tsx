import { Box, Stack } from '@mui/material';
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
                    backgroundImage: 'url(/images/pages/home.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: `${gameSettings.getRandomCursor()}, auto`
                }}
            >
                <Stack
                    spacing={10}
                    sx={{
                        marginTop: '20%',
                        width: '35%',
                        height: '40%',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                    display="flex"
                >
                    <Box display="flex" sx={{ width: '60%', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
                        <CreateGameButton />
                    </Box>
                    <Box display="flex" sx={{ width: '100%', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
                        <JoinGameButton />
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

export default Accueil;
