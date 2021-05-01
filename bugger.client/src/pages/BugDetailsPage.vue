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
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      // newNote: {},
      activeBug: computed(() => AppState.activeBug)
      // notes: computed(() => AppState.notes)
      // account: computed(() => AppState.account),
      // user: computed(() => AppState.user)
    })
    onMounted(async() => {
      await bugsService.getActiveBug(route.params.id)
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
</style>
