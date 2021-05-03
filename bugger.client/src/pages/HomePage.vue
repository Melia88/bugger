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
      <div class="col-md-12 the-box mt-3">
        <div class="mx-4">
          <div class="card-body">
            <!-- md means med screen or above block is the default for showing an item none means do not show-->
            <div class="on-mobile d-md-none d-block ml-2 div flexCol">
              Bugs
            </div>

            <h1 class="card-title content">
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
          <div class="closedCheckbox text-right mr-5">
            <input class="action m-2"
                   type="checkbox"
                   id="changeClosed"
                   name="changeClosed"
                   title="Hide Closed"
                   @click="sortClosed"
            >
            <!-- @click="sortClosed(bugs)" -->
            <span class="changeClosed "> Hide Closed</span><br>
            <!-- need @click="sortClosed" -->
          </div>
          <div class="mx-4 bg-white shadow content-box locked-scroll">
            <BugsComponent v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
          </div>
        </div>
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
      async sortClosed(bugs) {
        try {
          await bugsService.sortClosed(bugs)
        } catch (error) {
          Notification.toast('Error: ' + error, ' error')
        }
      }
      // async createBug() {
      //   try {
      //     await bugsService.createBug(state.newBug)
      //     Notification.toast('Bug Successfully Reported!', 'success')
      //     state.newBug = {}
      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'warning')
      //   }
      // }
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
  // .content { flex-wrap: wrap; }
  .flexCol { width: 100%; }
  // h1 { font-size: .85rem;}
  .content { display: none; }
  // .content-box{ min-width: 75vw;}
  // .the-box { margin:0%;}
  // .box-card { margin:1%;}
}
.on-mobile{
  font-size: 1.5rem;
  font-weight: bold;
}

.locked-scroll {
  height: 100vh;
  overflow-y: scroll;
}

.action{
  cursor: pointer;
}

</style>
