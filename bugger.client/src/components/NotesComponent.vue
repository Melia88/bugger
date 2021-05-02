<template>
  <div class="notes-component">
    <div class="card justify-content-around">
      <div>
        <div class="card-body content">
          <div class="div flexCol">
            {{ note.creator }}
          </div>
          <div class="div flexCol">
            {{ note.body }}
          </div>
          <div class="div flexCol">
            <i class="fas fa-trash-alt" @click="deleteNote" v-if="state.user.isAuthenticated && state.account.id === note.creatorId"></i>
          </div>
        </div>
      </div>
    </div>

    <div>
    <!-- {{ bug.name }}
    {{ bug.closed }}
    {{ bug.date }} -->
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'NotesComponent',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      route,
      state,
      async deleteNote() {
        try {
          if (await Notification.confirmAction()) {
            await notesService.deleteNote(props.note.id, props.note.bug)
            // Notification.toast('Successfully Deleted Note', 'success')
          }
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
.content {
  display: flex;
  width: 100%;
}
.flexCol {
  box-sizing: border-box;
  padding: 10px;
  width: 33.3%;
  background: rgba(151, 151, 151, 0.568);
}
/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 768px) {
  .content { flex-wrap: wrap; }
  .flexCol { width: 100%; }
}
</style>
