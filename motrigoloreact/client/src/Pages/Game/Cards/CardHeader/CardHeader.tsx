import { Stack } from '@mui/material';
import React from 'react';
import CardWord from '../CardWord/CardWord';
import CardWithText from '../CardWithText/CardWithText';

export interface CardHeaderInterface {
    cardText: string;
}

const CardHeader = (props: CardHeaderInterface) => {
    return (
        <Stack sx={{ height: '100%', width: '100%' }} direction="column">
            <CardWithText
                cardText={props.cardText}
                backgroundImage="/images/carteGrid.png"
                height="80%"
                width="auto"
                cardTextSize="h1"
            ></CardWithText>
            <CardWord word="Pouet" height="20%" width="auto" shouldRotate={false}></CardWord>
        </Stack>
    );
};
export default CardHeader;
