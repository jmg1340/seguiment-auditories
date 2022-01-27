<template>
  <div>
    <q-card class="">
      <q-card-section class="column">
        <div class="row inline nowrap" v-if="editar">
          
          <div class="col-1">
            <q-input type="number" square outlined v-model="campNumero" stack-label label="Num."/>
          </div>
          <div class="col-2">
          <q-input
            class="col q-mb-md"
            v-model="campDataAM"
            stack-label
            label-color="negative"
            filled
            type="date"
            label="Data A. Mejora"
          />
          </div>
          <div class="col">
            <q-input type="textarea" square outlined v-model="campText" stack-label label="Text"/>
          </div>
          <div class="col-2">
            <q-select standout v-model="campEstat" :options="['pendent', 'suspes', 'finalitzat']" label="Estat" />
          </div>
          <div class="col-1">
            <q-btn color="green" text-color="black" icon="done" dense @click="editar=false"/>
          </div>
        </div>
        
        <div class="row inline nowrap shadow-8" v-else>
          <div class="col-auto q-pa-sm borde text-red text-h6 text-weight-bold">{{ campNumero }}</div>
          <div class="col-auto borde   q-pa-sm">
						<div> Data A. Mejora: <span class="text-weight-bold">{{ campDataAM }}</span> </div>
						<div> Data límit: <span class="text-weight-bold text-red">{{dataLimitAM(campDataAM)}}</span> </div>	
						<q-card class="text-center bordered bg-brown-2">{{diferenciaDataAM(campDataAM)}}</q-card>
					</div>
          <div class="col borde  text-weight-bold q-pa-sm">{{ campText }}</div>
          <div class="col-1 borde text-center">
            <q-badge v-if="campEstat == 'finalitzat'" color="green-9" class="q-pm-sm" >{{campEstat}}</q-badge>
            <q-badge v-else-if="campEstat == 'suspes'" color="orange" class="q-pm-sm">{{campEstat}}</q-badge>
            <q-badge v-else color="red" class="q-pm-sm">{{campEstat}}</q-badge>
          </div>
          <div class="col-1 borde">
            <div class="row   q-gutter-xs q-pa-xs">
              <q-btn class="col" color="grey-5" text-color="black" icon="edit" dense @click="editar=true"/>
              <q-btn class="col" color="red-4" text-color="black" icon="delete" dense @click="eliminarON"/>
            </div>
          </div>
        </div>
      </q-card-section>


      <q-card-section>
        <div class="row q-mb-lg">
          <q-btn color="blue-2" text-color="black" icon="note_add" label="Nou registre" noCaps dense @click="nouSEG"/>
        </div>
        <div class="q-gutter-y-xs">
            <div v-for="(registre, index) in arrSeguiments" :key="`seg_${index}`">
                <cmp_regSEG :idxAuditoria="idxAuditoria" :idxObsNoConf="idxObsNoConf" :idxSeg="registre.index"/>
            </div>
        </div>

      </q-card-section>

    </q-card>


    <q-dialog v-model="activarFormulariSEG" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="col items-start">
          <div class="row q-gutter-x-md justify-between">
            <q-input class="col q-mb-md" v-model="txtData" label="Data" type="date" color="brown" stack-label label-type="" label-color="negative" filled />
            <q-input class="col q-mb-md" v-model="txtDiesAvis" label="Dies Avis" type="number" color="brown" stack-label label-color="negative" filled />
          </div>
          <q-input class="col q-mb-md" v-model="txtText" label="Text" type="textarea" color="brown" stack-label label-color="negative" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Ok" color="primary" v-close-popup @click="afegirSEG"/>
        </q-card-actions>
      </q-card>
    </q-dialog>




  </div>


</template>

<script>
import moment from 'moment';
import cmp_regSEG from "./registreSeguiments"

