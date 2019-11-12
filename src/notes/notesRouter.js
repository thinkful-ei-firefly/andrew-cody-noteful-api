const express = require('express')
const NotesService = require('../notes/notesService')

notesRouter = express.Router()
bodyParser = express.json()

notesRouter
  .route('/')
  .get((req, res, next) => {
    // get async all notes and folders (Service)
    NotesService.getNotes(req.app.get('db')).then(ndata => {
      res.json(ndata)
    }) // then send the res.json
    // .catch(next) if we have error handling middleware
  })
  .post(bodyParser, (req, res, next) => {
    // console.log(req.body)
    const { name, content, folderId } = req.body

    if (!name || name.length < 1 || !content || !folderId) {
      return res.status(400).send('Error, must provide name, content, folderId')
    }

    const newNote = {
      title: name,
      content,
      folder: folderId
    } // use xss to clean folder_name

    NotesService.insertNote(req.app.get('db'), newNote).then(dbRes => {
      return res.status(201).json(dbRes)
    }) //.catch(next) don't need catch/next b/c app.js ends with the error handler?
  })

notesRouter
  .route('/:id')
  .get((req, res, next) => {
    NotesService.getNotes(req.app.get('db'))
  })
  .delete((req, res, next) => {
    const id = req.params.id
    NotesService.deleteNote(req.app.get('db'), id).then(dbRes => {
      res.json(dbRes)
    })
  })
  .patch(bodyParser, (req, res, next) => {
    // console.log('PATCH')
    const id = req.params.id
    // check the res body for what is required to update
    // console.log(req.body)
    const { name, content, folderId } = req.body

    const updatedNote = {
      title: name,
      content,
      folder: folderId,
      date_modified: new Date(Date.now()).toISOString()
    }

    NotesService.updateNote(req.app.get('db'), id, updatedNote).then(dbRes => {
      // console.log(dbRes[0])
      return res.status(200).json(dbRes)
    })
  })

module.exports = notesRouter
