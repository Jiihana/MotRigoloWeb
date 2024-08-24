import { useContext } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box } from '@mui/material';
import { GameContext } from '../../../../contexts/GameContext';

interface CardInventoryInterface {
    textNumber: number;
    textLetter: string;
}

const CardInventory = (props: CardInventoryInterface) => {
    const background = 'url(/images/cards/cardIndexFront.png)';

    const gameContext = useContext(GameContext);

    const RemoveCard = async (card: string) => {
        var result = await gameContext.getClient().RemoveCardInventory(card);
        if (result.success) {
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
