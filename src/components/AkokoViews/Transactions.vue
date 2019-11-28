<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
    <v-layout
            justify-center
            wrap
    >
      <v-flex
              md12
      >
        <material-card
                color="primary"
                title="All Transactions"
                text="Process payment transactions"
        >
          <v-data-table
                  :headers="headers"
                  :items="transactionList"
                  color="black"
          >
            <template
                    slot="headerCell"
                    slot-scope="{ header }"
            >
              <span
                      class="subheading font-weight-bold primary--text"
                      v-text="header.text">
              </span>



            </template>
            <template
                    slot="items"
                    slot-scope="{ item }"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.final_amount}}</td>
              <td>{{ item.actual_amount}}</td>
              <td>{{ item.txn_phone}}</td>
              <td>{{ item.txn_phone_operator}}</td>
              <td>{{ item.date_created}}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapMutations, mapGetters } from "vuex";

  export default {
    name:'Transaction',
    data: () => ({
      valid:true,
      addCusDialog:false,
      loader:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Amount', align: 'left', value: 'final_amount',class:'subheading',sortable:false },
        { text: 'Charges', align: 'left', value: 'actual_amount',class:'subheading',sortable:false },
        { text: 'Phone Number', align: 'left', value: 'txn_phone',class:'subheading',sortable:false },
        { text: 'Network Operator', align: 'left', value: 'txn_phone_operator',class:'subheading',sortable:false },
        { text: 'Date of Transactions', align: 'left', value: 'date_created',class:'subheading' },
      ],
    }),
    computed: {
      title(){
        return "All Transaction ("+this.transactionList.length+")";
      },
      ...mapGetters(["transactionList","btn_loader"]),
    },
    mounted(){
      this.$store.dispatch('getTransactionList');
    },
    methods:{
      ...mapMutations(['setSnack']),
      addTransaction(){
        this.addCusDialog = true;
      },
    }
  }
</script>