export default {
  components: { cmp_regSEG },

  props: ["idxAuditoria", "idxObsNoConf"],

  created () {
  },

  data() {
    return {
      editar: false,

      activarFormulariSEG: false,
      txtData: null,
      txtText: null,
      txtDiesAvis: null,
    };
  },

  computed: {
		arrSeguiments: function(){
			return this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].seguiment.map((val,idx) => ({...val, index: idx})).reverse()
		},



    campNumero: {
			get() {
        return this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].numero
      },
			set (value) {
				this.$store.commit( 'example/updateCampNumero', { idxAuditoria: this.idxAuditoria, idxObsNoConf: this.idxObsNoConf, valor: value})
      }
		},
  
    campDataAM: {
			get() {
        return this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].dataAM
      },
			set (value) {
				this.$store.commit( 'example/updateCampDataAM', { idxAuditoria: this.idxAuditoria, idxObsNoConf: this.idxObsNoConf, valor: value})
      }
		},
  
    campText: {
			get() {
        return this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].text
      },
			set (value) {
				this.$store.commit( 'example/updateCampText', { idxAuditoria: this.idxAuditoria, idxObsNoConf: this.idxObsNoConf, valor: value})
      }
		},
  
    campEstat: {
			get() {
        return this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].estat
      },
			set (value) {
				this.$store.commit( 'example/updateCampEstat', { idxAuditoria: this.idxAuditoria, idxObsNoConf: this.idxObsNoConf, valor: value})
      }
		},
  
  
  },

  methods:{
		nouSEG: function(){
      this.txtData = null
      this.txtText = null
      this.txtDiesAvis = 30
      this.activarFormulariSEG = true
		},

    afegirSEG: function(){
      this.$store.commit( 'example/mutNouSEG', 
        { 
          objSEG: {
            data: this.txtData,
            text: this.txtText,
            diesAvis: this.txtDiesAvis
          },
          idxAuditoria: this.idxAuditoria, 
          idxObsNoConf: this.idxObsNoConf
        })
    },


    eliminarON: function(idx){
      let on = this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].on
      let on2 = (on =="o")? "OBSERVACIO " : "MILLORA "

      this.$q.dialog({
        title: 'Confirm',
        message: 'Eliminar ' + on2 + this.campNumero + '?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.eliminarON2(idx)

      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    },
    
    
    eliminarON2: function (idx) {
      // trobar l'index de l'array obs_noConf on el valor sigui l'objecte del registre
      let objReg = {
        on:     this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].on,
        numero: this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].numero,
        text:   this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].text,
        estat:  this.$store.state.example.auditories[this.idxAuditoria].obs_noConf[this.idxObsNoConf].estat
      }
      console.log("objReg:")
      console.log(objReg)
      console.log("------------------")
      // busquem quin index te a l'array obs_noConf
      let idxON = this.$store.state.example.auditories[this.idxAuditoria].obs_noConf.findIndex(function(obj){
        return (obj.on == objReg.on) && (obj.numero == objReg.numero) && (obj.text == objReg.text) && (obj.estat == objReg.estat)
      })
      console.log("idxON: " + idxON)

      if (idxON != -1){
        this.$store.commit( 'example/mutEliminarON', {idxON, idxAuditoria: this.idxAuditoria})
      } else {
        console.log("No s'ha trobat index")
      }
        
    },

		dataLimitAM (dAM) {
			// la data limit d'una Accio de Millora crec que son de 6 mesos.
			// per tant, la data limit serà la dataAM (d) + 6 mesos
			return (dAM== "" || dAM== null) ? null : moment(dAM).add(6, 'months').format('YYYY-MM-DD');
		},

		diferenciaDataAM (dAM) {
			var fechaInicio = moment();
			var fechaFin    = moment(this.dataLimitAM(dAM))

			var difDias =  fechaFin.diff(fechaInicio, 'days')
			console.log("difDias", difDias)

			if (dAM == null || dAM=="")          return ""
			if (difDias < 0 )                    return "Fora de termini en " + Math.abs(difDias) + " dies !!"
			if (difDias >= 0  && difDias <= 30)  return "Falta menys d'un mes!! (" + Math.abs(difDias) + " dies)"
			if (difDias > 30 )                   return "Falten " + Math.abs(difDias) + " dies !!"
		}

  }
};
</script>


<style>
.borde {
  border: 1px solid rgb(146, 146, 146);
}
</style>