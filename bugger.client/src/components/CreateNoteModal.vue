<template>
  <div class="modal"
       id="new-note-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            ADD COMMENT
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createNote">
          <div class="col-md-12 modal-body ml-3">
            <div class="row">
              Reported By: {{ state.user.name }}
            </div>
          </div>
          <div class="form-group ml-3">
            <label for="body">Note Message</label>
            <input type="text"
                   class="form-control"
                   id="body"
                   placeholder="Note Message..."
                   minlength="3"
                   v-model="state.newNote.body"
            >
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
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'CreateNoteModal',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {},
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      route,
      async createNote() {
        try {
          state.newNote.bug = route.params.id
          await notesService.createNote(state.newNote, route.params.id)
          state.newNote = {}
          $('#new-note-form').modal('hide')
          Notification.toast('Note Created Successfully', 'success')
        } catch (error) {
          Notification.toast('error:' + error, 'warning')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
