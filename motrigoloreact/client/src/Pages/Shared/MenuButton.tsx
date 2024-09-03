import { Button, Typography, TypographyVariant } from '@mui/material';
import React from 'react';

interface MenuButtonProps {
    onClick: React.MouseEventHandler | undefined;
    text: string;
    buttonWidth: string;
    textSize: TypographyVariant;
    background: string;
    hoverBackground: string;
}

const MenuButton = (props: MenuButtonProps) => {
    return (
        <Button
            onClick={props.onClick}
            sx={{
                width: props.buttonWidth,
                height: '100%',
                backgroundImage: props.background,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&:hover': {
                    backgroundImage: props.hoverBackground || props.background
                }
            }}
        >
            <Typography variant={props.textSize} color="black" textTransform="none">
                {props.text}
            </Typography>
        </Button>
    );
};

export default MenuButton;
