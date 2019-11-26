<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
    <!--    ADD CUSTOMER DIALOG-->
    <v-dialog v-model="addUserDialog" persistent max-width="600px">
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

                          label="Name"
                          v-model="user.name"
                          prepend-inner-icon="mdi-account"
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
                  v-if="!editIndex"
                  @click="onUserAdd"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"
          ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>
          <v-btn
                  v-if="editIndex"
                  @click="onUserEdit"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"
          ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>

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
        <v-btn class="grey darken-1" @click="addUser"><v-icon left>mdi-account-plus</v-icon> Add User</v-btn>
        <v-btn outline round class="grey darken-1 ml-5" color="black" @click="addRole"><v-icon left>mdi-plus</v-icon> Add User Roles</v-btn>
        <material-card
                color="primary"
                :title="title"
                text="List of all users"
        >
          <v-data-table
                  :headers="headers"
                  :items="userList"
                  color="black"
          >
            <template
                    slot="headerCell"
                    slot-scope="{ header }"
            >
              <span
                      class="subheading font-weight-light text-warning text--darken-3"
                      v-text="header.text"
              ></span>
            </template>
            <template
                    slot="items"
                    slot-scope="{ item }"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.first_name }}</td>
              <td>{{ item.last_name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.account_type }}</td>
              <td>{{ item.date_created }}</td>
              <td class="align-center">
<!--                <v-btn round small color="grey darken-1" @click="editUser(item)"><v-icon left>mdi-pencil</v-icon>Edit</v-btn>-->
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
    name:'Users',
    data: () => ({
      dialogTitle:"Add New User",
      btnTitle:"Add New User",
      editIndex:0,
      user:{
        name:'',
      },
      users:['Egg','Chicken'],
      Userion_types:['Feed','Broilers'],
      valid:true,
      addUserDialog:false,
      loader:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Username', align: 'left', value: 'username',class:'subheading',sortable:false },
        { text: 'Firstname', align: 'left', value: 'first_name',class:'subheading',sortable:false },
        { text: 'Lastname', align: 'left', value: 'last_name',class:'subheading',sortable:false },
        { text: 'Email', align: 'left', value: 'email',class:'subheading',sortable:false },
        { text: 'Phone No.', align: 'left', value: 'phone',class:'subheading',sortable:false },
        { text: 'Account Type', align: 'left', value: 'account_type',class:'subheading',sortable:false },
        { text: 'Date Added', align: 'left', value: 'date_added',class:'subheading',sortable:false },
        { text: '', value: 'actions',class:'subheading' },
      ],
      singleUser:{},
    }),
    computed: {
      title(){
        return "All Users ("+this.userList.length+")";
      },
      ...mapGetters(["userList","btn_loader"]),
    },
    mounted(){
      this.getUsers();
    },
    methods:{
      addRole(){

      },
      getUsers(){
        let self = this;
        this.loader = true;
        this.$store.dispatch('getUserList').then(response =>{
          self.loader = false;
          console.log(response);
        }).catch(err=>{
          console.log(err);
        });
      },
      viewCat(item){
        this.$store.commit("setProd",item);
        this.$router.push("user_category");
      },
      addUser(){
        this.clear();
        this.addUserDialog = true;
      },
      onUserAdd(){
        this.loader = true;
        this.$store.dispatch('addUser',this.user)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"User successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.closeup();
                          this.loader = false;
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      onUserEdit(){
        this.loader = true;
        this.$store.dispatch('editUser',this.user)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"User successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.loader = false;
                          this.closeup();
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      editUser(payload){
        this.user = payload;
        this.dialogTitle = "Edit User";
        this.btnTitle = "Edit User";
        this.addUserDialog = true;
        this.editIndex = 1;
      },
      onDeleteUser(payload){

        let go = confirm('Are you sure you want to delete this sell user?')
        if(go){
          this.user = payload;
          this.loader = true;
          this.$store.dispatch('deleteSellUser',this.user)
                  .then(() => {
                    this.closeup();
                    this.loader = false;
                    this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"User successfully Deleted." })
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
        this.addUserDialog = false;
        this.dialogTitle = "Add User";
        this.btnTitle = "Add User";
      },
      clear(){
        this.editIndex = 0;
        this.user.name = '';
      },
    }
  }
</script>
