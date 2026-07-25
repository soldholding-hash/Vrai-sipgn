// ============ DASHBOARD CTPNR - COMMANDANT TERRITORIAL POINTE-NOIRE ============
var UNITES_PNR = [
  { id: "COMM-1", nom: "Commissariat 1er Arr.", chef: "Commissaire MOUKALA", effectif_total: 45, effectif_service: 28, vehicules_op: 4, vehicules_total: 6, carburant: 75, armement: 90, incidents_semaine: 12 },
  { id: "COMM-2", nom: "Commissariat 2e Arr.", chef: "Commissaire NKOUKA", effectif_total: 38, effectif_service: 22, vehicules_op: 3, vehicules_total: 5, carburant: 60, armement: 85, incidents_semaine: 8 },
  { id: "COMM-3", nom: "Commissariat 3e Arr.", chef: "Commissaire BAZANA", effectif_total: 42, effectif_service: 30, vehicules_op: 5, vehicules_total: 6, carburant: 80, armement: 95, incidents_semaine: 15 },
  { id: "COMM-4", nom: "Commissariat 4e Arr.", chef: "Commissaire ITOUA", effectif_total: 35, effectif_service: 20, vehicules_op: 2, vehicules_total: 4, carburant: 45, armement: 80, incidents_semaine: 6 },
  { id: "COMM-5", nom: "Commissariat 5e Arr.", chef: "Commissaire MALONGA", effectif_total: 40, effectif_service: 25, vehicules_op: 4, vehicules_total: 5, carburant: 70, armement: 88, incidents_semaine: 10 },
  { id: "PJ-PNR", nom: "PJ Pointe-Noire", chef: "Commissaire Divisionnaire KOUMBA", effectif_total: 55, effectif_service: 40, vehicules_op: 8, vehicules_total: 10, carburant: 85, armement: 92, incidents_semaine: 20 },
  { id: "INTERV", nom: "Unité Intervention", chef: "Capitaine MASSAMBA", effectif_total: 60, effectif_service: 45, vehicules_op: 10, vehicules_total: 12, carburant: 90, armement: 98, incidents_semaine: 5 }
];

var HOTSPOTS_PNR = [
  { id: 1, nom: "Zone Portuaire", lat: -4.776, lng: 11.863, niveau: "critique", incidents: 8, type: "Trafic / Contrebande" },
  { id: 2, nom: "Marché de Fond-Tié-Tié", lat: -4.789, lng: 11.851, niveau: "eleve", incidents: 5, type: "Vol à main armée" },
  { id: 3, nom: "Quartier Mongo-Mpoukou", lat: -4.802, lng: 11.842, niveau: "modere", incidents: 3, type: "Trouble ordre public" },
  { id: 4, nom: "Avenue Marien Ngouabi", lat: -4.771, lng: 11.857, niveau: "eleve", incidents: 6, type: "Agression / Violence" },
  { id: 5, nom: "Zone Résidentielle Loandjili", lat: -4.758, lng: 11.869, niveau: "faible", incidents: 2, type: "Cambriolage" },
];

var ALERTES_PNR = [
  { id: 1, priorite: 1, texte: "URGENCE 1 — Vie en danger : Prise d otage signalée Zone Portuaire — Unité intervention déployée", heure: "09:14", unite: "INTERV" },
  { id: 2, priorite: 1, texte: "URGENCE 1 — Fusillade Quartier Fond-Tié-Tié — 2 blessés — Ambulance demandée", heure: "08:52", unite: "COMM-2" },
  { id: 3, priorite: 2, texte: "URGENCE 2 — Rixe massive Marché Total — 30 individus — Renforts nécessaires", heure: "08:31", unite: "COMM-3" },
  { id: 4, priorite: 2, texte: "URGENCE 2 — Manifestation non autorisée Av. Marien Ngouabi — 200 personnes", heure: "07:45", unite: "COMM-1" },
  { id: 5, priorite: 3, texte: "URGENCE 3 — Accident circulation RN1 — 3 véhicules impliqués — Embouteillage", heure: "07:22", unite: "COMM-5" },
  { id: 6, priorite: 3, texte: "URGENCE 3 — Cambriolage signalé Résidence Les Jasmins — Suspect en fuite", heure: "06:58", unite: "COMM-4" },
];

var GAV_PNR = [
  { id: "GAV-PNR-001", nom: "MOUKOUARI Jean", motif: "Trafic de stupéfiants", unite: "PJ-PNR", heures_restantes: 18, statut: "actif" },
  { id: "GAV-PNR-002", nom: "BAZANA Paul", motif: "Vol à main armée", unite: "COMM-3", heures_restantes: 3, statut: "critique" },
  { id: "GAV-PNR-003", nom: "NKOUKA Eric", motif: "Recel de biens volés", unite: "COMM-1", heures_restantes: 8, statut: "actif" },
  { id: "GAV-PNR-004", nom: "ITOUA Marie", motif: "Escroquerie", unite: "PJ-PNR", heures_restantes: 22, statut: "actif" },
  { id: "GAV-PNR-005", nom: "MASSAMBA Roger", motif: "Violence conjugale", unite: "COMM-2", heures_restantes: 1, statut: "critique" },
];

var DOSSIERS_PJ_PNR = [
  { id: "DOS-PNR-001", titre: "Réseau trafic carburant port", statut: "enquete", agents: 3, date: "2026-06-20" },
  { id: "DOS-PNR-002", titre: "Série cambriolages Loandjili", statut: "attente_procureur", agents: 2, date: "2026-06-22" },
  { id: "DOS-PNR-003", titre: "Faux billets FCFA en circulation", statut: "enquete", agents: 4, date: "2026-06-18" },
  { id: "DOS-PNR-004", titre: "Agression armée gérant station-service", statut: "cloture", agents: 2, date: "2026-06-15" },
  { id: "DOS-PNR-005", titre: "Trafic influence douanes port", statut: "attente_procureur", agents: 3, date: "2026-06-23" },
];

var TENDANCES_PNR = [
  { semaine: "S-4", n1: 3, n2: 8, n3: 15 },
  { semaine: "S-3", n1: 5, n2: 10, n3: 18 },
  { semaine: "S-2", n1: 4, n2: 7, n3: 12 },
  { semaine: "S-1", n1: 6, n2: 12, n3: 20 },
  { semaine: "S actuelle", n1: 2, n2: 9, n3: 14 },
];

var NOTES_RENSEIGNEMENT_PNR = [
  { id: 1, origine: "DRG National", priorite: "haute", titre: "Activité réseau criminel transfrontalier Congo-Angola", date: "2026-07-04", lu: false },
  { id: 2, origine: "BCN INTERPOL", priorite: "critique", titre: "Mandat international — suspect localisé zone portuaire PNR", date: "2026-07-05", lu: false },
  { id: 3, origine: "CFP Brazzaville", priorite: "normale", titre: "Directives opération sécurisation fête nationale 15 Août", date: "2026-07-03", lu: true },
];

