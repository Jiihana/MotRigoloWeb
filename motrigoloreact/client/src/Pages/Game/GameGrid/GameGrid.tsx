import { useContext } from 'react';

import { colors, Grid } from '@mui/material';
import CardIndexInteractive from '../Cards/CardIndex/CardIndexInteractive';
import CardHeaderVerticale from '../Cards/CardHeader/CardHeaderVerticale';
import CardHeaderHorizontale from '../Cards/CardHeader/CardHeaderHorizontale';
import { GameContext } from '../../../contexts/GameContext';

interface DynamicGridProps {
    gridSize: number;
}

class CardsGenerator {
    private gridSize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    gameContext = useContext(GameContext);

    constructor(gridSize: number) {
        this.gridSize = gridSize;
    }

    public cardMainGenerator(index: number) {
        if (index === 0) {
            return;
        }

        if (index < this.gridSize) {
            return this.cardHeaderVerticalGenerator(index);
        }

        if (index % this.gridSize !== 0) {
            return this.cardIndexGenerator(index);
        }

        return this.cardHeaderHorizontalGenerator(index);
    }

    //--------------------- Carte Header Horizontale
    public cardHeaderHorizontalGenerator(index: number) {
        const cardText = this.getCardHeaderHorizontalText(index);

        return <CardHeaderHorizontale cardText={cardText} index={index} />;
    }

    private getCardHeaderHorizontalText(index: number): string {
        return [index / this.gridSize].toString();
    }

    //--------------------- Carte Header Verticale
    public cardHeaderVerticalGenerator(index: number) {
        const cardText = this.getCardHeaderVerticalText(index);

        return <CardHeaderVerticale cardText={cardText} index={index}></CardHeaderVerticale>;
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
        const hue = (index * 30) % 360;
        const backgroundColor = `hsl(${hue}, 100%, 50%)`;
        return (
            <Grid
                item
                xs={12 / gridSize}
                key={index}
                sx={{
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
                marginTop: '-0.5%'
            }}
        >
            {items}
        </Grid>
    );
};

export default GameGrid;
