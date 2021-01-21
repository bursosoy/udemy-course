<style lang="scss">
  .stoic-quote{
    line-height: 1.5rem;
    color: #888;
  }
</style>

<template>
  <div class="stoic-quote">
    Wealth consists not in having great possessions, but in having few wants.<br>― Epictetus
  </div>
  <!-- <div class="main-wrap">
    <div class="nav-wrap">
      <div @click="displayData()">Summary</div>
      <div v-if="dataVisibility==false">Oct</div>
      <div v-if="dataVisibility==false">Nov</div>
      <div v-if="dataVisibility==false">Dec</div>
    </div>
    <div v-bind:class="{'showMe': this.dataVisibility, 'hideMe': !this.dataVisibility}">{{ tempData }}</div>
  </div> -->
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
    data() {
      return{
      }
    },
    methods:{
      }
    }

</script>
