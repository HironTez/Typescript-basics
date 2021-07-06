import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonHeadersMiddleware } from './middleware/json.headers.middleware';
import { ReqLogMiddleware } from './middleware/req.log.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './ormconfig';
import { UserModule } from './resources/users/user.module';
import { BoardModule } from './resources/boards/board.module';
import { TaskModule } from './resources/tasks/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(connectionOptions), UserModule, BoardModule, TaskModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JsonHeadersMiddleware, ReqLogMiddleware)
            .forRoutes({
                path: '*', method: RequestMethod.ALL
            });
    };
};