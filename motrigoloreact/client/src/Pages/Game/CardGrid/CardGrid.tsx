import { Card, Typography } from '@mui/material';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import GameSettings from '../../../Settings/GameSettings';

export enum CardType {
    Letter,
    Number,
    Nothing
}

interface CardGridInterface {
    type: CardType;
    id: string;
}

const CardGrid = forwardRef<any, CardGridInterface>((props, ref) => {
    const [cardText, setCardText] = useState('');

    // Utiliser useImperativeHandle pour exposer setCardText
    useImperativeHandle(ref, () => ({
        setCardText: (text: string) => setCardText(text)
    }));

    return (
        <Card
            id={props.id}
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
            <Typography variant="h3" sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                {cardText}
            </Typography>
        </Card>
    );
});
export default CardGrid;
