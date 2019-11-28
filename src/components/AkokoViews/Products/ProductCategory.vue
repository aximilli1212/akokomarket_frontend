<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
    <!--    ADD CUSTOMER DIALOG-->
    <v-dialog v-model="addCategoriesDialog" persistent max-width="600px">
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
                          v-model="categories.name"
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
                  @click="onCategoriesAdd"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"
          ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>
          <v-btn
                  v-if="editIndex"
                  @click="onCategoriesEdit"
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
        <v-btn class="grey darken-1" @click="addCategories"><v-icon left>mdi-account-plus</v-icon> Add Categories</v-btn>
        <material-card
                color="brown"
                :title="title"
                text="List of all categoriess"
        >
          <v-data-table
                  :headers="headers"
                  :items="categoriesList"
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
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.date_created }}</td>
              <td class="align-center">
                <v-btn small color="grey darken-1" @click="editCategories(item)"><v-icon>mdi-pencil</v-icon>Edit</v-btn>
                <!--                <v-btn small color="red darken-1" @click="onDeleteCategories(item)"><v-icon>mdi-delete</v-icon>Delete</v-btn>-->
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
    name:'ProductCategories',
    data: () => ({
      dialogTitle:"Add New Categories",
      btnTitle:"Add New Categories",
      editIndex:0,
      categories:{
        name:'',
      },
      valid:true,
      addCategoriesDialog:false,
      loader:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Category Name', align: 'left', value: 'name',class:'subheading',sortable:false },
        { text: '', value: 'actions',class:'subheading' },
      ],
      singleCategories:{},
    }),
    computed: {
      title(){
        return "All Categories ("+this.categoriesList.length+")";
      },
      ...mapGetters(["categoriesList","btn_loader"]),
    },
    mounted(){
     this.getCat();
    },
    methods:{
      ...mapMutations(['setSnack']),
      getCat(){
        let self = this;
        this.loader = true;
        this.$store.dispatch('getCategoriesList').then(response =>{
           self.loader = false;
           console.log(response);
        }).catch(err=>{
          console.log(err);
        });
      },
      addCategories(){
        this.clear();
        this.addCategoriesDialog = true;
      },
      onCategoriesAdd(){
       this.categories.product_id = this.$store.getters.activeProd.id;
        this.loader = true;
        this.$store.dispatch('addCategories',this.categories)
                .then(() => {
                  this.closeup();
                  this.getCat();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Categories successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.closeup();
                          this.loader = false;
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      onCategoriesEdit(){
        this.loader = true;
        this.$store.dispatch('editCategories',this.categories)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Categories successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.loader = false;
                          this.closeup();
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      editCategories(payload){
        this.categories = payload;
        this.dialogTitle = "Edit Categories";
        this.btnTitle = "Edit Categories";
        this.addCategoriesDialog = true;
        this.editIndex = 1;
      },
      onDeleteCategories(payload){

        let go = confirm('Are you sure you want to delete this sell categories?')
        if(go){
          this.categories = payload;
          this.loader = true;
          this.$store.dispatch('deleteSellCategories',this.categories)
                  .then(() => {
                    this.closeup();
                    this.loader = false;
                    this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Categories successfully Deleted." })
                  })
                  .catch(err => {
                            console.log(err)
                            this.loader = false;
                            this.closeup();
                            this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not delete data." })
                          })}
      },
      closeup(){
        this.addCategoriesDialog = false;
        this.dialogTitle = "Add Categories";
        this.btnTitle = "Add Categories";
      },

      clear(){
        this.editIndex = 0;
        this.categories.name = '';
      },
    }
  }
</script>
