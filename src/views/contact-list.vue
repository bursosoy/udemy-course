<style lang="scss">
.router-view {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .cmn_button {
    margin-top: 2rem;
  }
}
</style>

<template>
  <div class="router-view">
    <contactCard
      @cardClickedEvent="cardClicked"
      v-for="person in contactList"
      :person="person"
      :key="person.name"
    />
    <div @click="changeName()" class="cmn_button">Apply Random Name</div>
  </div>
</template>

<script>
function randomize(upperLimit, lowerLimit = 0) {
  return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit; // proper random
}

function removeStringSpace(string) {
  return string.replace(/ +/g, "");
}

import contactCard from "./../components/contact-card.vue"; // relative calling should ignore the first "./"
export default {
  name: "ContactList",
  data() {
    return {
      methodCounter: 0,
      firstNameList: [
        {
          name: "Anthony",
          gender: "M",
        },
        {
          name: "Carlo",
          gender: "M",
        },
        {
          name: "Enzo Miguel",
          gender: "M",
        },
        {
          name: "Patrick",
          gender: "M",
        },
        {
          name: "Mark Bienvenido",
          gender: "M",
        },
        {
          name: "Mick",
          gender: "M",
        },
        {
          name: "Melanie",
          gender: "F",
        },
        {
          name: "Josie",
          gender: "F",
        },
        {
          name: "Catherine",
          gender: "F",
        },
        {
          name: "Maria Susanitta",
          gender: "F",
        },
        {
          name: "Wendy",
          gender: "F",
        },
        {
          name: "Marilou",
          gender: "F",
        },
      ],
      lastNameList: [
        "Pena",
        "Lagman",
        "Santos",
        "Valentin",
        "De Guzman III",
        "Panello",
        "Beltran",
        "Bagumbayan",
      ],
      domainNameList: ["gmail.com", "yahoo.com", "inquirer.com", "tipidpc.com"],
      numberOfContacts: (randomize(5, 1) % 3) * 3 + 6,
      tempURL: "./../assets/contact-list/avatar1.png",
      iconURL: [
        {
          "background-image": `url(${require("./../assets/contact-list/avatar1.png")})`,
        },
        {
          "background-image": `url(${require("./../assets/contact-list/avatar2.png")})`,
        },
        {
          "background-image": `url(${require("./../assets/contact-list/avatar3.png")})`,
        },
        {
          "background-image": `url(${require("./../assets/contact-list/avatar4.png")})`,
        },
        {
          "background-image": `url(${require("./../assets/contact-list/avatar5.png")})`,
        },
      ],
    };
  },
  components: {
    contactCard,
  },
  computed: {
    contactList() {
      let array = [];
      let numberOfContacts = this.numberOfContacts;
      let counter;

      for (counter = 0; counter < numberOfContacts; counter++) {
        //console.table(array)
        let firstNameIndex = randomize(this.firstNameList.length);
        let lastNameIndex = randomize(this.lastNameList.length);
        let domainNameIndex = randomize(this.domainNameList.length);
        let firstName = {
          name: this.firstNameList[firstNameIndex].name,
          gender: this.firstNameList[firstNameIndex].gender,
        };
        let lastName = this.lastNameList[lastNameIndex];
        let domainName = this.domainNameList[domainNameIndex];

        let phone =
          "+6" + randomize(10, 3) + "9" + randomize(999999999, 100000000) + "";
        if (
          !array.some(
            (person) => person.name === firstName.name + " " + lastName
          )
        ) {
          array.push({
            name: firstName.name + " " + lastName,
            phone:
              phone.substring(0, 3) +
              " " +
              phone.substring(3, 6) +
              " " +
              phone.substring(6, 9) +
              " " +
              phone.substring(9, 13),
            email: removeStringSpace(
              `${firstName.name}.${lastName}@${domainName}`.toLowerCase()
            ),
            iconURL:
              firstName.gender == "M"
                ? this.iconURL[randomize(3, 0)]
                : this.iconURL[randomize(5, 3)],
            gender: firstName.gender,
          });
        } else {
          counter--;
          console.log(
            "duplicated and removed: " + firstName.name + " " + lastName
          );
        }
      }
      array.sort((a, b) => (a.name > b.name ? 1 : -1));
      return array;
    },
  },
  methods: {
    changeName() {
      //this.methodCounter ++ // something has to change on the HTML DOM for the component to update
      let randomName = `[ ${
        this.firstNameList[randomize(this.firstNameList.length)].name
      } # ${randomize(1000)} ]`;

      if (this.contactList.some((person) => person.name === randomName)) {
        console.log(randomName);
        this.changeName(); // re-run for another attempt
        return;
      } // terminate if duplicate

      this.contactList[randomize(this.contactList.length)].name = randomName;
      this.contactList.sort((a, b) => (a.name > b.name ? 1 : -1));

      let nameList = [];
      this.contactList.forEach((element) => nameList.push(element.name));
      console.table(nameList);

      this.$forceUpdate(); // forces view to re-render and the component data to update
    },
    cardClicked(person) {
      console.log(person.name);
    },
  },
  mounted() {
    let nonUniqueArray = [...new Set(["1", "1", "2", "3", "4"])];
    console.log(nonUniqueArray);
  },
};
</script>
