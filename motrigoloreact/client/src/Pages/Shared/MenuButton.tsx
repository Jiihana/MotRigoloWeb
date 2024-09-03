import { Button, Typography, TypographyVariant } from '@mui/material';
import React from 'react';
import GameSettings from '../../Settings/GameSettings';

interface MenuButtonProps {
    onClick: React.MouseEventHandler | undefined;
    text: string;
    buttonWidth: string;
    textSize: TypographyVariant;
    background: string;
    hoverBackground: string;
    dynamicCursor: boolean;
    staticCursorImage: string;
}

const MenuButton = (props: MenuButtonProps) => {
    const gameSettings = new GameSettings();

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
                },

                cursor: props.dynamicCursor ? `${gameSettings.getRandomCursor()}, auto` : `${props.staticCursorImage}, auto`
            }}
        >
            <Typography variant={props.textSize} color="black" textTransform="none">
                {props.text}
            </Typography>
        </Button>
    );
};

export default MenuButton;
