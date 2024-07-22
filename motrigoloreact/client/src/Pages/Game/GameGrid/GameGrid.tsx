import React, { useEffect } from 'react';

import { Box, Paper, Grid, colors } from '@mui/material';
import CardWord from '../Cards/CardWord/CardWord';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import CardGrid, { CardGridInterface } from '../Cards/CardGrid/CardGrid';
import { error } from 'console';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

class CardGenerator {
    private arraySize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(arrayIndex: number) {
        this.arraySize = arrayIndex;
    }

    public gridItemGenerator(index: number, numberOfCardPerRow: number) {
        const isGrid = this.isCardGrid(index);
        const cardText = this.getCardText(index, isGrid);
        const rotateItem = /^[a-zA-Z]$/.test(cardText) ? 'rotate(270deg)' : '';
        const translateItem = /^[a-zA-Z]$/.test(cardText) ? 'translate(0%,-30%)' : '';

        return (
            <Box sx={{ backgroundColor: colors.blue[100], transform: `${rotateItem} ${translateItem}` }}>
                {this.cardGenerator(index, isGrid, cardText, numberOfCardPerRow)}
            </Box>
        );
    }

    public cardGenerator(index: number, isGrid: boolean, cardText: string, numberOfCardPerRow: number) {
        if (this.isCardIndex0(index)) {
            return;
        }

        if (isGrid) {
            return <CardGrid cardText={cardText} />;
        }

        const cardIndexText = this.getCardIndexText(index, numberOfCardPerRow);
        return <CardIndexInteractive indexLetter={cardIndexText.letter} indexNumber={cardIndexText.number}></CardIndexInteractive>;
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

    private getCardIndexText(indexCard: number, numberOfCardPerRow: number): { letter: string; number: number } {
        let textLetter = '';
        let textNumber = 0;

        for (let index = 0; index < this.alphabet.length; index++) {
            if (indexCard > numberOfCardPerRow * (index + 1) && indexCard < numberOfCardPerRow * (index + 2)) {
                textLetter = this.alphabet[index];
                textNumber = indexCard - numberOfCardPerRow * (index + 1);
                return { letter: this.alphabet[index], number: textNumber };
            }
        }

        throw new Error('pouet');
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
            <Grid item xs={12 / cardPerRow} key={index} sx={{ alignContent: 'center', justifyContent: 'center' }}>
                {generator.gridItemGenerator(index, props.numberOfCardPerRow)}
            </Grid>
        );
    });

    return (
        <Grid container spacing={1} sx={{ height: '40%', width: '40%' }}>
            {items}
        </Grid>
    );
};

export default GameGrid;
