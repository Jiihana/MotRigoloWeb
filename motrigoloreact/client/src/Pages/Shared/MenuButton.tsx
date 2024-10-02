import { Button, colors, Typography, TypographyVariant } from '@mui/material';
import React from 'react';
import GameSettings from '../../Settings/GameSettings';

interface MenuButtonProps {
    onClick: React.MouseEventHandler | undefined;
    text: string;
    textSize: TypographyVariant;
    background: string;
    hoverBackground: string;
    dynamicCursor: boolean;
    staticCursorImage: string;
    disabled: boolean;
}

const MenuButton = (props: MenuButtonProps) => {
    const gameSettings = new GameSettings();

    return (
        <Button
            onClick={props.onClick}
            sx={{
                width: '100%',
                height: 'auto',
                maxWidth: { xs: '220px', sm: '280px', md: '330px', lg: '370px', xl: '400px' },
                minHeight: { xs: '40px', sm: '50px', md: '60px', lg: '70px', xl: '75px' },
                backgroundImage: props.background,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: 0,
                border: 'none',
                display: 'block',
                '&:hover': {
                    backgroundImage: props.hoverBackground || props.background
                },
                pointerEvents: props.disabled ? 'none' : 'auto',
                cursor: props.dynamicCursor ? `${gameSettings.getRandomCursor()}, auto` : `${props.staticCursorImage}, auto`
            }}
        >
            <Typography
                variant={props.textSize}
                color="black"
                textTransform="none"
                sx={{
                    fontSize: {
                        xs: '1rem',
                        sm: '1rem',
                        md: '1.5rem',
                        lg: '1.5rem',
                        xl: '1.5rem'
                    }
                }}
            >
                {props.text}
            </Typography>
        </Button>
    );
};

export default MenuButton;
