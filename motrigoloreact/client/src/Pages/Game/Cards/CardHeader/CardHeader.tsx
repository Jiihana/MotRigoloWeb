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
            <CardWithText cardText={props.cardText} backgroundImage="/images/carteGrid.png" height="80%" cardTextSize="h1"></CardWithText>
            <CardWord word="Pouet"></CardWord>
        </Stack>
    );
};
export default CardHeader;
