import { AppState } from '../AppState'
import router from '../router'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class BugsService {
  async getActiveBug(bugId) {
    const res = await api.get('api/bugs/' + bugId)
    AppState.activeBug = res.data
    // logger.log(res.data)
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
    const res = await api.post('api/bugs', body)
    // AppState.bugs.push(res.data)
    // AppState.bugs = [...AppState.bugs, res.data]
    router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
    this.getAllBugs()
  }

  // async sortClosed(bugsId) {
  //   const res = await api.get(`api/bugs/${bugsId}/closed`)
  //   AppState.bugs.find(b => b.id === bugsId)
  //   bugs.closed = res.data.closed
  //   this.getAllBugs()
  // }

  // async editBugDetails(bug) {
  //   await api.put('api/bugs/' + bug.id, bug.description, bug.title)
  // }

  async sortClosed() {
    await api.get('api/bugs')
    if (document.getElementById('changeClosed').checked) {
      AppState.bugs = AppState.bugs.filter(bug => bug.closed !== true)
    } else {
      this.getAllBugs()
    }
  }

  async closeBug(activeBug, bugId) {
    await api.delete('api/bugs/' + bugId)
    if (activeBug.closed === false) {
      AppState.activeBug.closed = true
    } else {
      Notification.toast('YOU CANNOT DO THAT')
    }
  }
}

export const bugsService = new BugsService()
