import axios from 'axios'

const getAgentProductList =  ({ commit }, payload)=> {
  axios.get(`/agent_product/agent/${payload.id}`)
    .then(response => {
      let SurveyList = response.data.data;
      console.log(SurveyList);
      commit('setAgentProductList', SurveyList)
    })
    .catch(error => console.log(error))
}

const addAgentProduct =  ({ commit, dispatch }, payload)=> {
  let self = this;
  return new Promise((resolve, reject) => {
    commit('auth_request');
    axios.post('/agent_product/create', payload)
      .then(response => {
        console.log(response)
        dispatch('getAgentProductList');
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const editAgentProduct = ({ commit, dispatch }, payload)=> {
  let self = this;
  let id = payload.id;
  return new Promise((resolve, reject) => {
    commit('auth_request');
    axios.put('/agent_product/'+id, payload)
      .then(response => {
        console.log(response)
        dispatch('getAgentProductList');
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const deleteProduct =  ({ commit, dispatch }, payload)=> {
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

export {getAgentProductList,editAgentProduct,addAgentProduct,deleteProduct}

