import React from 'react';

import { Box, colors, Stack } from '@mui/material';
import CardHeaderHorizontal from '../Cards/CardHeader/CardHeaderHorizontal';

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

    public stackItemGenerator(index: number, direction: Direction) {
        const cardText = this.getCardText(index, direction);
        const rotateItem = direction == 'column' ? 'rotate(270deg)' : '';

        if (this.isCardIndex0(index)) {
            return;
        }

        return (
            <Box sx={{ transform: `${rotateItem}`, height: '100%', width: '100%' }}>
                <CardHeaderHorizontal cardText={cardText}></CardHeaderHorizontal>
            </Box>
        );
    }

    private getCardText(index: number, direction: Direction): string {
        if (direction == 'row') {
            return index.toString();
        }

        return this.alphabet[index - 1];
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
        gridItems.push(generator.stackItemGenerator(index, props.direction));
    }

    return (
        <Stack direction={props.direction} spacing={props.spacing} sx={{ height: 'auto', width: '88%' }}>
            {gridItems}
        </Stack>
    );
};

export default GameGridHeader;
