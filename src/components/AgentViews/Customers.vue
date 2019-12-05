<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
<!--    ADD CUSTOMER DIALOG-->
    <v-dialog v-model="addCusDialog" persistent max-width="600px">
      <v-card>
        <v-toolbar >
          <v-toolbar-title class="primary--text">Add New Customer</v-toolbar-title>
          <v-spacer></v-spacer>


          <v-btn icon @click.native="closeup">
            <v-icon color="grey darken-1">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>


        <v-card-text>
          <v-form flat ref="form" v-model="valid" lazy-validation>
            <v-container grid-list-md elevation-3>
              <v-layout wrap >

                <v-flex xs12 sm12 md12>
                  <v-text-field

                          label="Full Name"
                          v-model="user.fullname"
                          prepend-inner-icon="mdi-account"
                          box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                          label="Location"
                          v-model="user.location"
                          prepend-inner-icon="mdi-map-marker"
                          box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                          label="Phone"
                          v-model="user.phone"
                          prepend-inner-icon="mdi-phone"
                          box
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" flat @click.native="closeup">Close</v-btn>

          <v-btn
                  @click="onUserAdd"
                  color="grey"
                  :loading="btn_loader"
                  :disabled="btn_loader"

          ><v-icon left>mdi-library-plus</v-icon>Add Customer</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
<!--    ADD DIALOG END-->
    <v-layout
            justify-center
            wrap
    >
      <v-flex
              md12
      >
        <v-btn class="grey darken-1" @click="addCustomer"><v-icon left>mdi-account-plus</v-icon> Add Customer</v-btn>
        <material-card
                color="primary"
                :title="title"
                text="List of all registered customers"
        >
          <v-data-table
                  :headers="headers"
                  :items="customerList"
                  color="black"
          >
            <template
                    slot="headerCell"
                    slot-scope="{ header }"
            >
              <span
                      class="subheading font-weight-bold primary--text"
                      v-text="header.text"
              ></span>
            </template>
            <template
                    slot="items"
                    slot-scope="{ item }"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.fullname }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.date_created }}</td>
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
    name:'Customers',
    data: () => ({
      user:{
        fullname:'',
        location:'',
        phone:''
      },
      valid:true,
      addCusDialog:false,
      loader:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Fullname', align: 'left', value: 'fullname',class:'subheading',sortable:false },
        { text: 'Location', align: 'left', value: 'location',class:'subheading',sortable:false },
        { text: 'Phone No.', align: 'left', value: 'phone',class:'subheading' },
        { text: 'Date Registered', align: 'left', value: 'date_created',class:'subheading' },
      ],
    }),
    computed: {
      title(){
         return "All Customers ("+this.customerList.length+")";
      },
      ...mapGetters(["customerList","btn_loader"]),
    },
    mounted(){
      this.$store.dispatch('getCustomerList');
    },
    methods:{
      ...mapMutations(['setSnack']),
      addCustomer(){
        this.addCusDialog = true;
      },
      onUserAdd(){
        this.loader = true;
        this.$store.dispatch('addCustomer',this.user)
                .then(() => {
                  this.closeup();
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Customer successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.closeup();
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      closeup(){
        this.addCusDialog = false;
        this.user.fullname = '';
        this.user.location = '';
        this.user.phone = '';
        this.loader = false;
      }
    }
  }
</script>
