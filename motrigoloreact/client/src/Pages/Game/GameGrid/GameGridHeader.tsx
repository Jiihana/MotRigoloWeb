import React from 'react';

import { Box, colors, Stack } from '@mui/material';
import CardHeader from '../Cards/CardHeader/CardHeader';

type Direction = 'row' | 'column';

interface DynamicStackProps {
    numberOfCardPerRow: number;
    direction: Direction;
}

class CardGenerator {
    private arraySize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(arrayIndex: number) {
        this.arraySize = arrayIndex;
    }

    public stackItemGenerator(index: number, numberOfCardPerRow: number) {
        const cardText = this.getCardText(index);
        const rotateItem = /^[a-zA-Z]$/.test(cardText) ? 'rotate(270deg)' : '';
        const translateItem = /^[a-zA-Z]$/.test(cardText) ? 'translate(0%,-30%)' : '';

        if (this.isCardIndex0(index)) {
            return;
        }

        return (
            <Box sx={{ backgroundColor: colors.blue[100], transform: `${rotateItem}` }}>
                <CardHeader cardText={cardText}></CardHeader>
            </Box>
        );
    }

    private getCardText(index: number): string {
        if (index < this.arraySize) {
            return index.toString();
        }

        const divisionValue = index / this.arraySize;

        return this.alphabet[divisionValue - 1];
    }

    private isCardIndex0(index: number): boolean {
        return index === 0 ? true : false;
    }
}

const GameGridHeader = (props: DynamicStackProps) => {
    const cardPerRow = props.numberOfCardPerRow;
    const generator = new CardGenerator(cardPerRow);

    // Générer les éléments de la grille
    const gridItems = [];
    for (let index = 0; index < cardPerRow; index++) {
        gridItems.push(generator.stackItemGenerator(index, cardPerRow));
    }

    return (
        <Stack direction={props.direction} spacing={4} sx={{ backgroundColor: colors.green[500] }}>
            {gridItems}
        </Stack>
    );
};

export default GameGridHeader;
