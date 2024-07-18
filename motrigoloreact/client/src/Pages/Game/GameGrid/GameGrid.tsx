import React from 'react';

import { Box, Paper, Grid } from '@mui/material';
import CardGrid from '../CardGrid/CardGrid';
import CardWord from '../CardWord/CardWord';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

function cardGenerator(index: number, numberOfCardPerRow: number) {
    if (!isCardIndex0(index) && isCardGrid(index, numberOfCardPerRow)) {
        return <CardGrid gridText={index.toString()}></CardGrid>;
    }

    if (!isCardIndex0(index) && !isCardGrid(index, numberOfCardPerRow)) {
        return <CardWord word={index.toString()}></CardWord>;
    }
}

function isCardIndex0(index: number): boolean {
    return index === 0 ? true : false;
}

function isCardGrid(index: number, numberOfCardPerRow: number): boolean {
    if (index <= numberOfCardPerRow) {
        return true;
    }

    if (index % numberOfCardPerRow == 0) {
        console.log({ index });
        return true;
    }

    return false;
}

const GameGrid = (props: DynamicGridProps) => {
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
