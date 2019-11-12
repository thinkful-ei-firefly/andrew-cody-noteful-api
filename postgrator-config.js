// could pull in url's from .env

module.exports = {
  driver: 'pg',
  connectionString:
    process.env.NODE_ENV === 'test'
      ? 'postgres://dunder-mifflin@localhost/noteful_test'
      : 'postgres://dunder-mifflin@localhost/noteful'
}
