// https://vuex.vuejs.org/en/getters.html

// authorized lets you know if the token is true or not
export default {
  authorized: state => !!state.token,
  authstatus: state => state.authStatus,
  customerList: state => state.customerList,
  userData: state => state.user,
  userList: state => state.userList,
  companyList: state => state.companyList,
  productList: state => state.productList,
  requestList: state => state.requestList,
  surveyList: state => state.surveyList,
  transactionList: state => state.transactionList,
  depotList: state => state.depotList,
  btn_loader: state => state.btn_loader,
  snackSet: state => state.snackSet,
  categoriesList: state => state.categoriesList,
  activeProd: state => state.active_prod,
};
