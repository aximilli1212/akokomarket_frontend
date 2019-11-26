import axios from 'axios'

const getUserList =  ({ state,commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios.get(`/admin/everyone`)
      .then(response => {
        let catList = response.data;
        resolve(catList)
        commit('setUserList', catList)
      })
      .catch(error => {
         resolve(error);
        console.log(error)
      })
  })
}

const editUser = ({ commit, dispatch }, payload)=> {
  let self = this;
  let id = payload.id;
  return new Promise((resolve, reject) => {
    commit('auth_request');
    axios.put('/products/'+id, payload)
      .then(response => {
        console.log(response)
        dispatch('getProductList');
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const deleteUser =  ({ commit, dispatch }, payload)=> {
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
}

export {getUserList,editUser,deleteUser}

