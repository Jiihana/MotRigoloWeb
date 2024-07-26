import { Box, Button, colors, Typography, TypographyVariant } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface MenuButtonProps {
    onClick: React.MouseEventHandler | undefined;
    text: string;
    buttonWidth: string;
    textSize: TypographyVariant;
}

const MenuButton = (props: MenuButtonProps) => {
    return (
        <Button
            onClick={props.onClick}
            sx={{
                width: props.buttonWidth,
                height: '100%',
                backgroundImage: 'url(/images/menuButton1.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: colors.purple[500]
            }}
        >
            <Typography variant={props.textSize} color="black" textTransform="none">
                {props.text}
            </Typography>
        </Button>
    );
};

export default MenuButton;
