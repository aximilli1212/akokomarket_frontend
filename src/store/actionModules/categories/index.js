import axios from 'axios'

const getCategoriesList =  ({ state,commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios.get(`/categories/pcat/${state.active_prod.id}`)
      .then(response => {
        let catList = response.data;
        resolve(catList)
        commit('setCategoriesList', catList)
      })
      .catch(error => {
         resolve(error);
        console.log(error)
      })
  })

}

const addCategories =  ({ commit, dispatch }, payload)=> {
  let self = this;
  return new Promise((resolve, reject) => {
    axios.post('/categories/create', payload)
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

export {getCategoriesList,editProduct,addCategories,deleteProduct}

