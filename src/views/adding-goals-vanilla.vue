<style lang="scss">

.goal-main-wrap{
  .goal-card{
    display: flex;
    flex-direction: column;
    font-weight: bold;

    & div:nth-child(2) {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      & input{
        width:100%;
        min-width: 16rem;
        padding-left: 0.5rem;
        font-size: 1rem;
      }
    }

    .btn_add{
      margin-left: 1rem;
      min-width: 6rem;
    }
  }
  .goal-list{
    padding: 1rem 0;
    font-weight: 600;

    & ul{
      display: block;
      padding-left: 0;
    }

    & ul .list-entry{
      display: block;
      border: 1px solid #555;
      height: 1.5rem;
      padding: 0.5rem;
      margin: 0.5rem 0;
      font-weight: normal;
    }
  }
}

@media only screen and (max-width: 375px) {
  .goal-main-wrap {
      .goal-card {
        & div:nth-child(2) {
          & input {
            min-width: 0;
          }
        }
      }
    }
}
</style>

<template>
  <div class="goal-main-wrap">
    <div class="cmn_card goal-card">
      <div>Set a vanilla goal!</div>
      <div>
        <input type="text" id="goal" placeholder="What's your goals?"/>
        <button class="cmn_button btn_add">Add</button>
      </div>
    </div>
    <div class="goal-list">
      <div v-if="currentListCount!=0">Goals list:</div>
      <ul>
      </ul>
    </div>

  </div>
</template>


<script>
// @ is an alias to /src


export default {
  name: 'Adding-Goals',
  data(){
    return{
      inputEl: "",
      listEl: "",
      buttonEl: "",
      currentListCount: 0
    }
  },
  methods:{
    addGoals(){

      const listEntry = document.createElement('li')

      if(this.inputEl.value){
        listEntry.textContent = this.inputEl.value
        listEntry.id = "goal"+this.currentListCount
        listEntry.className = "list-entry" // doesn't work if css is scoped
        this.currentListCount++
        this.listEl.appendChild(listEntry)
        this.inputEl.value = ""
        this.inputEl.placeholder = ""
      }
    }
  },
  mounted(){
    this.inputEl = document.querySelector('input')
    this.listEl = document.querySelector('ul')
    this.buttonEl = document.querySelector('button')

    this.inputEl.addEventListener("keyup", event => {
      (event.key == "Enter") ? this.addGoals() : '' // ternary
    });
    this.buttonEl.addEventListener('click',this.addGoals)
  }
}
</script>
