import { Box, Stack, Typography } from '@mui/material';
import JoinGameButton from './Buttons/JoinGameButton';
import CreateGameButton from './Buttons/CreateGameButton';
import GameSettings from '../../Settings/GameSettings';
import Footer from '../Footer_header/Footer';

const gameSettings = new GameSettings();

const Accueil = () => {
    return (
        <>
            <Footer navigatePath={`/credits`} buttonText={'Credits :)'} />

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                onClick={() => window.open('https://jihana.fr/', '_blank', 'noopener,noreferrer')}
                sx={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    cursor: 'pointer',
                    px: 2.5,
                    py: 1,
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: '#B1EA90',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#BDEAAC',
                        transform: 'scale(1.05)',
                    },
                }}
            >
                <Box
                    component="img"
                    src="/images/cursors/rose_1.png"
                    sx={{ width: '20px', height: '20px' }}
                />
                <Typography
                    sx={{
                        color: 'black',
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                    }}
                >
                    Autres jeux
                </Typography>
            </Stack>

            <Box
                display="flex"
                sx={{
                    backgroundImage: { xs: 'url(/images/pages/homeSM.png)', md: 'url(/images/pages/home.png)' },
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: `${gameSettings.getRandomCursor()}, auto`
                }}
            >
                <Stack
                    spacing={{
                        xs: 4,
                        sm: 5,
                        md: 4,
                        lg: 5,
                        xl: 6
                    }}
                    sx={{
                        marginTop: {
                            xs: '10%',
                            sm: '5%',
                            md: '15%',
                            lg: '15%'
                        },
                        width: {
                            xs: '70%',
                            sm: '55%',
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

                <Typography
                    sx={{
                        position: 'fixed',
                        bottom: 6,
                        left: 10,
                        color: 'rgba(0, 0, 0, 0.75)',
                        fontSize: '0.75rem',
                        lineHeight: 1.3,
                    }}
                >
                    Ce jeu est un projet personnel non affilie a Mot Malin.
                    <br />
                    Mot Malin est la propriete intellectuelle de © Blue Orange | Auteur: Gregory Grard | Illustrateur: Simon DOUCHY
                </Typography>
            </Box>
        </>
    );
};

export default Accueil;
