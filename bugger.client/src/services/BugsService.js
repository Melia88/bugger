import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getActiveBug(bugId) {
    const res = await api.get('api/bugs/' + bugId)
    AppState.activeBug = res.data
    logger.log(res.data)
  }

  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
      // console.log(res.data)
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???')
    }
  }

  async createBug(body) {
    await api.post('api/bugs', body)
    // AppState.bugs.push(res.data)
    // AppState.bugs = [...AppState.bugs, res.data]
    this.getAllBugs()
  }
}

export const bugsService = new BugsService()
