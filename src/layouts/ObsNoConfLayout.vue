<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-indigo-10">

				<div class="row items-center ">
					<div class="col-1"></div>
          <div class="col">
						<div class="row text-center ">	
							<div class="col">
								<q-chip square dense color="blue-1" text-color="black">
									CA:   &nbsp; <span style="color: red; font-weight: bold">{{ auditoria.centre }} </span>
								</q-chip>
							</div>

						
							<div class="col">
								<q-chip square dense color="blue-1" text-color="black">
									Data auditoria:  &nbsp; <span style="color: red; font-weight: bold">{{ auditoria.dataAuditoria }} </span>
								</q-chip>
							</div>
						</div>
					</div>


          <div class="col-1 q-ma-md text-right"> 
            <q-btn color="grey-4" dense text-color="black" icon="exit_to_app"  @click="tornar"/>
          </div>

					
				</div>


      <!-- <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

      </q-toolbar> -->


    </q-header>


<!-- 
    <q-drawer
      v-model="leftDrawerOpen"
      
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
 -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>



<style scoped>
	.borde{
		border: 1px solid red;
	}
</style>



<script>
import EssentialLink from 'components/EssentialLink'

export default {
	name: 'MainLayout',
	
	props: ["idxAuditoria"],
	
  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
    }
	},
	methods:{
    tornar: function(){
      //debugger
      this.$router.push({ path: '/' })
    }, 
  },
	computed: {
		auditoria: function(){
			return this.$store.state.example.auditories[this.idxAuditoria]
		},

	}
}
</script>
