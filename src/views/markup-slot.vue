<template>
  <div id="router-view">
    <div class="switch">
      <div @click="setComponent('template-1')" :class="selectedClass('template-1')">Day</div>
      <div @click="setComponent('template-2')" :class="selectedClass('template-2')">Night</div>
    </div>
    <div class="main-wrap">
      <div class="content-wrap">
        <div class="content" v-for="content in promoContent" :key="content.title">
          <component :is="currentComponent">
            <template v-slot:thumbnail>
              <div class="thumbnail" :style="content.iconURL"></div>
            </template>
            <template v-slot:title="slotProps">{{ slotProps.promoBadge }}: {{ content.title }}</template>
            <template v-slot:description>{{ content.description }}</template>
            <template v-slot:cta>{{ content.cta }}</template>
          </component>
        </div>
      </div>
      <!-- <div class="content-wrap">
        <div class="content" v-for="content in promoContent" :key="content.title">
          <template-2>
            <template #thumbnail>
              <div class="thumbnail" :style="content.iconURL"></div>
            </template>
            <template #title="slotProps">{{ content.title }} / {{ slotProps.promoBadge }}</template>
            <template #description>{{ content.description }}</template>
            <template #cta>{{ content.cta }}</template>
          </template-2>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import template1 from './../components/markup-slot/template1.vue'
import template2 from './../components/markup-slot/template2.vue'
export default {
  data() {
    // fetch API here
    return {
      currentComponent: 'template-1',
      promoContent: [
        {
          title: '100% First Time Dog',
          description: 'Make your first successful deposit at here and enjoy a one-time 30% Bonus of up to RMB 688! If you are not a github member yet, join now!',
          cta: 'Join Now!',
          iconURL: {'background-image': `url(${require('./../assets/markup-slot/hundredpcnt.png')})`},
        },
        {
          title: 'Fortune Monkey Challenge - Highway Suite Live Casino!',
          description: 'Accumulate your bets to obtain your n2 Tokens to stand a chance to win a Bonus and Extra Bonuses up to RMB 53,664!',
          cta: 'Claim!',
          iconURL: {'background-image': `url(${require('./../assets/markup-slot/keno.png')})`},
        },
      ],
    }
  },
  components: {
    template1: template1,
    template2: template2,
  },
  methods: {
    setComponent(component) {
      this.currentComponent = component
    },
    selectedClass(component){
      return {selected: this.currentComponent == component}
    }
  },
}
</script>

<style lang="scss" scoped>
#router-view {
  .switch {
    display: flex;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #999;
    border-radius: 0.5rem;
    background-color: grey;
    width: 12rem;
    .selected {
      background-color: #eee;
      border-radius: 0.5rem;
      color: #262626;
    }
    div {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
  .main-wrap {
    max-width: 50%;
    display: flex;
    min-width: -webkit-min-content;
    .content-wrap {
      flex: 1;
      padding: 0.5rem;
      .content {
        min-width: 16rem;
        margin-bottom: 1rem;
        .thumbnail {
          flex: 1;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>