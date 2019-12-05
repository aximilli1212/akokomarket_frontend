import axios from 'axios'

const getAgentProductList =  ({ commit }, payload)=> {
  axios.get(`/agent_product/agent/${payload.cid}`)
    .then(response => {
      let obj = response.data;
      let pList = [];
        for(let i = 0, len = obj.length; i < len ; i++){
        pList.push({
          id:obj[i].id,
          product_name: obj[i].product_name,
          product_id: obj[i].product_id,
          type: obj[i].product.name,
          price: obj[i].price,
          quantity: obj[i].quantity,
          pack_: obj[i].quantity,
          category: obj[i].category.name,
          categorySet: obj[i].category,
          productSet: obj[i].product,
          date_created: obj[i].date_created,
        })
      }

      console.log({ListData:pList});
      commit('setAgentProductList', pList);
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

