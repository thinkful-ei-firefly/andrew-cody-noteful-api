const express = require('express')
const FoldersService = require('./foldersService')
const bodyParser = express.json() // for post body

foldersRouter = express.Router()

foldersRouter
  .route('/')
  .get((req, res, next) => {
    // get async all notes and folders (Service)
    FoldersService.getFolders(req.app.get('db')).then(fdata => {
      res.json(fdata)
    }) // then send the res.json
    // .catch(next) if we have error handling middleware or we don't need next b/c
  })
  .post(bodyParser, (req, res, next) => {
    console.log(req.body)
    const { name } = req.body

    if (!name || name.length < 1) {
      return res.status(400).send('Error, must provide title')
    }

    const newFolder = { folder_name: name } // use xss to clean folder_name

    FoldersService.insertFolder(req.app.get('db'), newFolder).then(dbRes => {
      return res.status(201).json(dbRes)
    })//.catch(next) don't need catch/next b/c app.js ends with the error handler?
  })

foldersRouter
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id
    FoldersService.getFolderById(req.app.get('db'), id).then(fdata =>
      res.json(fdata)
    )//.catch(next) don't need catch/next b/c app.js ends with the error handler?
  })
  .delete((req, res, next) => {
    const id = req.params.id
    FoldersService.deleteFolder(req.app.get('db'), id)
      .then(dbRes => {
        res.json(dbRes)
      })
  })//.catch(next) don't need catch/next b/c app.js ends with the error handler?
  .patch(bodyParser, (req, res, next) => {
    const id = req.params.id
    const { folder_name } = req.body

    if (!folder_name) {
      return res.status(400).send('Must provide folder name')
    }

    const newFolder = { folder_name }

    FoldersService.updateFolder(req.app.get('db'), newFolder, id).then(
      dbRes => {
        res.json(dbRes)
      }
    )//.catch(next) don't need catch/next b/c app.js ends with the error handler?
  })

module.exports = foldersRouter
