import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketIoModule } from './socket-io/socket-io.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { AppResolver } from './app.resolver';
import { SocketIoGateway } from './socket-io/socket-io.gateway';
import { SocketIoService } from './socket-io/socket-io.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
      autoSchemaFile: true,
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      //   outputAs: 'class',
      // },
    }),
    SocketIoModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, SocketIoGateway, SocketIoService],
})
export class AppModule {}
