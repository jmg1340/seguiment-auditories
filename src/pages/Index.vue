<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-md-8 col-12 q-mt-md">
        <!-- <q-scroll-area style="height: 320px; min-width: 800px"> -->
          <q-table
            title="Auditories"
            :data="arrAuditoriesON"
            :columns="columns"
            row-key="index"
            color="brown-14"
            separator="cell"
            dense
            bordered
            class="my-sticky-column-table shadow-14"
          >
            <template v-slot:top-right>
              <q-btn
                dense
                color="grey-8"
                no-caps
                label="Nova auditoria a fer seguiment"
                @click="novaAuditoria"
              />
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  key="DATA"
                  :props="props"
                  @click="anarAObsMillores(props.key)"
                >
                  {{ props.row.dataAuditoria }}
                </q-td>
                <q-td
                  key="CA"
                  :props="props"
                  @click="anarAObsMillores(props.key)"
                >
                  {{ props.row.centre }}
                </q-td>

                <q-td
                  key="OBS_pend"
                  :props="props"
                  @click="anarAObsMillores(props.key)"
                >
                  {{ props.row.obsPend }}
                </q-td>
                <q-td
                  key="OBS_susp"
                  :props="props"
                  @click="anarAObsMillores(props.key)"
                >
                  {{ props.row.obsSusp }}
                </q-td>

                <q-td
                  key="NC_pend"
                  :props="props"
                  @click="anarAObsMillores(props.key)"
                >
                  {{ props.row.NCPend }}
                </q-td>
                <q-td
                  key="NC_susp"
                  :props="props"
                  @click="anarAObsMillores(props.key)"
                >
                  {{ props.row.NCSusp }}
                </q-td>

                <q-td key="ELIMINAR" :props="props">
                  <q-btn
                    color="red-5"
                    text-color="white"
                    icon="delete"
                    dense
                    @click="eliminar(props.key)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        <!-- </q-scroll-area> -->
      </div>
    </div>

    <cmp_avisos class="q-my-xl" />







    <q-dialog v-model="activarFormulari" persistent>
      <q-card>
        <q-card-section class="col items-start">
          <q-input
            class="col q-mb-md"
            color="brown"
            stack-label
            label-color="negative"
            filled
            v-model="txtCentre"
            label="Centre"
          />
          <q-input
            class="col"
            v-model="txtData"
            stack-label
            label-color="negative"
            filled
            type="date"
            label="Data"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Ok"
            color="primary"
            v-close-popup
            @click="afegirRegistre"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import cmp_avisos from "../components/avisos";

