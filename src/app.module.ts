import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PlayersModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      // Currently it's only a localhost database.
      username: 'sa',
      password: '123456',
      database: 'kickMetricsDb', // The database must be created before connecting.
      entities: ['./core/entities/*.entity.ts'],
      options: {
        encrypt: false, // MSSQL-specific option
        trustServerCertificate: true,
      },
      synchronize: true, // Should not be used in production, otherwise you can lost production data.
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
