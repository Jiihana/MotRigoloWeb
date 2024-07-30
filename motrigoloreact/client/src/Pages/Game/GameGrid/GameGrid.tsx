import React, { useEffect } from 'react';

import { Box, colors, Grid, Stack } from '@mui/material';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import CardHeaderVerticale from '../Cards/CardHeader/CardHeaderVerticale';
import CardHeaderHorizontale from '../Cards/CardHeader/CardHeaderHorizontale';

interface DynamicGridProps {
    gridSize: number;
}

class CardsGenerator {
    private gridSize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(gridSize: number) {
        this.gridSize = gridSize;
    }

    public cardMainGenerator(index: number) {
        if (index == 0) {
            return;
        }

        if (index < this.gridSize) {
            return this.cardHeaderVerticalGenerator(index);
        }

        if (index % this.gridSize != 0) {
            return this.cardIndexGenerator(index);
        }

        return this.cardHeaderHorizontalGenerator(index);
    }

    //--------------------- Carte Header Horizontale
    public cardHeaderHorizontalGenerator(index: number) {
        const cardText = this.getCardHeaderHorizontalText(index);

        return <CardHeaderHorizontale cardText={cardText} cardWord={'Tracteur'}></CardHeaderHorizontale>;
    }

    private getCardHeaderHorizontalText(index: number): string {
        return [index / this.gridSize].toString();
    }

    //--------------------- Carte Header Verticale
    public cardHeaderVerticalGenerator(index: number) {
        const cardText = this.getCardHeaderVerticalText(index);

        return <CardHeaderVerticale cardText={cardText} cardWord={'Chat'}></CardHeaderVerticale>;
    }

    private getCardHeaderVerticalText(index: number): string {
        return this.alphabet[index - 1];
    }

    //------------- INDEX CARD
    public cardIndexGenerator(index: number) {
        const cardIndexText = this.getCardIndexText(index);

        return <CardIndexInteractive indexLetter={cardIndexText.letter} indexNumber={cardIndexText.number} />;
    }

    private getCardIndexText(indexCard: number): { letter: string; number: number } {
        const number = Math.floor(indexCard / this.gridSize);

        const letter = this.alphabet[(indexCard % this.gridSize) - 1];

        return { letter: letter, number: number };
    }
}

const GameGrid = (props: DynamicGridProps) => {
    const gridSize = props.gridSize;
    const generator = new CardsGenerator(gridSize);

    const items = Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const color1 = colors.purple[200];
        const color2 = colors.purple[400];
        const isEven = (row + col) % 2 === 0;
        return (
            <Grid
                item
                xs={12 / gridSize}
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
