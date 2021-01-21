<style lang="scss">

.goal-main-wrap {
  display: flex;
  flex-direction: row;
  align-items: flex-start;

    .goal-card {
        display: flex;
        flex-direction: column;

        & div:nth-child(1) {
          a{
            text-decoration: none;
          }

          a:visited {
            color: #111;
            text-decoration: none;
          }

          a:hover{
            color: tomato;
          }
        }

        & div:nth-child(2) {
            display: flex;
            justify-userGoal: space-between;
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
            outline: none;
        }
        .btn_add:disabled {
          background-color: #ccc;
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

            .userGoal{
              cursor: pointer;
              flex-grow: 2;
              display: flex;
              align-items: center;
              padding: 0 0.4rem 0 0;
              min-height: 1.5rem;

              .userGoalContent{
                padding: 1rem;
              }
            }
        }

        .list-entry-enabled{
          background-color: #11111120;
          color: #666;

          .userGoal{
            display: flex;
            justify-content: space-between;

            .userGoalContent{
              text-decoration: line-through;
            }
          }

          .btn-close{
            color: tomato;
            font-weight: bold;
            background-color: #222;
            min-width: 2.5rem;
            min-height: 2.5rem;
            cursor: pointer;
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
    <div class="cmn_card goal-card" :style="[!goals.length ? {'margin': 'auto'} : {}]">
        <div><a :href="stoicLink.link" target="_blank" v-html="stoicLink.label"></a></div>
        <div>
            <input type="text" id="goal" :placeholder="getPlaceholderText()" v-model="userInput" @keyup.enter="addGoal(userInput)" @input="readyInput($event)"/>
            <button class="cmn_button btn_add" @click="addGoal(userInput)" :disabled="userInput === ''">Add</button>
        </div>
    </div>
    <div class="goal-list" v-if="goals.length">
        <div>Goals list:<span style="display:inline-block;float:right;cursor:pointer" @click="goals=[]">Remove All</span></div>
        <div v-for="(goal,index) in goals" :key="goal" class="list-entry" :id="`goal${index}`" :class="{'list-entry-enabled': goal.isAboutToDelete}">
          <div class="userGoal" @click="displayisAboutToDelete(index)">
            <div class="userGoalContent">{{ goal.userGoal }}</div>
            <!-- <input type="text" @click.stop/> -->
            <div v-if="goal.isAboutToDelete" class="btn-close" @click="removeGoal(index)" @click.stop>x</div>
          </div>

        </div>
    </div>

</div>

</template>

<script>

// @ is an alias to /src


export default {
    name: 'Adding-Goals-Vue',
    data() {
        return {
            userInput: '',
            goals: [],
            initialLabel: "<b>Set a vue goal!</b>",
            stoicLink: {link: 'https://dailystoic.com/',label: ""},
            randomContent: "Go fishing in the Northwest Territories.Climb on a glacier in Alaska.Go on a safari in Africa.Become a certified scuba diver.Snorkel in Hawaii.Learn to sail.Skydive.Ride in a hot air balloon.Go on a river-rafting trip.Go kayaking.Attend Vic Braden’s tennis camp (Deleted due to ruptured disc).Fly in a glider.Dive in a submarine.Learn to windsurf.Learn to ski.Ski black diamond level (Deleted due to ruptured disc).Ski Vail, Aspen, Beaver Creek, Sun Valley & Jackson Hole.Ski in Europe (Deleted due to ruptured disc).Explore all 5 of Hawaii’s islands.Swim with the dolphins.Go to the Super Bowl.Go to the Rose Bowl.Go to the Final Four College Basketball Championships.Go to the Olympics.Take one of my sons to the Olympics"
        }
    },
    computed: {
      randomWords(){
        return this.randomContent.split('.')
      }
    },
    watch:{
      // stoicLink(){
      //   console.log("go stoics")
      // }


      // 'stoicLink.label' : function(newVal,oldVal){ // deep and true for objects
      //   console.log(`Old: ${oldVal}, New: ${newVal}`)
      // }

      goals:{ // deep and true for array
        deep: true,
        handler(){
          //console.table(this.goals)
        }
      }
    },
    methods: {
        addGoal(entry) {
            if (entry && !(this.goals.some(goal => goal.userGoal === entry))) {
                this.goals.unshift({userGoal: entry, isAboutToDelete: false})
            }
            else if (entry!=''){
              console.log(entry + "... has not been added")
              this.userInput = ''
            }
            this.userInput = this.randomWords[Math.floor(Math.random()*this.randomWords.length)]
            this.resetStoicLabel()
        },
        getPlaceholderText(){
          return (this.goals.length > 0) ? '' : "Your first goal?"
        },
        displayisAboutToDelete(index){
          this.goals[index].isAboutToDelete = !this.goals[index].isAboutToDelete
          console.table(this.goals[index])
        },
        removeGoal(index){
          this.goals.splice(index, 1);
        },
        readyInput(event){
          if (this.userInput!=''){
            this.stoicLink.label = `<i>typing... (${event.target.value})</i>`
          }
          else this.stoicLink.label = this.initialLabel
        },
        resetStoicLabel(){
          this.stoicLink.label = this.initialLabel
        }
    },
    mounted() {
      this.resetStoicLabel()

      var i
      for(i=0;i<=Math.floor(Math.random()*this.randomWords.length);i++){
        this.addGoal(this.randomWords[Math.floor(Math.random()*this.randomWords.length)])
      }

      for (const goal of this.goals){
        const status = [true,false]
        goal.isAboutToDelete = status[Math.floor(Math.random()*2)]
      }

      console.log(this.$refs.addButton)
    }
}

</script>
