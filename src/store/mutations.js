// https://vuex.vuejs.org/en/mutations.html

export default {
  auth_request (state) {
    state.authStatus = 'loading'
  },

  auth_success (state, { token, user }) {
    state.authStatus = 'success'
    state.token = token
    state.user = user
  },
  auth_error (state) {
    state.authStatus = 'error'
  },
  logout (state) {
    state.authStatus = ''
    state.token = ''
  },
  setTableList (state, tableList) {
    state.tableList = tableList
  },
  setBtnLoader (state, payload) {
    state.btn_loader = payload;
  },

  setSnack(state, payload) {
    state.snackSet = payload;
  },

  setCustomerList (state, customerList) {
    state.customerList = customerList;
  },

  setDepotList (state, customerList) {
    state.depotList = customerList;
  },

  setTransactionList (state, transactionList) {
    state.transactionList = transactionList;
  },

  setRequestList (state, requestList) {
    state.requestList = requestList;
  },

  setSurveyList (state, surveyList) {
    state.surveyList = surveyList;
  },

}
