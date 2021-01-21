<style lang="scss">

#app {
    font-family: Source Sans Pro;
    letter-spacing: -0.02rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // height: 100%;
    min-width: 23.5rem;
}

#router-view {
    padding: 1rem;
}

#page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    #nav {
        background-color: #222;
        padding: 1.875rem;
        min-width: 12rem;
        //min-width: 12rem;
        .nav-wrap {
            display: flex;
            flex-direction: column;
            text-align: left;
            font-size: 1.125rem;
            margin-top: 0.5rem;
        }
        a {
            text-decoration: none;
            color: #eee;
            padding: 0.4rem 0.75rem;
        }
        a:hover {
            background-color: #eeeeee10;
        }
        a.router-link-exact-active {
            font-weight: bold;
            color: #ff8800;
        }
        .btn-wrap {
            display: flex;
            justify-content: space-between;
            .btn-label {
                display: flex;
                align-items: center;
                font-size: 1.25rem;
                color: #aaa;
            }
            .btn-close {
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 0.5rem;
                font-weight: bold;
                background-color: #111;
                color: tomato;
                width: 2.5rem;
                height: 2.5rem;
                cursor: pointer;
                border-radius: 0.5rem;
            }
        }
    }
}

.hiddenTag {
    display: none
}

.shownTag {
    display: initial
}

@media only screen and (max-width: 375px) {
    #page-wrapper {
        #nav {
            .nav-wrap {
                a {
                    padding: 0.25rem 0.75rem;
                }
            }
        }
    }
    #router-view {}
}

</style>

<template>
<div id="page-wrapper">
    <div id="nav">
        <div class="btn-wrap">
            <div class="btn-label"><span v-if="!navSettings.isDisplayed">{{ getLabel() }}</span></div>
            <div class="btn-close" @click="toggleNav()">{{ navSettings.label }}</div>
        </div>
        <div class="nav-wrap" v-if="navSettings.isDisplayed">
            <router-link v-for="link in routerLinks" :to="link.path" @click="toggleNav()" :key="link.label">{{ link.label }}</router-link>
            <!--router-link to="/" @click="toggleNav">Home</router-link>
            <router-link to="/adding-goals-vanilla" @click="toggleNav">Adding Goals (Vanilla)</router-link>
            <router-link to="/adding-goals-vue" @click="toggleNav">Adding Goals (Vue)</router-link-->
        </div>
    </div>
    <div :class="{'shownTag':!navSettings.isDisplayed,'hiddenTag':navSettings.isDisplayed}">
        <router-view id="router-view" />
    </div>
</div>

</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            navSettings: {
                isDisplayed: false,
                label: "..."
            },
            routerLinks: [{
                path: "/",
                label: "Home"
            }, {
                path: "/adding-goals-vanilla",
                label: "Adding Goals (Vanilla)"
            }, {
                path: "/adding-goals-vue",
                label: "Adding Goals (Vue)"
            }, {
                path: "/basic-counter.vue",
                label: "Basic Counter"
            }, {
                path: "/monster-mania.vue",
                label: "Monster Mania"
            }, {
                path: "/contact-list.vue",
                label: "Contact List"
            }]
        }
    },
    methods: {
        toggleNav() {
                this.navSettings.isDisplayed = !this.navSettings.isDisplayed;
                (this.navSettings.isDisplayed) ? this.navSettings.label = "x": this.navSettings.label = "..."
                console.log(this.navSettings.isDisplayed)
            },
            getLabel() {
                const linkObj = this.routerLinks.find(o => o.path === this.$route.path);
                return linkObj.label
                    //return this.$route.path
            }
    },
    mounted() {}
}

</script>

<!--style lang="scss">
</style>
<template>
</template>
<script>
export default {
    name: 'xxx',
    data() {
    return{}
  },
  computed:{},
  methods:{},
  mounted(){}
  }
</script-->

<!-- style and class syntax
:style="[{'css style':value},{camelCaseStyle:value}]"
:class="[{'className':condition},{'className':condition}]" -->
