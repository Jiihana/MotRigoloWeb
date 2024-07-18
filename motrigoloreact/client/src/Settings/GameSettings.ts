import React from 'react';

class GameSettings {
    nombreCartesParRangees: number;

    constructor(nombreCartesParRangees: number = 6) {
        this.nombreCartesParRangees = nombreCartesParRangees;
    }
}

export default GameSettings;
