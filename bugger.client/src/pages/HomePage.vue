<template>
  <div class="home container-fluid">
    <div class="">
      <div class="row">
        <div class="col  py-3">
          Current Bugs
          <button title="Open Report Bug"
                  type="button"
                  class="btn btn-dark text-light"
                  data-toggle="modal"
                  data-target="#new-bug-form"
                  v-if="state.user.isAuthenticated"
          >
            Report
          </button>
          <CreateBugModalComponent />
        </div>

      <!-- {{ state.boards }} -->
      </div>
    <!-- <div class="row justify-content-around">
      <BoardComponent v-for="board in state.boards" :key="board.id" :board="board" />
    </div> -->
    </div>
    <div class="row">
      <div class="col-md-12 mt-3">
        <div class="card mx-4">
          <div class="card-body">
            <h1 class="card-title  content">
              <div class="ml-2 div flexCol">
                Title
              </div><div class="div flexCol">
                Reported By
              </div><div class="div flexCol">
                Status
              </div><div class="mr-1 div flexCol">
                Last Modified
              </div>
            </h1>
          </div>
          <div class="closedCheckbox">
            <input class="m-2" type="checkbox" id="changeClosed" name="changeClosed">
            <span class="changeClosed "> Hide Closed</span><br>
          </div>
          <div class="mx-4 bg-white shadow content-box locked-scroll">
            <BugsComponent v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
          <!--  v-for="bug in state.bugs" :key="bug.id" :bug="bug" -->
          <!-- Inject BugsComponent here -->
          <!-- {{ state.bugs }} -->
          <!-- {{ state.bugs.description }} -->
          </div>
        </div>

      <!-- <div class="mx-4 bg-white shadow content-box-top">
          <span class="ml-2">Title </span><span> Reported By</span><span> Status(open/closed)</span><span class="mr-1">Last Modified</span>
        </div> -->
      <!-- Inject BugsComponent here -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBug: {},
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      route,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          Notification.toast('Bug Successfully Reported!', 'success')
          state.newBug = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }

}

</script>

<style scoped lang="scss">

.card{
  box-sizing: border-box;
  border: 1px solid;
  border-color: black black red black;

}
// span + span {
//     margin-left: 180px;
// }
.content-box{
  box-sizing: border-box;
  border: 1px solid;
  // border-radius: 20px ;
  // outline-style: solid;
  outline-color: black;
}

.content {
  display: flex;
  width: 100%;
}
.flexCol {
  box-sizing: border-box;
  padding: 10px;
  width: 33.3%;
  background: #ffe2e0;
}
/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 768px) {
  .content { flex-wrap: wrap; }
  .flexCol { width: 100%; }
}

.locked-scroll {
  height: 100vh;
  overflow-y: scroll;
}

</style>
