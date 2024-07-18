import { Card, Typography } from '@mui/material';
import React from 'react';
import GameSettings from '../../../Settings/GameSettings';

interface CardWordInterface {
    word: string;
    id: string;
}

const CardWord = (props: CardWordInterface) => {
    return (
        <Card
            id={props.id}
            sx={{
                backgroundImage: 'url(/images/cardWord.png)',
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
                {props.word}
            </Typography>
        </Card>
    );
};
export default CardWord;
