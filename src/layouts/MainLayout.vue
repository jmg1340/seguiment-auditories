<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="row justify-between">
        <q-toolbar class="col bg-brown-10">
          <!-- <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          /> -->

          <q-toolbar-title>
            Seguiment auditories
          </q-toolbar-title>
          <q-space />
          <q-btn class="q-ma-xs" color="grey-4" dense text-color="black" icon="save"  @click="guardarLocalstorage"/>
          <q-btn class="q-ma-xs" color="grey-4" dense text-color="black" label="Exportar" noCaps  @click="exportar"/>
          <q-btn class="q-ma-xs" color="grey-4" dense text-color="black" label="Importar" noCaps  @click="activarImportacio=true"/>
          <!-- <div>Quasar v{{ $q.version }}</div> -->
        </q-toolbar>
        
<!--         
        <div class="col-3 col-sm-12">
          <div class="row justify-around q-ma-md">
            <div class="col text-right">
              <q-btn color="grey-4" dense text-color="black" icon="save"  @click="guardarLocalstorage"/>
            </div> 
            <div class="col text-right"> 
              <q-btn color="grey-4" dense text-color="black" label="Exportar" noCaps  @click="exportar"/>
            </div>
            <div class="col text-right"> 
              <q-btn color="grey-4" dense text-color="black" label="Importar" noCaps  @click="activarImportacio=true"/>
            </div>
          </div>
        </div>
 -->

      </div>


    </q-header>




    <q-dialog v-model="activarImportacio" persistent>
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section class="col items-start">
          <q-input class="col q-mb-md bg-grey-3" type="textarea" color="brown" label-color="negative"  v-model="txtJSON" hint="Enganxa contingut fitxer JSON" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Ok" color="primary" v-close-popup @click="importarJSON"/>
        </q-card-actions>
      </q-card>
    </q-dialog>






    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import { exportFile } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  created () {
    if(this.$q.platform.is.electron) {
      //debugger
      //this.$q.electron.webFrame.context.menubar.visible = false
      // const { BrowserWindow } = require('electron')
      // const win = new BrowserWindow()
      // win.setMenuBarVisibility(false)
    }
  },

  data () {
    return {
      activarImportacio: false,
      txtJSON: "",

    }
  },

  methods:{
    guardarLocalstorage: function(){
      let objNotify

      if (this.$q.platform.is.electron) {
        try {
          console.log("la plataforma SI es ELECTRON")
          const Store = require('electron-store');
          const store = new Store();

          store.set('seg_auditories',  {
            auditories: JSON.stringify(this.$store.state.example.auditories)
          });
          objNotify = {color: "green-10", missatge: "Dades guardades a localstorage"}
          
        } catch (error) {
          objNotify = {color: "red-10", missatge: error.toString()}
        }

      } else {
        try {
          this.$q.localStorage.set("seg_auditories", {
            auditories: JSON.stringify(this.$store.state.example.auditories)
          })
          objNotify = {color: "green-10", missatge: "Dades guardades a localstorage"}
          
        } catch (error) {
          objNotify = {color: "red-10", missatge: error.toString()}
        }
      }


      this.$q.notify({
        color: objNotify.color,
        textColor: "white",
        icon: "",
        message: objNotify.missatge,
        position: "top-right",
        timeout: 1000
      })      
    },

    exportar: function(){
      const status = exportFile('seguiment_auditories.json', JSON.stringify(this.$store.state.example.auditories))
      let statusColor, statusText
      
      if (status === true) {
        statusColor = "green-10"
        statusText = "fitxer 'seguiment_auditories.json' generat i descarregat"
      }
      else {
        statusColor = "red-10"
        statusText = "Algo no ha anat bé: " + status
      }

      this.$q.notify({
        color: statusColor,
        textColor: "white",
        icon: "",
        message: statusText,
        position: "top-right",
        timeout: 2000
      })      
    },

    importarJSON: function(){
      let arr = JSON.parse(this.txtJSON)
      //alert(Array.isArray(arr))
      this.$store.commit("example/mutImportarJSON", arr);
      this.txtJSON = ""
    }

  }
}
</script>
