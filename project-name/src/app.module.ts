import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DirectorModule } from './director/director.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/br4'),
    MovieModule,
    UsersModule,
    DirectorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
