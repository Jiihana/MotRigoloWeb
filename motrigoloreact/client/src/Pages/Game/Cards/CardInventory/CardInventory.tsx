import React, { useContext, useEffect, useState } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardInventory from '../CardIndex/CardInventory';
import SocketContext from '../../../../contexts/SocketContext';
import { GetCardPiocheResponse } from '../../../../common/socket_messages/GetCardPioche';

const CardsInventory = () => {
    const [cardsInInventory, setCardsInInventory] = useState<string[]>([]);

    const { socket } = useContext(SocketContext).SocketState;

    useEffect(() => {
        socket?.on(GetCardPiocheResponse.Message, (args: GetCardPiocheResponse) => {
            setCardsInInventory((prevCards) => [...prevCards, args.cardPioche]);
            console.log(cardsInInventory);
        });
    }, []);

    return (
        <Box
            sx={{
                height: '65%',
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}
        >
            <Stack spacing={5} sx={{ height: '100%', width: '100%' }}>
                {cardsInInventory.map((card) => {
                    const number = card.charAt(1);
                    const letter = card.charAt(0);
                    return <CardInventory key={letter} textNumber={+number} textLetter={letter} />;
                })}
            </Stack>
        </Box>
    );
};
export default CardsInventory;
