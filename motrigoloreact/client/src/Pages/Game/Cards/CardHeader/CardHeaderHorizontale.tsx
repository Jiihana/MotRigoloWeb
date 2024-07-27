import { Avatar, Box, colors, Stack, Typography } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

export interface CardGridInterface {
    cardText: string;
    cardWord: string;
}

const CardHeaderHorizontale = (props: CardGridInterface) => {
    return (
        <Stack
            direction="row"
            sx={{
                height: '115%',
                width: '100%',
                backgroundColor: colors.amber[500]
            }}
        >
            <CardWithText
                cardText={props.cardText}
                backgroundImage="url(/images/cards/cardGrid.png)"
                height="100%"
                width="80%"
                textVariant="h1"
                textShouldRotate={true}
            />
            <CardWithText
                cardText={props.cardWord}
                backgroundImage="url(/images/cards/cardWord.png)"
                height="100%"
                width="25%"
                textVariant="h6"
                textShouldRotate={true}
            />
        </Stack>
    );
};

export default CardHeaderHorizontale;
