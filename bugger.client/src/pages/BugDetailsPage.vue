<template>
  <div class="container-fluid">
    <div class="row" v-if="state.activeBug">
      <div class="col-md-7 ml-3 mt-2">
        <div class="bug-details-page">
          <div class="div">
            Title
          </div>
          <textarea type="text"
                    v-if="state.edit && state.activeBug.closed === false && state.account.id === state.activeBug.creatorId"
                    class="form-control"
                    id="title"
                    placeholder="Title..."
                    minlength="3"
                    v-model="state.activeBug.title"
                    required
          >
              </textarea>

          <div v-else class="activeBug-title">
            <!-- make this an input based on button click -->
            <span>{{ state.activeBug.title }}</span>
          </div>

          <div class="">
            <p>
              Reported by: <img class="rounded-circle" :src="state.activeBug.creator.picture" alt="Bug Creators Photo">
              <span class="activeBug-creator-name ml-2"> {{ state.activeBug.creator.name }} </span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-2 mt-4 align-items-end">
        <button type="button" class="btn btn-outline-dark" v-if="state.activeBug.closed === false && state.account.id === state.activeBug.creatorId" @click="state.edit = true" title="Click to Close Bug">
          <!-- @click="editBug" -->
          Edit Bug
        </button>
        <button type="button"
                class="btn btn-outline-success mt-2"
                v-if="state.edit"

                title="Click to Save Changes"
                @click="saveEdit"
        >
          <!-- @click="editBug" -->
          Save Changes
        </button>
        <!--  || state.saved = true -->
      </div>
      <div class="col-2 mt-4 align-items-end">
        <button type="button" class="btn btn-outline-dark" v-if="state.user.isAuthenticated && state.account.id === state.activeBug.creatorId && state.activeBug.closed === false" @click="closeBug" title="Click to Close Bug">
          <!-- @click="closeBug" -->
          close
        </button>
        <div>
          status:
          <span v-if="state.activeBug.closed" class="font-weight-bold text-danger">
            Closed
          </span>
          <span v-else class="text-success">
            Open
          </span>
        </div>
      </div>
      <div class=" col-md-12 mt-3 ">
        <div class="mx-4 content-box bg-white shadow locked-scroll">
          <textarea type="text"
                    v-if="state.edit && state.activeBug.closed === false && state.account.id === state.activeBug.creatorId"
                    class="edittext form-control"
                    id="title"
                    placeholder="Title..."
                    minlength="3"
                    v-model="state.activeBug.description"
                    required
          >
              </textarea>

          <!-- make this an input based on button click -->
          <span v-else class="ml-2 mt-2"> {{ state.activeBug.description }} </span>
        </div>
      </div>
    </div>
    <!-- End of bug -->
    <div class="row" v-if="state.notes">
      <div class="col ml-3 py-3">
        <div class="note-tag">
          Notes
          <button title="Add a Note"
                  type="button"
                  class="btn btn-outline-success text-dark"
                  data-toggle="modal"
                  data-target="#new-note-form"
          >
            <!-- v-if="state.user.isAuthenticated" -->
            <span> Add </span>
          </button>
        </div>
        <CreateNoteModal />
      </div>
      <div class="col-md-12 mb-4">
        <div class="mx-4 content-box bg-white shadow">
          <div class="card-header">
            <div class="on-mobile d-md-none d-block ml-2 div">
              Bug's Notes
            </div>
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
            <NotesComponent v-for="note in state.notes" :key="note.id" :note="note" />
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
import Notification from '../utils/Notification'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      // newNote: {},
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      edit: false,
      saved: false
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
      // route,
      state,
      async closeBug() {
        try {
          if (await Notification.confirmAction('Are you sure?', "You won't be able to revert this!", 'warning', 'Yes, close bug!')) {
            await bugsService.closeBug(state.activeBug, state.activeBug.id)
            // Notification.toast('Successfully Closed Bug', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async saveEdit() {
        try {
          await bugsService.saveEdit(state.activeBug)
          state.newBug = {}
          state.edit = false
          Notification.toast('Edit Saved!', 'success')
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
.content-box{
  box-sizing: border-box;
  border: 1px solid;
  // border-radius: 20px ;
  // outline-style: solid;
  outline-color: black;
  min-height: 15rem;
}
.edittext{
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
  .content { display: none; }
  .flexCol { width: 100%; }
}
.note-tag{
  font-size: 1.5rem;
}
.locked-scroll {
  overflow-y: scroll;
}
.on-mobile{
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
