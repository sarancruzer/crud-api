import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        migrations: ['dist/migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
        factories: __dirname + 'dist/**/database/factories/**/*.js',
        seeds: __dirname + 'dist/**/database/seeds/**/*.js',
      }),
    }),
  ],
})
export class DatabaseModule {}
