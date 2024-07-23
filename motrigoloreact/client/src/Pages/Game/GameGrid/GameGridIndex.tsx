import React from 'react';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import colors from '@mui/material/colors';
import { Box, Grid } from '@mui/material';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

class CardIndexGenerator {
    private arraySize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(arrayIndex: number) {
        this.arraySize = arrayIndex;
    }

    public gridItemGenerator(index: number, numberOfCardPerRow: number) {
        if (this.isCardIndex0(index)) {
            return null;
        }

        const cardIndexText = this.getCardIndexText(index, numberOfCardPerRow);

        return <CardIndexInteractive indexLetter={cardIndexText.letter} indexNumber={cardIndexText.number} />;
    }

    private getCardIndexText(indexCard: number, numberOfCardPerRow: number): { letter: string; number: number } {
        let textLetter = '';
        let textNumber = 0;

        for (let index = 0; index < this.alphabet.length; index++) {
            if (indexCard > numberOfCardPerRow * (index + 1) && indexCard <= numberOfCardPerRow * (index + 2)) {
                textLetter = this.alphabet[index];
                textNumber = indexCard - numberOfCardPerRow * (index + 1) + 1;
                return { letter: textLetter, number: textNumber };
            }
        }

        throw new Error('Index out of bounds custom');
    }

    private isCardIndex0(index: number): boolean {
        return index === 0;
    }
}

const GameGridIndex = (props: DynamicGridProps) => {
    const cardPerRow = props.numberOfCardPerRow;
    const generator = new CardIndexGenerator(cardPerRow);

    const items = Array.from({ length: cardPerRow * cardPerRow }).map((_, index) => {
        return (
            <Grid item xs={12 / cardPerRow - 1} key={index} sx={{ alignContent: 'center', justifyContent: 'center' }}>
                {generator.gridItemGenerator(index, cardPerRow)}
            </Grid>
        );
    });

    return (
        <Grid container spacing={1} sx={{ height: '100%', width: '100%' }}>
            {items}
        </Grid>
    );
};

export default GameGridIndex;
