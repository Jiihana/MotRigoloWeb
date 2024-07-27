import { Avatar, Box, colors, Stack, Typography } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

export interface CardGridInterface {
    cardText: string;
    cardWord: string;
}

const CardHeaderVerticale = (props: CardGridInterface) => {
    return (
        <Stack
            sx={{
                height: '145%',
                width: '80%',
                backgroundColor: colors.amber[500]
            }}
        >
            <CardWithText
                cardText={props.cardText}
                backgroundImage="url(/images/cardGrid.png)"
                height="80%"
                width="100%"
                textVariant="h1"
                textShouldRotate={false}
            />
            <CardWithText
                cardText={props.cardWord}
                backgroundImage="url(/images/cardWord.png)"
                height="25%"
                width="100%"
                textVariant="h6"
                textShouldRotate={false}
            />
        </Stack>
    );
};

export default CardHeaderVerticale;
