<template>
  <div class="container-fluid">
    <div class="row" v-if="state.activeBug">
      <div class="col-md-12 ml-3 mt-2">
        <div class="bug-details-page">
          <div class="div">
            Title
          </div>
          <div class="activeBug-title">
            <span>{{ state.activeBug.title }}</span>
          </div>

          <div class="rounded-circle">
            <img :src="state.activeBug.creator.picture" alt="Bug Creators Photo">
          </div>
          <div>
            <p> Reported by:  <span class="activeBug-creator-name"> {{ state.activeBug.creator.name }} </span></p>
          </div>
        </div>
      </div>
      <div class=" col-md-12 mt-3">
        <div class="mx-4 content-box bg-white shadow locked-scroll">
          {{ state.activeBug.description }}
        </div>
      </div>
    </div>

    <div class="row" v-if="state.notes">
      <div class="col  py-3">
        Notes
        <button title="Add a Note"
                type="button"
                class="btn btn-success text-light"
                data-toggle="modal"
                data-target="#new-note-form"
        >
          <!-- v-if="state.user.isAuthenticated" -->
          Add
        </button>
        <CreateNoteModal />
      </div>
      <div class="col-md-12 mb-4">
        <div class="mx-4 content-box bg-white shadow">
          <div class="card-header">
            <h4 class="card-title  content">
              <div class="ml-2 div flexCol">
                Name
              </div><div class="div flexCol">
                Message
              </div><div class="div flexCol">
                Delete
              </div>
            </h4>
          </div>
          <div class="list-group list-group-flush">
            <NotesComponent v-for="note in state.notes" :key="note.id" :note="note" :bug="bug" />
            <!-- inject the notes component here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      // newNote: {},
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await bugsService.getActiveBug(route.params.id)
        await notesService.getNotes(route.params.id)
      } catch (error) {
        Notification.toast('error:' + error, 'warning')
      }
    })
    return {
      route,
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.content-box{
  box-sizing: border-box;
  border: 1px solid;
  // border-radius: 20px ;
  // outline-style: solid;
  outline-color: black;
  min-height: 15rem;
}
.activeBug-title{
  font-size: 2.5rem;
}
.activeBug-creator-name{
  font-size: 1.5rem;
}

.content {
  display: flex;
  width: 100%;
}
.flexCol {
  box-sizing: border-box;
  padding: 10px;
  width: 33.3%;
}
/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 768px) {
  .content { flex-wrap: wrap; }
  .flexCol { width: 100%; }
}
</style>