function DashboardCTPNR(props) {
  var compte = props.compte;
  var zoneState = useState("situation"); var zone = zoneState[0]; var setZone = zoneState[1];
  var alerteIdxState = useState(0); var alerteIdx = alerteIdxState[0]; var setAlerteIdx = alerteIdxState[1];
  var selUniteState = useState(null); var selUnite = selUniteState[0]; var setSelUnite = selUniteState[1];
  var auditState = useState(false); var showAudit = auditState[0]; var setShowAudit = auditState[1];
  var cmdState = useState(false); var showCmd = cmdState[0]; var setShowCmd = cmdState[1];
  var cmdTexteState = useState(""); var cmdTexte = cmdTexteState[0]; var setCmdTexte = cmdTexteState[1];
  var cmdEnvoyeState = useState(false); var cmdEnvoye = cmdEnvoyeState[0]; var setCmdEnvoye = cmdEnvoyeState[1];
  var criseState = useState(false); var showCrise = criseState[0]; var setShowCrise = criseState[1];
  var notesState = useState(NOTES_RENSEIGNEMENT_PNR); var notes = notesState[0]; var setNotes = notesState[1];

  useEffect(function() {
    var t = setInterval(function() {
      setAlerteIdx(function(i) { return (i + 1) % ALERTES_PNR.length; });
    }, 4000);
    return function() { clearInterval(t); };
  }, []);

  var totalEffectif = UNITES_PNR.reduce(function(s,u){return s+u.effectif_total;},0);
  var totalService = UNITES_PNR.reduce(function(s,u){return s+u.effectif_service;},0);
  var totalVehicules = UNITES_PNR.reduce(function(s,u){return s+u.vehicules_op;},0);
  var totalVehiculesTotal = UNITES_PNR.reduce(function(s,u){return s+u.vehicules_total;},0);
  var gavCritiques = GAV_PNR.filter(function(g){return g.heures_restantes<=4;}).length;
  var dossiersProcureur = DOSSIERS_PJ_PNR.filter(function(d){return d.statut==="attente_procureur";}).length;
  var notesNonLues = notes.filter(function(n){return !n.lu;}).length;

  var PRIORITE_COLOR = {"1":"#DC2626","2":"#F59E0B","3":"#3B82F6"};
  var NIVEAU_COLOR = {critique:"#DC2626",eleve:"#F59E0B",modere:"#3B82F6",faible:"#22C55E"};
  var STATUT_DOS = {enquete:"#3B82F6",attente_procureur:"#F59E0B",cloture:"#22C55E"};
  var STATUT_DOS_LABEL = {enquete:"En enquête",attente_procureur:"Attente Procureur",cloture:"Clôturé"};

  var alerteActuelle = ALERTES_PNR[alerteIdx];

  var toggleNoteLu = function(id) {
    setNotes(function(prev){ return prev.map(function(x){ return x.id===id ? Object.assign({},x,{lu:true}) : x; }); });
  };

  return (
    <div className="space-y-4">
      {showCrise ? (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-red-700 p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center"><Video size={20} className="text-white"/></div>
              <div><p className="text-white font-black text-lg">Réunion de Crise</p><p className="text-slate-400 text-sm">Convocation toutes unités PNR</p></div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 space-y-2">
              {UNITES_PNR.map(function(u){return(<div key={u.id} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div><span className="text-slate-300 text-xs">{u.chef} — {u.nom}</span></div>);})}
            </div>
            <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-3">
              <p className="text-red-400 text-xs font-bold">🔴 DIFFUSION EN DIRECT — Tableau de bord partagé avec toutes les unités</p>
            </div>
            <div className="flex gap-3">
              <button onClick={function(){setShowCrise(false);}} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold text-sm">Terminer la réunion</button>
              <button onClick={function(){setShowCrise(false);}} className="px-5 py-3 rounded-xl bg-slate-700 text-slate-300 text-sm font-bold">Fermer</button>
            </div>
          </div>
        </div>
      ):null}

      {showCmd ? (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-blue-700 p-6 w-full max-w-md space-y-4 shadow-2xl">
            <p className="text-white font-black text-lg">⚡ Commandement Direct</p>
            <p className="text-slate-400 text-sm">L'instruction sera diffusée immédiatement sur les tablettes de tous les chefs d'unités.</p>
            {!cmdEnvoye ? (
              <div className="space-y-3">
                <textarea value={cmdTexte} onChange={function(e){setCmdTexte(e.target.value);}} rows={4} placeholder="Rédigez votre instruction prioritaire..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none"/>
                <button onClick={function(){if(cmdTexte.trim()){setCmdEnvoye(true);}}} className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold text-sm">📡 Envoyer l'instruction</button>
                <button onClick={function(){setShowCmd(false);setCmdTexte("");}} className="w-full bg-slate-700 text-slate-300 py-2 rounded-xl text-sm">Annuler</button>
              </div>
            ):(
              <div className="space-y-3">
                <div className="bg-green-900/20 border border-green-700/40 rounded-xl p-4 text-center">
                  <p className="text-green-400 font-black text-lg">✓ Instruction envoyée</p>
                  <p className="text-slate-400 text-xs mt-1">Diffusée à {UNITES_PNR.length} unités — {new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-3"><p className="text-slate-300 text-sm italic">"{cmdTexte}"</p></div>
                <button onClick={function(){setShowCmd(false);setCmdTexte("");setCmdEnvoye(false);}} className="w-full bg-slate-700 text-slate-300 py-2 rounded-xl text-sm font-bold">Fermer</button>
              </div>
            )}
          </div>
        </div>
      ):null}

      {showAudit && selUnite ? (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-slate-900 rounded-2xl border border-yellow-700 p-6 w-full max-w-2xl space-y-4 shadow-2xl my-4">
            <div className="flex items-center justify-between">
              <div><p className="text-white font-black text-lg">🔍 Audit — {selUnite.nom}</p><p className="text-slate-400 text-sm">Chef : {selUnite.chef}</p></div>
              <button onClick={function(){setShowAudit(false);}} className="text-slate-500 hover:text-white font-bold text-xl">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["👮 Effectifs",selUnite.effectif_service+"/"+selUnite.effectif_total+" en service","#3B82F6"],["🚗 Véhicules",selUnite.vehicules_op+"/"+selUnite.vehicules_total+" opérationnels","#22C55E"],["⛽ Carburant",selUnite.carburant+"%","#F59E0B"]].map(function(s,i){return(<div key={i} className="bg-slate-800 rounded-xl p-3 text-center"><p className="text-slate-400 text-xs mb-1">{s[0]}</p><p style={{color:s[2]}} className="font-black text-lg">{s[1]}</p></div>);})}
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-3">Main Courante — Incidents cette semaine</p>
              <div className="space-y-2">
                {[...Array(Math.min(selUnite.incidents_semaine,5))].map(function(_,i){return(<div key={i} className="flex items-center gap-2 text-xs"><span className="text-slate-500 font-mono w-12">0{i+1}h{(i*3+10)%60<10?"0"+(i*3+10)%60:(i*3+10)%60}</span><span className="text-slate-300">{["Vol signalé","Trouble ordre public","Interpellation","Accident circulation","Bagarre"][i%5]}</span><Chip color={["#DC2626","#F59E0B","#22C55E","#3B82F6","#8B5CF6"][i%5]}>{["Critique","Grave","Résolu","Moyen","En cours"][i%5]}</Chip></div>);})}
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-3">GAV en cours dans cette unité</p>
              {GAV_PNR.filter(function(g){return g.unite===selUnite.id;}).length===0?<p className="text-slate-500 text-xs">Aucune garde à vue en cours.</p>:GAV_PNR.filter(function(g){return g.unite===selUnite.id;}).map(function(g){return(<div key={g.id} className="flex items-center justify-between text-xs bg-slate-900 rounded-lg p-2 mb-1"><span className="text-white font-bold">{g.nom}</span><span className="text-slate-400">{g.motif}</span><Chip color={g.heures_restantes<=4?"#DC2626":"#22C55E"}>{g.heures_restantes}h restantes</Chip></div>);})}
            </div>
          </div>
        </div>
      ):null}

      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Commandement Territorial — Pointe-Noire</h2>
          <p className="text-slate-400 text-sm">Tableau de bord opérationnel · {new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={function(){setShowCmd(true);}} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs" style={{background:"#1D4ED8"}}>⚡ Commandement Direct</button>
          <button onClick={function(){setShowCrise(true);}} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs" style={{background:"#DC2626"}}>🔴 Réunion de Crise</button>
        </div>
      </div>

      <div style={{background:"#DC262622",border:"1px solid #DC262660"}} className="rounded-xl px-4 py-3 flex items-center gap-3 overflow-hidden">
        <span className="text-red-400 font-black text-xs shrink-0 uppercase tracking-widest">FLUX DIRECT</span>
        <div className="flex-1 overflow-hidden">
          <p style={{color:PRIORITE_COLOR[alerteActuelle.priorite]}} className="text-sm font-bold animate-pulse truncate">
            🔴 U{alerteActuelle.priorite} · {alerteActuelle.texte} · {alerteActuelle.heure}
          </p>
        </div>
        <span className="text-slate-500 text-xs shrink-0">{alerteIdx+1}/{ALERTES_PNR.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <StatCard icon={<Users size={16}/>} label="Agents en service" value={totalService+"/"+totalEffectif} color="#3B82F6" sub="Total disponible" />
        <StatCard icon={<Car size={16}/>} label="Véhicules opérat." value={totalVehicules+"/"+totalVehiculesTotal} color="#22C55E" sub="Flotte active" />
        <StatCard icon={<Lock size={16}/>} label="GAV actives" value={GAV_PNR.length} color={gavCritiques>0?"#DC2626":"#F59E0B"} sub={gavCritiques+" critique(s)"} />
        <StatCard icon={<FileText size={16}/>} label="Dossiers PJ" value={DOSSIERS_PJ_PNR.length} color="#8B5CF6" sub={dossiersProcureur+" att. Procureur"} />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[["situation","🗺️ Situational Awareness"],["chaine","⚖️ Chaine Pénale"],["forces","👮 Gestion Forces"],["veille","📊 Veille & Analyse"]].map(function(z){return(<button key={z[0]} onClick={function(){setZone(z[0]);}} style={{background:zone===z[0]?"#1D4ED8":"#1E293B",color:zone===z[0]?"#fff":"#94A3B8"}} className="px-3 py-2 rounded-lg text-xs font-bold">{z[1]}</button>);})}
      </div>

      {zone==="situation"?(
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
              <p className="text-white font-bold text-sm mb-3">🗺️ Carte Opérationnelle — Pointe-Noire</p>
              <div className="relative bg-slate-900 rounded-xl overflow-hidden" style={{height:280}}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#0B2337",width:"90%",height:"90%",borderRadius:8,border:"1px solid #1E293B"}}>
                      <p className="text-slate-600 text-xs text-center pt-4">Pointe-Noire · Océan Atlantique</p>
                      {HOTSPOTS_PNR.map(function(h){
                        var left=(((h.lng-11.83)/(11.89-11.83))*80+10)+"%";
                        var top=(((h.lat-(-4.81))/((-4.75)-(-4.81)))*70+15)+"%";
                        return(<div key={h.id} style={{position:"absolute",left:left,top:top,transform:"translate(-50%,-50%)"}} title={h.nom}>
                          <div style={{width:h.niveau==="critique"?20:h.niveau==="eleve"?16:12,height:h.niveau==="critique"?20:h.niveau==="eleve"?16:12,background:NIVEAU_COLOR[h.niveau],borderRadius:"50%",opacity:0.8,animation:"pulse 2s infinite",border:"2px solid white"}}></div>
                        </div>);
                      })}
                      <div style={{position:"absolute",bottom:8,left:8}} className="flex flex-col gap-1">
                        {[["critique","#DC2626"],["eleve","#F59E0B"],["modere","#3B82F6"],["faible","#22C55E"]].map(function(l){return(<div key={l[0]} className="flex items-center gap-1"><div style={{width:8,height:8,background:l[1],borderRadius:"50%"}}></div><span className="text-[9px] text-slate-400 capitalize">{l[0]}</span></div>);})}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {HOTSPOTS_PNR.map(function(h){return(<div key={h.id} className="flex items-center justify-between text-xs"><span className="text-slate-300">{h.nom}</span><div className="flex items-center gap-2"><Chip color={NIVEAU_COLOR[h.niveau]}>{h.niveau}</Chip><span className="text-slate-500">{h.incidents} inc.</span></div></div>);})}
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">🚨 Alertes en Direct</p>
                <div className="space-y-2 max-h-52 overflow-auto">
                  {ALERTES_PNR.map(function(a){return(<div key={a.id} style={{borderLeft:"3px solid "+PRIORITE_COLOR[a.priorite],background:PRIORITE_COLOR[a.priorite]+"11"}} className="rounded-r-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{background:PRIORITE_COLOR[a.priorite],color:"#fff",fontSize:9,padding:"1px 6px",borderRadius:4,fontWeight:700}}>U{a.priorite}</span>
                      <span className="text-slate-500 text-[10px] font-mono">{a.heure}</span>
                      <span className="text-slate-500 text-[10px]">{a.unite}</span>
                    </div>
                    <p className="text-slate-200 text-xs">{a.texte}</p>
                  </div>);})}
                </div>
              </div>
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">🔔 Notes Renseignement</p>
                <div className="space-y-2">
                  {notes.map(function(n){return(<div key={n.id} onClick={function(){toggleNoteLu(n.id);}} className={"rounded-xl p-3 cursor-pointer border "+(n.lu?"border-slate-700 bg-slate-900/50":"border-blue-700/40 bg-blue-900/10")}>
                    <div className="flex items-center gap-2 mb-1">
                      <Chip color={n.priorite==="critique"?"#DC2626":n.priorite==="haute"?"#F59E0B":"#3B82F6"}>{n.priorite}</Chip>
                      <span className="text-slate-500 text-[10px]">{n.origine}</span>
                      {!n.lu&&<span className="text-blue-400 text-[10px] font-bold">NOUVEAU</span>}
                    </div>
                    <p className="text-slate-200 text-xs font-semibold">{n.titre}</p>
                  </div>);})}
                </div>
              </div>
            </div>
          </div>
        </div>
      ):null}

      {zone==="chaine"?(
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Gardes à Vue</p>
              <p className="text-3xl font-black text-white">{GAV_PNR.length}</p>
              <p className="text-red-400 text-xs mt-1">{gavCritiques} en délai critique (&lt;4h)</p>
            </div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Dossiers PJ en cours</p>
              <p className="text-3xl font-black text-white">{DOSSIERS_PJ_PNR.filter(function(d){return d.statut==="enquete";}).length}</p>
              <p className="text-slate-500 text-xs mt-1">{dossiersProcureur} att. Procureur</p>
            </div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Dossiers clôturés</p>
              <p className="text-3xl font-black text-white">{DOSSIERS_PJ_PNR.filter(function(d){return d.statut==="cloture";}).length}</p>
              <p className="text-slate-500 text-xs mt-1">Ce mois</p>
            </div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">🔒 Gardes à Vue — Détail</p>
            <div className="space-y-2">
              {GAV_PNR.map(function(g){return(<div key={g.id} style={{borderLeft:"3px solid "+(g.heures_restantes<=4?"#DC2626":"#22C55E")}} className="bg-slate-900/70 rounded-r-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-bold">{g.nom}</p>
                  <p className="text-slate-500 text-xs">{g.motif} · {g.unite}</p>
                </div>
                <div className="text-right">
                  <p style={{color:g.heures_restantes<=4?"#DC2626":"#22C55E"}} className="text-lg font-black">{g.heures_restantes}h</p>
                  <p className="text-slate-600 text-[10px]">restantes</p>
                </div>
              </div>);})}
            </div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">📁 Dossiers PJ</p>
            <div className="space-y-2">
              {DOSSIERS_PJ_PNR.map(function(d){return(<div key={d.id} className="flex items-center justify-between bg-slate-900/70 rounded-xl p-3">
                <div>
                  <p className="text-white text-sm font-semibold">{d.titre}</p>
                  <p className="text-slate-500 text-xs">{d.id} · {d.agents} agents · {d.date}</p>
                </div>
                <Chip color={STATUT_DOS[d.statut]}>{STATUT_DOS_LABEL[d.statut]}</Chip>
              </div>);})}
            </div>
          </div>
        </div>
      ):null}

      {zone==="forces"?(
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-bold">Matrice de Disponibilité — {UNITES_PNR.length} unités</p>
            <button onClick={function(){setShowAudit(true);}} className="text-yellow-400 text-xs font-bold border border-yellow-700/40 px-3 py-1.5 rounded-lg">🔍 Mode Audit</button>
          </div>
          {UNITES_PNR.map(function(u){
            var pctEffectif=Math.round(u.effectif_service/u.effectif_total*100);
            var pctVeh=Math.round(u.vehicules_op/u.vehicules_total*100);
            return(<div key={u.id} onClick={function(){setSelUnite(u);setShowAudit(true);}} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 cursor-pointer hover:border-slate-500">
              <div className="flex items-center justify-between mb-3">
                <div><p className="text-white font-bold text-sm">{u.nom}</p><p className="text-slate-500 text-xs">{u.chef}</p></div>
                <Chip color={pctEffectif>=70?"#22C55E":pctEffectif>=50?"#F59E0B":"#DC2626"}>{pctEffectif}% dispo</Chip>
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div><p className="text-slate-400 text-[10px] uppercase">Effectif</p><p className="text-white font-bold text-sm">{u.effectif_service}/{u.effectif_total}</p></div>
                <div><p className="text-slate-400 text-[10px] uppercase">Véhicules</p><p className="text-white font-bold text-sm">{u.vehicules_op}/{u.vehicules_total}</p></div>
                <div><p className="text-slate-400 text-[10px] uppercase">Carburant</p><p style={{color:u.carburant<50?"#DC2626":"#22C55E"}} className="font-bold text-sm">{u.carburant}%</p></div>
                <div><p className="text-slate-400 text-[10px] uppercase">Armement</p><p style={{color:u.armement<80?"#F59E0B":"#22C55E"}} className="font-bold text-sm">{u.armement}%</p></div>
              </div>
              <div className="mt-2 flex gap-2">
                <div className="flex-1"><div className="bg-slate-700 rounded-full h-1.5"><div style={{width:pctEffectif+"%",background:"#3B82F6"}} className="h-1.5 rounded-full"></div></div></div>
                <div className="flex-1"><div className="bg-slate-700 rounded-full h-1.5"><div style={{width:pctVeh+"%",background:"#22C55E"}} className="h-1.5 rounded-full"></div></div></div>
              </div>
            </div>);
          })}
        </div>
      ):null}

      {zone==="veille"?(
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-4">📈 Tendances Criminalité — Comparaison S vs S-1</p>
            <div style={{height:200}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TENDANCES_PNR}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B"/>
                  <XAxis dataKey="semaine" tick={{fill:"#64748B",fontSize:11}}/>
                  <YAxis tick={{fill:"#64748B",fontSize:11}}/>
                  <Tooltip contentStyle={{background:"#0F172A",border:"1px solid #1E293B",borderRadius:8}}/>
                  <Legend/>
                  <Bar dataKey="n1" name="Urgence 1" fill="#DC2626" radius={[4,4,0,0]}/>
                  <Bar dataKey="n2" name="Urgence 2" fill="#F59E0B" radius={[4,4,0,0]}/>
                  <Bar dataKey="n3" name="Urgence 3" fill="#3B82F6" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">📬 Boîte Renseignements Sécurisée</p>
            <div className="space-y-2">
              {notes.map(function(n){return(<div key={n.id} onClick={function(){toggleNoteLu(n.id);}} className={"rounded-xl p-3 cursor-pointer border "+(n.lu?"border-slate-700 bg-slate-900/50":"border-blue-700/40 bg-blue-900/10")}>
                <div className="flex items-center gap-2 mb-1">
                  <Chip color={n.priorite==="critique"?"#DC2626":n.priorite==="haute"?"#F59E0B":"#3B82F6"}>{n.priorite}</Chip>
                  <span className="text-slate-500 text-[10px]">{n.origine} · {n.date}</span>
                  {!n.lu&&<span className="text-blue-400 text-[10px] font-bold ml-auto">● NON LU</span>}
                </div>
                <p className="text-slate-200 text-sm font-semibold">{n.titre}</p>
              </div>);})}
            </div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">📊 Incidents par unité cette semaine</p>
            <div style={{height:180}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={UNITES_PNR} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B"/>
                  <XAxis type="number" tick={{fill:"#64748B",fontSize:10}}/>
                  <YAxis type="category" dataKey="nom" tick={{fill:"#64748B",fontSize:10}} width={120}/>
                  <Tooltip contentStyle={{background:"#0F172A",border:"1px solid #1E293B",borderRadius:8}}/>
                  <Bar dataKey="incidents_semaine" name="Incidents" fill="#8B5CF6" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ):null}
    </div>
  );
}
