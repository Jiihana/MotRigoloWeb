import { colors, Stack } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../../contexts/GameContext';
import { AlertContext } from '../../../../contexts/AlertContext';
import { ModifyWordResponse } from '../../../../common/socket_messages/ModifyWord';
import SocketContext from '../../../../contexts/SocketContext';

export interface CardGridInterface {
    cardText: string;
    index: number;
}

const CardHeaderVerticale = (props: CardGridInterface) => {
    const backgroundGrid = '/images/cards/cardGrid.png';
    const backgroundWord = '/images/cards/cardWord.png';

    const gameContext = useContext(GameContext);
    const alertContext = useContext(AlertContext);
    const { socket } = useContext(SocketContext).SocketState;
    const wordIndex = props.index - 1;

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
            sx={{
                height: '145%',
                width: '80%'
            }}
        >
            <CardWithText
                cardText={props.cardText}
                backgroundImage={`url(${backgroundGrid})`}
                height="80%"
                width="100%"
                textVariant="h1"
                textShouldRotate={false}
                backgroundImageHover={`url(${backgroundGrid})`}
                isCardGrid={true}
            />
            <CardWithText
                cardText={cardWord}
                backgroundImage={`url(${backgroundWord})`}
                height="25%"
                width="100%"
                textVariant="h6"
                textShouldRotate={false}
                backgroundImageHover={`url(${backgroundWord})`}
                isCardGrid={false}
            />
        </Stack>
    );
};

export default CardHeaderVerticale;
