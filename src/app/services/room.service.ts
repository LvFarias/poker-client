import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(
        public socket: Socket,
    ) { }

    public getMyId(): string {
        return this.socket.ioSocket.id;
    }

    public leave(): Promise<any> {
        return new Promise(async res => {
            this.socket.emit('user:leave');
            res(true);
        });
    }

    public join(roomId: string, user: any): Promise<any> {
        return new Promise(async (res, rej) => {
            this.socket.emit('user:signin', { roomId, user });
            this.socket.on('room:changed', res);
            this.socket.on('error:room-not-found', rej);
        });
    }

    public create(roomName: string, userName: string): Promise<any> {
        return new Promise(async res => {
            this.socket.emit('room:create', { roomName });
            
            this.socket.on('room:created', res);
        });
    }

    public changeRoom(roomData: any): Promise<any> {
        return new Promise(async res => {
            this.socket.emit('room:change', { roomData });
            res(roomData);
        });
    }
    
    public changeMe(userData: any): Promise<any> {
        return new Promise(async res => {
            this.socket.emit('user:change', { userData });
            res(userData);
        });
    }
}