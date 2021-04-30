import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async edit(body) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async findOne(query) {
    const bug = await dbContext.Bugs.findOne(query)
    if (!bug) {
      throw new BadRequest('Invalid ID')
    }
    return bug
  }

  async find(query = {}) {
    const data = await dbContext.Bugs.find(query)
      .populate('creator', 'name picture')
    return data
  }
}

export const bugsService = new BugsService()
