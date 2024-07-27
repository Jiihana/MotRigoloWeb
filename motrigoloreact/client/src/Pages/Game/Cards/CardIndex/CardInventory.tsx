import React, { useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box } from '@mui/material';

interface CardInventoryInterface {
    textNumber: number;
    textLetter: string;
}

const CardInventory = (props: CardInventoryInterface) => {
    const background = 'url(/images/cards/cardIndexFront.png)';

    function destroyCard() {}

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
                onClickHandler={destroyCard}
            ></CardWithTextIndex>
        </Box>
    );
};
export default CardInventory;
