<style lang="scss" scoped>
.win-banner {
  background-color: #ff8800;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;
  cursor: pointer;
}

.turn-banner {
  background-color: transparent !important;
  font-size: 1.25rem !important;
  width: 45%;
}

.monster-mania-main {
  display: flex;
  flex-direction: row;
  .team {
    min-height: 2rem;
    width: 50%;
    padding: 0.5rem;
    .monster-dead {
      //background-color: #444;
      opacity: 0.2 !important;
      // .monster-thumbnail {}
    }
    .monster-allowed {
      .monster-thumbnail {
        background-color: salmon !important;
      }
      .monster-info {
        .monster-name {
          font-weight: bold;
          font-size: 1.5rem !important;
        }
      }
    }
    .monster-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.5rem;
      margin-bottom: 1rem;
      background-image: url('./../assets/monster-mania/bg-life.png');
      background-repeat: no-repeat;
      cursor: pointer;
      .monster-thumbnail {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 4rem;
        height: 4rem;
        border-radius: 0.25rem;
        background-color: #ddd;
        background-repeat: no-repeat;
        background-position: center;
        //background-image: url('./../assets/monster-mania/monster-icon1.png');
        div {
          margin: 0 0.25rem 0.25rem 0;
          background-color: rgba(204, 204, 204, 0.9);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
        }
      }
      .monster-info {
        display: flex;
        flex-direction: row;
        flex-grow: 2;
        justify-content: space-between;
        margin-left: 0.5rem;
        .monster-name {
          font-size: 1.1rem;
          margin-left: 1rem;
        }
        .monster-life {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          .special-attack {
            color: #228b22;
            font-weight: bold;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 375px) {
  .monster-mania-main {
    .team {
      .monster-card {
        flex-direction: column;
        .monster-thumbnail {
          width: 6rem;
          height: 6rem;
          margin-top: 0.5rem;
        }
        .monster-info {
          flex-direction: column;
          .monster-name {
            margin-top: 0.5rem;
            margin-left: 0;
          }
          .monster-life {
            margin-right: 0;
          }
          div {
            padding: 0.25rem;
            text-align: center;
          }
        }
      }
      .monster-allowed {
        .monster-info {
          .monster-name {
            font-weight: bold;
            font-size: 0.75rem !important;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div style="display:flex; flex-direction: column">
    <!-- necessary for router-view -->
    <div class="win-banner cmn_card" v-if="isEndGame.status" @click="reloadPage()">Team {{ isEndGame.winningTeam == 'A' ? teamName[0] : teamName[1] }} wins!</div>
    <div class="win-banner turn-banner cmn_card" v-if="!isEndGame.status" :style="style_turnArrowAlignment()">
      <div>Team {{ currentTurn == 'A' ? teamName[0] : teamName[1] }}'s turn</div>
      <div style="font-size: 2rem">↓</div>
    </div>
    <div class="monster-mania-main">
      <div v-for="team in teams" :key="team" class="team">
        <div
          @click="currentTurn == monster.team ? monsterHit(monster) : ''"
          v-for="monster in team.roster"
          :key="monster"
          :class="class_monsterStatus(monster)"
          class="monster-card cmn_card"
          :style="style_monsterHealthBar(monster)"
        >
          <div class="monster-thumbnail" :style="monster.iconURL">
            <div>{{ monster.life }}/{{ maxLife }}</div>
          </div>
          <div class="monster-info">
            <div class="monster-name">{{ monster.name }}</div>
            <div class="monster-life">
              <b>{{ monster.damage }}</b
              >&nbsp;
              <span v-if="monster.specialAttack.isOn" class="special-attack">(+{{ monster.specialAttack.value }})&nbsp;</span>
              / {{ monster.defense }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(log, index) in attackLog" :key="index" v-html="log" :style="style_latestLog(index)"></div>
  </div>
</template>

<script>
// park all non vue-related (or generic) functions outside of the vue app script
function randomize(upperLimit, lowerLimit = 0) {
  return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit // proper random
}

export default {
  name: 'Monster-Mania',
  data() {
    return {
      teamName: ['Monster Inc.', 'James Bong Squad'],
      maxLife: randomize(11, 1),
      maxMonsters: 0,
      attackLog: [],
      isEndGame: {
        status: false,
        winningTeam: '',
      },
      currentTurn: 'A',
      monsterIcons: [
        {
          'background-image': `url(${require('./../assets/monster-mania/monster-icon1.png')})`,
        },
        {
          'background-image': `url(${require('./../assets/monster-mania/monster-icon2.png')})`,
        },
        {
          'background-image': `url(${require('./../assets/monster-mania/monster-icon3.png')})`,
        },
        {
          'background-image': `url(${require('./../assets/monster-mania/monster-icon4.png')})`,
        },
        {
          'background-image': `url(${require('./../assets/monster-mania/monster-icon5.png')})`,
        },
      ],
    }
  },
  computed: {
    monsterNames() {
      const names = 'Enzo Carlo Lianne Jimmy Goomba Bowser Daddy Thor Thanos Mommy'
      const titles = ['Spider Killer', 'Dragon Slayer', 'King', 'Axe Wielder', 'Black Knight', 'Barbarian King', 'Cook', 'Dog', 'Brave', 'Coward']
      const firstName = names.split(' ')
      for (let i = 0; i < firstName.length; i++) {
        firstName[i] = `${firstName[i]} the ${titles[randomize(titles.length)]}`
      }
      return firstName
      //return ["Trump", "Pence", "Duterte", "Roque", "Biden", "Woodnut", "Koh", "Gwee", "Gomorrah", "Revilla"]
    },
    teams() {
      return [
        {
          team: 'A',
          roster: this.teamA,
        },
        {
          team: 'B',
          roster: this.teamB,
        },
      ]
    },
    monsterPlayerList() {
      let array = []
      let isTeamA = true

      function getTeamName(condition) {
        if (condition) {
          return 'A'
        } else {
          return 'B'
        }
      }

      for (let i = 0; i < this.maxMonsters; i++) {
        const monsterName = this.monsterNames[randomize(this.monsterNames.length)]
        if (!array.some((monster) => monster.name === monsterName)) {
          array.push({
            team: getTeamName(isTeamA),
            name: monsterName,
            life: this.maxLife,
            damage: randomize(8, 2),
            defense: randomize(3, 1),
            isAlive: true,
            specialAttack: {
              isOn: false,
              value: 0,
            },
            iconURL: this.monsterIcons[randomize(this.monsterIcons.length)],
          })
          isTeamA = !isTeamA
        } else {
          i--
        }
      }
      return array
    },
    teamA() {
      return this.generateTeam('A')
    },
    teamB() {
      return this.generateTeam('B')
    },
    attackLogLength() {
      // watch object property
      return this.attackLog.length
    },
  },
  watch: {
    // watch object property
    // attackLogLength(value){
    //   (value>10) ? console.log("more than 10!") : ''
    // }
  },
  methods: {
    generateTeam(team) {
      let array = []
      let monster
      for (monster of this.monsterPlayerList) {
        monster.team === team ? array.push(monster) : ''
      }
      return array
    },
    monsterHit(monster) {
      if (this.isEndGame.status || !monster.isAlive) {
        return
      } // don't run if game has ended or monster being hit is dead

      this.addSpecialAttack(monster)
      const attacking = monster.team
      const attackedTeam = attacking == 'A' ? this.teamB : this.teamA
      const attackedMonsterIndex = randomize(attackedTeam.length)

      // updating values of attacked monster
      if (attackedTeam[attackedMonsterIndex].isAlive) {
        if (monster.damage >= attackedTeam[attackedMonsterIndex].defense) {
          attackedTeam[attackedMonsterIndex].life = attackedTeam[attackedMonsterIndex].life + attackedTeam[attackedMonsterIndex].defense - monster.damage - monster.specialAttack.value
          if (attackedTeam[attackedMonsterIndex].life <= 0) {
            ;(attackedTeam[attackedMonsterIndex].isAlive = false), (attackedTeam[attackedMonsterIndex].life = 0)
          }
        }
      } else {
        this.monsterHit(monster)
      }

      // logging the action
      const log = `<b>(${this.teamName[0]}) ${monster.name}</b> -- attacks -- <b> (${this.teamName[1]}) ${attackedTeam[attackedMonsterIndex].name}</b> for ${monster.damage +
        monster.specialAttack.value}`
      this.attackLog.unshift(log)

      // check who's turn
      this.currentTurn = monster.team == 'A' ? 'B' : 'A'

      // checking for endGame
      if (!this.teamA.some((remainingMonster) => remainingMonster.isAlive == true) || !this.teamB.some((remainingMonster) => remainingMonster.isAlive == true)) {
        this.isEndGame = {
          status: true,
          winningTeam: monster.team,
        }
      }
    },
    addSpecialAttack(monster) {
      const chances = randomize(3, 1)
      if (chances != 1) {
        return
      } // 33% chance to award

      const opponent = monster.team == 'A' ? this.teamB : this.teamA
      const opponentMonster = opponent[randomize(opponent.length - 1)]

      if (opponentMonster.isAlive == false) {
        return
      } // don't award if dead

      opponentMonster.specialAttack = {
        isOn: true,
        value: randomize(7, 2),
      }
    },
    reloadPage() {
      window.location.reload()
    },
    automateAttack() {
      let self = this // pass this to self so that self takes global variabls
      let myInterval = setInterval(function() {
        let currentTeam = self.currentTurn == 'A' ? self.teamA : self.teamB
        self.monsterHit(currentTeam[randomize(currentTeam.length)]), self.isEndGame.status ? clearInterval(myInterval) : ''
      }, 100)
    },
    style_latestLog(index) {
      return index != 0 ? {color: '#777'} : {'font-size': '1.25rem'}
    },
    style_turnArrowAlignment() {
      return this.currentTurn == 'B' ? {'align-self': 'flex-end'} : ''
    },
    style_monsterHealthBar(monster) {
      return monster.isAlive ? {'background-size': `${(monster.life / this.maxLife) * 100}% 100%`} : ''
    },
    class_monsterStatus(monster) {
      return {'monster-dead txtTomato': !monster.isAlive, 'monster-allowed': this.currentTurn == monster.team && monster.isAlive}
    },
  },
  mounted() {
    this.maxMonsters = (randomize(Math.floor(this.monsterNames.length) / 2) + 1) * 2
    this.automateAttack()

    //quick automate
    // do {
    //     const currentTeam = (this.currentTurn == "A") ? this.teamA : this.teamB
    //     this.monsterHit(currentTeam[randomize(currentTeam.length)])
    // } while (this.isEndGame.status == false)
  },
}
</script>
