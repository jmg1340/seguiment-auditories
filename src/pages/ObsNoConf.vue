<template>
  <q-page class="q-pa-md">
    <div class="column">
      <!--             
					<div class="row justify-center q-mb-md">	
						<div class="col-md-8 col-12 bg-grey-3">
							<div class="row justify-between">
                <div class="col">
                    Centre: <span class="text-weight-bold text-red"> {{ auditoria.centre }} </span>
                </div>
                <div class="col text-right">
                    Data: <span class="text-weight-bold text-red"> {{ auditoria.dataAuditoria }} </span>
                </div>
							</div>
            </div>
          </div>  
      -->
      <div class="row justify-center">
        <div class="col-md-8 col-12">
          <q-tabs
            v-model="tab"
            class="bg-grey-5 text-black shadow-5 rounded-bordered"
            active-color="white text-h6"
            active-bg-color="black"
            indicator-color="yellow-2"
            align="justify"
          >
            <q-tab name="observacions" label="Observacions">
            </q-tab>
            <q-tab name="accionsNoConformitat" label="No Conformitats">
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="bg-grey-4">
            <q-tab-panel name="observacions">
              <div class="row justify-between items-center">
                <div class="col">
                  <q-btn
                    class="col"
                    color="green-2"
                    text-color="black"
                    icon="note_add"
                    label="Nova observació"
                    noCaps
                    dense
                    @click="novaON('o')"
                  />
                </div>
                <q-space />
                <div class="col-8">
                  <q-card class="bg-lime-2 text-black">
                  <div class="row q-gutter-x-sm justify-center">
                    <q-radio class="col-auto" color="black" v-model="criteriObs" val="tots" >
                      Tots ({{ comptadorObs.totals }})
                    </q-radio>
                    <q-radio class="col-auto" color="black" v-model="criteriObs" val="pendents" >
                      Pendents ({{ comptadorObs.pendents }})
                    </q-radio>
                    <q-radio class="col-auto" color="black" v-model="criteriObs" val="finalitzats" >
                      Finalitzats ({{ comptadorObs.finalitzats }})
                    </q-radio>
                    <q-radio class="col-auto" color="black" v-model="criteriObs" val="suspesos" >
                      Suspesos ({{ comptadorObs.suspesos }})
                    </q-radio>
                  </div>
                  </q-card>
                </div>
              </div>

              <q-separator spaced color="brown" />

              <div>
                <div class="q-gutter-y-xl q-py-md ">
                  <div v-for="(registre, index) in arrObsNoConf" :key="`obs_${index}`">
                    <rON
                      v-if="criteriObs === 'tots' && registre.on === 'o'"
                      :idxAuditoria="idxAuditoria"
                      :idxObsNoConf="registre.index"
                    />
                    <rON
                      v-if="criteriObs === 'pendents' && registre.on === 'o' && registre.estat === 'pendent'"
                      :idxAuditoria="idxAuditoria"
                      :idxObsNoConf="registre.index"
                    />
                    <rON
                      v-if="criteriObs === 'finalitzats' && registre.on === 'o' && registre.estat === 'finalitzat'"
                      :idxAuditoria="idxAuditoria"
                      :idxObsNoConf="registre.index"
                    />
                    <rON
                      v-if="criteriObs === 'suspesos' && registre.on === 'o' && registre.estat === 'suspes'"
                      :idxAuditoria="idxAuditoria"
                      :idxObsNoConf="registre.index"
                    />
                  </div>
                </div>


              </div>
            </q-tab-panel>

            <q-tab-panel name="accionsNoConformitat">
              <div class="row justify-between items-center">
                <div class="col">
                  <q-btn
                    color="green-2"
                    text-color="black"
                    icon="note_add"
                    label="Nova no conformitat"
                    noCaps
                    dense
                    @click="novaON('n')"
                  />
                </div>

                <div class="col-8">
                  <q-card class="bg-lime-2 text-black">
                  <div class="row q-gutter-x-sm justify-center">
                    <q-radio class="col-auto" color="black" v-model="criteriNoC" val="tots" >
                      Tots ({{ comptadorNoConf.totals }})
                    </q-radio>
                    <q-radio class="col-auto" color="black" v-model="criteriNoC" val="pendents" >
                      Pendents ({{ comptadorNoConf.pendents }})
                    </q-radio>
                    <q-radio class="col-auto" color="black" v-model="criteriNoC" val="finalitzats" >
                      Finalitzats ({{ comptadorNoConf.finalitzats }})
                    </q-radio>
                    <q-radio class="col-auto" color="black" v-model="criteriNoC" val="suspesos" >
                      Suspesos ({{ comptadorNoConf.suspesos }})
                    </q-radio>
                  </div>
                  </q-card>
                </div>
              </div>

              <q-separator spaced color="brown" />
              
              <div class="q-gutter-y-md">
                <div v-for="(registre, index) in arrObsNoConf" :key="`nc_${index}`">
                  <!-- <rON
                    v-if="registre.on === 'n' && registre.estat === 'pendent' || registre.estat === amagarNoConfFinalitzades"
                    :idxAuditoria="idxAuditoria"
                    :idxObsNoConf="registre.index"
                  /> -->
                  <rON
                    v-if="criteriNoC === 'tots' && registre.on === 'n'"
                    :idxAuditoria="idxAuditoria"
                    :idxObsNoConf="registre.index"
                  />
                  <rON
                    v-if="criteriNoC === 'pendents' && registre.on === 'n' && registre.estat === 'pendent'"
                    :idxAuditoria="idxAuditoria"
                    :idxObsNoConf="registre.index"
                  />
                  <rON
                    v-if="criteriNoC === 'finalitzats' && registre.on === 'n' && registre.estat === 'finalitzat'"
                    :idxAuditoria="idxAuditoria"
                    :idxObsNoConf="registre.index"
                  />
                  <rON
                    v-if="criteriNoC === 'suspesos' && registre.on === 'n' && registre.estat === 'suspes'"
                    :idxAuditoria="idxAuditoria"
                    :idxObsNoConf="registre.index"
                  />

                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>



    <q-dialog v-model="activarFormulariON" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="col items-start">
          <q-input class="col q-mb-md" v-model="txtNumero" label="Numero" type="number" color="brown" stack-label label-type="" label-color="negative" filled />
          <q-input class="col q-mb-md" v-model="txtText" label="Text" type="textarea" color="brown" stack-label label-color="negative" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Ok" color="primary" v-close-popup @click="afegirON"/>
        </q-card-actions>
      </q-card>
    </q-dialog>






  </q-page>
