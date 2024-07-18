import { Card, Typography } from '@mui/material';
import React from 'react';
import GameSettings from '../../../Settings/GameSettings';

interface CardGridInterface {
    gridText: string;
}

const CardGrid = (props: CardGridInterface) => {
    return (
        <Card
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
                position: 'relative'
            }}
        >
            <Typography variant="h6" sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                {props.gridText}
            </Typography>
        </Card>
    );
};
export default CardGrid;
