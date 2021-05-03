<template>
  <div class="bugs-component">
    <router-link :to="{ name: 'BugDetailsPage', params:{id:bug.id} }" title="View Details">
      <div class="card justify-content-around">
        <div class="card-body content">
          <div class="div flexCol">
            {{ bug.title }}
          </div>
          <div class="div flexCol">
            <img class="rounded-circle" :src="bug.creator.picture" alt="Bug Creators Photo">
            {{ bug.creator.name }}
          </div>
          <div class="div flexCol">
            <span v-if="bug.closed" class="font-weight-bold text-danger">
              Closed
            </span>
            <span v-else class="text-success">
              Open
            </span>
          </div>
          <div class="div flexCol">
            {{ new Date ( bug.updatedAt).toLocaleString(en, time) }}
          </div>
        </div>
      </div>
    </router-link>
    <div>
    <!-- {{ bug.name }}
    {{ bug.closed }}
    {{ bug.date }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BugsComponent',
  // Props for bug goes here
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
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
  background: #ffe2e06b;
}
/* (B) BREAK DOWN 1 COLUMN ON SMALL SCREENS */
@media only screen and (max-width: 768px) {
  .content { flex-wrap: wrap; }
  .flexCol { width: 100%; }
}
img{
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
a{
color: black;
}
</style>
