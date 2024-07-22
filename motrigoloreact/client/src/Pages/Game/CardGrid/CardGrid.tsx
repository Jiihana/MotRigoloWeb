import { Box, Card, Stack, Typography } from '@mui/material';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import CardWord from '../CardWord/CardWord';
import CardWithText from '../CardWithText/CardWithText';

enum cardWordDirection {
    Right,
    Bottom
}

export interface CardGridInterface {
    cardText: string;
}

const CardGrid = (props: CardGridInterface) => {
    return (
        <>
            <CardWithText
                cardText={props.cardText}
                backgroundImage="/images/carteGrid.png"
                height="100%"
                width="100%"
                cardTextSize="h1"
            ></CardWithText>
            <CardWord word="pouet" />
        </>
    );
};
export default CardGrid;
