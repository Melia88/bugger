import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
class NotesService {
  async getNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
    // console.log(res.data)
  }

  async createNote(newNote, id) {
    await api.post('api/notes', newNote)
    this.getNotes(id)
    logger.log(newNote)
  }

  async deleteNote(id, bugId) {
    await api.delete(`api/notes/${id}`)
    this.getNotes(bugId)
  }
}

export const notesService = new NotesService()
