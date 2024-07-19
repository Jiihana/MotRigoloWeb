import { Card, Typography } from '@mui/material';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import GameSettings from '../../../Settings/GameSettings';

export interface CardGridInterface {
    cardText: string;
}

const CardGrid = (props: CardGridInterface) => {
    return (
        <Card
            id="pouet"
            sx={{
                backgroundImage: 'url(/images/carteGrid.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                marginRight: 1000,
                marginBottom: '100px'
            }}
        >
            <Typography variant="h3" sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                {props.cardText}
            </Typography>
        </Card>
    );
};
export default CardGrid;
