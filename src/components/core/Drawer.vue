<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="grey"
          >
            <v-img
              :src="require('../../assets/img/chicken.jpg')"
              height="60"
              width="74"
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title primary--text">
           AKOKOMARKET
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>


        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="search-input"
            label="Search Akokomarket ..."
            color="primary"
          />
        </v-list-tile>


        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          active-class="primary white--text font-weight-bold"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
<!--        <v-list-group-->
<!--                prepend-icon="cart-arrow-down"-->
<!--                value="true"-->
<!--        >-->
<!--          <template v-slot:activator>-->
<!--            <v-list-item-title>Products</v-list-item-title>-->
<!--          </template>-->
<!--        <v-list-tile-->

<!--          to="dash"-->
<!--          active-class="grey"-->
<!--          avatar-->
<!--          class="v-list-item"-->
<!--        >-->
<!--          <v-list-tile-action>-->
<!--            <v-icon>mdi-circle</v-icon>-->
<!--          </v-list-tile-action>-->
<!--          <v-list-tile-title>Eggs</v-list-tile-title>-->
<!--        </v-list-tile>-->
<!--          <v-list-tile-->

<!--          to="dash"-->
<!--          active-class="grey"-->
<!--          avatar-->
<!--          class="v-list-item"-->
<!--        >-->
<!--          <v-list-tile-action>-->
<!--            <v-icon>mdi-map</v-icon>-->
<!--          </v-list-tile-action>-->
<!--          <v-list-tile-title>Chicken</v-list-tile-title>-->
<!--        </v-list-tile>-->
<!--          <v-list-tile-->

<!--          to="dash"-->
<!--          active-class="grey"-->
<!--          avatar-->
<!--          class="v-list-item"-->
<!--        >-->
<!--          <v-list-tile-action>-->
<!--            <v-icon>mdi-leaf</v-icon>-->
<!--          </v-list-tile-action>-->
<!--          <v-list-tile-title>Maize</v-list-tile-title>-->
<!--        </v-list-tile>-->
<!--        </v-list-group>-->

      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    logo: require('@/assets/img/redditicon.png'),
    admin_links: [
      {
        to: '/',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      // {
      //   to: "/dashboard/requests",
      //   text: "Market Requests",
      //   icon: "mdi-cart",
      // },
      // {
      //   to: "/dashboard/customers",
      //   text: "Customers",
      //   icon: "mdi-account-multiple",
      // },
      {
        to: "/dashboard/company",
        text: "Company",
        icon: "mdi-domain",
      },
      {
        to: "/dashboard/depot",
        text: "Depot",
        icon: "mdi-home",
      },
      // {
      //   to: "/dashboard/transactions",
      //   text: "Transactions",
      //   icon: "mdi-cash",
      // },
      // {
      //   to: "/dashboard/sell_survey",
      //   text: "Sell Survey",
      //   icon: "mdi-chart-bar-stacked",
      // },
      {
        to: "/dashboard/products",
        text: "Products",
        icon: "mdi-tag",
      },


    ],
    agent_links: [
      {
        to: '/',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: "/dashboard/requests",
        text: "Market Requests",
        icon: "mdi-cart",
      },
      {
        to: "/dashboard/customers",
        text: "Customers",
        icon: "mdi-account-multiple",
      },
      {
        to: "/dashboard/company",
        text: "Company",
        icon: "mdi-domain",
      },
      {
        to: "/dashboard/depot",
        text: "Depot",
        icon: "mdi-home",
      },
      {
        to: "/dashboard/transactions",
        text: "Transactions",
        icon: "mdi-cash",
      },
      {
        to: "/dashboard/sell_survey",
        text: "Sell Survey",
        icon: "mdi-chart-bar-stacked",
      },
      {
        to: "/dashboard/products",
        text: "Products",
        icon: "mdi-tag",
      },


    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
        inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    },
    links(){
      let user = JSON.parse(localStorage.getItem('user'));
      let account = this.$store.getters.userData.account_type;
      if(account === 'admin' || user.account_type === 'admin'){
          return this.admin_links;
      }
      if(account === 'agent' || user.account_type === 'agent' ){
         return this.agent_links;
      }
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
