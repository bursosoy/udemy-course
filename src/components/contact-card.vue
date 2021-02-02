<style lang="scss">
.contact-card {
  // margin: 0.5rem;
  // min-width: 18rem;
  // width: 100%;
  transition: transform 0.1s, background-color 0.1s;
  transition-timing-function: ease-in;
  cursor: pointer;
  border-radius: 0.75rem 0.75rem 0.75rem 0;

  &:hover {
    background-color: #fff;
    transform: scale(1.02);
    transition: transform 0.1s, background-color 0.1s;
    transition-timing-function: ease-in;
    .contact {
      color: #111;
      pointer-events: none; //removes all mouseover events so that only the main card can be hovered
      .avatar {
        opacity: 1;
      }
      .info {
        .name {
          font-size: 1.2rem;
        }
        .phone {
          opacity: 1;
        }
      }
    }
  }
  .contact {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #222;
    .avatar {
      min-width: 4rem;
      height: 4rem;
      background-color: salmon;
      border-radius: 0.5rem;
      //background-image: url('./../assets/contact-list/avatar1.png');
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.8;
    }
    .info {
      flex-grow: 2;
      margin-left: 1rem;
      .name {
        font-size: 1.1rem;
      }
      .phone {
        opacity: 0.6;
      }
      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 13rem;
        font-size: 0.85rem;
      }
    }
  }
}
</style>

<template>

  <div class="cmn_card contact-card" @mouseover="hovered(true)" @mouseout="hovered(false)" @click="removeContact(person.name)">
    <div class="contact">
      <div class="avatar" :style="this.person.iconURL"></div>
      <div class="info">
        <div class="name" :title="this.person.name">
          <b>{{ this.person.name }}</b>
        </div>
        <div class="phone">{{ this.person.phone }}</div>
        <div class="email" :title="this.person.email" v-if="cardHovered">{{ this.person.email }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact-card',
  emits: ['cardClickedEvent'],
  data() {
    return {
      cardHovered: false,
    }
  },
  props: {
    person: {},
  },
  computed: {},
  methods: {
    hovered(msg) {
      this.cardHovered = msg
    },
    cardClicked(person) {
      this.$emit('cardClickedEvent', person)
    },
    removeContact(name){
        this.$emit('cardClickedEvent', name)
    }
  },
  mounted() {},
}
</script>
