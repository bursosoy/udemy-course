<style lang="scss" scoped>

.main-wrap {
    display: flex;
    justify-content: center;
    .main-card {
        width: 50%;
        min-width: 12rem;
        .elements {
            display: flex;
            justify-content: space-between;
        }
        div .slider {
            margin-top: 1rem;
            width: 100%;
        }
        .value {
            align-self: center;
            font-size: 1.25rem;
            font-weight: bold;
        }
        .cmn_button {
            min-width: 4rem;
            cursor: pointer;
        }
        .cmn_button:disabled {
            background-color: #ccc;
        }
        div:nth-child(2) .slider {}
    }
}

@media only screen and (max-width: 375px) {
    .main-wrap {
        .main-card {
            width: 100%;
        }
    }
}

</style>

<template>

<div class="main-wrap">
    <div class="cmn_card main-card">
        <div class="elements">
            <button class="cmn_button" @click="updateValue('-')" :disabled="value<1" @mousedown="startTurboUpdateValue('-')" @mouseleave="stopTurboUpdateValue" @mouseup="stopTurboUpdateValue" @touchstartTurboUpdateValue="startTurboUpdateValue('-')" @touchend="stopTurboUpdateValue"
            @touchcancel="stopTurboUpdateValue">-</button>
            <div class="value" :style="[{'font-size': (value/200)+1.5+'rem'},{'opacity':value/100}]" @click="unMountVue()">{{ value }}%</div>
            <button class="cmn_button" @click="updateValue('+')" :disabled="value>=100" @mousedown="startTurboUpdateValue('+')" @mouseleave="stopTurboUpdateValue" @mouseup="stopTurboUpdateValue" @touchstartTurboUpdateValue="startTurboUpdateValue('+')" @touchend="stopTurboUpdateValue"
            @touchcancel="stopTurboUpdateValue">+</button>
        </div>
        <div>
            <input type="range" min="0" max="100" v-model="value" class="slider" id="myRange" @change="operation = 'Scrubbing'">
        </div>
        <div style="font-size: 0.75rem" v-once>Initial: {{ value }}%</div>
        <div>{{ cmp_currentOperation }}</div>
    </div>
</div>
</template>

<script>

export default {
    name: 'Basic-Counter',
    data() {
        return {
            value: Math.floor(Math.random() * 100),
            interval: false,
            operation: "",
            counter: ""
        }
    },
    watch: { // almost same as computed where it is executed when values change but watch CAN CONTAIN logic and computed cannot
        operation(newValue, oldValue) {
            this.counter = 1
            console.log(`Operation changed from ${oldValue} to ${newValue}`)
        }
    },
    computed: { // will only be executed if dependencies changed as opposed to calling a direct method as innerHTML through {{ }}
        cmp_currentOperation() {
          if (this.operation!='Scrubbing'){
            return (this.operation + " " + this.counter) // if either operation or counter changed, this will be executed
          }
          return this.operation
        }
    },
    methods: {
      unMountVue(){
        //unmount here
      },
            updateValue(operand) {
                this.value = parseInt(this.value); // because slider value becomes String (fuck right)
                this.counter++

                    if (this.value > 100 || this.value < 0) {
                        this.stopTurboUpdateValue()
                    }

                if (operand == '+') {
                    this.operation = "Adding" // true means "Add"
                    this.value++
                } else {
                    this.operation = "Subtracting" // false means "Subtract"
                    this.value--
                }

            },
            startTurboUpdateValue(operand) {
                if (!this.interval) {
                    this.interval = setInterval(() => this.updateValue(operand), 30)
                }
            },
            stopTurboUpdateValue() {
                clearInterval(this.interval)
                this.interval = false
            }
    },
    // Life Cycles or Hooks
    beforeCreate(){
      console.log("Life Cycle: beforeCreate()")
    },
    created(){
      console.log("Life Cycle: created()")
    },
    beforeMount(){
      console.log("Life Cycle: beforeMount()")
    },
    mounted(){
      console.log("Life Cycle: mounted()")
    },
    beforeUpdate(){
      console.log("Life Cycle: beforeUpdate()")
    },
    updated(){
      console.log("Life Cycle: updated()")
    },
    beforeUnmount(){
      console.log("Life Cycle: beforeUnmout()")
    },
    unmounted(){
      console.log("Life Cycle: beforeCreated()")
    }
}

</script>
