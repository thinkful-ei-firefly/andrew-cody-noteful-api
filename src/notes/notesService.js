const NotesService = {
  getNotes(db) {
    return db.select('*').from('notes')
  },

  insertNote(db, note) {
    return db
      .insert(note)
      .into('notes')
      .returning('*')
  },

  deleteNote(db, noteId) {
    return db
      .delete()
      .from('notes')
      .where({ id: noteId })
      .returning('*')
  },

  updateNote(db, id, updatedNote) {
    return db('notes')
      .where({id})
      .update(updatedNote)
      .returning('*')
      // .then(console.log)
      // or.....
      // .update(newData)
      // .from('notes')
      // .where({ id })
      // .returning('*')
  }
}

module.exports = NotesService
