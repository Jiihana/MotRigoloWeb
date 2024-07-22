import React, { useState } from 'react';
import CardWithIndex from '../CardWithText/CardWithIndex';

interface CardIndexInterface {
    indexNumber: number;
    indexLetter: string;
}

const CardIndex = (props: CardIndexInterface) => {
    const frontBackground = '/images/cardIndexFront.png';
    const backBackground = '/images/cardIndexBack.png';

    const [textLetter, setTextLetter] = useState('');
    const [textNumber, setTextNumber] = useState('');
    const [background, setBackground] = useState(backBackground);

    function setTextLetterHandler() {
        return textLetter == '' ? setTextLetter(props.indexLetter) : setTextLetter('');
    }

    function setTextNumberHandler() {
        return textNumber == '' ? setTextNumber(props.indexNumber.toString()) : setTextNumber('');
    }

    function setBackgroundHandler() {
        return background == backBackground ? setBackground(frontBackground) : setBackground(backBackground);
    }

    function ToggleCard() {
        setTextLetterHandler();
        setTextNumberHandler();
        setBackgroundHandler();
    }

    return (
        <CardWithIndex
            backgroundImage={background}
            cardIndexNumber={textNumber}
            cardIndexLetter={textLetter}
            height="100%"
            width="100%"
            cardTextSize="h5"
            onClickHandler={ToggleCard}
        ></CardWithIndex>
    );
};
export default CardIndex;
