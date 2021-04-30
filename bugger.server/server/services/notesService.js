import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async delete(id, userId) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted!'
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async getNotesByBugId(id) {
    const notes = await dbContext.Notes.find({ bug: id })
    return notes
  }
}
export const notesService = new NotesService()
