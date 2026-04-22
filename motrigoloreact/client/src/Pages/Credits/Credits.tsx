import { Box, Stack, Typography } from '@mui/material';
import GameSettings from '../../Settings/GameSettings';
import Footer from '../Footer_header/Footer';

const gameSettings = new GameSettings();

const Credits = () => {
    const handleNavigate = () => {
        window.open('https://louve.systems/portal.php', '_blank', 'noopener,noreferrer');
    };
    const handleAutresJeux = () => {
        window.open('https://jihana.fr/', '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Footer navigatePath="/" buttonText="Accueil" />

            <Box
                display="flex"
                sx={{
                    backgroundImage: 'url(/images/pages/gameLobbyBackgound.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                    overflow: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    cursor: `${gameSettings.getRandomCursor()}, auto`
                }}
            >
                <Stack
                    spacing={5}
                    sx={{
                        alignItems: 'center',
                        textAlign: 'center',
                        maxWidth: '600px',
                        px: 3,
                        py: 4,
                    }}
                >
                    {/* Coded by */}
                    <Stack spacing={1} alignItems="center">
                        <Typography
                            sx={{
                                color: '#ecc7ce',
                                fontSize: '1.1rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textShadow: '0 0 12px rgba(236, 199, 206, 0.4)',
                            }}
                        >
                            Codé avec amour par
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: '3rem',
                                fontWeight: 300,
                                letterSpacing: '0.08em',
                                textShadow: '0 0 20px rgba(177, 234, 144, 0.4)',
                            }}
                        >
                            Jihana
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                            onClick={handleAutresJeux}
                            sx={{
                                cursor: 'pointer',
                                px: 2.5,
                                py: 1,
                                borderRadius: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="/images/cursors/rose_1.png"
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                }}
                            />
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                Autres jeux
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Divider */}
                    <Box
                        sx={{
                            width: '80px',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #B1EA90, transparent)',
                        }}
                    />

                    {/* Remerciements */}
                    <Stack spacing={3} alignItems="center">
                        <Typography
                            sx={{
                                color: '#ecc7ce',
                                fontSize: '0.85rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textShadow: '0 0 12px rgba(236, 199, 206, 0.4)',
                            }}
                        >
                            Remerciements
                        </Typography>

                        <Typography sx={{ color: 'white', fontSize: '1.1rem', textShadow: '0 0 10px rgba(177, 234, 144, 0.25)' }}>
                            Nicolas
                        </Typography>

                        <Stack spacing={0.5} alignItems="center">
                            <Typography sx={{ color: 'white', fontSize: '1.1rem', textShadow: '0 0 10px rgba(177, 234, 144, 0.25)' }}>
                                Louve Hurlante
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent="center"
                                onClick={handleNavigate}
                                sx={{
                                    cursor: 'pointer',
                                    px: 2,
                                    py: 0.8,
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                        border: '1px solid rgba(255, 255, 255, 0.8)',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/cursors/bleu_1.png"
                                    sx={{
                                        width: '18px',
                                        height: '18px',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    Site internet
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

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

export default Credits;
