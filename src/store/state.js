// https://vuex.vuejs.org/en/state.html

export default {
  authStatus: '',
  token: localStorage.getItem('token') || '',
  user: {},
  btn_loader:false,
  snackSet:{
    status_msg:"Success",
    added_msg:"Data successfully added.",
    color:"primary",
    top:true,
    left:true,
    bottom:false,
    right:false,
  },
  tableList: [],
  customerList: [],
  companyList: [],
  productList: [],
  surveyList: [],
  depotList: [],
  transactionList: [],
  categoriesList: [],
  requestList: [],
  active_prod: {},
}
