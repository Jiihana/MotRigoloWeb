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
                        bgcolor: '#B1EA90',
                        color: 'black',
                        borderRadius: '20px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            bgcolor: '#BDEAAC',
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
