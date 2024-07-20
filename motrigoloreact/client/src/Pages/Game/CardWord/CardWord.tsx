import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import CardWithText from '../CardWithText/CardWithText';

interface CardWordInterface {
    word: string;
}

const CardWord = (props: CardWordInterface) => (
    <CardWithText cardText={props.word} backgroundImage="/images/cardWord.png" height="100%" width="100%" cardTextSize="body1"></CardWithText>
);

export default CardWord;
