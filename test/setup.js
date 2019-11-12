require('dotenv').config()

process.env.NODE_ENV = 'test'
// process.env.API_TOKEN = 'test-auth-token' // no auth layer in this app yet
process.env.TZ = 'UTC'

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest

