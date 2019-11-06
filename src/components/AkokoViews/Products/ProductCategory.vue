<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
    <!--    ADD CUSTOMER DIALOG-->
    <v-dialog v-model="addSurveyDialog" persistent max-width="600px">
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

                <v-flex xs6 sm6 md6>
                  <v-text-field

                          label="Name"
                          v-model="survey.name"
                          prepend-inner-icon="mdi-account"
                          box
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                          label="Phone"
                          v-model="survey.phone"
                          prepend-inner-icon="mdi-phone"
                          box
                  ></v-text-field>
                </v-flex>

                <v-flex xs6 sm6 md6>
                  <v-text-field
                          label="Location"
                          v-model="survey.location"
                          prepend-inner-icon="mdi-map-marker"
                          box
                  ></v-text-field>
                </v-flex><v-flex xs6 sm6 md6>
                <v-text-field
                        label="Occupation"
                        v-model="survey.occupation"
                        prepend-inner-icon="mdi-briefcase"
                        box
                ></v-text-field>
              </v-flex><v-flex xs4 sm4 md4>
                <v-select
                        label="Product"
                        :items="products"
                        v-model="survey.product"
                        prepend-inner-icon="mdi-tag-outline"
                        box
                ></v-select>
              </v-flex><v-flex xs4 sm4 md4>
                <v-select
                        label="Production Type"
                        :items="production_types"
                        v-model="survey.production_type"
                        prepend-inner-icon="mdi-bookmark"
                        box
                ></v-select>
              </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                          label=" Capacity"
                          v-model="survey.production_capacity"
                          prepend-inner-icon="mdi-pound"
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
                  @click="onSurveyAdd"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"
          ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>
          <v-btn
                  v-if="editIndex"
                  @click="onSurveyEdit"
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
        <v-btn class="grey darken-1" @click="addSellSurvey"><v-icon left>mdi-account-plus</v-icon> Add Sell Survey</v-btn>
        <material-card
                color="primary"
                :title="title"
                text="List of all sell surveys"
        >
          <v-data-table
                  :headers="headers"
                  :items="surveyList"
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
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.occupation }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.date_created }}</td>
              <td class="align-center">
                <v-btn small color="grey darken-1" @click="editSurvey(item)"><v-icon>mdi-pencil</v-icon>Edit</v-btn>
                <v-btn small color="red darken-1" @click="onDeleteSurvey(item)"><v-icon>mdi-delete</v-icon>Delete</v-btn>
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
    name:'SellSurveys',
    data: () => ({
      dialogTitle:"Add New Survey",
      btnTitle:"Add New Survey",
      editIndex:0,
      survey:{
        name:'',
        phone:'',
        location:'',
        product:'',
        occupation:'',
        production_type:'',
        production_capacity:'',
      },
      products:['Egg','Chicken'],
      production_types:['Feed','Broilers'],
      valid:true,
      addSurveyDialog:false,
      loader:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Name', align: 'left', value: 'name',class:'subheading',sortable:false },
        { text: 'Phone No.', align: 'left', value: 'phone',class:'subheading',sortable:false },
        { text: 'Product', align: 'left', value: 'prouct',class:'subheading' },
        { text: 'Occupation', align: 'left', value: 'occupation',class:'subheading' },
        { text: 'Location', align: 'left', value: 'location',class:'subheading' },
        { text: 'Time', align: 'left', value: 'date_created',class:'subheading' },
        { text: '', value: 'actions',class:'subheading' },
      ],
      singleSurvey:{},
    }),
    computed: {
      title(){
        return "All Sell Surveys ("+this.surveyList.length+")";
      },
      ...mapGetters(["surveyList","btn_loader"]),
    },
    mounted(){
      this.$store.dispatch('getSellSurveyList');
    },
    methods:{
      ...mapMutations(['setSnack']),
      addSellSurvey(){
        this.clear();
        this.addSurveyDialog = true;
      },
      onSurveyAdd(){
        this.loader = true;
        this.$store.dispatch('addSellSurvey',this.survey)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Sell Survey successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.closeup();
                          this.loader = false;
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      onSurveyEdit(){
        this.loader = true;
        this.$store.dispatch('editSellSurvey',this.survey)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Sell Survey successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.loader = false;
                          this.closeup();
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      editSurvey(payload){
        this.survey = payload;
        this.dialogTitle = "Edit Survey";
        this.btnTitle = "Edit Survey";
        this.addSurveyDialog = true;
        this.editIndex = 1;
      },
      onDeleteSurvey(payload){

        let go = confirm('Are you sure you want to delete this sell survey?')
        if(go){
          this.survey = payload;
          this.loader = true;
          this.$store.dispatch('deleteSellSurvey',this.survey)
                  .then(() => {
                    this.closeup();
                    this.loader = false;
                    this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Sell Survey successfully Deleted." })
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
        this.addSurveyDialog = false;
        this.dialogTitle = "Add Survey";
        this.btnTitle = "Add Survey";
      },
      clear(){
        this.editIndex = 0;
        this.survey.name = '';
        this.survey.location = '';
        this.survey.phone = '';
        this.survey.product = '';
        this.survey.occupation = '';
        this.survey.production_capacity = '';
        this.survey.production_type = '';
      },
    }
  }
</script>
