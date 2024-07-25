import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import CardWithText from '../CardWithText/CardWithText';

interface CardWordInterface {
    word: string;
    height: string;
    width: string;
    shouldRotate: boolean;
}

const CardWord = (props: CardWordInterface) => (
    <CardWithText
        cardText={props.word}
        backgroundImage="/images/cardWord.png"
        height={props.height}
        width={props.width}
        cardTextSize="body1"
    ></CardWithText>
);

export default CardWord;
