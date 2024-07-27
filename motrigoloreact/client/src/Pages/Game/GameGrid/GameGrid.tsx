import React, { useEffect } from 'react';

import { Box, colors, Grid, Stack } from '@mui/material';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import CardHeaderHorizontal from '../Cards/CardHeader/CardHeaderHorizontal';
import CardHeaderVerticale from '../../Essai/CardHeaderVerticale';
import CardHeaderHorizontale from '../../Essai/CardHeaderHorizontale';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

class CardsGenerator {
    private numberOfCardPerRow: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(numberOfCardPerRow: number) {
        this.numberOfCardPerRow = numberOfCardPerRow;
    }

    public cardMainGenerator(index: number) {
        if (index == 0) {
            return;
        }

        if (index < this.numberOfCardPerRow) {
            return this.cardHeaderVerticalGenerator(index);
        }

        if (index % this.numberOfCardPerRow != 0) {
            return this.cardIndexGenerator(index);
        }

        return this.cardHeaderHorizontalGenerator(index);
    }

    //--------------------- Carte Header Horizontale
    public cardHeaderHorizontalGenerator(index: number) {
        const cardText = this.getCardHeaderHorizontalText(index);

        return <CardHeaderHorizontale></CardHeaderHorizontale>;
    }

    private getCardHeaderHorizontalText(index: number): string {
        // return this.alphabet[index - 1];
        return 'Z';
    }

    //--------------------- Carte Header Verticale
    public cardHeaderVerticalGenerator(index: number) {
        const cardText = this.getCardHeaderHorizontalText(index);

        return <CardHeaderVerticale></CardHeaderVerticale>;
    }

    private getCardHeaderVerticalText(index: number): string {
        return index.toString();
    }

    //------------- INDEX CARD
    public cardIndexGenerator(index: number) {
        const cardIndexText = this.getCardIndexText(index);

        return <CardIndexInteractive indexLetter={cardIndexText.letter} indexNumber={cardIndexText.number} />;
    }

    private getCardIndexText(indexCard: number): { letter: string; number: number } {
        return { letter: this.alphabet[Math.floor(indexCard / this.numberOfCardPerRow)], number: (indexCard % this.numberOfCardPerRow) + 1 };
    }
}

const GameGrid = (props: DynamicGridProps) => {
    const cardPerRow = props.numberOfCardPerRow;
    const generator = new CardsGenerator(cardPerRow);

    const items = Array.from({ length: cardPerRow * cardPerRow }).map((_, index) => {
        const row = Math.floor(index / cardPerRow);
        const col = index % cardPerRow;
        const color1 = colors.purple[200];
        const color2 = colors.purple[400];
        const isEven = (row + col) % 2 === 0;
        return (
            <Grid
                item
                xs={12 / cardPerRow}
                key={index}
                sx={{
                    // backgroundColor: isEven ? color1 : color2,
                    alignItems: 'flex-end',
                    display: 'flex'
                }}
            >
                {generator.cardMainGenerator(index)}
            </Grid>
        );
    });

    return (
        <Grid
            container
            spacing={3}
            sx={{
                height: '100%',
                width: '100%',
                // backgroundColor: colors.pink[500],
                marginTop: '-0.5%'
            }}
        >
            {items}
        </Grid>
    );
};

export default GameGrid;
