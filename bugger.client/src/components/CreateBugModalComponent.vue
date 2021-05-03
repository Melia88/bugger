<template>
  <div class="modal"
       id="new-bug-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Report A Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createBug">
          <div class="col-md-12 modal-body ml-3">
            <div class="row">
              Reported By: {{ state.user.name }}
            </div>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="Title..."
                     min="1"
                     v-model="state.newBug.title"
                     required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text"
                      class="form-control"
                      id="description"
                      placeholder="Description..."
                      minlength="3"
                      v-model="state.newBug.description"
                      required
            >
              </textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link text-dark" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-dark text-light">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import $ from 'jquery'
export default {
  name: 'CreateBugModalComponent',
  // props: {
  //   bug: {
  //     type: Object,
  //     required: true
  //   }
  // },
  setup() {
    const state = reactive({
      newBug: {},
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async createBug() {
        try {
          state.newBug.closedDate = null
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          $('#new-bug-form').modal('hide')
          Notification.toast('Bug Successfully Reported!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
