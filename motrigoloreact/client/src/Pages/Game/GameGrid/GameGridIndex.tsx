import React from 'react';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import { Box, colors, Grid } from '@mui/material';

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
        const cardIndexText = this.getCardIndexText(index, numberOfCardPerRow);

        return <CardIndexInteractive indexLetter={cardIndexText.letter} indexNumber={cardIndexText.number} />;
    }

    private getCardIndexText(indexCard: number, numberOfCardPerRow: number): { letter: string; number: number } {
        let textLetter = '';
        let textNumber = 0;

        for (let index = 0; index < this.alphabet.length; index++) {
            textLetter = this.alphabet[index];
            textNumber = indexCard - (numberOfCardPerRow - 1) * index + 1;
            return { letter: textLetter, number: textNumber };
        }

        throw new Error('index card generation erreur');
    }
}

const GameGridIndex = (props: DynamicGridProps) => {
    const cardPerRow = props.numberOfCardPerRow - 1;
    const generator = new CardIndexGenerator(cardPerRow);

    const items = Array.from({ length: cardPerRow * cardPerRow }).map((_, index) => {
        return (
            <Grid item xs={12 / cardPerRow} key={index} sx={{ alignItems: 'center', justifyItems: 'center' }} display="flex">
                {generator.gridItemGenerator(index, cardPerRow)}
            </Grid>
        );
    });

    return (
        <Grid container spacing={4} sx={{ backgroundColor: colors.blue[500] }}>
            {items}
        </Grid>
    );
};

export default GameGridIndex;
