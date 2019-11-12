module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL:
    process.env.NODE_ENV == 'development' || 'test'
      ? process.env.DB_URL
      : process.env.postgres.DB_URL
}
