const app = require('../src/app')
const knex = require('knex')
const {foldersFixtures} = require('./folders.fixtures')

describe('FoldersRouter', () => {
  let db

  before('connect to the db', () => {
    db = knex({
      client = 'pg',
      connection: process.env.DB_TEST_URL
    })
  })
})