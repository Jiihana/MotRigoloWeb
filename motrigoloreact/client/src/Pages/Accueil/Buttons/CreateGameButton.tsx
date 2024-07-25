import { Box, Button, colors, Typography } from '@mui/material';
import React from 'react';

interface CreateGameProps {
    // onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const CreateGameButton = (props: CreateGameProps) => {
    return (
        <Button
            // onClick={props.onClick}
            sx={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/menuButton1.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Typography variant="h3" color="black" textTransform="none">
                Create game
            </Typography>
        </Button>
    );
};

export default CreateGameButton;
