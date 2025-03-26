import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass1234',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // Set to false in production to avoid schema sync issues
  logging: true,
  
});

AppDataSource.initialize()
  .then(() => console.log('Data Source Initialized'))
  .catch((err) => console.error('Error initializing Data Source', err));
