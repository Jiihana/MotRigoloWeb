import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Grid, Box, colors } from '@mui/material';

const JoinLobbyButton = () => {
    const [lobbyCode, setLobbyCode] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLobbyCode(e.target.value);
    };

    const handleJoinClick = () => {
        // Ajouter la logique pour joindre le lobby avec le code `lobbyCode`
        console.log('Joining lobby with code:', lobbyCode);
    };

    return (
        <>
            <Box textAlign="center" display="flex">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoinClick}
                    style={{ marginBottom: '10px' }}
                    sx={{
                        width: '70%', // Largeur du bouton en pourcentage de son conteneur
                        maxWidth: '300px', // Largeur maximale du bouton
                        height: 'auto', // Hauteur automatique pour maintenir la proportion
                        fontSize: '1.2rem' // Taille de la police du texte
                    }}
                >
                    Join game
                </Button>
                <TextField
                    label="Lobby code"
                    variant="outlined"
                    value={lobbyCode}
                    onChange={handleInputChange}
                    size="small"
                    sx={{
                        backgroundColor: colors.amber[500], // Fond noir
                        '& .MuiInputLabel-root': {
                            color: colors.green[500] // Couleur du texte de l'étiquette (label)
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: colors.blueGrey[500] // Couleur de la bordure de l'input
                            },
                            '& input': {
                                color: colors.pink[500] // Couleur du texte de l'input
                            },
                            '&.Mui-focused .MuiInputLabel-root': {
                                color: colors.purple[500] // Couleur du texte de l'étiquette (label) lorsqu'il est focus
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: colors.lime[500] // Couleur du hint texte (placeholder)
                            }
                        }
                    }}
                    InputProps={{
                        placeholder: 'Enter code' // Exemple de placeholder
                    }}
                />
            </Box>
        </>
    );
};

export default JoinLobbyButton;
