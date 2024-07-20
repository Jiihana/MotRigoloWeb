import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import CardWithText from '../CardWithText/CardWithText';

interface CardWordInterface {
    word: string;
    width: string;
}

const CardWord = (props: CardWordInterface) => (
    <CardWithText cardText={props.word} backgroundImage="/images/cardWord.png" height="50%"></CardWithText>
);

export default CardWord;
