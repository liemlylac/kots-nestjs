export default () => ({
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'kots',
    password: process.env.DATABASE_PASSWORD || 'kotsSecret',
    database: process.env.DATABASE_DATABASE || 'kotsdb',
    logging: process.env.DATABASE_LOGGING + ''.toLowerCase() === 'true',
  }
})
