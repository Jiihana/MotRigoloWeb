import React from 'react';

import { Box, colors, Stack } from '@mui/material';
import CardHeader from '../Cards/CardHeader/CardHeader';

type Direction = 'row' | 'column';

interface DynamicStackProps {
    numberOfCardPerRow: number;
    direction: Direction;
    spacing: number;
}

class CardGenerator {
    private arraySize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(arrayIndex: number) {
        this.arraySize = arrayIndex;
    }

    public stackItemGenerator(index: number, props: number, direction: Direction) {
        const cardText = this.getCardText(index, direction);
        const rotateItem = direction == 'column' ? 'rotate(270deg)' : '';

        if (this.isCardIndex0(index)) {
            return;
        }

        return (
            <Box sx={{ backgroundColor: colors.orange[500], transform: `${rotateItem}`, height: 'auto', width: '100%' }}>
                <CardHeader cardText={cardText}></CardHeader>
            </Box>
        );
    }

    private getCardText(index: number, direction: Direction): string {
        if (direction == 'row') {
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
        gridItems.push(generator.stackItemGenerator(index, cardPerRow, props.direction));
    }

    return (
        <Stack direction={props.direction} spacing={props.spacing} sx={{ backgroundColor: colors.pink[500], height: 'auto', width: '100%' }}>
            {gridItems}
        </Stack>
    );
};

export default GameGridHeader;
