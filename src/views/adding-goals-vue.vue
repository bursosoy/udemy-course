<style lang="scss">

.goal-main-wrap {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
    .goal-card {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        & div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            & input {
                width: 100%;
                min-width: 16rem;
                padding-left: 0.5rem;
                font-size: 1rem;
            }
        }
        .btn_add {
            margin-left: 1rem;
            min-width: 6rem;
        }
    }
    .goal-list {
        display: flex;
        flex-direction: column;
        padding: 0 0 0 2rem;
        font-weight: 600;
        flex-grow: 2;
        & div {
            display: block;
            padding-left: 0;
        }
        .list-entry {
            display: flex;
            justify-content: space-between;
            border: 1px solid #555;
            min-height: 1.5rem;
            margin: 0.5rem 0;
            font-weight: normal;

            .content{
              cursor: pointer;
              flex-grow: 2;
              display: flex;
              align-items: center;
              padding-left: 1rem;
              min-height: 2.5rem;
            }
        }

        .list-entry-enabled{
          background-color: #11111120;
          color: #666;

          .content{
            text-decoration: line-through;
          }

          .btn-close{
            color: tomato;
            font-weight: bold;
            background-color: #222;
            min-width: 2.5rem;
            cursor: pointer;
            min-height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
    }
}

@media only screen and (max-width: 375px) {
  .goal-main-wrap {
    flex-direction: column;
      .goal-card {
        & div:nth-child(2) {
          & input {
            min-width: 0;
          }
        }
      }
      .goal-list{
        padding: 2rem 0rem;
        width: 100%;
      }
    }
}
</style>

<template>

<div class="goal-main-wrap">
    <div class="cmn_card goal-card">
        <div>Set a vue goal!</div>
        <div>
            <input type="text" id="goal" :placeholder="getPlaceholderText()" v-model="userInput" @keyup.enter="addGoals" />
            <button class="cmn_button btn_add" @click="addGoals">Add</button>
        </div>
    </div>
    <div class="goal-list" v-if="goals.length>0">
        <div>Goals list:</div>
        <div v-for="(goal,index) in goals" :key="index" class="list-entry" :id="`goal${index}`" :class="{'list-entry-enabled': goal.status}">
          <div class="content" @click="displayStatus(index)">{{ goal.content }}</div>
          <div v-if="goal.status" class="btn-close" @click="removeGoal(index)">x</div>
        </div>
    </div>

</div>

</template>

<script>

// @ is an alias to /src


export default {
    name: 'Adding-Goals',
    data() {
        return {
            userInput: '',
            goals: []
        }
    },
    methods: {
        addGoals() {
            if (this.userInput) {
                this.goals.unshift({content: this.userInput, status: false})
                this.userInput = ''
            }
        },
        getPlaceholderText(){
          return (this.goals.length > 0) ? '' : "Your first goal?"
        },
        displayStatus(index){
          this.goals[index].status = !this.goals[index].status
        },
        removeGoal(index){
          this.goals.splice(index, 1);
        }
    },
    mounted() {

    }
}

</script>
