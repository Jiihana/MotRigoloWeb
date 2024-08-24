import { colors, Stack } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import { MotRigoloClient } from '../../../../HttpClient/MotRigoloClient';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../../../contexts/SocketContext';
import { GameContext } from '../../../../contexts/GameContext';
import { AlertContext } from '../../../../contexts/AlertContext';
import { ModifyWordResponse } from '../../../../common/socket_messages/ModifyWord';

export interface CardGridInterface {
    cardText: string;
    cardWord: string;
}

const CardHeaderHorizontale = (props: CardGridInterface) => {
    const gameContext = useContext(GameContext);
    const alertContext = useContext(AlertContext);
    const { socket } = useContext(SocketContext).SocketState;

    const [cardWord, setCardWord] = useState(props.cardWord);

    const modifyWord = async () => {
        console.log(cardWord);
        var result = await MotRigoloClient.ModifyWord(gameContext?.gameId as string, cardWord);

        if (!result.success) {
            alertContext?.setAlertMessage(result.errorMessage);
        }
    };

    useEffect(() => {
        socket?.on(ModifyWordResponse.Message, (arg) => OnModifyWord(arg));
    }, []);

    const OnModifyWord = (args: ModifyWordResponse) => {
        console.log(`old word: ${args.oldWord}`);
        console.log(`mot sur la carte: ${cardWord}`);
        if (cardWord == args.oldWord) {
            console.log(`le mod correspond. changement du mot sur la carte: ${cardWord} en ${args.newWord}`);
            setCardWord(args.newWord);
            console.log(`nouveau mot sur la carte ${cardWord}`);

            let chosenWords = gameContext.chosenWords;

            chosenWords.forEach((chosenWord, index) => {
                if (chosenWord == args.oldWord) {
                    console.log(`mot cherché ${args.oldWord} trouvé dans le game context, remplacement par ${args.newWord}`);
                    chosenWords[index] = args.newWord;
                }
            });

            gameContext.setChosenWords(chosenWords);

            console.log(`on set le game context, voici les mots choisi: ${gameContext.chosenWords}`);
        }
    };

    return (
        <Stack
            direction="row"
            sx={{
                height: '115%',
                width: '100%',
                backgroundColor: colors.amber[500]
            }}
            onClick={modifyWord}
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
                cardText={cardWord}
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
