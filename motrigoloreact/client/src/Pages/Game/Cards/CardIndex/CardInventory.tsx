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
    const backgroundHover = 'url(/images/cards/cardIndexFront_hover.png)';

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
                width: { xs: '90px', lg: '110px', xl: '130px' },
                height: { xs: '90px', lg: '110px', xl: '130px' }
            }}
        >
            <CardWithTextIndex
                backgroundImage={background}
                cardIndexNumber={props.textNumber.toString()}
                cardIndexLetter={props.textLetter}
                cardTextSize="h5"
                onClickHandler={RemoveCard.bind(this, `${props.textLetter}${props.textNumber}`)}
                backgroundImageHover={backgroundHover}
            ></CardWithTextIndex>
        </Box>
    );
};
export default CardInventory;
