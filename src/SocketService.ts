// src/SocketService.ts
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';

export class SocketService {
    private io: Server;
    public httpServer: http.Server;
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {
            cors: { origin: "*" }
        });

        this.io.on('connection', (socket) => {
            console.log(`Client Connect: ${socket.id}`);
        });
    }

    public listen(port: number) {
        this.httpServer.listen(port, () => {
            console.log(`Socket.IO server running on port ${port}`);
            console.log(`Endpoint untuk ESP32: POST /api/motion`);
        });
    }

    public broadcast(event: string, data: any) {
        this.io.emit(event, data);
    }   
}