</template>

<script>
import rON from "../components/registreObsNoConf";

export default {
  props: ["idxAuditoria"],

  components: { rON },

  created() {},

  data() {
    return {
      tab: "observacions",
      // amagarObsFinalitzades: "",
      // amagarNoConfFinalitzades: "",

      criteriObs: "pendents",
      criteriNoC: "pendents",

      activarFormulariON: false,
      txtNumero: null,
      txtText: null,
      txtOn: null,
    };
  },

  methods: {
    novaON: function(on) {
      this.txtOn = on
      this.txtNumero = null
      this.txtText = null
      
      this.activarFormulariON = true
    },

    afegirON: function(){
      this.$store.commit("example/mutNovaON", {
        objON:
          { 
            on:this.txtOn, 
            numero: this.txtNumero, 
            text: this.txtText,
            estat: "pendent",
            seguiment: []
          },
        idxAuditoria: this.idxAuditoria
      });


    },
  },

  computed: {
    auditoria: function() {
      return this.$store.state.example.auditories[this.idxAuditoria];
    },
    arrObsNoConf: function() {
      return this.$store.state.example.auditories[
        this.idxAuditoria
      ].obs_noConf.map((val, idx) => ({ ...val, index: idx }));
    },

    comptadorObs: function() {
			var comptadorTotals = 0;
      var comptadorPendents = 0
      var comptadorFinalitzats = 0
      var comptadorSuspesos = 0
      this.arrObsNoConf.forEach(element => {
        if (element.on == "o" ) comptadorTotals++;
        if (element.on == "o" && element.estat == "pendent") comptadorPendents++;
        if (element.on == "o" && element.estat == "finalitzat") comptadorFinalitzats++;
        if (element.on == "o" && element.estat == "suspes") comptadorSuspesos++;
      });
      return {
				totals: comptadorTotals,
        pendents: comptadorPendents,
        finalitzats: comptadorFinalitzats,
        suspesos: comptadorSuspesos
			};
    },

    comptadorNoConf: function() {
			var comptadorTotals = 0;
			var comptadorPendents = 0
      var comptadorFinalitzats = 0
      var comptadorSuspesos = 0
      this.arrObsNoConf.forEach(element => {
        if (element.on == "n" ) comptadorTotals++;
        if (element.on == "n" && element.estat == "pendent") comptadorPendents++;
        if (element.on == "n" && element.estat == "finalitzat") comptadorFinalitzats++;
        if (element.on == "n" && element.estat == "suspes") comptadorSuspesos++;
      });
      return {
				totals: comptadorTotals,
        pendents: comptadorPendents,
        finalitzats: comptadorFinalitzats,
        suspesos: comptadorSuspesos
			};
    }
  }
};
</script>

<style>
</style>