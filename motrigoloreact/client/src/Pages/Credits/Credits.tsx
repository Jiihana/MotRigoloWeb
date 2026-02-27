import { Box, colors, Stack, Typography } from '@mui/material';
import GameSettings from '../../Settings/GameSettings';
import Footer from '../Footer_header/Footer';

const gameSettings = new GameSettings();

const Credits = () => {
    const handleNavigate = () => {
        window.open('https://louve.systems/portal.php', '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Footer navigatePath={`/`} buttonText={'Menu :)'} />
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
                <Box
                    sx={{
                        marginTop: { xs: '25%', sm: '20%', md: '15%' },
                        width: '90%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        textAlign: 'center'
                    }}
                >
                    <Stack
                        spacing={{ xs: 3, md: 5 }}
                        sx={{
                            width: { xs: '90%', sm: '70%', md: '50%' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="h5"
                            color="black"
                            sx={{
                                fontSize: {
                                    xs: '1rem',
                                    sm: '1.25rem',
                                    md: '1.25rem',
                                    lg: '1.5rem',
                                    xl: '1.5rem'
                                }
                            }}
                        >
                            Un grand merci a Nicolas et a Louve Hurlante qui m'ont permis·es de mettre en ligne ce jeu :3
                        </Typography>
                        <Typography
                            variant="h6"
                            color="black"
                            sx={{
                                fontSize: {
                                    xs: '1rem',
                                    sm: '1.25rem',
                                    md: '1.25rem',
                                    lg: '1.5rem',
                                    xl: '1.5rem'
                                }
                            }}
                        >
                            Allez voir le travail de Louve :3
                        </Typography>

                        <Box
                            sx={{
                                width: { xs: '60px', sm: '80px', md: '100px' },
                                height: { xs: '60px', sm: '80px', md: '100px' },
                                backgroundImage: 'url(/images/cursors/vert_gros.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.5)'
                                }
                            }}
                            onClick={handleNavigate}
                        />
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default Credits;
