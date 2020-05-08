<template>
  <div>
		<div class="text-h4">Avisos</div>

		<div class="col"> 
			<div class="row">
				<div class="col-1 bordeCapsalera text-center">Data A.</div>
				<div class="col-2 bordeCapsalera">Centre</div>
				<div class="col-1 bordeCapsalera text-center">Obs/NC</div>
				<!-- <div class="col-1 bordeCapsalera text-center">Num</div> -->
				<div class="col bordeCapsalera">Text</div>
				<div class="col-1 bordeCapsalera text-center">D. ult. seg</div>
				<div class="col-1 bordeCapsalera text-center">Dies Avis</div>
			</div>
		</div>
		<div class="col q-gutter-md" v-for="(obj,index) in arrAvisos"  :key="`avis_${index}`"> 
			<div class="row">
				<div class="col-1 bordeInferiorDret bordeEsquerre text-center q-pa-xs">{{obj.dataAuditoria}}</div>
				<div class="col-2 bordeInferiorDret q-pa-xs">{{obj.centre}}</div>
				<div class="col-1 bordeInferiorDret text-center q-pa-xs">
					 {{ (obj.on == "o") ? "OBS " : "NC " }}
					 <q-badge outline color="primary">{{obj.numero}}</q-badge>
				</div>
				<!-- <div class="col-1 bordeInferiorDret text-center q-pa-xs">{{obj.numero}}</div> -->
				<div class="col bordeInferiorDret q-pa-xs" @click="textUltimSeguiment(obj.urText)">{{obj.textON}}</div>

				<div class="col-1 bordeInferiorDret text-center q-pa-xs bg-indigo-2" v-if="typeof obj.urData != 'undefined'">{{obj.urData}}</div>
				<div class="col-1 bordeInferiorDret text-center q-pa-xs bg-indigo-2" v-if="typeof obj.urData != 'undefined'">{{obj.urDiesAvis}}</div>

				<div class="col-2 bordeInferiorDret text-center q-pa-xs bg-indigo-1 text-red text-weight-bold" v-if="typeof obj.urData == 'undefined'"> Cap seguiment encara</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  data(){
		return{

		}
	},

	methods:{
		textUltimSeguiment: function(txt){
			if (txt)
				this.$q.dialog({
					title: 'Text últim registre del seguiment',
					message: '<div class="bg-indigo-2 q-pa-md" style="white-space: pre-wrap;">' + txt + '</div>',
					html: true
				}).onOk(() => {
					// console.log('OK')
				}).onCancel(() => {
					// console.log('Cancel')
				}).onDismiss(() => {
					// console.log('I am triggered on both OK and Cancel')
				})			
		}
	},

	computed:{
		arrAvisos: function(){
			let arr = []
			let auditories = this.$store.state.example.auditories
			let contdias = null

			auditories.forEach(auditoria => {
				let centre = auditoria.centre
				let data = auditoria.dataAuditoria
				auditoria.obs_noConf.forEach(obsnc => {
					if (obsnc.estat == "pendent"){
						let on = obsnc.on
						let numero = obsnc.numero
						let textON = obsnc.text
						
						console.log("obsnc.seguiment.length: " + obsnc.seguiment.length)
						if ( obsnc.seguiment.length !== 0 ) {
							// hi ha algun registre de seguiment
							// pillem ultim seguiment
							let ultimRegistre = obsnc.seguiment.slice(-1)[0]
							
							// De l'ultim seguiment, comparem si han passat més dies del limit dels diesAvis
							let dataSeg = new Date(ultimRegistre.data)
							let dataActual = new Date()
							let diasdif  = dataActual.getTime() - dataSeg.getTime();
							contdias = Math.round(diasdif/(1000*60*60*24));
							
							//console.log("diferencia: " + contdias + "\tdiesAvis: " + ultimRegistre.diesAvis)
							if (contdias > ultimRegistre.diesAvis ){
								let urData = ultimRegistre.data
								let urText = ultimRegistre.text
								let urDiesAvis = ultimRegistre.diesAvis
								
								arr.push({
									centre: centre,
									dataAuditoria: data,
									on: on,
									numero: numero,
									textON: textON,
									urData: urData,
									urText: urText,
									urDiesAvis: urDiesAvis
								})

							}
						} else {
							// no hi ha cap registre de seguiement
							arr.push({
								centre: centre,
								dataAuditoria: data,
								on: on,
								numero: numero,
								textON: textON,
							})

						}
					}
				});
			});

			return arr.map((val,idx) => ({...val, index: idx}))

		}
	}


}
</script>

<style scoped>
	.bordeCapsalera{
		border: 1px solid rgb(71, 71, 71);
		background-color: rgb(20, 27, 32);
		color: rgb(252, 252, 252);
	}
	.bordeInferiorDret{
		border-bottom: 1px solid rgb(61, 61, 61);
		border-right: 1px solid rgb(61, 61, 61);
		background-color: rgb(247, 247, 247);
	}
	.bordeEsquerre{
		border-left: 1px solid rgb(61, 61, 61);

	}
</style>