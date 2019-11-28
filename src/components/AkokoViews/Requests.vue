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
          :title="title"
          text="List of all received request from USSD"
        >
          <v-data-table
            :headers="headers"
            :items="requestList"
            color="black"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-bold primary--text text--darken-3"
                v-text="header.text"
              ></span>
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.order_id }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.item }}</td>
              <td>{{ item.item_category1 }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.cost }}</td>
              <td>{{ item.customer }}</td>
              <td>{{ item.status ? "PENDING" : "DELIVERED" }}</td>
              <td><v-chip small class="px-2" color="red" dark>{{ item.payment ? 'PAID' : 'UNPAID' }}</v-chip></td>
              <td class="text-xs-right">{{ item.date_created }}</td>
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
  name:'Requests',
  data: () => ({
    headers: [
      { text: 'ID', align: 'left', value: 'order_id',class:'subheading',sortable:false },
      { text: 'Phone No.', align: 'left', value: 'phone',class:'subheading',sortable:false },
      { text: 'Item', align: 'left', value: 'item',class:'subheading' },
      { text: 'Description', align: 'left', value: 'item_category1',class:'subheading' },
      { text: 'Quantity', align: 'left', value: 'quantity',class:'subheading' },
      { text: 'Cost', align: 'left', value: 'cost',class:'subheading' },
      { text: 'Customer Name', align: 'left', value: 'customer',class:'subheading' },
      { text: 'Status', align: 'left', value: 'status',class:'subheading' },
      { text: 'Payment', align: 'left', value: 'payment',class:'subheading' },
      { text: 'Time', align: 'left', value: 'date_created',class:'subheading' },
    ],
    items: [

    ]
  }),
  computed: {
    title(){
      return "All Market Requests ("+this.requestList.length+")";
    },
    ...mapGetters(["requestList"]),
  },
  mounted(){
    this.$store.dispatch('getRequestList');
  },
}
</script>
