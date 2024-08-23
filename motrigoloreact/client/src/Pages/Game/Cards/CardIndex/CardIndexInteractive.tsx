import { useContext, useEffect, useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box } from '@mui/material';
import SocketContext from '../../../../contexts/SocketContext';
import { FlipOverCardRequest, FlipOverCardResponse } from '../../../../common/socket_messages/FlipOverCard';
import { SynchronizeGameValuesResponse } from '../../../../common/socket_messages/SynchronizeGameValues';
import { MotRigoloClient } from '../../../../HttpClient/MotRigoloClient';
import { GameContext } from '../../../../contexts/GameContext';

interface CardIndexInterface {
    indexNumber: number;
    indexLetter: string;
}

const CardIndexInteractive = (props: CardIndexInterface) => {
    const IndexCard = `${props.indexLetter}${props.indexNumber}`;
    const frontBackground = 'url(/images/cards/cardIndexFront.png)';
    const backBackground = 'url(/images/cards/cardIndexBack.png)';

    const gameContext = useContext(GameContext);

    const [textLetter, setTextLetter] = useState('');
    const [textNumber, setTextNumber] = useState('');
    const [background, setBackground] = useState(backBackground);

    function setTextLetterHandler(isCardRetournee: boolean) {
        isCardRetournee ? setTextLetter(props.indexLetter) : setTextLetter('');
    }

    function setTextNumberHandler(isCardRetournee: boolean) {
        isCardRetournee ? setTextNumber(props.indexNumber.toString()) : setTextNumber('');
    }

    function setBackgroundHandler(isCardRetournee: boolean) {
        isCardRetournee ? setBackground(frontBackground) : setBackground(backBackground);
    }

    function FlipOverCard(isCardRetournee: boolean) {
        setTextLetterHandler(isCardRetournee);
        setTextNumberHandler(isCardRetournee);
        setBackgroundHandler(isCardRetournee);
    }

    const { socket } = useContext(SocketContext).SocketState;

    const FlipOverCardHandler = async () => {
        await MotRigoloClient.FlipOverCard(`${props.indexLetter}${props.indexNumber}`, gameContext?.gameId as string);
    };

    useEffect(() => {
        socket?.on(FlipOverCardResponse.Message, (args: FlipOverCardResponse) => {
            if (args.cardIndex == `${props.indexLetter}${props.indexNumber}`) {
                FlipOverCard(args.isCardRetournee);
            }
        });
    }, []);

    useEffect(() => {
        const gridCardsMap = new Map(Object.entries(gameContext?.gridCardsStates as Object));

        if (gridCardsMap.has(IndexCard)) {
            const value = gridCardsMap.get(IndexCard);

            FlipOverCard(value);
        }
    }, [gameContext?.gridCardsStates]);

    return (
        <Box
            sx={{
                height: '115%',
                width: '80%'
            }}
        >
            <CardWithTextIndex
                backgroundImage={background}
                cardIndexNumber={textNumber}
                cardIndexLetter={textLetter}
                cardTextSize="h5"
                onClickHandler={FlipOverCardHandler}
            ></CardWithTextIndex>
        </Box>
    );
};
export default CardIndexInteractive;
