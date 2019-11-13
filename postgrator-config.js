// could pull in url's from .env
require('dotenv').config()

module.exports = {
  driver: 'pg',
  connectionString:
    process.env.NODE_ENV == 'development' || 'test'
      ? process.env.DB_URL
      : process.env.DATABASE_URL,
  ssl: !!process.env.SSL,
  host: process.env.MIGRATION_DB_HOST,
  port: process.env.MIGRATION_DB_PORT,
  database: process.env.MIGRATION_DB_NAME,
  username: process.env.MIGRATION_DB_USER,
  password: process.env.MIGRATION_DB_PASS
}
