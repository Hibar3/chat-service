import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { SocketIoService } from './socket-io.service';
import { CreateSocketIoDto } from './dto/create-socket-io.dto';
import { UpdateSocketIoDto } from './dto/update-socket-io.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(81,{
  cors: {
    origin: '*',
  },
})
export class SocketIoGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketIoService: SocketIoService) {}

  afterInit(){
    Logger.log('Socket init')
  }

  handleConnection(client: Socket): void {
    this.server.on('connect', () => {
      return { sender: client.id };
    });
    Logger.log(`something conneted ${client?.id }`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Received message from ${client.id}: ${message}`);
    // Broadcast the message to all connected clients
    this.server.emit('message', { sender: client.id, message });
  }

  @SubscribeMessage('createSocketIo')
  create(@MessageBody() createSocketIoDto: CreateSocketIoDto) {
    return this.socketIoService.create(createSocketIoDto);
  }

  @SubscribeMessage('findAllSocketIo')
  findAll() {
    return this.socketIoService.findAll();
  }

  @SubscribeMessage('findOneSocketIo')
  findOne(@MessageBody() id: number) {
    return this.socketIoService.findOne(id);
  }

  @SubscribeMessage('updateSocketIo')
  update(@MessageBody() updateSocketIoDto: UpdateSocketIoDto) {
    return this.socketIoService.update(updateSocketIoDto.id, updateSocketIoDto);
  }

  @SubscribeMessage('removeSocketIo')
  remove(@MessageBody() id: number) {
    return this.socketIoService.remove(id);
  }
}
