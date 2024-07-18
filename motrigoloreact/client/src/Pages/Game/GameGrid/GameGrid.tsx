import React, { useEffect } from 'react';

import { Box, Paper, Grid } from '@mui/material';
import CardWord from '../CardWord/CardWord';
import CardGrid from '../CardGrid/CardGrid';
import { CardType } from '../CardGrid/CardGrid';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

function cardGenerator(index: number, numberOfCardPerRow: number) {
    const [isGrid, cardType] = isCardGrid(index, numberOfCardPerRow);

    if (!isCardIndex0(index) && isGrid) {
        return <CardGrid type={cardType} id={cardType.toString()} />;
    }

    if (!isCardIndex0(index) && !isGrid) {
        return <CardWord word={index.toString()} id={cardType.toString()}></CardWord>;
    }
}

function isCardIndex0(index: number): boolean {
    return index === 0 ? true : false;
}

function isCardGrid(index: number, numberOfCardPerRow: number): [isCardGrip: boolean, cardType: CardType] {
    if (index < numberOfCardPerRow) {
        return [true, CardType.Number];
    }

    if (index % numberOfCardPerRow == 0) {
        return [true, CardType.Letter];
    }

    return [false, CardType.Nothing];
}

function setLetterCard() {
    const letterCards = document.querySelectorAll(`[id="${CardType.Letter}"]`);

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    letterCards.forEach((cardElement, index) => {
        cardElement.setCardText(letters[index]);
    });
}

const GameGrid = (props: DynamicGridProps) => {
    useEffect(() => {
        setLetterCard();
    }, []);

    const cardPerRow = props.numberOfCardPerRow;

    const items = Array.from({ length: cardPerRow * cardPerRow }).map((_, index) => (
        <Grid item xs={12 / cardPerRow} key={index} sx={{ position: 'relative' }}>
            <Box sx={{ paddingBottom: '100%', position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{cardGenerator(index, cardPerRow)}</Box>
            </Box>
        </Grid>
    ));

    return (
        <Grid container spacing={2}>
            {items}
        </Grid>
    );
};

export default GameGrid;
