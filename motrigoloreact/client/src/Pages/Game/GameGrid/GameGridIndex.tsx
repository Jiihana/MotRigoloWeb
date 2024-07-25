import React from 'react';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import { Grid } from '@mui/material';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

class CardIndexGenerator {
    private numberOfCardPerRow: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(numberOfCardPerRow: number) {
        this.numberOfCardPerRow = numberOfCardPerRow;
    }

    public gridItemGenerator(index: number) {
        const cardIndexText = this.getCardIndexText(index);

        return <CardIndexInteractive indexLetter={cardIndexText.letter} indexNumber={cardIndexText.number} />;
    }

    private getCardIndexText(indexCard: number): { letter: string; number: number } {
        return { letter: this.alphabet[Math.floor(indexCard / this.numberOfCardPerRow)], number: (indexCard % this.numberOfCardPerRow) + 1 };
    }
}

const GameGridIndex = (props: DynamicGridProps) => {
    const cardPerRow = props.numberOfCardPerRow - 1;
    const generator = new CardIndexGenerator(cardPerRow);

    const items = Array.from({ length: cardPerRow * cardPerRow }).map((_, index) => {
        return (
            <Grid item xs={12 / cardPerRow} key={index} sx={{ alignItems: 'center', justifyItems: 'center' }} display="flex">
                {generator.gridItemGenerator(index)}
            </Grid>
        );
    });

    return (
        <Grid container spacing={4}>
            {items}
        </Grid>
    );
};

export default GameGridIndex;
