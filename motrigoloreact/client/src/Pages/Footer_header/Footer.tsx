import { Box, Button } from '@mui/material';
import GameSettings from '../../Settings/GameSettings';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
    navigatePath: string;
    buttonText: string;
}

const Footer = (props: FooterProps) => {
    const navigate = useNavigate();

    const gameSettings = new GameSettings();
    const handleNav = () => {
        navigate(`/credits`);
        navigate(props.navigatePath);
    };

    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 'auto',
                p: 2,
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                pointerEvents: 'none'
            }}
        >
            <Box sx={{ pointerEvents: 'auto' }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#5dadb0',
                        '&:hover': {
                            bgcolor: '#4e9b98'
                        },
                        cursor: `${gameSettings.getRandomCursor()}, auto`,
                        textTransform: 'none'
                    }}
                    onClick={handleNav}
                >
                    {props.buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default Footer;
