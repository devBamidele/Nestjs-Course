import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available
      inject: [appConfig.KEY],
      useFactory: (appConfiguration: ConfigType<typeof appConfig>) => ({
        type: 'postgres',
        host: appConfiguration.database.host, // ✅ Now properly fetching from `appConfig`
        port: appConfiguration.database.port,
        username: appConfiguration.database.user,
        password: appConfiguration.database.password,
        database: appConfiguration.database.name,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