export default {
  name: "PageIndex",

  components: { cmp_avisos },

  created() {
    this.loadAuditories()
      .then(() => {
        this.$store.commit("example/mutCarregarAuditories", false);
      })
      .catch(function (e) {
        console.log("error catx promesa: " + e);
      });
  },

  data() {
    return {
      columns: [
        {
          name: "DATA",
          align: "center",
          label: "DATA AUDIT.",
          field: "dataAuditoria",
          sortable: true,
          headerClasses: "bg-brown-14 text-brown-1",
        },
        {
          name: "CA",
          required: true,
          label: "CENTRE",
          align: "left",
          field: (row) => row.centre,
          format: (val) => `${val}`,
          sortable: true,
          style: "min-width: 100px",
          headerClasses: "bg-brown-14 text-brown-1",
        },

        {
          name: "OBS_pend",
          align: "center",
          label: "OBS pend.",
          field: "obsPend",
          sortable: false,
          headerClasses: "bg-brown-14 text-brown-1",
        },
        {
          name: "OBS_susp",
          align: "center",
          label: "OBS susp.",
          field: "obsSusp",
          sortable: false,
          headerClasses: "bg-brown-14 text-brown-1",
        },

        {
          name: "NC_pend",
          align: "center",
          label: "NC. pend.",
          field: "NCPend",
          sortable: false,
          headerClasses: "bg-brown-14 text-brown-1",
        },
        {
          name: "NC_susp",
          align: "center",
          label: "NC. susp.",
          field: "NCSusp",
          sortable: false,
          headerClasses: "bg-brown-14 text-brown-1",
        },

        {
          name: "ELIMINAR",
          align: "center",
          label: "",
          field: "idx",
          sortable: false,
          headerClasses: "bg-brown-14 text-brown-1",
        },
      ],

      txtCentre: null,
      txtData: null,

      activarFormulari: false,
    };
  },

  methods: {
    loadAuditories: function () {
      console.log("Estic a LOAD_AUDITORIES");

      if (this.$q.platform.is.electron) {
        console.log("la plataforma SI es ELECTRON");

        const Store = require("electron-store");
        const store = new Store();

        console.log("key seg_auditories: " + store.get("seg_auditories"));

        let promesa = new Promise((resolve, reject) => {
          console.log("this.carregarAuditories? " + this.carregarAuditories);
          if (this.carregarAuditories) {
            console.log(
              "LOCALSTORAGE: has seg_auditories? " + store.has("seg_auditories")
            );
            if (store.has("seg_auditories")) {
              this.$store.commit(
                "example/mutImportarJSON",
                JSON.parse(store.get("seg_auditories").auditories)
              );
              //this.$store.commit("example/mutImportarJSON", arr);
              resolve();
            }
          } else {
            reject("PROMESA REBUTJADA");
          }
        });

        return promesa;
      } else {
        console.log("la plataforma NO es ELECTRON");
        console.log(
          "key seg_auditories: " +
            this.$q.localStorage.getItem("seg_auditories")
        );

        let promesa = new Promise((resolve, reject) => {
          console.log("this.carregarAuditories? " + this.carregarAuditories);
          if (this.carregarAuditories) {
            console.log(
              "LOCALSTORAGE: has seg_auditories? " +
                this.$q.localStorage.has("seg_auditories")
            );
            if (this.$q.localStorage.has("seg_auditories")) {
              this.$store.commit(
                "example/mutImportarJSON",
                JSON.parse(
                  this.$q.localStorage.getItem("seg_auditories").auditories
                )
              );
              //this.$store.commit("example/mutImportarJSON", arr);
              resolve();
            }
          } else {
            reject("PROMESA REBUTJADA");
          }
        });

        return promesa;
      }
    },

    novaAuditoria: function () {
      console.log("nova auditoria");
      this.activarFormulari = true;
    },

    afegirRegistre: function () {
      let obj = {
        centre: this.txtCentre,
        dataAuditoria: this.txtData,
        obs_noConf: [],
      };
      this.$store.dispatch("example/actNovaAuditoria", obj);
      this.txtCentre = null;
      this.txtData = null;
    },

    anarAObsMillores: function (idx) {
      console.log("anar a obs i noConf");
      this.$router.push({ path: "/obsnoConf/" + JSON.stringify(idx) });
    },

    eliminar: function (idx) {
      this.$q
        .dialog({
          title: "Confirm",
          message:
            "Eliminar auditoria " +
            this.auditories[idx].centre.toUpperCase() +
            "?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$store.commit("example/mutEliminarAuditoria", idx);
          this.generar_localAuditories();
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

    comptadors: function (arr, on, vEstat) {
      var comptador = 0;
      arr.forEach((element) => {
        if (element.on == on && element.estat == vEstat) comptador++;
      });
      console.log("comptador: " + comptador);
      return comptador == 0 ? null : comptador;
    },
  },

  computed: {
    auditories: function () {
      return this.$store.state.example.auditories.map((val, idx) => ({
        ...val,
        index: idx,
      }));
    },

    carregarAuditories: function () {
      return this.$store.state.example.carregarAuditories;
    },

    arrAuditoriesON: function () {
      let auditONPend = this.auditories.slice(0);
      console.log("auditONPend");
      console.log(auditONPend);
      auditONPend.forEach(function (obj) {
        obj.obsPend = this.comptadors(obj.obs_noConf, "o", "pendent");
        obj.NCPend = this.comptadors(obj.obs_noConf, "n", "pendent");
        obj.obsSusp = this.comptadors(obj.obs_noConf, "o", "suspes");
        obj.NCSusp = this.comptadors(obj.obs_noConf, "n", "suspes");
      }, this);
      console.log(auditONPend);
      return auditONPend;
    },
  },
};
</script>





<style lang="sass">
.my-sticky-column-table
	/* specifying max-width so the example can
	 highlight the sticky column on any browser window */

	.q-table__top,
	.q-table__bottom,
		/* bg color is important for th; just specify one */
		background-color: #c4b3a5

	thead tr:nth-child(3) th:nth-child(3),
	thead tr:nth-child(4) th:nth-child(4)
		/* bg color is important for th; just specify one */
		background-color: #fff

	td:nth-child(3), td:nth-child(4)
		background-color: #f5f5dc

	td:nth-child(5), td:nth-child(6)
		background-color: #ffd8c4

/*	
 th:first-child,
 td:first-child
 position: sticky
 left: 0
 z-index: 1
 */    
</style>