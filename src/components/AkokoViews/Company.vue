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
          <v-toolbar-title class="primary--text">{{dialogTitle}}</v-toolbar-title>
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

                          label="Company Name"
                          v-model="user.name"
                          prepend-inner-icon="mdi-account"
                          box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                          label="Contact Person"
                          v-model="user.owner"
                          prepend-inner-icon="mdi-account-card-details"
                          box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                          label="Phone Number"
                          v-model="user.phone"
                          prepend-inner-icon="mdi-phone"
                          box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                          label="Number of Depots"
                          v-model="user.depots"
                          prepend-inner-icon="mdi-home-assistant"
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
                  v-if="editedIndex"
                  @click="onCompanyEdit"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"

          ><v-icon left>mdi-library-plus</v-icon>Edit Company</v-btn>

          <v-btn
                  v-if="!editedIndex"
                  @click="onCompanyAdd"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"

          ><v-icon left>mdi-library-plus</v-icon>Add Company</v-btn>

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
        <v-btn class="grey darken-1" @click="addCompany"><v-icon left>mdi-account-plus</v-icon> Add Company</v-btn>
        <material-card
                color="primary"
                :title="title"
                text="List of all registered companys"
        >
          <v-data-table
                  :headers="headers"
                  :items="companyList"
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
              <td>{{ item.name }}</td>
              <td>{{ item.owner }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.depots }}</td>
              <td>{{ item.date_created }}</td>
              <td class="align-center">
                <v-btn small color="grey darken-1" @click="editCompany(item)"><v-icon>mdi-pencil</v-icon>Edit</v-btn>
<!--                <v-btn small color="red darken-1" @click="onDeleteCompany(item)"><v-icon>mdi-delete</v-icon>Delete</v-btn>-->
              </td>
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
    name:'Companys',
    data: () => ({
      user:{
        name:'',
        owner:'',
        phone:'',
        depots:'',
      },
      valid:true,
      dialogTitle:'Add Company',
      editedIndex:false,
      addCusDialog:false,
      loader:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Name', align: 'left', value: 'name',class:'subheading',sortable:false },
        { text: 'Owner', align: 'left', value: 'owner',class:'subheading',sortable:false },
        { text: 'Phone No.', align: 'left', value: 'phone',class:'subheading' },
        { text: 'No. Depots', align: 'left', value: 'depots',class:'subheading' },
        { text: 'Date Registered', align: 'left', value: 'date_created',class:'subheading' },
      ],
    }),
    computed: {
      title(){
         return "All Companys ("+this.companyList.length+")";
      },
      ...mapGetters(["companyList","btn_loader"]),
    },
    mounted(){
      this.$store.dispatch('getCompanyList');
    },
    methods:{
      ...mapMutations(['setSnack']),
      addCompany(){
        this.addCusDialog = true;
        this.editedIndex = false;
        this.dialogTitle = "Add Company";
        this.clearup();

      },
      onCompanyAdd(){
        let self = this;
        this.loader = true;
        this.$store.dispatch('addCompany',this.user)
                .then(() => {
                  self.closeup();
                  self.loader = false;
                  self.$store.dispatch('getCompanyList');
                  self.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Company successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.closeup();
                          this.loader = false;
                  this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      onCompanyEdit(){
        this.loader = true;
        this.$store.dispatch('editCompany',this.user)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.dispatch('getCompanyList');
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Company successfully edited." })
                })
                .catch(err => {
                          console.log(err)
                          this.loader = false;
                          this.closeup();
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })
                        }
                )
      },
      editCompany(payload){
        this.user = payload;
        this.dialogTitle = "Edit Company";
        this.addCusDialog = true;
        this.editedIndex = true;
      },

      onDeleteCompany(payload){

        let go = confirm('Are you sure you want to delete this company ?')
        if(go){
          this.user = payload;
          this.loader = true;
          this.$store.dispatch('deleteSellCompany',this.survey)
                  .then(() => {
                    this.closeup();
                    this.loader = false;
                    this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Sell Company successfully Deleted." })
                  })
                  .catch(err => {
                            console.log(err)
                            this.loader = false;
                            this.closeup();
                            this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not delete data." })

                          }
                  )
        }

      },
      closeup(){
        this.addCusDialog = false;
        this.loader = false;
      },
      clearup(){
        this.user.name = '';
        this.user.owner = '';
        this.user.depots = '';
        this.user.phone = '';
      }
    }
  }
</script>
