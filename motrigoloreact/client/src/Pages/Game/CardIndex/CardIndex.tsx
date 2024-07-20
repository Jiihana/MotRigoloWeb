import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import CardWithText from '../CardWithText/CardWithText';

interface CardIndexInterface {}

const CardIndex = (props: CardIndexInterface) => {
    return <CardWithText backgroundImage="/images/cardIndexBack.png" cardText="" height="100%"></CardWithText>;
};
export default CardIndex;
