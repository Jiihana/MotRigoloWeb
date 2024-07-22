import React, { useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';

interface CardIndexInterface {
    indexNumber: number;
    indexLetter: string;
}

const CardIndexStatique = (props: CardIndexInterface) => {
    const background = '/images/cardIndexFront.png';

    function destroyCard() {}

    return (
        <CardWithTextIndex
            backgroundImage={background}
            cardIndexNumber={props.indexNumber.toString()}
            cardIndexLetter={props.indexLetter}
            height="100%"
            width="100%"
            cardTextSize="h5"
            onClickHandler={destroyCard}
        ></CardWithTextIndex>
    );
};
export default CardIndexStatique;
