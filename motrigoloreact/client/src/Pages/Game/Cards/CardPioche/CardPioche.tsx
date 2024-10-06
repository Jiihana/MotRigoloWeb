import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import { GameContext } from '../../../../contexts/GameContext';
import { AlertContext } from '../../../../contexts/AlertContext';

const CardPioche = () => {
    const background = 'url(/images/cards/cardIndexBack.png)';
    const backgroundHover = 'url(/images/cards/cardIndexBack_hover.png)';

    const gameContext = useContext(GameContext);
    const alertContext = useContext(AlertContext);

    const [piocheEmpty, setPiocheEmpty] = useState<boolean>(false);

    const getCardPioche = async () => {
        var result = await gameContext.getClient().GetCardPioche();

        if (!result.success) {
            alertContext?.setAlertMessage(result.errorMessage);
            return;
        }

        if (result.value.cardPioche === '') {
            return;
        }

        const card = result.value?.cardPioche as string;
        gameContext?.setCardsInventory((prevCards) => [...prevCards, card]);
        setPiocheEmpty(result.value?.piocheEmpty as boolean);
    };

    useEffect(() => {
        setPiocheEmpty(gameContext?.piocheEmpty as boolean);
    }, []);

    return (
        <>
            {!piocheEmpty && (
                <Box
                    sx={{
                        width: { xs: '100px', sm: '100px', md: '90px', lg: '110px', xl: '130px' },
                        height: { xs: '100px', sm: '100px', md: '90px', lg: '110px', xl: '130px' },
                        maxWidth: '100%',
                        maxHeight: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={getCardPioche}
                >
                    <CardWithText
                        cardText={'Pioche'}
                        backgroundImage={background}
                        height={'100%'}
                        width={'100%'}
                        textVariant={'h4'}
                        textShouldRotate={false}
                        backgroundImageHover={backgroundHover}
                        isCardGrid={false}
                    />
                </Box>
            )}
        </>
    );
};
export default CardPioche;
