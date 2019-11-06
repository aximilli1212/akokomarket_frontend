<template>
	<main>
		<v-snackbar
				:color="snackSet.color"
				:bottom="bottom"
				:top="top"
				:left="left"
				:right="right"
				v-model="snackbar"
				dark
		>
			<v-icon
					color="white"
					class="mr-3"
			>
				mdi-bell-plus
			</v-icon>
			<div><b class="font-weight-bold subheading">{{snackSet.status_msg}}. </b> {{snackSet.added_msg}}</div>
			<v-icon
					size="16"
					@click="snackbar = false"
			>
				mdi-close-circle
			</v-icon>
		</v-snackbar>
		<transition mode="out-in">
			<router-view/>
		</transition>
	</main>
</template>

<style lang="scss">
	@import "@/styles/index.scss";

	/* Remove in 1.2 */

	.v-datatable thead th.column.sortable i {
		vertical-align: unset;
	}
</style>
<script>
	import { mapMutations, mapGetters } from "vuex";

	// checks to see if auth jwt token is valid or has expired, if it gets back 401 error log out
	export default {
		data(){
			return{
				status_msg:"Success",
				added_msg:"Data successfully inserted.",
				snackbar:false,
				color:"primary",
				icon:"mdi-map",
				top:true,
				left:true,
				bottom:false,
				right:false,
			}
		},
		computed:{
			...mapGetters(["snackSet"]),
		},
		watch:{
			snackSet(){
				this.snackbar = true;
			},

		},
		created: function () {
			this.$http.interceptors.response.use( (response) => {
        return response;
      }, (error) => {
          if (401 === error.response.status) {
						if (this.$store.getters.authorized) {
							this.$store.dispatch('refreshtoken')
							}else {
              return Promise.reject(error);
          }

					} else {
              return Promise.reject(error);
          }
				});
		}
	};
</script>
