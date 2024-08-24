import { colors, Stack } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../../contexts/GameContext';
import { AlertContext } from '../../../../contexts/AlertContext';
import { ModifyWordResponse } from '../../../../common/socket_messages/ModifyWord';
import SocketContext from '../../../../contexts/SocketContext';

export interface CardGridInterface {
    cardText: string;
    cardWord: string;
}

const CardHeaderVerticale = (props: CardGridInterface) => {
    const { getClient, chosenWords } = useContext(GameContext);
    const alertContext = useContext(AlertContext);
    const { socket } = useContext(SocketContext).SocketState;

    const [cardWord, setCardWord] = useState<string>(props.cardWord);

    const modifyWord = async () => {};

    return (
        <Stack
            sx={{
                height: '145%',
                width: '80%',
                backgroundColor: colors.amber[500]
            }}
            onClick={modifyWord}
        >
            <CardWithText
                cardText={props.cardText}
                backgroundImage="url(/images/cards/cardGrid.png)"
                height="80%"
                width="100%"
                textVariant="h1"
                textShouldRotate={false}
            />
            <CardWithText
                cardText={cardWord}
                backgroundImage="url(/images/cards/cardWord.png)"
                height="25%"
                width="100%"
                textVariant="h6"
                textShouldRotate={false}
            />
        </Stack>
    );
};

export default CardHeaderVerticale;
