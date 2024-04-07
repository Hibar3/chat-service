import { Injectable } from '@nestjs/common';
import { CreateSocketIoDto } from './dto/create-socket-io.dto';
import { UpdateSocketIoDto } from './dto/update-socket-io.dto';
import { Socket } from 'socket.io';
import { Resolver } from '@nestjs/graphql';

@Resolver()
@Injectable()
export class SocketIoService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  async handleConnection(socket: Socket): Promise<void> {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);
    console.log('Connected to server');

    socket.on('join', () => {
      console.log('Connected to server');
    });

    // Handle other events and messages from the client
  }

  async handleDisconnect(socket: Socket) {
    const clientId = socket.id;
    console.log(`Client disconnected: ${socket.id}`);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });
  }

  create(createSocketIoDto: CreateSocketIoDto) {
    return 'This action adds a new socketIo';
  }

  findAll() {
    return `This action returns all socketIo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socketIo`;
  }

  update(id: number, updateSocketIoDto: UpdateSocketIoDto) {
    return `This action updates a #${id} socketIo`;
  }

  remove(id: number) {
    return `This action removes a #${id} socketIo`;
  }
}
