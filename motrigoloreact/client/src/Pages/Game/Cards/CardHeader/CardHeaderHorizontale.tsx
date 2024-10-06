import { colors, Stack } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../../../contexts/SocketContext';
import { GameContext } from '../../../../contexts/GameContext';
import { AlertContext } from '../../../../contexts/AlertContext';
import { ModifyWordResponse } from '../../../../common/socket_messages/ModifyWord';

export interface CardGridInterface {
    cardText: string;
    index: number;
}

const CardHeaderHorizontale = (props: CardGridInterface) => {
    const gameContext = useContext(GameContext);
    const alertContext = useContext(AlertContext);
    const { socket } = useContext(SocketContext).SocketState;
    const wordIndex = gameContext.gridSize - 2 + props.index / gameContext.gridSize;

    const [cardWord, setCardWord] = useState(gameContext.chosenWords[wordIndex]);

    let hasSubscribeEvent = false;

    const modifyWord = async () => {
        var result = await gameContext.getClient().ModifyWord(cardWord);

        if (!result.success) {
            alertContext?.setAlertMessage(result.errorMessage);
        }
    };

    const subscribeEvent = () => {
        if (!hasSubscribeEvent) {
            socket?.on(ModifyWordResponse.Message, (arg) => OnModifyWord(arg));
            hasSubscribeEvent = true;
        }
    };

    const OnModifyWord = (args: ModifyWordResponse) => {
        if (cardWord === args.oldWord) {
            setCardWord(args.newWord);
        }
    };

    useEffect(() => {
        const chosenWords = gameContext.chosenWords;
        chosenWords[wordIndex] = cardWord;
        gameContext.setChosenWords(chosenWords);
    }, [cardWord]);

    subscribeEvent();
    return (
        <Stack
            direction="row"
            sx={{
                height: '115%',
                width: '100%'
            }}
        >
            <CardWithText
                cardText={props.cardText}
                backgroundImage="url(/images/cards/cardGrid.png)"
                height="100%"
                width="80%"
                textVariant="h1"
                textShouldRotate={true}
                backgroundImageHover="url(/images/cards/cardGrid_hover.png)"
                isCardGrid={true}
            />
            <CardWithText
                cardText={cardWord}
                backgroundImage="url(/images/cards/cardWord.png)"
                height="100%"
                width="25%"
                textVariant="h6"
                textShouldRotate={true}
                backgroundImageHover="url(/images/cards/cardWord_hover.png)"
                isCardGrid={false}
            />
        </Stack>
    );
};

export default CardHeaderHorizontale;
