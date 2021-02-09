<template>
  <div class="card">
    <div class="title"><slot name="title" :promoBadge="promoBadge"></slot></div>
    <div class="content-wrap">
      <div class="thumbnail-wrap"><slot name="thumbnail"></slot></div>
      <div class="description"><slot name="description"></slot></div>
    </div>
    <div class="cta"><slot name="cta"></slot></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      promoBadge: 'Nightly Promo'
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
  flex-direction: column;
  background-color: #222;
  border-radius: 0.5rem;
  padding: 1.2rem;
  .title {
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: -0.06rem;
    color: #ff8800;
  }

  .content-wrap {
    display: flex;
    flex: 1;
    padding-top: 0.5rem;
    .thumbnail-wrap {
      display: flex;
      min-width: 3.4rem;
      min-height: 4rem;
    }
    .description {
        padding-left: 1rem;
        font-size: 0.9rem;
        color: #ddd;
    }
  }

  .cta{
      background-color:#eee;
      color: #333;
      font-weight: bold;
      letter-spacing: -0.05rem;
      align-self: flex-end;
      padding: 0.5rem 0.7rem;
      border-radius: 0.2rem;
      cursor: pointer;
  }
}
</style>
