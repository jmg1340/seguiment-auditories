<template>
  <!-- <q-card class>
    <q-card-section class="column"> -->
      
    <div class="column bg-amber-1">  
      <div class="row inline nowrap" v-if="editar">
        <div class="col-2">
          <q-input type="date" square outlined v-model="campSEGData" stack-label label="Data" />
        </div>
        <div class="col">
          <q-input type="textarea" square outlined v-model="campSEGText" stack-label label="Text" />
        </div>
        <div class="col-2">
          <q-select standout v-model="campSEGDiesAvis" :options="[7, 15, 30]" label="Dies Avis" />
        </div>
        <div class="col-1">
          <q-btn color="green" text-color="black" icon="done" dense @click="editar=false" />
        </div>
      </div>

      <div class="row inline nowrap" v-else>
        <div class="col-auto q-pa-sm borde">{{ campSEGData }}</div>
        <!-- <div class="col borde q-pa-sm">{{ campSEGText }}</div> -->
        <div class="col borde q-pa-sm" v-html="campSEGText"></div>
        <div class="col-1 borde text-center">{{ campSEGDiesAvis }}</div>
        <div class="col-1 borde">
          <div class="row inline nowrap  q-gutter-xs q-pa-xs">
            <q-btn class="col" color="grey-5" text-color="black" icon="edit" dense @click="editar=true" />
            <q-btn class="col" color="red-4" text-color="black" icon="delete" dense @click="eliminarSEG" />
          </div>
        </div>
      </div>

    </div>
    <!-- </q-card-section>
  </q-card> -->
</template>

<script>
export default {
  props: ["idxAuditoria", "idxObsNoConf", "idxSeg"],

  created() {},

  data() {
    return {
      editar: false
    };
  },

  computed: {


    campSEGData: {
      get() {
        return this.$store.state.example.auditories[this.idxAuditoria]
          .obs_noConf[this.idxObsNoConf].seguiment[this.idxSeg].data;
      },
      set(value) {
        this.$store.commit("example/updateCampSEGdata", {
          idxAuditoria: this.idxAuditoria,
          idxObsNoConf: this.idxObsNoConf,
          idxSeg: this.idxSeg,
          valor: value
        });
      }
    },

    campSEGText: {
      get() {
        return this.$store.state.example.auditories[this.idxAuditoria]
          .obs_noConf[this.idxObsNoConf].seguiment[this.idxSeg].text;
      },
      set(value) {
        this.$store.commit("example/updateCampSEGtext", {
          idxAuditoria: this.idxAuditoria,
          idxObsNoConf: this.idxObsNoConf,
          idxSeg: this.idxSeg,
          valor: value
        });
      }
    },
    campSEGDiesAvis: {
      get() {
        return this.$store.state.example.auditories[this.idxAuditoria]
          .obs_noConf[this.idxObsNoConf].seguiment[this.idxSeg].diesAvis;
      },
      set(value) {
        this.$store.commit("example/updateCampDiesAvis", {
          idxAuditoria: this.idxAuditoria,
          idxObsNoConf: this.idxObsNoConf,
          idxSeg: this.idxSeg,
          valor: value
        });
      }
    },
  },

  methods: {
    eliminarSEG: function(idx) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Eliminar registre de seguiment?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.eliminarSEG2(idx);
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    eliminarSEG2: function(idx) {
      // trobar l'index de l'array obs_noConf on el valor sigui l'objecte del registre
      let objReg = {
        data: this.$store.state.example.auditories[this.idxAuditoria]
          .obs_noConf[this.idxObsNoConf].seguiment[this.idxSeg].data,
        text: this.$store.state.example.auditories[this.idxAuditoria]
          .obs_noConf[this.idxObsNoConf].seguiment[this.idxSeg].text,
      };
      console.log("objReg:");
      console.log(objReg);
      console.log("------------------");
      // busquem quin index te a l'array obs_noConf
      let idxON = this.$store.state.example.auditories[
        this.idxAuditoria
      ].obs_noConf[this.idxObsNoConf].seguiment.findIndex(function(obj) {
        return (
          obj.data == objReg.data &&
          obj.text == objReg.text
        );
      });
      console.log("idxON: " + idxON);

      if (idxON != -1) {
        this.$store.commit("example/mutEliminarSEG", {
          idxON,
          idxAuditoria: this.idxAuditoria,
          idxSeg: this.idxSeg

        });
      } else {
        console.log("No s'ha trobat index");
      }
    }
  }
};
</script>


<style>
.borde {
  border: 1px solid rgb(146, 146, 146);
  white-space: pre-wrap;
}
</style>