const FoldersService = {
  getFolders(db) {
    return db.select('*').from('folders')
  },
  getFolderById(db, id) {
    return db
      .select('*')
      .from('folders')
      .where({ id })
  },
  insertFolder(db, newFolder) {
    console.log('insertFolder')
    return db
      .insert(newFolder)
      .into('folders')
      .returning('*') // .returning sends back new item
  },
  deleteFolder(db, folderId) {
    return db
      .delete()
      .from('folders')
      .where({ id: folderId })
      .returning('*')
  },
  updateFolder(db, newData, folderId) {
    return db
      .update(newData)
      .from('folders')
      .where({ id: folderId })
      .returning('*')
  }
}

module.exports = FoldersService
