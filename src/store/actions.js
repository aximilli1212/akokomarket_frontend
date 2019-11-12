// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'

// The login action passes vuex commit helper that we will use to trigger mutations.
export default {
  login ({ commit }, userData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post('/login', { email: userData.username, password: userData.password })
        .then(response => {
          const token = response.data.access_token
          const user = response.data.username
          console.log(response);
          // storing jwt in localStorage. https cookie is safer place to store
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          // mutation to change state properties to the values passed along
          commit('auth_success', { token, user })
          resolve(response)
        })
        .catch(err => {
          console.log('login error')
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  refreshtoken ({ commit }) {
    axios.get('/refresh')
      .then(response => {
        const token = response.data.access_token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('auth_success', { token })
      })
      .catch(error => {
        console.log('refresh token error')
        commit('logout')
        localStorage.removeItem('token')
        console.log(error)
      })
  },
  getTableList ({ commit }, tableName) {
    this.$http.get(`/${tableName}`)
      .then(response => {
        console.log(response)
        let tableList = response.data.Keys
        commit('setTableList', { tableList })
      })
      .catch(error => console.log(error))
  },
  getCustomerList ({ commit }, tableName) {
    axios.get('customers')
      .then(response => {
        let CustomerList = response.data.data
        // for(let clist of CustomerList){
        //      let req =  clist.requests.length;
        // }
        commit('setCustomerList', CustomerList)
      })
      .catch(error => console.log(error))
  },

  addCustomer ({ commit, dispatch }, payload) {
    let self = this;
    commit('setBtnLoader',true);
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.post('/customers/create', payload)
        .then(response => {
          console.log(response)
          dispatch('getCustomerList');
          commit('setBtnLoader',false);
          resolve(response)
        })
        .catch(err => {
          reject(err)
          commit('setBtnLoader',false);
        })
    })
  },

  getCompanyList ({ commit }, tableName) {
    axios.get('companys')
      .then(response => {
        let CompanyList = response.data.data
        commit('setCompanyList', CompanyList)
      })
      .catch(error => console.log(error))
  },

  addCompany ({ commit, dispatch }, payload) {
    let self = this;
    commit('setBtnLoader',true);
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.post('/companys/create', payload)
        .then(response => {
          console.log(response)
          dispatch('getCustomerList');
          commit('setBtnLoader',false);
          resolve(response)
        })
        .catch(err => {
          reject(err)
          commit('setBtnLoader',false);
        })
    })
  },
  editCompany ({ commit, dispatch }, payload) {
    let self = this;
    let id = payload.id;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.put('/companys/'+id, payload)
        .then(response => {
          console.log(response)
          dispatch('getCompanyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getDepotList ({ commit }, tableName) {
    axios.get('depot')
      .then(response => {
        let DepotList = response.data.data
        // for(let clist of CustomerList){
        //      let req =  clist.requests.length;
        // }
        commit('setDepotList', DepotList)
      })
      .catch(error => console.log(error))
  },

  addDepot ({ commit, dispatch }, payload) {
    let self = this;
    commit('setBtnLoader',true);
    return new Promise((resolve, reject) => {
      axios.post('/depot/create', payload)
        .then(response => {
          console.log(response)
          dispatch('getDepotList');
          commit('setBtnLoader',false);
          resolve(response)
        })
        .catch(err => {
          reject(err)
          commit('setBtnLoader',false);
        })
    })
  },
  updateTableItem ({ commit }, tableData) {
    return new Promise((resolve, reject) => {
      let httpmethod = tableData.method
      axios({ url: `/${tableData.endpoint}`, method: httpmethod, data: tableData.tableItem })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  getTransactionList ({ commit }, tableName) {
    axios.get('transactions')
      .then(response => {
        let TransactionList = response.data.data;
        console.log(TransactionList);
        commit('setTransactionList', TransactionList)
      })
      .catch(error => console.log(error))
  },
  getRequestList ({ commit }, tableName) {
    axios.get('market_requests')
      .then(response => {
        let RequestList = response.data.data;
        console.log(RequestList);
        let RequestSet = [];
        for(let clist of RequestList){
             RequestSet.push({
               ...clist,
               customer:clist.customer.fullname,
               payment:clist.transaction.status
             })
        }
        commit('setRequestList', RequestSet)
      })
      .catch(error => console.log(error))
  },
  getSellSurveyList ({ commit }, tableName) {
    axios.get('sell_survey')
      .then(response => {
        let SurveyList = response.data.data;
        console.log(SurveyList);
        commit('setSurveyList', SurveyList)
      })
      .catch(error => console.log(error))
  },
  addSellSurvey ({ commit, dispatch }, payload) {
    let self = this;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.post('/sell_survey/create', payload)
        .then(response => {
          console.log(response)
          dispatch('getSellSurveyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  editSellSurvey ({ commit, dispatch }, payload) {
    let self = this;
    let id = payload.id;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.put('/sell_survey/'+id, payload)
        .then(response => {
          console.log(response)
          dispatch('getSellSurveyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteSellSurvey ({ commit, dispatch }, payload) {
    let id = payload.id;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.delete('/sell_survey/'+id)
        .then(response => {
          console.log(response)
          dispatch('getSellSurveyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getProductList ({ commit }, tableName) {
    axios.get('sell_survey')
      .then(response => {
        let SurveyList = response.data.data;
        console.log(SurveyList);
        commit('setSurveyList', SurveyList)
      })
      .catch(error => console.log(error))
  },
  addProduct ({ commit, dispatch }, payload) {
    let self = this;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.post('/sell_survey/create', payload)
        .then(response => {
          console.log(response)
          dispatch('getSellSurveyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  editProduct({ commit, dispatch }, payload) {
    let self = this;
    let id = payload.id;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.put('/sell_survey/'+id, payload)
        .then(response => {
          console.log(response)
          dispatch('getSellSurveyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteProduct ({ commit, dispatch }, payload) {
    let id = payload.id;
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.delete('/sell_survey/'+id)
        .then(response => {
          console.log(response)
          dispatch('getSellSurveyList');
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // autoRefreshToken ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     setInterval(function () {
  //       // code goes here that will be run every 20 minutes.
  //       axios.get('/refresh')
  //         .then(response => {
  //           const token = response.data.access_token
  //           localStorage.setItem('token', token)
  //           axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  //           commit('auth_success', { token })
  //           resolve(response)
  //         })
  //         .catch(error => {
  //           console.log('refresh token error')
  //           console.log(error)
  //           reject(error)
  //         })
  //     }, 1200000)
  //   }
  //   )
  // },

}
