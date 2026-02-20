import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './features/concert/concert.module';
import { ReservationModule } from './features/reservation/reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConcertModule,
    ReservationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'concert_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
