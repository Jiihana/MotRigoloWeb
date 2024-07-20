import { Box, Card, Stack, Typography } from '@mui/material';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import CardWord from '../CardWord/CardWord';
import CardWithText from '../CardWithText/CardWithText';

enum cardWordDirection {
    Right,
    Bottom
}

const isLetter = (str: string): boolean => {
    return /^[a-zA-Z]$/.test(str);
};

export interface CardGridInterface {
    cardText: string;
}

const CardGrid = (props: CardGridInterface) => {
    // if (!isLetter(props.cardText)) {
    return (
        <>
            <CardWithText cardText={props.cardText} backgroundImage="/images/carteGrid.png" height="100%"></CardWithText>
            {/* <CardWord word="pouet" width="100%" /> */}
        </>
    );
    // }
};
export default CardGrid;
