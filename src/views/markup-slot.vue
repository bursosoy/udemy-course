<template>
  <div id="router-view">
    <div class="main-wrap">
      <div class="content-wrap">
        <div class="content" v-for="content in promoContent" :key="content.title">
          <template-1>
            <template v-slot:thumbnail>
              <div class="thumbnail" :style="content.iconURL"></div>
            </template>
            <template v-slot:title>{{ content.title }}</template>
            <template v-slot:description>{{ content.description }}</template>
            <template v-slot:cta>{{ content.cta }}</template>
          </template-1>
        </div>
      </div>
      <div class="content-wrap">
        <div class="content" v-for="content in promoContent" :key="content.title">
          <template-2>
            <template v-slot:thumbnail>
              <div class="thumbnail" :style="content.iconURL"></div>
            </template>
            <template v-slot:title>{{ content.title }}</template>
            <template v-slot:description>{{ content.description }}</template>
            <template v-slot:cta>{{ content.cta }}</template>
          </template-2>
        </div>
      </div>
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
      promoContent: [
        {
          title: '100% First Time Bonus',
          description: 'Make your first successful deposit at here and enjoy a one-time 30% Bonus of up to RMB 688! If you are not a github member yet, join now!',
          cta: 'Join Now!',
          iconURL: {'background-image': `url(${require('./../assets/markup-slot/hundredpcnt.png')})`}
        },
        {
          title: 'Fortune Monkey Challenge - Highway Suite Live Casino!',
          description: 'Accumulate your bets to obtain your n2 Tokens to stand a chance to win a Bonus and Extra Bonuses up to RMB 53,664!',
          cta: 'Claim!',
          iconURL: {'background-image': `url(${require('./../assets/markup-slot/keno.png')})`}
        },
      ],
    }
  },
  components: {
    template1: template1,
    template2: template2,
  },
}
</script>

<style lang="scss" scoped>
#router-view {
  .main-wrap {
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
        //   background-image: url('./../assets/markup-slot/promotion.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
