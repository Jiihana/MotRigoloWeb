import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import CardWithText from '../CardWithText/CardWithText';

interface CardWordInterface {
    word: string;
    height: string;
    width: string;
}

const CardWord = (props: CardWordInterface) => (
    <CardWithText
        cardText={props.word}
        backgroundImage="/images/cardWord.png"
        height={props.height}
        width={props.width}
        textVariant="h2"
        textShouldRotate={false}
    ></CardWithText>
);

export default CardWord;
