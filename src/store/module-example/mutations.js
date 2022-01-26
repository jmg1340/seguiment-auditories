

export function mutImportarJSON (state, arr) {
  state.auditories = arr
}



export function mutNovaAuditoria (state, obj) {
  state.auditories.push(obj)
}
export function mutEliminarAuditoria ( state, idx ) {
  state.auditories.splice(idx,1)
}
export function mutNovaON ( state, payload ) {
  //let objON = {on: payload.on, text: "", estat: "pendent", seguiment: []}
  state.auditories[payload.idxAuditoria].obs_noConf.push(payload.objON)
}
export function mutCarregarAuditories ( state, valor ) {
  state.carregarAuditories = valor
}




export function updateCampAmaga ( state, payload ) {
  state.auditories[payload.idxAuditoria].amaga = payload.valor
}
export function updateCampNumero ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].numero = payload.valor
}
export function updateCampDataAM ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].dataAM = payload.valor
}
export function updateCampText ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].text = payload.valor
}
export function updateCampEstat ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].estat = payload.valor
}
export function mutEliminarON ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf.splice(payload.idxON, 1)
}
export function mutNouSEG ( state, payload ) {
  //let objSEG = {data: "", text: ""}
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].seguiment.push(payload.objSEG)
}





export function updateCampSEGdata ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].seguiment[payload.idxSeg].data = payload.valor
}
export function updateCampSEGtext ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].seguiment[payload.idxSeg].text = payload.valor
}
export function updateCampDiesAvis ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxObsNoConf].seguiment[payload.idxSeg].diesAvis = payload.valor
}
export function mutEliminarSEG ( state, payload ) {
  state.auditories[payload.idxAuditoria].obs_noConf[payload.idxON].seguiment.splice(payload.idxSeg, 1)
}
