// could pull in url's from .env

module.exports = {
  driver: 'pg',
  connectionString:
    process.env.NODE_ENV == 'development' || 'test'
      ? process.env.DB_URL
      : process.env.DATABASE_URL,
  ssl: !!process.env.SSL
}
