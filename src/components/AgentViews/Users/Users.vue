<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
    <!--    ADD CUSTOMER DIALOG-->
    <v-dialog v-model="addUserDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar >
          <v-toolbar-title class="primary--text">{{dialogTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>


          <v-btn icon @click.native="closeup">
            <v-icon color="grey darken-1">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>



          <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container grid-list-md elevation-3>
                      <v-layout wrap >

                          <v-flex xs12 sm4 md4>
                              <v-text-field
                                      box
                                      label="Username"
                                      v-model="user.username"
                                      prepend-icon="mdi-account"
                                      v-validate="'required'"
                                      data-vv-name="username"
                                      :error-messages="errors.collect('username')"
                              ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm4 md4>
                              <v-text-field
                                      box
                                      label="First Name"
                                      v-model="user.first_name"
                                      prepend-icon="mdi-account"
                                      v-validate="'alpha_spaces|required'"
                                      data-vv-name="firstname"
                                      :error-messages="errors.collect('firstname')"
                              ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                              <v-text-field
                                      box
                                      label="Last Name"
                                      v-model="user.last_name"
                                      prepend-icon="mdi-account"
                                      v-validate="'alpha_spaces|required'"
                                      data-vv-name="lastname"
                                      :error-messages="errors.collect('lastname')"
                              ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm6 md6>
                              <v-text-field
                                      dense
                                      label="Phone Number"
                                      outlined
                                      v-model="user.phone"
                                      data-vv-name="phone"
                                      return-masked-value
                                      box
                                      :rules="[rules.phone]"
                                      counter
                                      prepend-icon="mdi-phone"
                                      maxlength="10"
                                      mask="##########"
                                      hint="Phone number should be numeric and have 10 digits only"
                                      :error-messages="errors.collect('phone')"
                                      v-validate="'numeric|required'"
                                      required
                              ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-text-field
                                      box
                                      label="Email"
                                      v-model="user.email"
                                      prepend-icon="mdi-email"
                                      v-validate="'email|required'"
                                      data-vv-name="email"
                                      :error-messages="errors.collect('email')"
                              ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm6 md6>
                              <v-text-field
                                      box
                                      ref="password"
                                      name="password"
                                      label="Password"
                                      data-vv-name="password"
                                      data-vv-delay="300"
                                      min="6"
                                      v-validate="'required|min:6|max:100'"
                                      v-model="user.password"
                                      :error-messages="errors.collect('password')"
                                      hint="Password should be a minimum of 6 characters"
                                      prepend-icon="lock"
                                      :append-icon="isPasswordVisible ? 'visibility' : 'visibility_off'"
                                      :append-icon-cb="() => (isPasswordVisible = !isPasswordVisible)"
                                      :type="isPasswordVisible ? 'text' : 'password'"
                              ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm6 md6>
                              <v-text-field
                                      box
                                      label="Confirm Password"
                                      data-vv-name="password_confirmation"
                                      data-vv-delay="300"
                                      target= "password"
                                      v-validate="'required|confirmed:password'"
                                      v-model="user.c_password"
                                      :error-messages="errors.collect('password_confirmation')"
                                      prepend-icon="lock"
                                      :append-icon="isPasswordVisible2 ? 'visibility' : 'visibility_off'"
                                      :append-icon-cb="() => (isPasswordVisible2 = !isPasswordVisible2)"
                                      :type="isPasswordVisible2 ? 'text' : 'password'"
                              ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm6 md6>
                              <v-select
                                      box
                                      v-model="user.account_type"
                                      :items="acc_types"
                                      label="Account Type"
                                      prepend-icon="mdi-home-variant"
                                      persistent-hint
                                      offset-y
                                      v-validate="'required'"
                                      data-vv-name="account_type"
                                      :error-messages="errors.collect('account_type')"
                              ></v-select>
                          </v-flex>

                          <v-flex xs12 sm6 md6>
                          <v-select
                                  box
                          v-model="company_obj"
                          :items="companyList"
                          item-text="name"
                          item-value="id"
                          label="Select Company"
                          prepend-icon="mdi-home-variant"
                          persistent-hint
                          return-object
                          offset-y
                                  v-validate="'required'"
                                  data-vv-name="company"
                                  :error-messages="errors.collect('company')"
                          ></v-select>
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
                      class="subheading font-weight-bold primary--text"
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
    $_veeValidate: {
      validator: 'new'
    },
    name:'Users',
    data: () => ({
      dialogTitle:"Add New User",
      btnTitle:"Add New User",
      editIndex:0,
      company_obj:'',
      user:{
        username:'',
        first_name:'',
        password:'',
        c_password:'',
        phone:'',
        email:'',
        account_type:'',
        enable_notifications:1,

      },
      acc_types:['admin','agent'],
      companys:[
        {name:"Agroinnova", id:1},
        {name:"Joma Poultry ", id:2},
      ],
      isPasswordVisible: false,
      isPasswordVisible2: false,
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
      rules: {
        phone: value => value.length <= 10 || 'Phone no. cant be more than 10 numbers',
      },
      singleUser:{},
    }),
    computed: {
      title(){
        return "All Users ("+this.userList.length+")";
      },
      ...mapGetters(["userList","btn_loader","companyList"]),
    },
    mounted(){
      this.getUsers();
      this.$store.dispatch('getCompanyList');
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
        let userObj = {
          ...this.user,company_id:this.company_obj.id
        }
        let self = this;
        this.loader = true;

        this.$validator.validateAll().then((result)=>{
          if(result){
            this.$store.dispatch('addUser',userObj)
              .then(() => {
                this.closeup();
                this.loader = false;
                self.$validator.reset();
                this.getUsers();
                this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"User successfully inserted." })
              })
              .catch(err => {
                console.log(err)
                this.closeup();
                this.loader = false;
                this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

              })
          }else{
            this.loader = false;
            this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Please correct form errors." })
          }

        })


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
        this.$validator.reset();
      },
      clear(){
        this.editIndex = 0;
        this.user.first_name = '';
        this.user.last_name = '';
        this.user.email = '';
        this.user.phone = '';
        this.user.password = '';
        this.user.c_password = '';
        this.user.account_type = '';
      },
    }
  }
</script>
