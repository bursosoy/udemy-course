<template>
  <div class="card">
    <div class="thumbnail-wrap"><slot name="thumbnail"></slot></div>
    <div class="content-wrap">
      <div class="title"><slot name="title" :promoBadge="promoBadge"></slot><div class="cta" v-if="$slots.cta"><slot name="cta"></slot></div></div>
      <div class="description"><slot name="description"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      promoBadge: 'Daily Promo'
    }
  },
    mounted(){
        console.log(this.$slots.cta)
    }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  background-color: #fefefe;
  border-radius: 0.5rem;
  padding: 1rem;
  .thumbnail-wrap {
    display: flex;
    width: 5.5rem;
    height: 6rem;
  }
  .content-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-left: 1rem;
    color: #262626;
    .title{
        display: flex;
        justify-content: space-between;
        font-size: 1.25rem;
        font-weight: bold;
        letter-spacing: -0.06rem;
    }
    .cta{
        color: #009fd9;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
    }
  }
}
</style>
