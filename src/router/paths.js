/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import store from '../store'
export default [
  {
    path: '*',
    meta: {
      name: '',
      requiresAuth: true
    },
    redirect: {
      path: '/dashboard'
    }
  },
  // This  allows you to have pages apart of the app but no rendered inside the dash
  {
    path: '/',
    meta: {
      name: '',
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "routes" */ `@/views/LoginHome.vue`),
    // redirect if already signed in
    beforeEnter: (to, from, next) => {
      if (store.getters.authorized) {
        next('/dashboard')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        component: () => import(`@/components/LoginForm.vue`)
      }
    ]
  },



  // add any extra routes that you want rendered in the dashboard as a child below. Change toolbar names here
  {
    path: '/dashboard',
    meta: {
      name: 'Dashboard View',
      requiresAuth: true
    },
    component: () => import(`@/views/DashboardView.vue`),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(`@/components/DashViews/Dashboard.vue`)
      },
      {
        path: 'user-profile',
        meta: {
          name: 'User Profile',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/UserProfile.vue`)
      },
      {
        path: 'table-list',
        meta: {
          name: 'Table List',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/SimpleTables.vue`)
      },
      {
        path: 'user-tables',
        meta: {
          name: 'User Table',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/UsersTable.vue`)
      },
      {
        path: 'tablestest',
        meta: {
          name: 'Complex Tables test',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/TableList.vue`)
      },
      {
        path: 'typography',
        meta: {
          name: 'Typography',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/Typography.vue`)
      },
      {
        path: 'icons',
        meta: {
          name: 'Icons',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/Icons.vue`)
      },
      {
        path: 'maps',
        meta: {
          name: 'Maps',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/Maps.vue`)
      },
      {
        path: 'notifications',
        meta: {
          name: 'Notifications',
          requiresAuth: true
        },
        component: () => import(`@/components/DashViews/Notifications.vue`)
      },
      {
        path: 'requests',
        meta: {
          name: 'Market Requests',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Requests.vue`)
      },
      {
        path: 'company',
        meta: {
          name: 'Company',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Company.vue`)
      },
      {
        path: 'customers',
        meta: {
          name: 'Customers',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Customers.vue`)
      },
      {
        path: 'depot',
        meta: {
          name: 'Depot',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Depot.vue`)
      },
      {
        path: 'transactions',
        meta: {
          name: 'Transactions',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Transactions.vue`)
      },
      {
        path: 'sell_survey',
        meta: {
          name: 'Sell Survey',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/SellSurvey.vue`)
      },
      {
        path: 'product_category',
        meta: {
          name: 'ProductCategory',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Products/ProductCategory.vue`)
      },
      {
        path: 'products',
        meta: {
          name: 'Products',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Products/Products.vue`)
      },
      {
        path: 'categories',
        meta: {
          name: 'Categories',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Products/ProductCategory.vue`)
      },
      {
        path: 'user',
        meta: {
          name: 'User',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/User.vue`)
      }, {
        path: 'manage_users',
        meta: {
          name: 'ManageUsers',
          requiresAuth: true
        },
        component: () => import(`@/components/AkokoViews/Users/Users.vue`)
      },


      //All Agent Routes

      {
        path: 'agent/products',
        meta: {
          name: 'Products',
          requiresAuth: true
        },
        component: () => import(`@/components/AgentViews/Products/Products.vue`)
      },

    ]
  }
]
