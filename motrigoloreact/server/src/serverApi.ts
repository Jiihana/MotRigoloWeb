import http from 'http';
import express from 'express';
import { ServerSocket } from './serverSocket';
import { GameManager } from './motrigolo/GameManager';
import { serverApiMotRigolo } from './motrigolo/motRigoloServerApi';
import cors from 'cors';
require('dotenv').config({ path: ['.env.local', '.env'] });

const application = express();
/** Server Handling */
const httpServer = http.createServer(application);

/** Start Socket */
new ServerSocket(httpServer);

new GameManager();

application.use(
    cors({
        origin: ['https://motrigolo.jihana.fr', 'http://localhost:3200', 'http://localhost:3000'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'gameId', 'playerId'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    })
);

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

serverApiMotRigolo.registerEndpoint(application);

/** Healthcheck */
application.get('/ping', (req, res, next) => {
    return res.status(200).json({ hello: 'world!' });
});

/** Socket Information */
application.get('/status', (req, res, next) => {
    return res.status(200).json({ users: ServerSocket.instance.users });
});

/** Error handling */
application.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(process.env.REACT_APP_GAMESERVER_PORT, () => console.info(`Server is running`));
