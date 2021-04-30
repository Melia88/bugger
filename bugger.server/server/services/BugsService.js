import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async closeBug(id, userId) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId }, { closed: true })
    if (!data) {
      throw new BadRequest('invalid Id')
    }
    return data
  }

  async edit(body) {
    const found = await this.findOne({ _id: body.id })
    if (found.closed === true) {
      throw new Forbidden('You Cannot modify this')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return data
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async findOne(query = {}) {
    const bug = await dbContext.Bugs.findOne(query)
      .populate('creator', 'name picture')
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
