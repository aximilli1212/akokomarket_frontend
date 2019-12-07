import axios from 'axios'

const getActive = ({ commit,dispatch })=> {
  return new Promise((resolve, reject) => {
    axios.get('/enterprise/orders/current_user')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error);
      })
  })
}


const getProductList =  ({ commit }, tableName)=> {
  axios.get('/products')
    .then(response => {
      let SurveyList = response.data.data;
      console.log(SurveyList);
      commit('setProductList', SurveyList)
    })
    .catch(error => console.log(error))
}

const addProduct =  ({ commit, dispatch }, payload)=> {
  let self = this;
  return new Promise((resolve, reject) => {
    commit('auth_request');
    axios.post('/products/create', payload)
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

const editProduct = ({ commit, dispatch }, payload)=> {
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

export {getActive,getProductList,editProduct,addProduct,deleteProduct}

