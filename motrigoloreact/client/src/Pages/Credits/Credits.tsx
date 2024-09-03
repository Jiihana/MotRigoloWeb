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
                <Box
                    sx={{
                        marginTop: '18%',
                        width: '90%',
                        height: '40%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        textAlign: 'center'
                    }}
                >
                    <Stack
                        spacing={5}
                        sx={{
                            width: '50%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h5" color="black">
                            Un grand merci a Nicolas et a Louve Hurlante qui m'ont permis·es de mettre en ligne ce jeu :3
                        </Typography>
                        <Typography variant="h6" color="black">
                            Allez voir le travail de Louve :3
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={10}
                            sx={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                position: 'relative' // Ensure the hover effect doesn't affect layout
                            }}
                        >
                            <Box
                                display="flex"
                                sx={{
                                    backgroundImage: 'url(/images/cursors/vert_gros.png)',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '100%',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative', // Prevent layout shift
                                    transition: 'transform 0.3s ease', // Smooth transition
                                    '&:hover': {
                                        transform: 'scale(1.5)' // Use scale for hover effect
                                    }
                                }}
                                onClick={handleNavigate}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default Credits;
