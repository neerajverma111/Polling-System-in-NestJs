import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({  // Database Connection
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abcd',
      database: 'polling_system',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
