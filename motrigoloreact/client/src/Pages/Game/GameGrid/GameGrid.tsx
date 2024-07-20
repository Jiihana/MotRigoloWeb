import React, { useEffect } from 'react';

import { Box, Paper, Grid, colors } from '@mui/material';
import CardWord from '../CardWord/CardWord';
import CardIndex from '../CardIndex/CardIndex';
import CardGrid, { CardGridInterface } from '../CardGrid/CardGrid';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

class CardGenerator {
    private arraySize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(arrayIndex: number) {
        this.arraySize = arrayIndex;
    }

    public cardGenerator(index: number) {
        if (this.isCardIndex0(index)) {
            return;
        }

        const isGrid = this.isCardGrid(index);
        const cardText = this.getCardText(index, isGrid);
        if (isGrid) {
            return <CardGrid cardText={cardText} />;
        }

        return <CardIndex></CardIndex>;
    }

    private getCardText(index: number, isGridCard: boolean): string {
        if (isGridCard) {
            if (index < this.arraySize) {
                return index.toString();
            }

            const divisionValue = index / this.arraySize;

            return this.alphabet[divisionValue - 1];
        }

        return '';
    }

    private isCardIndex0(index: number): boolean {
        return index === 0 ? true : false;
    }

    private isCardGrid(index: number): boolean {
        return index < this.arraySize || index % this.arraySize == 0;
    }
}

const GameGrid = (props: DynamicGridProps) => {
    const cardPerRow = props.numberOfCardPerRow;
    const generator = new CardGenerator(props.numberOfCardPerRow);

    const items = Array.from({ length: cardPerRow * cardPerRow }).map((_, index) => {
        return (
            <Grid item xs={12 / cardPerRow} key={index} sx={{ backgroundColor: colors.green[100] }}>
                <Box sx={{ backgroundColor: colors.blue[100] }}>{generator.cardGenerator(index)}</Box>
            </Grid>
        );
    });

    return (
        <Grid container spacing={2} sx={{ height: '40%', width: '40%' }}>
            {items}
        </Grid>
    );
};

export default GameGrid;
