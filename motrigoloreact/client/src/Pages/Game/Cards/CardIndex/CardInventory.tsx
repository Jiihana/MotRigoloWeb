import { useContext } from 'react';
import { MotRigoloClient } from '../../../../HttpClient/MotRigoloClient';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box } from '@mui/material';
import SocketContext from '../../../../contexts/SocketContext';
import { GameContext } from '../../../../contexts/GameContext';

interface CardInventoryInterface {
    textNumber: number;
    textLetter: string;
}

const CardInventory = (props: CardInventoryInterface) => {
    const background = 'url(/images/cards/cardIndexFront.png)';

    const { SocketState } = useContext(SocketContext);
    const gameContext = useContext(GameContext);

    const RemoveCard = async (card: string) => {
        var result = await MotRigoloClient.RemoveCardInventory(SocketState.socket?.id!, gameContext?.gameId as string, card);
        if (result.isValid) {
            const card = result.value?.card as string;
            gameContext?.setCardsInventory((prevCards) => prevCards.filter((prevCard) => prevCard !== card));
        }
    };

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%'
            }}
        >
            <CardWithTextIndex
                backgroundImage={background}
                cardIndexNumber={props.textNumber.toString()}
                cardIndexLetter={props.textLetter}
                cardTextSize="h5"
                onClickHandler={RemoveCard.bind(null, `${props.textLetter}${props.textNumber}`)}
            ></CardWithTextIndex>
        </Box>
    );
};
export default CardInventory;
