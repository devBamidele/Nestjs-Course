import { DynamicModule, Module } from '@nestjs/common';
 import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    const dataSource = new DataSource(options);
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useFactory: async () => dataSource.initialize(),
        },
      ],
      exports: ['CONNECTION'],
    };
  }
}
