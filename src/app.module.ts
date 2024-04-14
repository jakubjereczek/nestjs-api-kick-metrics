import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    PlayersModule,
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
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
