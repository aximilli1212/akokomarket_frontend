<template>
  <v-container
          fill-height
          fluid
          grid-list-xl
  >
    <!--    ADD CUSTOMER DIALOG-->
    <v-dialog v-model="addProductDialog" persistent max-width="600px">
      <v-card>
        <v-toolbar>
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
                          v-model="product.name"
                          prepend-inner-icon="mdi-account"
                          box
                  ></v-text-field>
                </v-flex> <v-flex xs12 sm12 md12>
                  <v-select
                          item-text="name"
                          item-value="id"
                          return-object
                          filled
                          clearable
                          :items="productList"
                          label="Product Type"
                          v-model="product.product"
                          prepend-inner-icon="mdi-map"
                          box
                  ></v-select>
                </v-flex> <v-flex xs12 sm12 md12>
                  <v-select
                          item-text="name"
                          item-value="id"
                          filled
                          clearable
                          return-object
                          :items="categoriesList"
                          label="Category"
                          v-model="product.category"
                          prepend-inner-icon="mdi-at"
                          box
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                          label="Price(GHS)"
                          v-model="product.price"
                          prepend-inner-icon="mdi-cash-multiple"
                          box
                  ></v-text-field>
                </v-flex>
<!--                <v-flex xs12 sm12 md12>-->
<!--                  <v-select-->
<!--                          :items="pack_units"-->
<!--                          label="Pack Units"-->
<!--                          v-model="product.pack"-->
<!--                          prepend-inner-icon="mdi-account"-->
<!--                          box-->
<!--                  ></v-select>-->
<!--                </v-flex>-->
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
                  @click="onProductAdd"
                  color="grey"
                  :loading="loader"
                  :disabled="loader"
          ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>
          <v-btn
                  v-if="editIndex"
                  @click="onProductEdit"
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
        <v-btn class="grey darken-1" @click="addProduct"><v-icon left>mdi-account-plus</v-icon> Add Product</v-btn>

        <material-card
                color="primary"
                :title="title"
                text="List of all products"
        >
          <v-data-table
                  :loading="loader"
                  :headers="headers"
                  :items="agentProductList"
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
              <td>{{ item.product_name }}</td>
              <td>{{ item.type_name }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
<!--              <td>{{ item.pack }}</td>-->
              <td>{{ item.date_created }}</td>

              <td class="align-center">
                <v-btn round small color="grey darken-1" @click="editProduct(item)"><v-icon left>mdi-pencil</v-icon>Edit</v-btn>
<!--                <v-btn small color="red darken-1" @click="onDeleteProduct(item)"><v-icon>mdi-delete</v-icon>Delete</v-btn>-->
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
    name:'AgentProducts',
    data: () => ({
      dialogTitle:"Add New Product",
      btnTitle:"Add New Product",
      editIndex:0,
      loader:false,
      product:{
        name:'',
        type_name:'',
        category:{},
        price:'',
        product:'',
        pack:'',
        date:'',
        type:{},
      },
      pack_units:[
              'Crate',
              '15 set carton',
      ],
      valid:true,
      addProductDialog:false,
      headers: [
        { text: 'ID', align: 'left', value: 'id',class:'subheading',sortable:false },
        { text: 'Name', align: 'left', value: 'product_name',class:'subheading',sortable:false },
        { text: 'Product Type', align: 'left', value: 'type',class:'subheading',sortable:false },
        { text: 'Category', align: 'left', value: 'category_name',class:'subheading',sortable:false },
        { text: 'Price (GHS)', align: 'left', value: 'price',class:'subheading',sortable:false },
        { text: 'Quantity', align: 'left', value: 'quantity',class:'subheading',sortable:false },
        // { text: 'Pack Units', align: 'left', value: 'unit',class:'subheading',sortable:false },
        { text: 'Date Added', align: 'left', value: 'date_created',class:'subheading',sortable:false },
        { text: '', value: 'actions',class:'subheading' },
      ],
      singleProduct:{},
    }),

    computed: {
      title(){
        return "All Products ("+this.agentProductList.length+")";
      },
      prodId(){
        return this.product.type;
      },
      ...mapGetters(["agentProductList","productList","btn_loader","categoriesList"]),
    },
    watch:{
      prodId(val){
        console.log(val);
        this.viewCat({id:val.id});
      }
    },
    mounted(){
      this.$store.dispatch('getAgentProductList',{cid:this.cid});
      this.$store.dispatch('getProductList');
    },
    methods:{
      viewCat(item){
        this.$store.commit("setProd",item);
        this.$store.dispatch('getCategoriesList');
      },
      addProduct(){
        this.clear();
        this.addProductDialog = true;
      },
      onProductAdd(){
        this.loader = true;
        let agentProduct = {
          product_name: this.product.product_name,
          product_id: this.product.product.id,
          category_id: this.product.category.id,
          price: this.product.price,
          quantity: this.product.quantity,
          company_id: this.cid,
        }

        this.$store.dispatch('addAgentProduct',agentProduct)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Product successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.closeup();
                          this.loader = false;
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      onProductEdit(){
        this.loader = true;
        this.$store.dispatch('editProduct',this.product)
                .then(() => {
                  this.closeup();
                  this.loader = false;
                  this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Product successfully inserted." })
                })
                .catch(err => {
                          console.log(err)
                          this.loader = false;
                          this.closeup();
                          this.$store.commit('setSnack',{color:"error",status_msg:"Error", added_msg:"Could not insert data." })

                        }
                )
      },
      editProduct(payload){
        this.product = payload;
        this.product.category = payload.categorySet;
        this.product.product = payload.productSet;
        this.dialogTitle = "Edit Product";
        this.btnTitle = "Edit Product";
        this.addProductDialog = true;
        this.editIndex = 1;
      },
      onDeleteProduct(payload){

        let go = confirm('Are you sure you want to delete this sell product?')
        if(go){
          this.product = payload;
          this.loader = true;
          this.$store.dispatch('deleteSellProduct',this.product)
                  .then(() => {
                    this.closeup();
                    this.loader = false;
                    this.$store.commit('setSnack',{color:"green",status_msg:"Success", added_msg:"Product successfully Deleted." })
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
        this.addProductDialog = false;
        this.dialogTitle = "Add Product";
        this.btnTitle = "Add Product";
      },
      clear(){
        this.editIndex = 0;
        this.product.name = '';
      },
    }
  }
</script>
