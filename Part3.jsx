import { Ecusson, StatCard, Chip, CorpsBadge, LoginScreen, MainCourante, GavTimer, GardesVue, Patrouilles, Vehicules, Plaintes, gradesDe, gradeLabel, Carrieres, CalendrierOperationnel, estDestinataire, Notes, Messagerie, ControleVoyageurs, DashboardFrontieres, DataScientistFrontieres, DataScientist, AlertBanniere, AIBloc, DataScientistDL, DataScientistPersonnel, DataScientistDAF, ChatbotIntegre, DataScientistCommissariat, COMPTES, LOGO_POLICE_B64, INCIDENTS_DATA, GRAVITE_COLOR, STATUT_LABEL, GARDES_VUE_DATA, PATROUILLES_DATA, STATUT_PATROUILLE_LABEL, VEHICULES_DATA, STATUT_VEHICULE_LABEL, PLAINTES_DATA, STATUT_PLAINTE_LABEL, STATUT_PLAINTE_COLOR, GRADES_POLICE, GRADES_GENDARMERIE, AGENTS_DATA, AGENT_PROFILS_MAP, STATUT_CARRIERE_LABEL, STATUT_CARRIERE_COLOR, FORMATIONS_OBLIGATOIRES_DATA, SESSIONS_FORMATION_DATA, ASPIRATIONS_DATA, DISPONIBILITE_DATA, ABSENTEISME_DATA, EVOLUTION_EFFECTIFS_DATA, TYPE_LABEL, TYPE_COLOR, STATUT_EVT_LABEL, STATUT_EVT_COLOR, EVENTS_DATA, PRIORITE_NOTE, NOTES_DATA, MESSAGES_DATA, RECHERCHES_DATA, STATUT_RCH_COLOR, STATUT_RCH_LABEL, VOYAGEURS_RECENTS, SAISIES_DATA, STATUT_SAISIE_COLOR, STATUT_SAISIE_LABEL, POINTS_FRONTALIERS_DATA, STATUT_EQUIPEMENT_COLOR, STATUT_EQUIPEMENT_LABEL, TYPE_POSTE_LABEL, FLUX_HORAIRE_DATA, INTERDICTIONS_DATA, STATUT_INTERDICTION_COLOR, STATUT_INTERDICTION_LABEL, REFOULEMENTS_DATA, BUDGET_POSTES, PERF_COMMISSARIATS, BZV_MAP } from './Part1.jsx';
import { DataScientistRouter, GestionBudget, EtatMajor, RapportsInstitutionnels, PistesIA, DashboardCFP, CommandementTerritorialCFP, DashboardDAF, TachesDAF, BudgetPrevisionsDAF, InventairePatrimoine, PatrimoineTreemapCell, DashboardDL, ParcAutomobileDL, ArmurerieDL, InfrastructuresDL, FournituresDL, CommandesDL, DashboardPersonnel, EDossierPersonnel, GestionAffectations, PlanningPresence, AcademieFormation, CarrieresMobilite, DashboardDPJ, PilotageDPJ, ActionsDPJ, DetailDPJ, DataScientistDPJ, DashboardAccidents, ConstatNumerique, CartographieRisques, DataScientistAccidents, ActionsAccidents, JaugeISG, ENGAGEMENTS_DATA, STC_ENG, STL_ENG, SEUIL_VALIDATION_COMMANDANT, COMMANDEMENTS_TERRITORIAUX_DATA, STATUT_COMMANDEMENT_COLOR, STATUT_COMMANDEMENT_LABEL, GROUPES_INTERVENTION_DATA, STATUT_GI_COLOR, STATUT_GI_LABEL, DIRECTIONS_CENTRALES_CFP, SERVICES_SOUS_CFP, BATIMENTS_DATA, EQUIPEMENTS_LOURDS_DATA, PATRIMOINE_CATEGORIES, STOCKS_DATA, TRAVAUX_DATA, CONTRATS_MAINTENANCE_DATA, ARMES_DATA, GILETS_DATA, FICHE_VIE_MAP, USURE_DATA, REPARATIONS_ATELIER_DATA, COUTS_LOGISTIQUES_DATA, ARRONDISSEMENT_DISPO_DATA, FLUX_DISTRIBUTION_DATA, ENQUETES_DATA, STATUT_ENQ_LABEL, STATUT_ENQ_COLOR, TYPOLOGIE_CRIMES_DATA, EVOLUTION_CRIMINALITE_30J, COLD_CASES_DATA, ACCIDENTS_DATA, GRAVITE_ACC_LABEL, GRAVITE_ACC_COLOR, STATUT_ACC_LABEL, ETAPES_ACC, DOMAINE_RENS_LABEL, DOMAINE_RENS_COLOR, NIVEAU_RENS_COLOR, NIVEAU_RENS_LABEL, SIGNAUX_FAIBLES_DATA, FICHES_RENSEIGNEMENT_DATA, STATUT_FR_LABEL, STATUT_FR_COLOR, ACTEURS_DATA, POSTURE_COLOR, POSTURE_LABEL, RESEAU_NODES_DATA, RESEAU_LIENS_DATA, FORCE_LIEN_COLOR, NOTES_TRANSMISES_DATA, STATUT_NOTE_COLOR, STATUT_NOTE_LABEL, ISG_SOUS_INDICES } from './Part2.jsx';
function DashboardDRG(props) {
  var compte = props.compte;
  var isgValue = Math.round(ISG_SOUS_INDICES.reduce(function (s, i) { return s + i.valeur; }, 0) / ISG_SOUS_INDICES.length);
  var signauxRecents = SIGNAUX_FAIBLES_DATA.slice().sort(function (a, b) { return (b.date + b.heure) > (a.date + a.heure) ? 1 : -1; }).slice(0, 6);
  var dossiersRouges = SIGNAUX_FAIBLES_DATA.filter(function (s) { return s.niveau === "critique"; });
  var notifState = useState({});
  var notif = notifState[0]; var setNotif = notifState[1];

  function validerTransfert(id) {
    setNotif(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Dossier valide et transfere a la chaine de transmission decisionnelle."; return c; });
  }

  var ZONES_TENSION = [
    { nom: "Bacongo", x: 90, y: 230 }, { nom: "Talangai", x: 200, y: 80 }, { nom: "Moungali", x: 150, y: 150 },
    { nom: "Makelekele", x: 55, y: 270 }, { nom: "Centre-ville PNR", x: 380, y: 190 }, { nom: "Zone portuaire PNR", x: 440, y: 260 }
  ];
  function niveauZone(nom) {
    var cle = nom.toLowerCase().slice(0, 5);
    var sig = SIGNAUX_FAIBLES_DATA.filter(function (s) { return s.lieu.toLowerCase().indexOf(cle) >= 0; });
    if (sig.some(function (s) { return s.niveau === "critique"; })) { return "critique"; }
    if (sig.some(function (s) { return s.niveau === "eleve"; })) { return "eleve"; }
    if (sig.length > 0) { return "moyen"; }
    return "faible";
  }

  var notificationsCentralisation = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique"; }).slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Centre d Analyse et d Anticipation</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-purple-800 rounded-full px-3 py-1.5"><Lock size={14} className="text-purple-400" /><span className="text-slate-300 text-xs font-bold">Donnees chiffrees — Sources protegees</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5 flex flex-col items-center justify-center lg:col-span-1">
          <p className="text-white font-bold text-sm mb-1 self-start">Indice de Stabilite Globale</p>
          <JaugeISG value={isgValue} />
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5 lg:col-span-2">
          <p className="text-white font-bold text-sm mb-3">Sous-indices de stabilite</p>
          <div className="space-y-3">
            {ISG_SOUS_INDICES.map(function (s) {
              return (
                <div key={s.nom}>
                  <div className="flex items-center justify-between text-xs mb-1"><span className="text-slate-300 font-semibold">{s.nom}</span><span style={{ color: s.color }} className="font-bold">{s.valeur}/100</span></div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: s.valeur + "%", background: s.color }}></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {dossiersRouges.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Dossiers Rouges — menace imminente, validation requise</p>
          <div className="space-y-2">
            {dossiersRouges.map(function (s) {
              return (
                <div key={s.id} className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 flex-wrap">
                  <div><p className="text-white text-sm font-semibold">{s.titre}</p><p className="text-slate-500 text-xs">{s.lieu} — {s.date} {s.heure}</p></div>
                  {notif[s.id] ? <span className="text-green-400 text-xs font-bold">✓ {notif[s.id]}</span> : <button onClick={function () { validerTransfert(s.id); }} className="bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0">Valider transfert</button>}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Carte des Tensions — Heatmap</p>
          <p className="text-slate-500 text-xs mb-3">Brazzaville et Pointe-Noire</p>
          <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 300 }}>
            <svg width="100%" height="100%" viewBox="0 0 520 320">
              <rect width="520" height="320" fill="#0B1120" />
              <line x1="260" y1="0" x2="260" y2="320" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
              <text x="55" y="20" fill="#64748B" fontSize="10" fontWeight="bold">BRAZZAVILLE</text>
              <text x="365" y="20" fill="#64748B" fontSize="10" fontWeight="bold">POINTE-NOIRE</text>
              {ZONES_TENSION.map(function (z) {
                var niv = niveauZone(z.nom);
                var col = NIVEAU_RENS_COLOR[niv];
                var r = niv === "critique" ? 34 : niv === "eleve" ? 28 : niv === "moyen" ? 22 : 16;
                return (<g key={z.nom}><circle cx={z.x} cy={z.y} r={r} fill={col} opacity="0.22" /><circle cx={z.x} cy={z.y} r={10} fill={col} opacity="0.85" /><text x={z.x} y={z.y - r - 6} textAnchor="middle" fill="#94A3B8" fontSize="9">{z.nom}</text></g>);
              })}
            </svg>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Flux des Signaux Faibles</p>
          <div className="space-y-2 max-h-72 overflow-auto">
            {signauxRecents.map(function (s) {
              return (
                <div key={s.id} className="flex items-start justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: NIVEAU_RENS_COLOR[s.niveau] }}>
                  <div className="min-w-0"><p className="text-white text-xs font-semibold">{s.titre}</p><p className="text-slate-500 text-[11px]">{s.lieu} — {s.date} {s.heure}</p></div>
                  <Chip color={DOMAINE_RENS_COLOR[s.domaine]}>{DOMAINE_RENS_LABEL[s.domaine]}</Chip>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-5">
        <p className="text-purple-300 font-black text-xs uppercase mb-1">🧠 Intelligence Collective — Notifications de centralisation</p>
        <p className="text-slate-500 text-xs mb-3">Faits saisis par d autres unites, identifies par l IA comme d interet national potentiel</p>
        <div className="space-y-2">
          {notificationsCentralisation.map(function (i) {
            return (<div key={i.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{i.type} — {i.lieu} <span className="text-slate-600">({i.auteur})</span></span><Chip color={GRAVITE_COLOR[i.gravite]}>{i.gravite}</Chip></div>);
          })}
        </div>
      </div>
    </div>
  );
}

function SuiteAnticipationDRG(props) {
  var compte = props.compte;
  var tabState = useState("recherche");
  var tab = tabState[0]; var setTab = tabState[1];
  var requeteState = useState("");
  var requete = requeteState[0]; var setRequete = requeteState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });
  var selectedNode = useState(null);
  var nodeSel = selectedNode[0]; var setNodeSel = selectedNode[1];

  var SYS = "Tu es l assistant d analyse de la Direction des Renseignements Generaux (DRG) de la Republique du Congo. Tu travailles en mode Centre d Analyse et d Anticipation. Reponds en francais, de maniere structuree, factuelle et strictement professionnelle, sans jamais inventer de noms reels de personnes ou d organisations existantes — utilise uniquement les donnees fictives fournies dans le contexte de cette plateforme de demonstration.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var TABS = [["recherche", "Moteur Semantique", "🔎"], ["reseau", "Cartographie des Reseaux", "🕸️"], ["predictif", "Analyse Predictive", "🔮"]];
  var liensDuNode = nodeSel ? RESEAU_LIENS_DATA.filter(function (l) { return l.source === nodeSel || l.target === nodeSel; }) : [];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Suite d Anticipation</h2><p className="text-slate-500 text-xs">Outils d analyse et de recoupement — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-purple-700 text-white border-purple-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "recherche" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Moteur de Recherche Semantique — Big Data Interne</p>
            <p className="text-slate-500 text-xs mb-3">Scanne les rapports, PV, notes de service et fiches de renseignement pour faire ressortir les liens caches</p>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 mb-2">
              <Search size={15} className="text-slate-500 shrink-0" />
              <input value={requete} onChange={function (e) { setRequete(e.target.value); }} placeholder="Ex: vehicule blanc, port autonome, manifestation, tract..." className="bg-transparent text-white text-sm outline-none w-full placeholder-slate-600" />
            </div>
            <button onClick={function () {
              if (!requete.trim()) { return; }
              var ctx = "Fiches de renseignement: " + JSON.stringify(FICHES_RENSEIGNEMENT_DATA.map(function (f) { return { id: f.id, titre: f.titre, domaine: f.domaine, niveau: f.niveau }; })) + " | Signaux faibles: " + JSON.stringify(SIGNAUX_FAIBLES_DATA.map(function (s) { return { titre: s.titre, lieu: s.lieu, domaine: s.domaine, niveau: s.niveau, description: s.description }; })) + " | Incidents Police/Gendarmerie: " + JSON.stringify(INCIDENTS_DATA.map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite }; })) + " | Acteurs suivis: " + JSON.stringify(ACTEURS_DATA.map(function (a) { return { nom: a.nom, type: a.type, posture: a.posture }; }));
              callIA(ai1[1], "Tu es le moteur de recherche semantique interne de la DRG. Pour la requete '" + requete + "', analyse l ensemble des donnees fournies et fais ressortir: 1) Les elements directement pertinents (fiches, signaux, incidents, acteurs) 2) Les LIENS CACHES entre ces elements qui ne seraient pas visibles a une lecture isolee (memes lieux, memes dates, memes acteurs, memes themes) 3) Un niveau de pertinence pour chaque resultat (Fort/Moyen/Faible) 4) Une recommandation sur la suite a donner. Donnees disponibles: " + ctx);
            }} className="bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Lancer la recherche semantique</button>
            <AIBloc state={ai1[0]} />
          </div>
        </div>
      ) : null}

      {tab === "reseau" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Cartographie des Reseaux — Link Analysis</p>
            <p className="text-slate-500 text-xs mb-3">Cliquez sur un noeud pour afficher ses connexions. L IA relie automatiquement les acteurs apparaissant dans des rapports distincts.</p>
            <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 320 }}>
              <svg width="100%" height="100%" viewBox="0 0 500 280">
                <rect width="500" height="280" fill="#0B1120" />
                {RESEAU_LIENS_DATA.map(function (l, idx) {
                  var s = RESEAU_NODES_DATA.find(function (n) { return n.id === l.source; });
                  var t = RESEAU_NODES_DATA.find(function (n) { return n.id === l.target; });
                  if (!s || !t) { return null; }
                  var highlighted = nodeSel && (l.source === nodeSel || l.target === nodeSel);
                  return <line key={idx} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={FORCE_LIEN_COLOR[l.force]} strokeWidth={highlighted ? 3 : 1.5} opacity={!nodeSel || highlighted ? 0.9 : 0.15} />;
                })}
                {RESEAU_NODES_DATA.map(function (n) {
                  var isSel = nodeSel === n.id;
                  var col = n.type === "individu" ? "#F59E0B" : n.type === "organisation" ? "#3B82F6" : "#A855F7";
                  return (
                    <g key={n.id} style={{ cursor: "pointer" }} onClick={function () { setNodeSel(isSel ? null : n.id); }}>
                      <circle cx={n.x} cy={n.y} r={isSel ? 22 : 16} fill={col} opacity={isSel ? 1 : 0.75} stroke="#fff" strokeWidth={isSel ? 2 : 0} />
                      <text x={n.x} y={n.y + 32} textAnchor="middle" fill="#CBD5E1" fontSize="9">{n.nom.length > 18 ? n.nom.slice(0, 16) + "…" : n.nom}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            {nodeSel ? (
              <div className="mt-3 bg-slate-900 rounded-xl border border-slate-700 p-3">
                <p className="text-white text-xs font-bold mb-2">Connexions de {RESEAU_NODES_DATA.find(function (n) { return n.id === nodeSel; }).nom}</p>
                <div className="space-y-1.5">
                  {liensDuNode.map(function (l, idx) {
                    var other = RESEAU_NODES_DATA.find(function (n) { return n.id === (l.source === nodeSel ? l.target : l.source); });
                    return (<div key={idx} className="flex items-center justify-between text-xs"><span className="text-slate-300">↔ {other ? other.nom : "?"}</span><Chip color={FORCE_LIEN_COLOR[l.force]}>{l.type}</Chip></div>);
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <button onClick={function () {
            var ctx = "Noeuds: " + JSON.stringify(RESEAU_NODES_DATA.map(function (n) { return { nom: n.nom, type: n.type }; })) + " | Liens connus: " + JSON.stringify(RESEAU_LIENS_DATA.map(function (l) { var s = RESEAU_NODES_DATA.find(function (x) { return x.id === l.source; }); var t = RESEAU_NODES_DATA.find(function (x) { return x.id === l.target; }); return { de: s ? s.nom : l.source, vers: t ? t.nom : l.target, type: l.type, force: l.force }; })) + " | Fiches de renseignement: " + JSON.stringify(FICHES_RENSEIGNEMENT_DATA.map(function (f) { return { titre: f.titre, domaine: f.domaine, niveau: f.niveau }; }));
            callIA(ai2[1], "Tu es l outil de cartographie des reseaux (link analysis) de la DRG. A partir des noeuds et des liens connus fournis, identifie: 1) Les CONNEXIONS CACHEES probables non encore formalisees (acteurs susceptibles d etre lies indirectement) avec justification 2) Le noeud le plus central du reseau (capacite d influence ou de coordination) 3) Le scenario de convergence le plus probable si ces acteurs se coordonnaient 4) Une recommandation de surveillance prioritaire. Donnees: " + ctx);
          }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🕸️ Detecter les connexions cachees</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}

      {tab === "predictif" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Module d Analyse Predictive — Scenarios de Risque</p>
            <p className="text-slate-500 text-xs mb-3">L IA modelise les scenarios les plus probables sur la base des signaux des 48 dernieres heures</p>
            <button onClick={function () {
              var ctx = "Signaux faibles 48h: " + JSON.stringify(SIGNAUX_FAIBLES_DATA.slice(0, 5).map(function (s) { return { titre: s.titre, lieu: s.lieu, domaine: s.domaine, niveau: s.niveau, date: s.date, heure: s.heure }; })) + " | Indice de stabilite par dimension: " + JSON.stringify(ISG_SOUS_INDICES) + " | Acteurs a risque: " + JSON.stringify(ACTEURS_DATA.filter(function (a) { return a.posture === "hostile"; }).map(function (a) { return { nom: a.nom, domaine: a.domaine, influence: a.influence }; }));
              callIA(ai3[1], "Tu es le module d analyse predictive de la DRG. Genere exactement 3 SCENARIOS DE RISQUE pour les prochaines 12 a 24 heures a Brazzaville et Pointe-Noire, sur le modele suivant pour chacun: Scenario [lettre]: [titre court] / Probabilite estimee: [pourcentage] / Zone(s) concernee(s) / Declencheur probable / Impact attendu sur l ordre public / Mesure preventive recommandee. Base-toi strictement sur les donnees fournies, sois chiffre et operationnel pour le Directeur des Renseignements. Donnees: " + ctx);
            }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔮 Generer les scenarios de risque 24h</button>
            <AIBloc state={ai3[0]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ChaineTransmissionDRG(props) {
  var compte = props.compte;
  var tabState = useState("redaction");
  var tab = tabState[0]; var setTab = tabState[1];
  var noteState = useState("");
  var noteTexte = noteState[0]; var setNoteTexte = noteState[1];
  var ai1 = useState({ loading: false, result: null });
  var destState = useState("Primature");
  var destinataire = destState[0]; var setDestinataire = destState[1];
  var niveauState = useState("moyen");
  var niveauNote = niveauState[0]; var setNiveauNote = niveauState[1];
  var transfertsState = useState([]);
  var transferts = transfertsState[0]; var setTransferts = transfertsState[1];
  var serviceRecoupState = useState("DCPJ Brazzaville");
  var serviceRecoup = serviceRecoupState[0]; var setServiceRecoup = serviceRecoupState[1];
  var objetRecoupState = useState("");
  var objetRecoup = objetRecoupState[0]; var setObjetRecoup = objetRecoupState[1];
  var demandesState = useState([]);
  var demandes = demandesState[0]; var setDemandes = demandesState[1];
  var templateNoteState = useState("synthese");
  var templateNote = templateNoteState[0]; var setTemplateNote = templateNoteState[1];
  var confidentialiteState = useState("Confidentiel");
  var confidentialite = confidentialiteState[0]; var setConfidentialite = confidentialiteState[1];
  var fiabiliteState = useState("B");
  var fiabilite = fiabiliteState[0]; var setFiabilite = fiabiliteState[1];

  var TEMPLATES_NOTE = [
    { id: "flash", label: "Note Flash", desc: "Information urgente a chaud, format court" },
    { id: "synthese", label: "Note de Synthese", desc: "Analyse structuree d une situation" },
    { id: "anticipation", label: "Note d Anticipation", desc: "Projection et scenarios a moyen terme" }
  ];
  var CONFIDENTIALITE_NIVEAUX = ["Public", "Restreint", "Confidentiel", "Secret"];
  var FIABILITE_NIVEAUX = [["A", "Totalement fiable"], ["B", "Habituellement fiable"], ["C", "Assez fiable"], ["D", "Pas habituellement fiable"], ["E", "Fiabilite non appreciable"]];

  var SYS = "Tu es l assistant de redaction de la Direction des Renseignements Generaux (DRG) de la Republique du Congo. Tu rediges des notes de synthese institutionnelles en francais, format officiel (Objet / Constat / Analyse / Recommandation), concises et destinees a la haute autorite. N invente aucun nom reel, utilise uniquement les elements fictifs fournis.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  function genererNote() {
    var structureParTemplate = { flash: "Format NOTE FLASH (urgence, tres court): 1) OBJET (une ligne) 2) FAITS (3-4 lignes maximum, chiffres cles) 3) ACTION IMMEDIATE ATTENDUE.", synthese: "Format NOTE DE SYNTHESE (structure complete): 1) OBJET 2) CONSTAT 3) ANALYSE 4) RECOMMANDATION.", anticipation: "Format NOTE D ANTICIPATION (projection): 1) OBJET 2) TENDANCE OBSERVEE 3) SCENARIOS PROBABLES A 1-3 MOIS (avec probabilite indicative) 4) RECOMMANDATION PREVENTIVE." }[templateNote];
    var libelleTemplate = TEMPLATES_NOTE.filter(function (t) { return t.id === templateNote; })[0].label;
    var ctx = "Signaux faibles recents: " + JSON.stringify(SIGNAUX_FAIBLES_DATA.slice(0, 5)) + " | Fiches de renseignement validees: " + JSON.stringify(FICHES_RENSEIGNEMENT_DATA.filter(function (f) { return f.statut === "validee"; }).map(function (f) { return { titre: f.titre, domaine: f.domaine, niveau: f.niveau }; })) + " | Indice de stabilite globale actuel: " + Math.round(ISG_SOUS_INDICES.reduce(function (s, i) { return s + i.valeur; }, 0) / ISG_SOUS_INDICES.length) + " | Confidentialite: " + confidentialite + " | Fiabilite de la source (echelle A-E): " + fiabilite;
    callIA(ai1[1], "Redige une " + libelleTemplate + " officielle de la DRG destinee a la haute autorite (" + destinataire + "), niveau de sensibilite " + niveauNote + ", indice de confidentialite " + confidentialite + ", fiabilite de la source " + fiabilite + " sur une echelle A (totalement fiable) a E (non appreciable). " + structureParTemplate + " Sois sobre, factuel, sans alarmisme inutile, et ne devoile jamais la source brute. Element de depart redige par l analyste: '" + (noteTexte.trim() ? noteTexte : "Aucune note manuscrite fournie, base-toi sur les donnees ci-dessous.") + "'. Donnees disponibles: " + ctx);
  }

  function envoyerTransfert() {
    var id = "NS-2026-" + (100 + transferts.length);
    var nouvelle = { id: id, titre: noteTexte.trim() ? noteTexte.slice(0, 60) : "Note de synthese DRG", destinataire: destinataire, niveau: niveauNote, statut: "transmise", heureEnvoi: new Date().toLocaleTimeString("fr-FR"), confidentialite: confidentialite, fiabilite: fiabilite };
    setTransferts(function (prev) { return [nouvelle].concat(prev); });
    setTimeout(function () {
      setTransferts(function (prev) { return prev.map(function (t) { if (t.id !== id) { return t; } var c = {}; for (var k in t) { c[k] = t[k]; } c.statut = "accuse_reception"; return c; }); });
    }, 3500);
  }

  function envoyerRecoupement() {
    if (!objetRecoup.trim()) { return; }
    var id = "REQ-" + Date.now();
    setDemandes(function (prev) { return [{ id: id, service: serviceRecoup, objet: objetRecoup, date: new Date().toLocaleString("fr-FR"), statut: "envoyee" }].concat(prev); });
    setObjetRecoup("");
  }

  var TABS = [["redaction", "Rediger Note de Synthese", "📝"], ["transfert", "Transfert Haute Autorite", "🔐"], ["recoupement", "Enquete de Recoupement", "🔁"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Chaine de Transmission Decisionnelle</h2><p className="text-slate-500 text-xs">De l information brute a la decision — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-purple-700 text-white border-purple-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "redaction" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
          <p className="text-white font-bold text-sm">Editeur de Note de Synthese</p>
          <p className="text-slate-500 text-xs">Redaction libre ou assistee par l IA, integrant automatiquement les donnees des autres modules</p>
          <div className="flex gap-2 flex-wrap">
            {TEMPLATES_NOTE.map(function (t) {
              var isA = templateNote === t.id;
              return <button key={t.id} onClick={function () { setTemplateNote(t.id); }} title={t.desc} className={"px-3 py-1.5 rounded-lg text-xs font-bold border " + (isA ? "bg-purple-700 border-purple-600 text-white" : "border-slate-700 text-slate-400")}>{t.label}</button>;
            })}
          </div>
          <textarea value={noteTexte} onChange={function (e) { setNoteTexte(e.target.value); }} rows={6} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" placeholder="Points cles a integrer dans la note (facultatif — l IA peut rediger a partir des donnees seules)..." />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-slate-500 text-xs mb-1">Indice de Confidentialite</p>
              <select value={confidentialite} onChange={function (e) { setConfidentialite(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                {CONFIDENTIALITE_NIVEAUX.map(function (c) { return <option key={c} value={c}>{c}</option>; })}
              </select>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Fiabilite de la Source (echelle A-E)</p>
              <select value={fiabilite} onChange={function (e) { setFiabilite(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                {FIABILITE_NIVEAUX.map(function (f) { return <option key={f[0]} value={f[0]}>{f[0]} — {f[1]}</option>; })}
              </select>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">📊 Inserer un graphique</button>
            <button className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">🗺️ Inserer la carte des tensions</button>
            <button className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">📷 Inserer une photo</button>
          </div>
          <button onClick={genererNote} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🤖 Generer / structurer la note avec l IA (chiffrement integre)</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "transfert" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
            <p className="text-white font-bold text-sm">Transfert Securise — Haute Autorite</p>
            <p className="text-slate-500 text-xs">Envoi crypte vers les tablettes des autorites locales ou gouvernementales</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-slate-500 text-xs mb-1">Destinataire</p>
                <select value={destinataire} onChange={function (e) { setDestinataire(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                  <option>Presidence</option>
                  <option>Primature</option>
                  <option>Prefecture de Brazzaville</option>
                  <option>Prefecture de Pointe-Noire</option>
                  <option>Commandement des Forces de Police</option>
                </select>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">Niveau de sensibilite</p>
                <select value={niveauNote} onChange={function (e) { setNiveauNote(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                  <option value="moyen">Moyen</option>
                  <option value="eleve">Eleve</option>
                  <option value="critique">Critique</option>
                </select>
              </div>
            </div>
            <button onClick={envoyerTransfert} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔐 Transferer via canal crypte</button>
          </div>
          <div className="space-y-2">
            {transferts.concat(NOTES_TRANSMISES_DATA).map(function (t, idx) {
              return (
                <div key={t.id + "-" + idx} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-white text-sm font-semibold">{t.titre}</p>
                    <p className="text-slate-500 text-xs">{t.destinataire} {t.heureEnvoi ? "— " + t.heureEnvoi : t.date ? "— " + t.date : ""}</p>
                    {t.confidentialite ? <div className="flex items-center gap-1.5 mt-1"><Chip color="#8B5CF6">{t.confidentialite}</Chip><Chip color="#64748B">Fiabilite {t.fiabilite}</Chip></div> : null}
                  </div>
                  <Chip color={STATUT_NOTE_COLOR[t.statut]}>{t.statut === "accuse_reception" ? "✓ Accuse de reception" : "⏳ En transit (chiffre)"}</Chip>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {tab === "recoupement" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
            <p className="text-white font-bold text-sm">Lancer une Enquete de Recoupement</p>
            <p className="text-slate-500 text-xs">Demande d information adressee a un service, sans reveler la source du renseignement original</p>
            <div>
              <p className="text-slate-500 text-xs mb-1">Service sollicite</p>
              <select value={serviceRecoup} onChange={function (e) { setServiceRecoup(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                <option>DCPJ Brazzaville</option>
                <option>Direction de la Logistique</option>
                <option>Direction du Personnel</option>
                <option>Controle Voyageurs et Frontieres</option>
              </select>
            </div>
            <textarea value={objetRecoup} onChange={function (e) { setObjetRecoup(e.target.value); }} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" placeholder="Objet precis de la demande (ex: verifier proprietaire vehicule, identifier numero, confirmer presence sur un lieu)..." />
            <button onClick={envoyerRecoupement} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔁 Envoyer la demande anonymisee</button>
          </div>
          <div className="space-y-2">
            {demandes.map(function (d) {
              return (<div key={d.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><div className="flex items-center justify-between gap-2 flex-wrap"><p className="text-white text-sm font-semibold">{d.service}</p><Chip color="#F59E0B">Envoyee — source protegee</Chip></div><p className="text-slate-400 text-xs mt-1">{d.objet}</p><p className="text-slate-600 text-[11px] mt-1">{d.date}</p></div>);
            })}
            {demandes.length === 0 ? <p className="text-slate-500 text-sm">Aucune demande de recoupement envoyee pour le moment.</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MemoireSecuriseeDRG(props) {
  var compte = props.compte;
  var onNavigate = props.onNavigate;
  var tabState = useState("fiches");
  var tab = tabState[0]; var setTab = tabState[1];
  var domaineFiltreState = useState("tous");
  var domaineFiltre = domaineFiltreState[0]; var setDomaineFiltre = domaineFiltreState[1];

  var fichesState = useState(FICHES_RENSEIGNEMENT_DATA.map(function (f) { var c = {}; for (var k in f) { c[k] = f[k]; } return c; }));
  var ficheList = fichesState[0]; var setFicheList = fichesState[1];
  var formOuvertState = useState(false);
  var formOuvert = formOuvertState[0]; var setFormOuvert = formOuvertState[1];
  var ftitreState = useState(""); var ftitre = ftitreState[0]; var setFtitre = ftitreState[1];
  var fdomaineState = useState("social"); var fdomaine = fdomaineState[0]; var setFdomaine = fdomaineState[1];
  var fniveauState = useState("moyen"); var fniveau = fniveauState[0]; var setFniveau = fniveauState[1];
  var fsourceState = useState(""); var fsource = fsourceState[0]; var setFsource = fsourceState[1];

  function creerFiche() {
    if (!ftitre.trim() || !fsource.trim()) { return; }
    var nf = { id: "FR-2026-" + (100 + ficheList.length), domaine: fdomaine, titre: ftitre, date: new Date().toISOString().slice(0, 10), source: fsource, niveau: fniveau, statut: "en_cours" };
    setFicheList(function (prev) { return [nf].concat(prev); });
    setFtitre(""); setFsource(""); setFormOuvert(false);
  }

  var DOMAINES = ["tous", "social", "economique", "politique", "religieux", "securitaire"];
  var fichesFiltrees = domaineFiltre === "tous" ? ficheList : ficheList.filter(function (f) { return f.domaine === domaineFiltre; });
  var TABS = [["fiches", "Gestion des Fiches de Renseignement", "🗂️"], ["acteurs", "Bibliotheque des Acteurs", "👥"], ["historique", "Historique des Actions", "📜"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-violet-950 border border-purple-700 flex items-center justify-center text-2xl shrink-0">🔒</div>
        <div><h2 className="text-2xl font-black text-white">Memoire Securisee</h2><p className="text-slate-500 text-xs">Cloisonnement actif — donnees chiffrees par defaut — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-purple-700 text-white border-purple-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "fiches" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {DOMAINES.map(function (d) { var isA = domaineFiltre === d; return <button key={d} onClick={function () { setDomaineFiltre(d); }} style={isA && d !== "tous" ? { background: DOMAINE_RENS_COLOR[d] + "33", borderColor: DOMAINE_RENS_COLOR[d] } : {}} className={"px-2.5 py-1 rounded-full text-xs font-bold border " + (isA ? "border-white text-white" : "border-slate-700 text-slate-500")}>{d === "tous" ? "Tous" : DOMAINE_RENS_LABEL[d]}</button>; })}
            </div>
            <div className="flex gap-2">
              <button onClick={function () { setFormOuvert(!formOuvert); }} className="bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">{formOuvert ? "Annuler" : "+ Nouvelle fiche"}</button>
              {onNavigate ? <button onClick={function () { onNavigate("suite"); }} className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">🕸️ Voir la cartographie des liens</button> : null}
            </div>
          </div>
          {formOuvert ? (
            <div className="bg-slate-900 rounded-xl border border-purple-800 p-3 space-y-2">
              <input value={ftitre} onChange={function (e) { setFtitre(e.target.value); }} placeholder="Titre de la fiche de renseignement..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
              <div className="grid grid-cols-3 gap-2">
                <select value={fdomaine} onChange={function (e) { setFdomaine(e.target.value); }} className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs">
                  {["social", "economique", "politique", "religieux", "securitaire"].map(function (d) { return <option key={d} value={d}>{DOMAINE_RENS_LABEL[d]}</option>; })}
                </select>
                <select value={fniveau} onChange={function (e) { setFniveau(e.target.value); }} className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs">
                  {["faible", "moyen", "eleve", "critique"].map(function (n) { return <option key={n} value={n}>{NIVEAU_RENS_LABEL[n]}</option>; })}
                </select>
                <input value={fsource} onChange={function (e) { setFsource(e.target.value); }} placeholder="Reference source (ex: HUMINT-11)" className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs" />
              </div>
              <button onClick={creerFiche} className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Enregistrer la fiche</button>
            </div>
          ) : null}
          {fichesFiltrees.map(function (f) {
            return (
              <div key={f.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm font-mono">{f.id}</p><p className="text-slate-300 text-sm">{f.titre}</p><p className="text-slate-500 text-xs mt-0.5">{f.date} — Source classifiee ({f.source})</p></div>
                  <div className="flex flex-col items-end gap-1.5"><Chip color={DOMAINE_RENS_COLOR[f.domaine]}>{DOMAINE_RENS_LABEL[f.domaine]}</Chip><Chip color={STATUT_FR_COLOR[f.statut]}>{STATUT_FR_LABEL[f.statut]}</Chip></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "acteurs" ? (
        <div className="space-y-3">
          {ACTEURS_DATA.map(function (a) {
            return (
              <div key={a.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1.5">
                  <div><p className="text-white font-bold text-sm">{a.nom}</p><p className="text-slate-500 text-xs">{a.type} — Influence {a.influence}</p></div>
                  <div className="flex gap-1.5"><Chip color={DOMAINE_RENS_COLOR[a.domaine]}>{DOMAINE_RENS_LABEL[a.domaine]}</Chip><Chip color={POSTURE_COLOR[a.posture]}>{POSTURE_LABEL[a.posture]}</Chip></div>
                </div>
                <p className="text-slate-400 text-xs">{a.notes}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "historique" ? (
        <div className="space-y-2">
          {NOTES_TRANSMISES_DATA.map(function (n) {
            return (
              <div key={n.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between gap-2 flex-wrap">
                <div><p className="text-white text-sm font-semibold">{n.titre}</p><p className="text-slate-500 text-xs">Vers {n.destinataire} — envoyee le {n.date} a {n.heure}</p>{n.dateAccuse ? <p className="text-green-500 text-[11px]">✓ Accuse de reception : {n.dateAccuse}</p> : null}</div>
                <Chip color={STATUT_NOTE_COLOR[n.statut]}>{STATUT_NOTE_LABEL[n.statut]}</Chip>
              </div>
            );
          })}
          <p className="text-slate-600 text-xs pt-2">Journal immuable — aucune suppression ou modification possible apres envoi.</p>
        </div>
      ) : null}
    </div>
  );
}

function DataScientistDRG(props) {
  var compte = props.compte;
  var tabState = useState("synthese");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });

  var SYS = "Tu es Data Scientist en analyse strategique pour la Direction des Renseignements Generaux (DRG) de la Republique du Congo. Tu reponds en francais, de maniere structuree, concise et directement actionnable par le Directeur des Renseignements, sans jamais inventer de noms reels.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var TABS = [["synthese", "Synthese Nationale", "📋"], ["anticipation", "Anticipation Strategique", "🧭"], ["predictif", "Analyse Predictive DRG", "🔬"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-violet-950 border border-purple-700 flex items-center justify-center text-2xl shrink-0">🧠</div>
        <div><h2 className="text-2xl font-black text-white">Data Scientist IA — DRG</h2><p className="text-slate-500 text-xs">Intelligence strategique assistee — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-purple-700 text-white border-purple-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "synthese" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Synthese de la situation nationale — 7 derniers jours</p>
            <p className="text-slate-500 text-xs mb-3">Agregation des signaux faibles, fiches de renseignement et indice de stabilite</p>
            <button onClick={function () {
              var ctx = "Indice de stabilite globale: " + Math.round(ISG_SOUS_INDICES.reduce(function (s, i) { return s + i.valeur; }, 0) / ISG_SOUS_INDICES.length) + "/100 (" + JSON.stringify(ISG_SOUS_INDICES) + ") | Signaux faibles: " + JSON.stringify(SIGNAUX_FAIBLES_DATA.map(function (s) { return { titre: s.titre, domaine: s.domaine, niveau: s.niveau, lieu: s.lieu }; })) + " | Fiches validees: " + JSON.stringify(FICHES_RENSEIGNEMENT_DATA.filter(function (f) { return f.statut === "validee"; }).map(function (f) { return f.titre; }));
              callIA(ai1[1], "Redige une synthese hebdomadaire de la situation nationale pour le Directeur des Renseignements. Structure: 1) TENDANCE GENERALE (l indice de stabilite s ameliore-t-il ou se degrade-t-il et pourquoi) 2) POINTS DE VIGILANCE PAR DOMAINE (social, economique, politique, religieux, securitaire) 3) DOSSIERS PRIORITAIRES de la semaine 4) RECOMMANDATIONS au Directeur pour la semaine a venir. Donnees: " + ctx);
            }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📋 Generer la synthese hebdomadaire</button>
            <AIBloc state={ai1[0]} />
          </div>
        </div>
      ) : null}

      {tab === "anticipation" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Anticipation Strategique — Horizon 6 mois</p>
            <p className="text-slate-500 text-xs mb-3">Projection des risques structurels pour orienter le dispositif de renseignement</p>
            <button onClick={function () {
              var ctx = "Acteurs suivis: " + JSON.stringify(ACTEURS_DATA.map(function (a) { return { nom: a.nom, domaine: a.domaine, posture: a.posture, influence: a.influence }; })) + " | Tendance des signaux par domaine: " + JSON.stringify(SIGNAUX_FAIBLES_DATA.reduce(function (acc, s) { acc[s.domaine] = (acc[s.domaine] || 0) + 1; return acc; }, {}));
              callIA(ai2[1], "Genere une note d anticipation strategique a 6 mois pour la DRG. Structure: 1) RISQUES STRUCTURELS identifies par domaine (social, economique, politique, religieux, securitaire) 2) ACTEURS A SURVEILLER EN PRIORITE avec justification 3) SCENARIOS D EVOLUTION (favorable / degradation / rupture) avec probabilite indicative 4) BESOINS EN CAPACITE DE RENSEIGNEMENT (sources humaines, veille numerique, partenariats) a renforcer. Donnees: " + ctx);
            }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🧭 Generer la note d anticipation 6 mois</button>
            <AIBloc state={ai2[0]} />
          </div>
        </div>
      ) : null}

      {tab === "predictif" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Analyse Predictive DRG — Correlations Inter-Services</p>
            <p className="text-slate-500 text-xs mb-3">L IA croise l ensemble des rapports PJ, Main Courante et Renseignements pour identifier des correlations invisibles a l oeil humain et generer des scenarios sociopolitiques a court et moyen terme</p>
            <button onClick={function () {
              var ctx = "Incidents Main Courante / PJ: " + JSON.stringify(INCIDENTS_DATA.map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite, corps: i.corps }; })) + " | Enquetes PJ en cours: " + JSON.stringify(ENQUETES_DATA.map(function (e) { return { titre: e.titre, statut: e.statut }; })) + " | Signaux faibles DRG: " + JSON.stringify(SIGNAUX_FAIBLES_DATA.map(function (s) { return { titre: s.titre, domaine: s.domaine, niveau: s.niveau, lieu: s.lieu }; })) + " | Fiches de renseignement: " + JSON.stringify(FICHES_RENSEIGNEMENT_DATA.map(function (f) { return { titre: f.titre, domaine: f.domaine, niveau: f.niveau }; })) + " | Acteurs suivis: " + JSON.stringify(ACTEURS_DATA.map(function (a) { return { nom: a.nom, domaine: a.domaine, posture: a.posture }; }));
              callIA(ai3[1], "Tu croises les rapports de la Police Judiciaire, de la Main Courante et de la DRG pour detecter des CORRELATIONS CACHEES qu une lecture isolee par chaque service ne permettrait pas de voir. Structure de reponse: 1) CORRELATIONS DETECTEES (lieux, periodes, domaines ou acteurs qui se recoupent entre plusieurs sources, avec justification precise) 2) NIVEAU DE CONFIANCE de chaque correlation (Fort/Moyen/Faible) 3) SCENARIOS SOCIOPOLITIQUES a court terme (7 jours) et moyen terme (1-3 mois) decoulant de ces correlations, avec probabilite indicative 4) RECOMMANDATION DE PARTAGE D INFORMATION entre services. Donnees disponibles: " + ctx);
            }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔬 Detecter les correlations inter-services</button>
            <AIBloc state={ai3[0]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DashboardOPJ(props) {
  var compte = props.compte;
  var nomOfficier = compte.nomOfficier || compte.nom;
  var mesEnquetes = ENQUETES_DATA.filter(function (e) { return e.opjAssigne === nomOfficier; });
  var enCours = mesEnquetes.filter(function (e) { return e.statut === "en_cours"; });
  var urgentes = mesEnquetes.filter(function (e) { return (e.gravite === "critique" || e.gravite === "grave") && e.statut !== "cloturee"; });
  var mesGAV = GARDES_VUE_DATA.filter(function (g) { return g.unite === compte.service; });
  var gavCritiques = mesGAV.filter(function (g) { return g.heuresRestantes <= 6 && g.statut === "actif"; });
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var echeancesDuJour = EVENTS_DATA.filter(function (e) { var dt = new Date(e.date + "T00:00:00"); return Math.round((dt - today) / 86400000) === 0 && e.statut === "planifie"; }).slice(0, 4);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white">Mes Dossiers en Cours</h2>
        <p className="text-slate-400 text-sm">{compte.nom} — {compte.service}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📁" label="Enquetes en cours" value={enCours.length} color="#F59E0B" />
        <StatCard icon="🚨" label="Dossiers urgents/sensibles" value={urgentes.length} color="#DC2626" />
        <StatCard icon="🔒" label="GAV de mon unite" value={mesGAV.filter(function (g) { return g.statut === "actif" || g.statut === "prolonge"; }).length} color="#3B82F6" />
        <StatCard icon="⚠️" label="GAV delai critique" value={gavCritiques.length} color="#DC2626" />
      </div>

      {gavCritiques.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">⚠️ Alerte delais legaux — Gardes a vue</p>
          <div className="space-y-2">
            {gavCritiques.map(function (g) {
              return (<div key={g.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{g.nom} — {g.motif}</span><Chip color="#DC2626">{g.heuresRestantes}h restantes / 48h</Chip></div>);
            })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Priorisation — Urgent / Enquetes sensibles</p>
          <div className="space-y-2">
            {urgentes.length === 0 ? <p className="text-slate-500 text-sm">Aucun dossier urgent assigne actuellement.</p> : null}
            {urgentes.map(function (e) {
              return (
                <div key={e.id} className="border-l-2 pl-2.5" style={{ borderColor: GRAVITE_COLOR[e.gravite] }}>
                  <div className="flex items-center justify-between gap-2"><p className="text-white text-sm font-semibold">{e.titre}</p><Chip color={GRAVITE_COLOR[e.gravite]}>{e.gravite}</Chip></div>
                  <p className="text-slate-500 text-xs">{e.brigade} — ouvert le {e.dateOuverture}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Planning — Echeances du jour</p>
          {echeancesDuJour.length === 0 ? <p className="text-slate-500 text-sm">Aucune echeance aujourd hui.</p> : (
            <div className="space-y-2">{echeancesDuJour.map(function (e) { return (<div key={e.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: TYPE_COLOR[e.type] }}><div><p className="text-white text-sm font-semibold">{e.titre}</p><p className="text-slate-500 text-xs">{e.heure} — {e.lieu}</p></div><Chip color={TYPE_COLOR[e.type]}>{TYPE_LABEL[e.type]}</Chip></div>); })}</div>
          )}
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Mes enquetes</p>
        <div className="space-y-2">
          {mesEnquetes.map(function (e) {
            return (<div key={e.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{e.titre}</span><Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip></div>);
          })}
          {mesEnquetes.length === 0 ? <p className="text-slate-500 text-sm">Aucune enquete assignee. Consultez l onglet "Plaintes a Traiter" dans Enquetes & Procedures pour en ouvrir une.</p> : null}
        </div>
      </div>
    </div>
  );
}

var PV_TEMPLATES = [
  { id: "audition", label: "PV d Audition", structure: "PROCES-VERBAL D AUDITION\n\nL an deux mille vingt-six, le [DATE], nous soussigne(s), Officier de Police Judiciaire en service a la [SERVICE],\n\nAvons entendu : [NOM DE LA PERSONNE], ne(e) le [DATE NAISSANCE], de nationalite [NATIONALITE],\n\nLequel/Laquelle, apres avoir ete informe(e) de ses droits, declare :\n\n\"[DECLARATION DE LA PERSONNE]\"\n\nLecture faite, persiste et signe avec nous." },
  { id: "interpellation", label: "PV d Interpellation", structure: "PROCES-VERBAL D INTERPELLATION\n\nL an deux mille vingt-six, le [DATE], a [HEURE], nous soussigne(s), Officier de Police Judiciaire,\n\nAvons procede a l interpellation de : [NOM DE LA PERSONNE], dans les circonstances suivantes :\n\n[CIRCONSTANCES DE L INTERPELLATION]\n\nLa personne a ete informee de ses droits et placee en garde a vue a [HEURE] pour les motifs suivants : [MOTIFS]." },
  { id: "perquisition", label: "PV de Perquisition", structure: "PROCES-VERBAL DE PERQUISITION\n\nL an deux mille vingt-six, le [DATE], nous soussigne(s), Officier de Police Judiciaire, agissant en vertu de [BASE LEGALE],\n\nAvons procede a la perquisition de : [LIEU / ADRESSE], en presence de [TEMOINS / OCCUPANT],\n\nAu cours de laquelle a ete decouvert et saisi : [OBJETS SAISIS]\n\nLecture faite aux personnes presentes, persistent et signent avec nous." }
];

function DossiersOPJ(props) {
  var compte = props.compte;
  var nomOfficier = compte.nomOfficier || compte.nom;
  var tabState = useState("enquetes");
  var tab = tabState[0]; var setTab = tabState[1];

  var enquetesState = useState(ENQUETES_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var enquetes = enquetesState[0]; var setEnquetes = enquetesState[1];
  var plaintesState = useState(PLAINTES_DATA.map(function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } return c; }));
  var plaintes = plaintesState[0]; var setPlaintes = plaintesState[1];
  var recoupFormState = useState(null);
  var recoupFormOuvert = recoupFormState[0]; var setRecoupFormOuvert = recoupFormState[1];
  var recoupDestState = useState("Direction des Renseignements Generaux");
  var recoupDest = recoupDestState[0]; var setRecoupDest = recoupDestState[1];
  var recoupObjetState = useState("");
  var recoupObjet = recoupObjetState[0]; var setRecoupObjet = recoupObjetState[1];
  var recoupementsState = useState([]);
  var recoupements = recoupementsState[0]; var setRecoupements = recoupementsState[1];

  var pvTemplateState = useState("audition");
  var pvTemplate = pvTemplateState[0]; var setPvTemplate = pvTemplateState[1];
  var pvPersonneState = useState("");
  var pvPersonne = pvPersonneState[0]; var setPvPersonne = pvPersonneState[1];
  var pvCorpsState = useState("");
  var pvCorps = pvCorpsState[0]; var setPvCorps = pvCorpsState[1];
  var pvListState = useState([]);
  var pvList = pvListState[0]; var setPvList = pvListState[1];
  var pvAI = useState({ loading: false, result: null });

  var gedDossierState = useState(null);
  var gedDossier = gedDossierState[0]; var setGedDossier = gedDossierState[1];

  var SYS = "Tu es l assistant de redaction d un Officier de Police Judiciaire (OPJ) de la DCPJ Brazzaville, Republique du Congo. Tu rediges en francais, dans un style juridique formel et procedural, sans jamais inventer de noms reels de personnes existantes.";
  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var mesEnquetes = enquetes.filter(function (e) { return e.opjAssigne === nomOfficier; });
  var enquetesDisponibles = enquetes.filter(function (e) { return !e.opjAssigne; });

  function assignerMoi(id) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.opjAssigne = nomOfficier; return c; }); });
  }
  function transmettreParquet(id) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "transmis_parquet"; return c; }); });
  }
  function envoyerRecoupement(idEnquete) {
    if (!recoupObjet.trim()) { return; }
    setRecoupements(function (prev) { return [{ id: "REC-" + Date.now(), enquete: idEnquete, destinataire: recoupDest, objet: recoupObjet, date: new Date().toLocaleString("fr-FR") }].concat(prev); });
    setRecoupObjet(""); setRecoupFormOuvert(null);
  }
  function transformerEnEnquete(p) {
    var nid = "ENQ-" + Date.now();
    setEnquetes(function (prev) { return [{ id: nid, titre: p.type + " — plaignant " + p.plaignant, type: p.type, gravite: "moyen", statut: "en_cours", opjAssigne: nomOfficier, dateOuverture: new Date().toISOString().slice(0, 10), brigade: compte.service, instructions: p.description }].concat(prev); });
    setPlaintes(function (prev) { return prev.map(function (pl) { if (pl.id !== p.id) { return pl; } var c = {}; for (var k in pl) { c[k] = pl[k]; } c.statut = "enquete"; return c; }); });
  }

  function inserDepuisLaBase() {
    var pool = RECHERCHES_DATA.map(function (r) { return r.nom; }).concat(plaintes.map(function (p) { return p.plaignant; }));
    var pick = pool[Math.floor(Math.random() * pool.length)];
    setPvPersonne(pick);
  }
  function genererBrouillon() {
    var tpl = PV_TEMPLATES.filter(function (t) { return t.id === pvTemplate; })[0];
    var texte = tpl.structure.replace("[NOM DE LA PERSONNE]", pvPersonne || "[NOM DE LA PERSONNE]").replace("[DATE]", new Date().toLocaleDateString("fr-FR"));
    setPvCorps(texte);
  }
  function signerPV() {
    if (!pvCorps.trim()) { return; }
    setPvList(function (prev) { return [{ id: "PV-" + Date.now(), type: PV_TEMPLATES.filter(function (t) { return t.id === pvTemplate; })[0].label, personne: pvPersonne || "Non renseigne", date: new Date().toLocaleString("fr-FR"), agent: compte.nom }].concat(prev); });
    setPvCorps(""); setPvPersonne("");
  }

  var TABS = [["enquetes", "Mes Enquetes", "📁"], ["plaintes", "Plaintes a Traiter", "📨"], ["pv", "Editeur de PV", "📝"], ["ged", "Dossier Unique (GED)", "🗄️"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Enquetes & Procedures</h2><p className="text-slate-500 text-xs">{compte.nom} — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-rose-700 text-white border-rose-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "enquetes" ? (
        <div className="space-y-4">
          <div className="space-y-3">
            {mesEnquetes.map(function (e) {
              return (
                <div key={e.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-white font-bold text-sm">{e.titre}</p>
                      <p className="text-slate-500 text-xs">{e.type} — {e.brigade} — ouvert le {e.dateOuverture}</p>
                      <p className="text-slate-400 text-xs mt-1">{e.instructions}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0"><Chip color={GRAVITE_COLOR[e.gravite]}>{e.gravite}</Chip><Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip></div>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-3 border-t border-slate-800 pt-2">
                    {e.statut !== "transmis_parquet" && e.statut !== "cloturee" ? <button onClick={function () { transmettreParquet(e.id); }} className="bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">🔐 Transmettre au Parquet</button> : <Chip color="#8B5CF6">✓ Transmis au Parquet</Chip>}
                    <button onClick={function () { setRecoupFormOuvert(recoupFormOuvert === e.id ? null : e.id); }} className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold">🔁 Demander un recoupement</button>
                  </div>
                  {recoupFormOuvert === e.id ? (
                    <div className="mt-2 bg-slate-900 rounded-xl border border-slate-700 p-3 space-y-2">
                      <select value={recoupDest} onChange={function (e2) { setRecoupDest(e2.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs">
                        <option>Direction des Renseignements Generaux</option>
                        <option>Direction de la Logistique</option>
                        <option>Autre OPJ — DCPJ</option>
                        <option>Controle Voyageurs & Frontieres</option>
                      </select>
                      <input value={recoupObjet} onChange={function (e2) { setRecoupObjet(e2.target.value); }} placeholder="Objet precis de la demande..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs" />
                      <button onClick={function () { envoyerRecoupement(e.id); }} className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Envoyer via SIPGN-Comm</button>
                    </div>
                  ) : null}
                  {recoupements.filter(function (r) { return r.enquete === e.id; }).map(function (r) {
                    return <p key={r.id} className="text-slate-500 text-[11px] mt-1.5">↳ Recoupement demande a {r.destinataire} — {r.date}</p>;
                  })}
                </div>
              );
            })}
            {mesEnquetes.length === 0 ? <p className="text-slate-500 text-sm">Aucune enquete assignee.</p> : null}
          </div>

          {enquetesDisponibles.length > 0 ? (
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4">
              <p className="text-slate-400 font-bold text-xs uppercase mb-2">Dossiers disponibles — en attente d affectation</p>
              <div className="space-y-2">
                {enquetesDisponibles.map(function (e) {
                  return (<div key={e.id} className="flex items-center justify-between gap-2 flex-wrap text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{e.titre}</span><button onClick={function () { assignerMoi(e.id); }} className="bg-slate-700 text-white px-2.5 py-1 rounded-lg font-bold">Me l affecter</button></div>);
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "plaintes" ? (
        <div className="space-y-3">
          <p className="text-slate-500 text-xs">Plaintes et signalements recus via SIPGN-Citizen, en attente de transformation en procedure judiciaire</p>
          {plaintes.filter(function (p) { return p.statut === "enregistree"; }).map(function (p) {
            return (
              <div key={p.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{p.type} — {p.reference}</p><p className="text-slate-400 text-xs">Plaignant : {p.plaignant} — {p.telephone}</p><p className="text-slate-400 text-xs mt-1">{p.description}</p></div>
                  <button onClick={function () { transformerEnEnquete(p); }} className="bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0">⚖️ Transformer en enquete</button>
                </div>
              </div>
            );
          })}
          {plaintes.filter(function (p) { return p.statut === "enregistree"; }).length === 0 ? <p className="text-slate-500 text-sm">Aucune plainte en attente de traitement.</p> : null}
          <div className="pt-2">
            <p className="text-slate-600 text-xs uppercase font-bold mb-2">Plaintes deja en procedure</p>
            {plaintes.filter(function (p) { return p.statut !== "enregistree"; }).map(function (p) {
              return (<div key={p.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-400">{p.type} — {p.plaignant}</span><Chip color={STATUT_PLAINTE_COLOR[p.statut]}>{STATUT_PLAINTE_LABEL[p.statut]}</Chip></div>);
            })}
          </div>
        </div>
      ) : null}

      {tab === "pv" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
            <p className="text-white font-bold text-sm">Editeur Intelligent de Proces-Verbaux</p>
            <div className="flex gap-2 flex-wrap">
              {PV_TEMPLATES.map(function (t) { var isA = pvTemplate === t.id; return <button key={t.id} onClick={function () { setPvTemplate(t.id); }} className={"px-3 py-1.5 rounded-lg text-xs font-bold border " + (isA ? "bg-rose-700 border-rose-600 text-white" : "border-slate-700 text-slate-400")}>{t.label}</button>; })}
            </div>
            <div className="flex gap-2">
              <input value={pvPersonne} onChange={function (e) { setPvPersonne(e.target.value); }} placeholder="Nom de la personne concernee..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
              <button onClick={inserDepuisLaBase} className="bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold">📂 Inserer depuis la base</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={genererBrouillon} className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold">Generer le modele type</button>
              <button onClick={function () {
                var ctx = "Modele : " + PV_TEMPLATES.filter(function (t) { return t.id === pvTemplate; })[0].label + " | Personne concernee : " + (pvPersonne || "non precisee") + " | Brouillon actuel : " + (pvCorps || "aucun");
                callIA(pvAI[1], "Redige un proces-verbal complet et conforme au format procedural congolais pour ce type d acte. Reprends la structure officielle, integre la personne concernee, et laisse des emplacements clairs entre crochets pour les elements factuels manquants que l OPJ devra completer. " + ctx);
              }} className="bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">🤖 Rediger avec l IA</button>
            </div>
            <AIBloc state={pvAI[0]} />
            <textarea value={pvCorps} onChange={function (e) { setPvCorps(e.target.value); }} rows={8} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none font-mono" placeholder="Le corps du proces-verbal apparait ici..." />
            <button onClick={signerPV} className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold">✍️ Signer electroniquement et enregistrer</button>
          </div>
          <div className="space-y-2">
            {pvList.map(function (pv) {
              return (<div key={pv.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-3 flex items-center justify-between gap-2 flex-wrap text-xs"><span className="text-white font-semibold">{pv.type} — {pv.personne}</span><span className="text-slate-500">{pv.date} — signe par {pv.agent}</span></div>);
            })}
          </div>
        </div>
      ) : null}

      {tab === "ged" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-2">Dossier Unique — Selectionner une enquete</p>
            <select value={gedDossier || ""} onChange={function (e) { setGedDossier(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
              <option value="">— Choisir un dossier —</option>
              {mesEnquetes.map(function (e) { return <option key={e.id} value={e.id}>{e.titre}</option>; })}
            </select>
          </div>
          {gedDossier ? (function () {
            var dossier = mesEnquetes.filter(function (e) { return e.id === gedDossier; })[0];
            var pvDuDossier = pvList.length;
            var pieces = [
              { nom: "Photos de la scene", present: true }, { nom: "Videos de surveillance", present: dossier && dossier.type === "Vol a main armee" },
              { nom: "Rapport d expertise (SIPGN-Labo)", present: dossier && (dossier.gravite === "critique" || dossier.gravite === "grave") },
              { nom: "Pieces d identite des parties", present: true }, { nom: "PV signes electroniquement", present: pvDuDossier > 0 }
            ];
            var conforme = pieces.every(function (p) { return p.present; });
            return (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <p className="text-white font-bold text-sm mb-1">{dossier ? dossier.titre : ""}</p>
                <p className="text-slate-500 text-xs mb-3">Espace securise centralisant toutes les pieces de la procedure</p>
                <div className="space-y-1.5">
                  {pieces.map(function (p) {
                    return (<div key={p.nom} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{p.nom}</span><Chip color={p.present ? "#22C55E" : "#DC2626"}>{p.present ? "Present" : "Manquant"}</Chip></div>);
                  })}
                </div>
                <div className={"mt-3 rounded-xl p-3 text-xs font-bold " + (conforme ? "bg-green-950 text-green-300 border border-green-700" : "bg-amber-950 text-amber-300 border border-amber-700")}>
                  {conforme ? "✓ Dossier complet — pret pour cloture ou transmission." : "⚠️ Pieces manquantes — completer avant cloture du dossier."}
                </div>
              </div>
            );
          })() : null}
        </div>
      ) : null}
    </div>
  );
}

function AssistantJuridiqueOPJ(props) {
  var compte = props.compte;
  var tabState = useState("qualification");
  var tab = tabState[0]; var setTab = tabState[1];
  var faitsState = useState("");
  var faits = faitsState[0]; var setFaits = faitsState[1];
  var ai1 = useState({ loading: false, result: null });
  var typeAffaireState = useState("");
  var typeAffaire = typeAffaireState[0]; var setTypeAffaire = typeAffaireState[1];
  var complexiteState = useState("moderee");
  var complexite = complexiteState[0]; var setComplexite = complexiteState[1];
  var ai2 = useState({ loading: false, result: null });
  var noteState = useState("");
  var note = noteState[0]; var setNote = noteState[1];
  var ai3 = useState({ loading: false, result: null });
  var dossierControleState = useState("");
  var dossierControle = dossierControleState[0]; var setDossierControle = dossierControleState[1];
  var ai4 = useState({ loading: false, result: null });

  var SYS = "Tu es un Conseiller Juridique IA integre au poste de travail d un Officier de Police Judiciaire de la Republique du Congo. Tu reponds en francais, de maniere structuree et operationnelle. Precise systematiquement que les references legales que tu fournis sont indicatives et doivent etre verifiees auprès du Code de procedure penale congolais en vigueur avant toute utilisation officielle.";
  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var nomOfficier = compte.nomOfficier || compte.nom;
  var mesEnquetesPourControle = ENQUETES_DATA.filter(function (e) { return e.opjAssigne === nomOfficier; });

  var TABS = [["qualification", "Conseiller Juridique", "⚖️"], ["decision", "Modes de Resolution", "🌳"], ["redaction", "Redaction & Controle", "✅"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-900 to-red-950 border border-rose-700 flex items-center justify-center text-2xl shrink-0">⚖️</div>
        <div><h2 className="text-2xl font-black text-white">Assistant IA Juridique</h2><p className="text-slate-500 text-xs">{compte.nom} — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-rose-700 text-white border-rose-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "qualification" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
          <p className="text-white font-bold text-sm">Conseiller Juridique — Qualification Penale</p>
          <p className="text-slate-500 text-xs">Decrivez les faits constates. L IA propose la qualification penale, les articles applicables et les actes de procedure indispensables.</p>
          <textarea value={faits} onChange={function (e) { setFaits(e.target.value); }} rows={5} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" placeholder="Resume des faits constates..." />
          <button onClick={function () {
            if (!faits.trim()) { return; }
            callIA(ai1[1], "Voici les faits constates par un OPJ : '" + faits + "'. Propose : 1) LA QUALIFICATION PENALE la plus appropriee 2) LES ARTICLES DU CODE PENAL CONGOLAIS potentiellement applicables (a titre indicatif) 3) LES ACTES DE PROCEDURE indispensables pour securiser l enquete (auditions, expertises, saisies...). Sois precis et operationnel.");
          }} className="bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚖️ Proposer la qualification penale</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "decision" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
          <p className="text-white font-bold text-sm">Modes de Resolution — Arbre de Decision</p>
          <p className="text-slate-500 text-xs">L IA propose un arbre de decision selon la complexite de l affaire : pistes d investigation ou alternatives aux poursuites.</p>
          <input value={typeAffaire} onChange={function (e) { setTypeAffaire(e.target.value); }} placeholder="Type d affaire (ex: vol simple, escroquerie, violence conjugale...)..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <select value={complexite} onChange={function (e) { setComplexite(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
            <option value="simple">Affaire simple</option>
            <option value="moderee">Affaire moderee</option>
            <option value="complexe">Affaire complexe / sensible</option>
          </select>
          <button onClick={function () {
            if (!typeAffaire.trim()) { return; }
            callIA(ai2[1], "Pour une affaire de type '" + typeAffaire + "' de complexite '" + complexite + "', propose un ARBRE DE DECISION operationnel base sur les bonnes pratiques de la Police Nationale : etapes successives, pistes d investigation prioritaires, et le cas echeant des alternatives aux poursuites (mediation, rappel a la loi, classement) si la situation s y prete. Presente sous forme de sequence numerotee claire.");
          }} className="bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🌳 Generer l arbre de decision</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}

      {tab === "redaction" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
            <p className="text-white font-bold text-sm">Redaction Assistee — Reformulation Juridique</p>
            <textarea value={note} onChange={function (e) { setNote(e.target.value); }} rows={5} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" placeholder="Collez votre note brute a reformuler en style juridique formel..." />
            <button onClick={function () {
              if (!note.trim()) { return; }
              callIA(ai3[1], "Reformule la note suivante, redigee par un OPJ, dans un style juridique formel et procedural adapte a un proces-verbal officiel, sans en changer le sens : '" + note + "'");
            }} className="bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">✍️ Reformuler en style juridique formel</button>
            <AIBloc state={ai3[0]} />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
            <p className="text-white font-bold text-sm">Controle de Conformite avant Cloture</p>
            <p className="text-slate-500 text-xs">Verifie les signatures et les echeances de garde a vue avant la cloture du dossier.</p>
            <select value={dossierControle} onChange={function (e) { setDossierControle(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
              <option value="">— Choisir un dossier —</option>
              {mesEnquetesPourControle.map(function (e) { return <option key={e.id} value={e.id}>{e.titre}</option>; })}
            </select>
            <button onClick={function () {
              if (!dossierControle) { return; }
              var d = mesEnquetesPourControle.filter(function (e) { return e.id === dossierControle; })[0];
              var ctx = "Dossier : " + JSON.stringify(d) + " | Gardes a vue de l unite : " + JSON.stringify(GARDES_VUE_DATA.filter(function (g) { return g.unite === compte.service; }));
              callIA(ai4[1], "Effectue un controle de conformite procedurale avant cloture de ce dossier d enquete. Verifie notamment : la coherence du statut du dossier, les delais legaux de garde a vue (48h renouvelable), la presence d instructions completes, et signale tout risque de vice de procedure. Conclus par un avis FAVORABLE ou DEFAVORABLE a la cloture, avec justification. Donnees : " + ctx);
            }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">✅ Lancer le controle de conformite</button>
            <AIBloc state={ai4[0]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Dashboard(props) {
  var compte = props.compte;

  var incidentsActifs = INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length;
  var gavActives = GARDES_VUE_DATA.filter(function (g) { return g.statut === "actif" || g.statut === "prolonge"; }).length;
  var gavCritiques = GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6 && g.statut === "actif"; }).length;
  var patrouillesTerrain = PATROUILLES_DATA.filter(function (p) { return p.statut === "terrain" || p.statut === "intervention"; }).length;
  var effectifsActifs = AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length;

  var graviteData = [
    { name: "Critique", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique"; }).length, color: GRAVITE_COLOR.critique },
    { name: "Grave", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "grave"; }).length, color: GRAVITE_COLOR.grave },
    { name: "Moyen", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "moyen"; }).length, color: GRAVITE_COLOR.moyen }
  ];

  var policeCount = AGENTS_DATA.filter(function (a) { return a.corps === "Police"; }).length;
  var gendCount = AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie"; }).length;
  var corpsData = [
    { name: "Police", value: policeCount, color: "#003F87" },
    { name: "Gendarmerie", value: gendCount, color: "#1B6B3A" }
  ];
  var totalAgents = policeCount + gendCount;

  var incidentsCritiques = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours"; }).slice(0, 4);

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var echeancesDuJour = EVENTS_DATA.filter(function (e) {
    var dt = new Date(e.date + "T00:00:00");
    return Math.round((dt - today) / 86400000) === 0 && e.statut === "planifie";
  }).slice(0, 4);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Centre de Commandement</h2>
          <p className="text-slate-400 text-sm">{compte.service}</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5">
          <ShieldCheck size={14} className="text-green-500" />
          <span className="text-slate-300 text-xs font-bold">Systeme operationnel</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Siren size={18} />} label="Incidents actifs" value={incidentsActifs} sub="Toutes unites" color="#DC2626" />
        <StatCard icon={<Lock size={18} />} label="Gardes a vue" value={gavActives} sub={gavCritiques + " en delai critique"} color="#F59E0B" />
        <StatCard icon={<Car size={18} />} label="Patrouilles deployees" value={patrouillesTerrain} sub="Police et Gendarmerie" color="#3B82F6" />
        <StatCard icon={<Users size={18} />} label="Effectifs en service" value={effectifsActifs} sub={totalAgents + " agents geres"} color="#16A34A" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Incidents par gravite</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graviteData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} cursor={{ fill: "#1E293B" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {graviteData.map(function (entry, index) {
                    return <Cell key={index} fill={entry.color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Effectifs par corps</p>
          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={corpsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3} stroke="none">
                  {corpsData.map(function (entry, index) {
                    return <Cell key={index} fill={entry.color} />;
                  })}
                </Pie>
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-white text-2xl font-black">{totalAgents}</span>
              <span className="text-slate-500 text-xs uppercase">Agents</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: "#003F87" }}></span>Police ({policeCount})</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: "#1B6B3A" }}></span>Gendarmerie ({gendCount})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Incidents critiques en cours</p>
          {incidentsCritiques.length === 0 ? <p className="text-slate-500 text-sm">Aucun incident critique en cours.</p> : (
            <div className="space-y-2">
              {incidentsCritiques.map(function (inc) {
                return (
                  <div key={inc.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: GRAVITE_COLOR[inc.gravite] }}>
                    <div>
                      <p className="text-white text-sm font-semibold">{inc.type}</p>
                      <p className="text-slate-500 text-xs">{inc.lieu}</p>
                    </div>
                    <CorpsBadge corps={inc.corps} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Echeances du jour</p>
          {echeancesDuJour.length === 0 ? <p className="text-slate-500 text-sm">Aucune echeance programmee aujourd hui.</p> : (
            <div className="space-y-2">
              {echeancesDuJour.map(function (e) {
                return (
                  <div key={e.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: TYPE_COLOR[e.type] }}>
                    <div>
                      <p className="text-white text-sm font-semibold">{e.titre}</p>
                      <p className="text-slate-500 text-xs">{e.heure} - {e.lieu}</p>
                    </div>
                    <Chip color={TYPE_COLOR[e.type]}>{TYPE_LABEL[e.type]}</Chip>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-slate-300 text-sm">
          Bienvenue, {compte.nom}. Plateforme SIPGN operationnelle.
        </p>
      </div>
    </div>
  );
}

var SALAIRES_PAR_GRADE = {
  Police: [185000, 210000, 240000, 275000, 310000, 360000, 420000, 485000, 550000, 630000],
  Gendarmerie: [180000, 205000, 235000, 268000, 305000, 355000, 410000, 480000, 545000, 625000]
};

var FORMATIONS_SPECIALES_PAR_AGENT = {
  "AGT-001": ["CRIMINOLOGIE AVANCEE", "ENQUETE FINANCIERE"],
  "AGT-002": [],
  "AGT-003": [],
  "AGT-004": ["COMMANDEMENT DE BRIGADE"],
  "AGT-005": [],
  "AGT-006": ["INFORMATIQUE FORENSIQUE", "BRIGADE CANINE"],
  "AGT-007": [],
  "AGT-008": ["RELATIONS INTERNATIONALES", "LANGUES (FR/EN/ES)"],
  "AGT-009": ["NAVIGATION MARITIME", "INTERVENTION NAUTIQUE"],
  "AGT-010": ["COMMANDEMENT SUPERIEUR", "NAVIGATION MARITIME"],
  "AGT-011": [],
  "AGT-012": ["CONTROLE FRONTALIER", "DROIT INTERNATIONAL"],
  "AGT-013": ["BRIGADE CANINE", "CYNOTECHNIE"],
  "AGT-014": ["SECURITE ROUTIERE", "MEDECINE LEGALE"],
  "AGT-015": ["CYBERCRIMINALITE", "INTERPOL PROCEDURES"],
  "AGT-016": []
};

function Dossiers360Agents(props) {
  var compte = props.compte;
  var rechercheState = useState("");
  var recherche = rechercheState[0]; var setRecherche = rechercheState[1];
  var selState = useState("AGT-006");
  var selId = selState[0]; var setSelId = selState[1];
  var filtreCorpsState = useState("tous");
  var filtreCorps = filtreCorpsState[0]; var setFiltreCorps = filtreCorpsState[1];

  var agentsFiltres = AGENTS_DATA.filter(function (a) {
    var matchNom = !recherche || a.nom.toLowerCase().indexOf(recherche.toLowerCase()) >= 0 || a.matricule.toLowerCase().indexOf(recherche.toLowerCase()) >= 0;
    var matchCorps = filtreCorps === "tous" || a.corps === filtreCorps;
    return matchNom && matchCorps;
  });

  var agent = AGENTS_DATA.find(function (a) { return a.id === selId; });
  var profil = agent ? AGENT_PROFILS_MAP[agent.id] : null;

  function getSalaire(a) {
    var grilles = SALAIRES_PAR_GRADE[a.corps];
    if (!grilles) { return 300000; }
    var idx = Math.min(a.gradeIndex, grilles.length - 1);
    return grilles[idx];
  }

  function getScoreEval(a) {
    var p = AGENT_PROFILS_MAP[a.id];
    if (!p || p.evaluations.length === 0) { return null; }
    var last = p.evaluations[p.evaluations.length - 1];
    return last.note;
  }

  function isEligiblePromotion(a) {
    var grades = gradesDe(a.corps);
    if (a.gradeIndex >= grades.length - 1) { return false; }
    var ancMin = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6][a.gradeIndex] || 3;
    var score = getScoreEval(a);
    return a.anciennete >= ancMin && score !== null && score >= 14;
  }

  function getBadgeStatut(a) {
    if (a.statut === "proposition_promotion") { return { label: "ELIGIBLE PROMOTION", color: "#F59E0B" }; }
    if (a.statut === "actif" && isEligiblePromotion(a)) { return { label: "ELIGIBLE PROMOTION", color: "#F59E0B" }; }
    return null;
  }

  var gradeProgressPct = agent ? Math.round(((agent.gradeIndex + 1) / gradesDe(agent.corps).length) * 100) : 0;
  var formationsSpec = agent ? (FORMATIONS_SPECIALES_PAR_AGENT[agent.id] || []) : [];
  var scoreEval = agent ? getScoreEval(agent) : null;
  var badge = agent ? getBadgeStatut(agent) : null;

  var totalAgents = AGENTS_DATA.length;
  var enService = AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length;
  var eligibles = AGENTS_DATA.filter(function (a) { return isEligiblePromotion(a) || a.statut === "proposition_promotion"; }).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Dossiers 360° des Agents</h2>
          <p className="text-slate-400 text-sm">Vue consolidee — fiches individuelles completes — {compte.service}</p>
        </div>
        <div className="flex gap-2">
          {[["tous", "Tous"], ["Police", "Police"], ["Gendarmerie", "Gendarmerie"]].map(function (f) {
            return <button key={f[0]} onClick={function () { setFiltreCorps(f[0]); }} style={{ background: filtreCorps === f[0] ? "#1D4ED8" : "#1E293B", color: filtreCorps === f[0] ? "#fff" : "#94A3B8" }} className="px-3 py-1.5 rounded-lg text-xs font-bold">{f[1]}</button>;
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Users size={18} />} label="Agents enregistres" value={totalAgents} color="#3B82F6" sub="Base totale" />
        <StatCard icon={<ShieldCheck size={18} />} label="En service actif" value={enService} color="#22C55E" sub="Disponibles" />
        <StatCard icon={<ShieldAlert size={18} />} label="Eligibles promotion" value={eligibles} color="#F59E0B" sub="Criteres remplis" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-2">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
            <Search size={13} className="text-slate-500 shrink-0" />
            <input value={recherche} onChange={function (e) { setRecherche(e.target.value); }} placeholder="Rechercher (nom, matricule...)" className="bg-transparent text-slate-300 text-xs outline-none w-full placeholder-slate-600" />
          </div>
          <p className="text-slate-600 text-[10px] px-1">{agentsFiltres.length} resultat(s) — (affinez la recherche)</p>
          <div className="max-h-[540px] overflow-auto space-y-1 pr-1">
            {agentsFiltres.map(function (a) {
              var isSel = a.id === selId;
              var bdg = getBadgeStatut(a);
              var initAgt = a.nom.split(" ").slice(-2).map(function (w) { return w[0]; }).join("").slice(0, 2);
              return (
                <button key={a.id} onClick={function () { setSelId(a.id); }} style={{ background: isSel ? compte.couleur + "22" : "transparent", borderLeft: isSel ? "3px solid " + compte.couleur : "3px solid transparent" }} className={"w-full text-left px-3 py-2.5 rounded-xl border border-transparent " + (isSel ? "" : "hover:bg-slate-800/50")}>
                  <div className="flex items-center gap-2">
                    <div style={{ background: isSel ? compte.couleur + "33" : "#1E293B", color: isSel ? compte.couleur : "#64748B" }} className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{initAgt}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold truncate">{a.nom}</p>
                      <p className="text-slate-500 text-[10px]">{gradeLabel(a)}</p>
                      <CorpsBadge corps={a.corps} />
                    </div>
                    {bdg ? <span style={{ background: bdg.color + "22", color: bdg.color, fontSize: 8 }} className="rounded px-1 py-0.5 font-black uppercase shrink-0 text-center leading-tight">✓ ELIGIBLE<br/>PROMO</span> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-2">
          {agent && profil ? (
            <div className="space-y-3">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div style={{ background: compte.couleur + "33", color: compte.couleur }} className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black shrink-0">
                      {agent.nom.split(" ").slice(-2).map(function (w) { return w[0]; }).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-black text-xl">{agent.nom}</p>
                        <CorpsBadge corps={agent.corps} />
                        {badge ? <Chip color={badge.color}>✓ {badge.label}</Chip> : null}
                      </div>
                      <p className="text-slate-400 text-sm">{gradeLabel(agent)} · Echelon {agent.gradeIndex + 1} · {agent.service}</p>
                      <p className="text-slate-500 text-xs font-mono">{agent.matricule}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-slate-400 text-xs uppercase font-bold">Salaire mensuel</p>
                    <p className="text-white font-black text-xl">{getSalaire(agent).toLocaleString("fr-FR")}</p>
                    <p className="text-slate-400 text-xs">FCFA</p>
                    <button className="mt-1 text-yellow-400 text-xs font-bold hover:underline">📋 Completer le dossier</button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-bold">{gradeLabel(agent)}</span>
                    <span className="text-slate-500">{gradesDe(agent.corps)[Math.min(agent.gradeIndex + 1, gradesDe(agent.corps).length - 1)]}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div style={{ width: gradeProgressPct + "%", background: "linear-gradient(90deg, " + compte.couleur + ", " + compte.couleur + "AA)" }} className="h-2 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                    <span>Grade actuel</span>
                    <span>Anciennete requise pour ce grade : {[2,2,3,3,4,4,5,5,6,6][agent.gradeIndex] || 3} ans</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2.5">
                  {[["Date de naissance", profil.dateNaissance], ["Region", profil.lieuNaissance], ["Diplome", agent.diplome], ["Score evaluation", scoreEval !== null ? scoreEval + ".0/20" : "—"], ["Anciennete totale", agent.anciennete + " ans"], ["Formations", formationsSpec.length + " specialisation(s)"]].map(function (row, i) {
                    return (
                      <div key={i} className="border border-slate-700/60 rounded-lg px-3 py-2">
                        <p className="text-slate-500 text-[10px] uppercase font-bold">{row[0]}</p>
                        <p className="text-slate-200 text-xs font-semibold mt-0.5">{row[1]}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-3">
                  {formationsSpec.length > 0 ? (
                    <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                      <p className="text-slate-400 text-xs font-bold uppercase mb-2">Formations specialisees</p>
                      <div className="flex flex-wrap gap-2">
                        {formationsSpec.map(function (f) { return <Chip key={f} color="#3B82F6">{f}</Chip>; })}
                      </div>
                    </div>
                  ) : null}
                  <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                    <p className="text-slate-400 text-xs font-bold uppercase mb-2">Competences operationnelles</p>
                    <div className="space-y-1.5">
                      {[["Armes", profil.competences.armes], ["Secourisme", profil.competences.secourisme], ["Criminalistique", profil.competences.criminalistique], ["Informatique", profil.competences.informatique], ["Langues", profil.competences.langues]].map(function (c) {
                        var col = c[1] >= 80 ? "#22C55E" : c[1] >= 60 ? "#3B82F6" : "#F59E0B";
                        return (
                          <div key={c[0]}>
                            <div className="flex justify-between text-[10px] mb-0.5"><span className="text-slate-400">{c[0]}</span><span style={{ color: col }} className="font-bold">{c[1]}%</span></div>
                            <div className="w-full bg-slate-700 rounded-full h-1"><div style={{ width: c[1] + "%", background: col }} className="h-1 rounded-full" /></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                    <p className="text-slate-400 text-xs font-bold uppercase mb-2">Statut dossier</p>
                    <Chip color={STATUT_CARRIERE_COLOR[agent.statut]}>{STATUT_CARRIERE_LABEL[agent.statut]}</Chip>
                    {profil.historiqueDiscipline.length > 0 ? <p className="text-red-400 text-[11px] mt-2">⚠ {profil.historiqueDiscipline.length} mention(s) disciplinaire(s)</p> : <p className="text-green-400 text-[11px] mt-2">✓ Aucun antecedent disciplinaire</p>}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Historique des affectations</p>
                <div className="space-y-1">
                  {profil.historiqueAffectations.map(function (h, i) {
                    return <div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{h.service}</span><span className="text-slate-500 font-mono">{h.periode}</span></div>;
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center h-64 text-center">
              <Users size={36} className="text-slate-600 mb-3" />
              <p className="text-slate-500 text-sm">Selectionnez un agent dans la liste</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


var CASIER_DATA = [
  { id: "CJ-001", nom: "MOUKOUARI Jean-Pierre", dateNaissance: "1988-03-14", lieuNaissance: "Brazzaville", nationalite: "Congolaise", numeroCNI: "CNI-BZV-88031401", photo: "MJ", condamnations: [{ annee: 2019, infraction: "Vol a main armee", juridiction: "Tribunal de Grande Instance de Brazzaville", peine: "3 ans d emprisonnement ferme", dateExpiation: "2022-04-10", statut: "expiee" }, { annee: 2024, infraction: "Recel de biens voles", juridiction: "TGI Brazzaville", peine: "18 mois ferme", dateExpiation: "2025-10-01", statut: "en_cours" }], mentions: ["B1", "B2", "B3"] },
  { id: "CJ-002", nom: "NKOUKA Theophile", dateNaissance: "1975-07-22", lieuNaissance: "Pointe-Noire", nationalite: "Congolaise", numeroCNI: "CNI-PNR-75072201", photo: "NT", condamnations: [{ annee: 2021, infraction: "Escroquerie et abus de confiance", juridiction: "TGI Pointe-Noire", peine: "2 ans avec sursis", dateExpiation: "2023-01-15", statut: "expiee" }], mentions: ["B2"] },
  { id: "CJ-003", nom: "BAZANA Paul", dateNaissance: "1995-11-05", lieuNaissance: "Dolisie", nationalite: "Congolaise", numeroCNI: "CNI-DLS-95110501", photo: "BP", condamnations: [{ annee: 2023, infraction: "Trafic de stupefiants", juridiction: "TGI Brazzaville", peine: "4 ans ferme", dateExpiation: "2027-06-20", statut: "en_cours" }], mentions: ["B1", "B2", "B3"] },
  { id: "CJ-004", nom: "MALONGA Eric", dateNaissance: "1980-02-17", lieuNaissance: "Brazzaville", nationalite: "Congolaise", numeroCNI: "CNI-BZV-80021701", photo: "ME", condamnations: [], mentions: [] },
  { id: "CJ-005", nom: "KOUMBA Arsene", dateNaissance: "1983-09-30", lieuNaissance: "Nkayi", nationalite: "Congolaise", numeroCNI: "CNI-NKY-83093001", photo: "KA", condamnations: [{ annee: 2022, infraction: "Violences conjugales", juridiction: "TGI Brazzaville", peine: "6 mois ferme + interdiction d approche", dateExpiation: "2023-03-01", statut: "expiee" }], mentions: ["B2"] },
  { id: "CJ-006", nom: "ITOUA Patrice", dateNaissance: "1991-06-12", lieuNaissance: "Owando", nationalite: "Congolaise", numeroCNI: "CNI-OWD-91061201", photo: "IP", condamnations: [{ annee: 2020, infraction: "Trafic de stupefiants", juridiction: "TGI Brazzaville", peine: "5 ans ferme", dateExpiation: "2025-09-14", statut: "en_cours" }, { annee: 2016, infraction: "Contrebande", juridiction: "TGI Brazzaville", peine: "1 an avec sursis", dateExpiation: "2017-06-01", statut: "expiee" }], mentions: ["B1", "B2", "B3"] },
  { id: "CJ-007", nom: "MABOUNDOU Jean-Claude", dateNaissance: "1970-04-03", lieuNaissance: "Brazzaville", nationalite: "Etrangere", numeroCNI: "PASS-FR-2218890", photo: "MJ", condamnations: [{ annee: 2018, infraction: "Fraude documentaire", juridiction: "TGI Paris (France)", peine: "6 mois avec sursis", dateExpiation: "2019-01-01", statut: "expiee" }, { annee: 2025, infraction: "Interdiction judiciaire de territoire", juridiction: "TGI Brazzaville", peine: "Interdiction de territoire — mandat international", dateExpiation: "—", statut: "actif" }], mentions: ["B1", "B3"] },
  { id: "CJ-008", nom: "MASSAMBA Herve", dateNaissance: "1978-12-25", lieuNaissance: "Brazzaville", nationalite: "Congolaise", numeroCNI: "CNI-BZV-78122501", photo: "MH", condamnations: [{ annee: 2026, infraction: "Conduite en etat d ivresse — recidive", juridiction: "TGI Brazzaville", peine: "Suspension de permis 2 ans + amende 250 000 FCFA", dateExpiation: "2028-01-01", statut: "en_cours" }], mentions: ["B2"] }
];

var MENTIONS_COLOR = { "B1": "#DC2626", "B2": "#F59E0B", "B3": "#8B5CF6" };
var MENTIONS_DESC = { "B1": "Extrait integral (tous antecedents)", "B2": "Extrait partiel (condamnations graves)", "B3": "Casier judiciaire complet confidentiel" };

function CasierJudiciaire(props) {
  var compte = props.compte;
  var rechercheState = useState("");
  var recherche = rechercheState[0]; var setRecherche = rechercheState[1];
  var selState = useState(null);
  var sel = selState[0]; var setSel = selState[1];
  var ongletState = useState("recherche");
  var onglet = ongletState[0]; var setOnglet = ongletState[1];
  var nomState = useState(""); var cniState = useState("");
  var nomR = nomState[0]; var setNomR = nomState[1];
  var cniR = cniState[0]; var setCniR = cniState[1];
  var resultatsState = useState(null);
  var resultats = resultatsState[0]; var setResultats = resultatsState[1];
  var logState = useState([
    { id: 1, heure: "08:14", agent: "Insp. MALANDA Christian", action: "Consultation casier CJ-003 (BAZANA Paul)", motif: "Procedure penale — GAV en cours" },
    { id: 2, heure: "09:02", agent: "Commission Frontieres", action: "Verification CJ-007 (MABOUNDOU Jean-Claude)", motif: "Controle documentaire aeroport" },
    { id: 3, heure: "10:45", agent: "DCPJ Brazzaville", action: "Consultation casier CJ-001 (MOUKOUARI Jean-Pierre)", motif: "Enquete judiciaire INC-001" }
  ]);
  var log = logState[0]; var setLog = logState[1];

  function lancerRecherche() {
    var res = CASIER_DATA.filter(function (c) {
      var matchNom = !nomR || c.nom.toLowerCase().indexOf(nomR.toLowerCase()) >= 0;
      var matchCNI = !cniR || c.numeroCNI.toLowerCase().indexOf(cniR.toLowerCase()) >= 0;
      return matchNom && matchCNI;
    });
    setResultats(res);
    setSel(null);
  }

  function ouvrirDossier(c) {
    setSel(c);
    setLog(function (prev) { return [{ id: Date.now(), heure: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), agent: compte.nom, action: "Consultation casier " + c.id + " (" + c.nom + ")", motif: "Consultation SIPGN" }].concat(prev); });
  }

  var statutCoul = { en_cours: "#DC2626", expiee: "#22C55E", actif: "#F59E0B" };
  var statutLabel = { en_cours: "En cours", expiee: "Expiee", actif: "Actif" };
  var stats = { total: CASIER_DATA.length, vierge: CASIER_DATA.filter(function (c) { return c.condamnations.length === 0; }).length, actifs: CASIER_DATA.filter(function (c) { return c.condamnations.some(function (x) { return x.statut !== "expiee"; }); }).length };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Casier Judiciaire National</h2>
          <p className="text-slate-400 text-sm">Base de donnees des antecedents judiciaires — acces securise SIPGN</p>
        </div>
        <div className="flex items-center gap-2">
          <Chip color="#DC2626">Confidentiel</Chip>
          <Chip color={compte.couleur}>{compte.service}</Chip>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Users size={18} />} label="Dossiers enregistres" value={stats.total} color="#3B82F6" sub="Base nationale" />
        <StatCard icon={<ShieldCheck size={18} />} label="Casiers vierges" value={stats.vierge} color="#22C55E" sub="Aucune condamnation" />
        <StatCard icon={<ShieldAlert size={18} />} label="Condamnations actives" value={stats.actifs} color="#DC2626" sub="En cours d execution" />
      </div>

      <div className="flex gap-2">
        {[["recherche", "Recherche"], ["tous", "Tous les dossiers"], ["log", "Journal des acces"]].map(function (o) {
          return <button key={o[0]} onClick={function () { setOnglet(o[0]); }} style={{ background: onglet === o[0] ? "#1D4ED8" : "#1E293B", color: onglet === o[0] ? "#fff" : "#94A3B8" }} className="px-4 py-2 rounded-lg text-xs font-bold">{o[1]}</button>;
        })}
      </div>

      {onglet === "recherche" ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-3">
              <p className="text-white font-bold text-sm">Recherche par identite</p>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Nom et Prenom</label>
                <input value={nomR} onChange={function (e) { setNomR(e.target.value); }} placeholder="ex: MOUKOUARI Jean-Pierre" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Numero CNI / Passeport</label>
                <input value={cniR} onChange={function (e) { setCniR(e.target.value); }} placeholder="ex: CNI-BZV-88031401" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
              </div>
              <button onClick={lancerRecherche} className="w-full bg-blue-700 text-white py-2 rounded-xl font-bold text-sm">Lancer la recherche</button>
            </div>
            {resultats !== null ? (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
                <p className="text-white font-bold text-sm">{resultats.length} resultat(s)</p>
                {resultats.length === 0 ? <p className="text-slate-500 text-xs">Aucun dossier correspondant.</p> : null}
                {resultats.map(function (c) {
                  return (
                    <button key={c.id} onClick={function () { ouvrirDossier(c); }} className={"w-full text-left p-3 rounded-xl border " + (sel && sel.id === c.id ? "border-blue-600 bg-blue-900/30" : "border-slate-700 bg-slate-900/50 hover:border-slate-600")}>
                      <div className="flex items-center gap-3">
                        <div style={{ background: c.condamnations.length === 0 ? "#22C55E33" : "#DC262633", color: c.condamnations.length === 0 ? "#22C55E" : "#DC2626" }} className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0">{c.photo}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-bold truncate">{c.nom}</p>
                          <p className="text-slate-500 text-[11px]">Ne(e) le {c.dateNaissance} — {c.lieuNaissance}</p>
                        </div>
                        <div className="shrink-0">
                          {c.condamnations.length === 0 ? <Chip color="#22C55E">Vierge</Chip> : <Chip color="#DC2626">{c.condamnations.length} mention(s)</Chip>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div>
            {sel ? (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
                  <div style={{ background: sel.condamnations.length === 0 ? "#22C55E33" : "#DC262633", color: sel.condamnations.length === 0 ? "#22C55E" : "#DC2626" }} className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shrink-0">{sel.photo}</div>
                  <div>
                    <p className="text-white font-black text-base">{sel.nom}</p>
                    <p className="text-slate-400 text-xs">{sel.id} — {sel.numeroCNI}</p>
                    <p className="text-slate-500 text-xs">Ne(e) le {sel.dateNaissance} a {sel.lieuNaissance} — Nat. {sel.nationalite}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2">Bulletins disponibles</p>
                  <div className="flex gap-2 flex-wrap">
                    {sel.mentions.length === 0 ? <Chip color="#22C55E">Casier vierge — aucun bulletin</Chip> : sel.mentions.map(function (m) { return <Chip key={m} color={MENTIONS_COLOR[m]}>{m} — {MENTIONS_DESC[m]}</Chip>; })}
                  </div>
                </div>
                {sel.condamnations.length > 0 ? (
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-2">Antecedents judiciaires</p>
                    <div className="space-y-2">
                      {sel.condamnations.map(function (cd, i) {
                        return (
                          <div key={i} className="bg-slate-900/70 rounded-xl p-3 border border-slate-700">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-white text-xs font-bold">{cd.infraction}</p>
                                <p className="text-slate-400 text-[11px]">{cd.juridiction} — {cd.annee}</p>
                                <p className="text-slate-300 text-[11px] mt-1">Peine : {cd.peine}</p>
                                {cd.dateExpiation !== "—" ? <p className="text-slate-500 text-[10px]">Date d expiation : {cd.dateExpiation}</p> : null}
                              </div>
                              <Chip color={statutCoul[cd.statut]}>{statutLabel[cd.statut]}</Chip>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-900/20 border border-green-700/40 rounded-xl p-3 text-center">
                    <p className="text-green-400 font-bold text-sm">Casier judiciaire vierge</p>
                    <p className="text-slate-500 text-xs">Aucune condamnation enregistree dans la base nationale.</p>
                  </div>
                )}
                <button onClick={function () { setSel(null); }} className="w-full mt-2 bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-bold">Fermer le dossier</button>
              </div>
            ) : (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <Fingerprint size={36} className="text-slate-600 mb-3" />
                <p className="text-slate-500 text-sm font-bold">Aucun dossier selectionne</p>
                <p className="text-slate-600 text-xs">Lancez une recherche et selectionnez un individu</p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {onglet === "tous" ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
            <Search size={14} className="text-slate-500" />
            <input value={recherche} onChange={function (e) { setRecherche(e.target.value); }} placeholder="Filtrer par nom..." className="bg-transparent text-slate-300 text-xs outline-none w-full" />
          </div>
          {CASIER_DATA.filter(function (c) { return !recherche || c.nom.toLowerCase().indexOf(recherche.toLowerCase()) >= 0; }).map(function (c) {
            return (
              <div key={c.id} onClick={function () { setSel(c); setOnglet("recherche"); setResultats([c]); ouvrirDossier(c); }} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 cursor-pointer hover:border-slate-500">
                <div className="flex items-center gap-3">
                  <div style={{ background: c.condamnations.length === 0 ? "#22C55E33" : "#DC262633", color: c.condamnations.length === 0 ? "#22C55E" : "#DC2626" }} className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0">{c.photo}</div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{c.nom}</p>
                    <p className="text-slate-500 text-xs">{c.numeroCNI} — Ne(e) le {c.dateNaissance} a {c.lieuNaissance}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.mentions.map(function (m) { return <Chip key={m} color={MENTIONS_COLOR[m]}>{m}</Chip>; })}
                    {c.condamnations.length === 0 ? <Chip color="#22C55E">Vierge</Chip> : <span className="text-slate-400 text-xs font-bold">{c.condamnations.length} cond.</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {onglet === "log" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-white font-bold text-sm">Journal d acces — Tracabilite</p>
            <Chip color="#F59E0B">Confidentiel</Chip>
          </div>
          <p className="text-slate-500 text-xs">Toutes les consultations du casier judiciaire sont enregistrees et tracables par le systeme SIPGN.</p>
          <div className="space-y-2">
            {log.map(function (l) {
              return (
                <div key={l.id} className="bg-slate-900/70 rounded-xl p-3 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-400 font-bold font-mono">{l.heure}</span>
                    <span className="text-white font-semibold">{l.agent}</span>
                  </div>
                  <p className="text-slate-300">{l.action}</p>
                  <p className="text-slate-500">Motif : {l.motif}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}


var SALLES_VISIO = [
  { id: "SALLE-CFP", nom: "Salle Commandement — CFP", hotes: ["cfp.brazzaville", "cgn.brazzaville"], statut: "disponible", capacite: 20, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-OPS", nom: "Salle Operations — DOPS", hotes: ["operations.brazzaville", "cfp.brazzaville"], statut: "en_cours", capacite: 12, chiffrement: "AES-256", participants: ["cfp.brazzaville", "operations.brazzaville", "dcpj.brazzaville"] },
  { id: "SALLE-LOG", nom: "Reunion Logistique — DL", hotes: ["dl.brazzaville"], statut: "disponible", capacite: 8, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-DAF", nom: "Comite Financier — DAF", hotes: ["daf.brazzaville"], statut: "planifiee", capacite: 6, chiffrement: "AES-256", participants: [], heurePlanifiee: "14h30" },
  { id: "SALLE-RH", nom: "Reunion DRH / Personnel", hotes: ["dgrh.brazzaville", "personnel.brazzaville"], statut: "disponible", capacite: 10, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-DRG", nom: "Briefing Renseignements — DRG", hotes: ["drg.brazzaville"], statut: "disponible", capacite: 6, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-INTER", nom: "Coordination INTERPOL", hotes: ["interpol.brazzaville"], statut: "disponible", capacite: 8, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-BCA", nom: "Revue Accidents — BCA", hotes: ["bca.brazzaville"], statut: "disponible", capacite: 6, chiffrement: "AES-256", participants: [] }
];

var HISTORIQUE_VISIO = [
  { id: "HV-001", salle: "Salle Commandement — CFP", date: "2026-06-24", heure: "09:00", duree: "47 min", participants: 5, animateur: "Commandement des Forces de Police (CFP)" },
  { id: "HV-002", salle: "Coordination INTERPOL", date: "2026-06-23", heure: "14:00", duree: "32 min", participants: 3, animateur: "Bureau Central National INTERPOL" },
  { id: "HV-003", salle: "Comite Financier — DAF", date: "2026-06-22", heure: "10:30", duree: "1h 12 min", participants: 4, animateur: "Direction Administration et Finances" },
  { id: "HV-004", salle: "Reunion Logistique — DL", date: "2026-06-20", heure: "08:00", duree: "28 min", participants: 6, animateur: "Direction de la Logistique" }
];

var TOUS_COMPTES_VISIO = [
  { id: "cfp.brazzaville", nom: "Commandement des Forces de Police (CFP)", service: "CFP", couleur: "#8B5CF6", initiales: "CF" },
  { id: "cgn.brazzaville", nom: "Commandement de la Gendarmerie Nationale (CGN)", service: "CGN", couleur: "#A21CAF", initiales: "CG" },
  { id: "drg.brazzaville", nom: "Direction des Renseignements Generaux (DRG)", service: "DRG", couleur: "#581C87", initiales: "DR" },
  { id: "dgrh.brazzaville", nom: "Direction Generale des Ressources Humaines", service: "DGRH", couleur: "#BE185D", initiales: "RH" },
  { id: "dl.brazzaville", nom: "Direction de la Logistique", service: "DL", couleur: "#0EA5E9", initiales: "DL" },
  { id: "daf.brazzaville", nom: "Direction Administration et Finances", service: "DAF", couleur: "#16A34A", initiales: "DF" },
  { id: "personnel.brazzaville", nom: "Direction Organisation et Personnel", service: "PERS", couleur: "#D97706", initiales: "PE" },
  { id: "operations.brazzaville", nom: "Direction des Operations", service: "DOPS", couleur: "#2563EB", initiales: "OP" },
  { id: "interpol.brazzaville", nom: "Bureau Central National INTERPOL", service: "INTERPOL", couleur: "#EA580C", initiales: "IN" },
  { id: "commissariat.central", nom: "Commissariat Central BZV", service: "COMM", couleur: "#003F87", initiales: "CC" },
  { id: "bca.brazzaville", nom: "Bureau Controle Accidents", service: "BCA", couleur: "#F59E0B", initiales: "BC" },
  { id: "dcpj.brazzaville", nom: "DCPJ Brazzaville", service: "DCPJ", couleur: "#DC2626", initiales: "PJ" },
  { id: "gendarmerie.pnr", nom: "Brigade Territoriale Pointe-Noire", service: "GEND PNR", couleur: "#1B6B3A", initiales: "GN" },
  { id: "controle.frontieres", nom: "Controle Voyageurs et Frontieres", service: "FRONT", couleur: "#0284C7", initiales: "FR" },
  { id: "police.navale", nom: "Police Navale Pointe-Noire", service: "PNAV", couleur: "#0C4A6E", initiales: "PN" },
  { id: "gendarmerie.navale", nom: "Gendarmerie Maritime Pointe-Noire", service: "GNAV", couleur: "#14532D", initiales: "GV" },
  { id: "opj.brazzaville", nom: "Officier de Police Judiciaire", service: "OPJ", couleur: "#7C3AED", initiales: "OJ" }
];

var REUNIONS_INITIALES = [
  {
    id: "REU-001", titre: "Point hebdomadaire CFP — Securite nationale", animateur: "cfp.brazzaville",
    date: "2026-06-26", heureDebut: "09:00", heureFin: "10:00",
    type: "hebdomadaire", ordre_du_jour: "1. Bilan incidents semaine\n2. Effectifs et deployments\n3. Coordination gendarmerie\n4. Divers",
    participants: ["cfp.brazzaville", "cgn.brazzaville", "operations.brazzaville", "dcpj.brazzaville"],
    statut: "planifiee", salle: "SALLE-CFP", priorite: "haute", rappel: 15
  },
  {
    id: "REU-002", titre: "Comite financier mensuel DAF", animateur: "daf.brazzaville",
    date: "2026-06-26", heureDebut: "14:30", heureFin: "16:00",
    type: "mensuel", ordre_du_jour: "1. Revue budgetaire juin\n2. Engagements en attente\n3. Previsions juillet\n4. Validation depenses >5M FCFA",
    participants: ["daf.brazzaville", "cfp.brazzaville", "dl.brazzaville", "personnel.brazzaville"],
    statut: "planifiee", salle: "SALLE-DAF", priorite: "haute", rappel: 30
  },
  {
    id: "REU-003", titre: "Briefing INTERPOL — cooperation regionale", animateur: "interpol.brazzaville",
    date: "2026-06-27", heureDebut: "10:00", heureFin: "11:30",
    type: "ponctuelle", ordre_du_jour: "1. Mandats actifs region Afrique Centrale\n2. Echange de renseignements\n3. Formation procedures INTERPOL\n4. Prochaine conference NCB",
    participants: ["interpol.brazzaville", "cfp.brazzaville", "dcpj.brazzaville", "drg.brazzaville"],
    statut: "planifiee", salle: "SALLE-INTER", priorite: "critique", rappel: 60
  },
  {
    id: "REU-004", titre: "Reunion logistique — reapprovisionnement Q3", animateur: "dl.brazzaville",
    date: "2026-06-28", heureDebut: "08:00", heureFin: "09:00",
    type: "ponctuelle", ordre_du_jour: "1. Etat des stocks munitions\n2. Parc vehicules — revisions\n3. Commandes en attente\n4. Budget logistique",
    participants: ["dl.brazzaville", "cfp.brazzaville", "operations.brazzaville", "bca.brazzaville"],
    statut: "planifiee", salle: "SALLE-LOG", priorite: "normale", rappel: 15
  },
  {
    id: "REU-005", titre: "Coordination DRH — GPEC semestre", animateur: "dgrh.brazzaville",
    date: "2026-06-30", heureDebut: "09:30", heureFin: "11:00",
    type: "ponctuelle", ordre_du_jour: "1. Avancements en attente\n2. Affectations juillet\n3. Plan de formation H2 2026\n4. Recrutements ouverts",
    participants: ["dgrh.brazzaville", "personnel.brazzaville", "cfp.brazzaville", "cgn.brazzaville"],
    statut: "planifiee", salle: "SALLE-RH", priorite: "normale", rappel: 30
  },
  {
    id: "REU-006", titre: "Reunion urgente — incident securite Pointe-Noire", animateur: "cgn.brazzaville",
    date: "2026-06-25", heureDebut: "07:00", heureFin: "08:00",
    type: "ponctuelle", ordre_du_jour: "1. Situation securitaire zone portuaire\n2. Deploiement forces\n3. Coordination avec Brigade PNR",
    participants: ["cgn.brazzaville", "cfp.brazzaville", "gendarmerie.pnr", "operations.brazzaville", "controle.frontieres"],
    statut: "terminee", salle: "SALLE-CFP", priorite: "critique", rappel: 0
  }
];

function PlanificateurVisio(props) {
  var compte = props.compte;
  var reunionsState = useState(REUNIONS_INITIALES);
  var reunions = reunionsState[0]; var setReunions = reunionsState[1];
  var vueState = useState("agenda"); var vue = vueState[0]; var setVue = vueState[1];
  var selState = useState(null); var selReu = selState[0]; var setSelReu = selState[1];
  var showFormState = useState(false); var showForm = showFormState[0]; var setShowForm = showFormState[1];
  var filtreState = useState("toutes"); var filtre = filtreState[0]; var setFiltre = filtreState[1];
  var notifState = useState([]); var notifs = notifState[0]; var setNotifs = notifState[1];

  var JOURS = ["2026-06-25","2026-06-26","2026-06-27","2026-06-28","2026-06-29","2026-06-30","2026-07-01"];
  var JOURS_LABELS = ["Jeu 25","Ven 26","Sam 27","Dim 28","Lun 29","Mar 30","Mer 01"];

  var formInitial = { titre:"", date:"2026-06-26", heureDebut:"09:00", heureFin:"10:00", type:"ponctuelle", priorite:"normale", ordre_du_jour:"", rappel:15, participants:[], salle:"SALLE-CFP" };
  var formState = useState(Object.assign({}, formInitial)); var form = formState[0]; var setForm = formState[1];
  var inviteOpenState = useState(false); var inviteOpen = inviteOpenState[0]; var setInviteOpen = inviteOpenState[1];
  var searchInvState = useState(""); var searchInv = searchInvState[0]; var setSearchInv = searchInvState[1];

  function getCompteInfo(id) { return TOUS_COMPTES_VISIO.find(function(c){return c.id===id;}) || {nom:id, service:id, couleur:"#64748B", initiales:"?"}; }

  function mesReunions() {
    return reunions.filter(function(r){
      return r.animateur === compte.identifiant || r.participants.indexOf(compte.identifiant) >= 0;
    });
  }

  function reunionsFiltrees() {
    var base = filtre==="miennes" ? mesReunions() : reunions;
    if(filtre==="critique") return base.filter(function(r){return r.priorite==="critique";});
    if(filtre==="today") return base.filter(function(r){return r.date==="2026-06-25";});
    return base;
  }

  function creerReunion() {
    if(!form.titre.trim() || !form.date || !form.heureDebut){ return; }
    var nouv = Object.assign({}, form, {
      id: "REU-" + Date.now(),
      animateur: compte.identifiant,
      statut: "planifiee",
      participants: form.participants.indexOf(compte.identifiant)<0 ? [compte.identifiant].concat(form.participants) : form.participants
    });
    setReunions(function(prev){ return prev.concat([nouv]); });
    setNotifs(function(prev){ return prev.concat([{ id:Date.now(), msg:"Reunion « "+nouv.titre+" » creee et invitations envoyees." }]); });
    setForm(Object.assign({}, formInitial));
    setShowForm(false);
    setVue("agenda");
    setTimeout(function(){ setNotifs(function(prev){ return prev.slice(1); }); }, 4000);
  }

  function annulerReunion(id) {
    setReunions(function(prev){ return prev.map(function(r){ return r.id===id ? Object.assign({},r,{statut:"annulee"}) : r; }); });
    setSelReu(null);
  }

  function toggleParticipant(id) {
    setForm(function(prev){
      var p = prev.participants.slice();
      var idx = p.indexOf(id);
      if(idx>=0){ p.splice(idx,1); } else { p.push(id); }
      return Object.assign({},prev,{participants:p});
    });
  }

  var PRIORITE_COLOR = { critique:"#DC2626", haute:"#F59E0B", normale:"#22C55E" };
  var PRIORITE_LABEL = { critique:"Critique", haute:"Haute", normale:"Normale" };
  var STATUT_COLOR = { planifiee:"#3B82F6", terminee:"#22C55E", annulee:"#64748B", en_cours:"#F59E0B" };
  var STATUT_LABEL = { planifiee:"Planifiee", terminee:"Terminee", annulee:"Annulee", en_cours:"En cours" };
  var TYPE_LABEL = { ponctuelle:"Ponctuelle", hebdomadaire:"Hebdomadaire", mensuel:"Mensuel", quotidien:"Quotidien" };

  var statsAujourdhui = reunions.filter(function(r){return r.date==="2026-06-25" && r.statut!=="annulee";}).length;
  var statsSemaine = reunions.filter(function(r){return r.statut!=="annulee";}).length;
  var statsEnAttente = reunions.filter(function(r){return r.statut==="planifiee" && (r.animateur===compte.identifiant || r.participants.indexOf(compte.identifiant)>=0);}).length;

  var comptesFiltresInvit = TOUS_COMPTES_VISIO.filter(function(c){
    return c.id !== compte.identifiant && (!searchInv || c.nom.toLowerCase().indexOf(searchInv.toLowerCase())>=0 || c.service.toLowerCase().indexOf(searchInv.toLowerCase())>=0);
  });

  return (
    <div className="space-y-4">
      {notifs.map(function(n){
        return (
          <div key={n.id} className="fixed top-4 right-4 z-50 bg-green-700 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold flex items-center gap-3">
            <span>✓</span>{n.msg}
          </div>
        );
      })}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Planificateur de Videoconferences</h2>
          <p className="text-slate-400 text-sm">Organisation et suivi des reunions en visioconference — SIPGN</p>
        </div>
        <button onClick={function(){setShowForm(true); setVue("form"); setSelReu(null);}} style={{background:compte.couleur}} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-sm">
          <Video size={16}/> + Planifier une reunion
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Video size={18}/>} label="Reunions aujourd hui" value={statsAujourdhui} color="#3B82F6" sub="25 juin 2026" />
        <StatCard icon={<MonitorPlay size={18}/>} label="Reunions cette semaine" value={statsSemaine} color={compte.couleur} sub="Total planifie" />
        <StatCard icon={<Bell size={18}/>} label="Mes invitations" value={statsEnAttente} color="#F59E0B" sub="En attente" />
      </div>

      {vue !== "form" ? (
        <div className="flex items-center gap-2 flex-wrap">
          {[["agenda","📅 Agenda"],["semaine","🗓️ Semaine"],["liste","📋 Liste"]].map(function(v){
            return <button key={v[0]} onClick={function(){setVue(v[0]); setSelReu(null);}} style={{background:vue===v[0]?compte.couleur+"22":"#1E293B", color:vue===v[0]?compte.couleur:"#94A3B8", border: vue===v[0]?"1px solid "+compte.couleur:"1px solid transparent"}} className="px-4 py-2 rounded-lg text-xs font-bold">{v[1]}</button>;
          })}
          <div className="ml-auto flex gap-2">
            {[["toutes","Toutes"],["miennes","Mes reunions"],["critique","Priorite critique"],["today","Aujourd hui"]].map(function(f){
              return <button key={f[0]} onClick={function(){setFiltre(f[0]);}} style={{background:filtre===f[0]?"#334155":"transparent", color:filtre===f[0]?"#fff":"#64748B"}} className="px-3 py-1.5 rounded-lg text-[11px] font-bold border border-slate-700">{f[1]}</button>;
            })}
          </div>
        </div>
      ) : null}

      {vue === "agenda" && !selReu ? (
        <div className="space-y-3">
          {["2026-06-25","2026-06-26","2026-06-27","2026-06-28","2026-06-29","2026-06-30"].map(function(jour){
            var jourReunions = reunionsFiltrees().filter(function(r){return r.date===jour;}).sort(function(a,b){return a.heureDebut.localeCompare(b.heureDebut);});
            var dateObj = new Date(jour);
            var labelJour = dateObj.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});
            var isAuj = jour === "2026-06-25";
            return (
              <div key={jour}>
                <div className="flex items-center gap-3 mb-2">
                  <div style={{background: isAuj?compte.couleur:"#334155", color: isAuj?"#fff":"#94A3B8"}} className="px-3 py-1 rounded-full text-xs font-black capitalize">{labelJour}</div>
                  {jourReunions.length > 0 ? <span className="text-slate-500 text-xs">{jourReunions.length} reunion(s)</span> : <span className="text-slate-700 text-xs italic">Aucune reunion</span>}
                </div>
                {jourReunions.map(function(r){
                  var anim = getCompteInfo(r.animateur);
                  var estInvite = r.participants.indexOf(compte.identifiant) >= 0;
                  var estAnim = r.animateur === compte.identifiant;
                  return (
                    <button key={r.id} onClick={function(){setSelReu(r); setVue("agenda");}} className="w-full text-left bg-slate-800/90 rounded-2xl border border-slate-700 hover:border-slate-500 p-4 mb-2">
                      <div className="flex items-start gap-3">
                        <div style={{background:PRIORITE_COLOR[r.priorite]+"22"}} className="px-2 py-3 rounded-xl text-center shrink-0 min-w-[52px]">
                          <p style={{color:PRIORITE_COLOR[r.priorite]}} className="text-lg font-black leading-none">{r.heureDebut}</p>
                          <p className="text-slate-500 text-[10px] mt-0.5">{r.heureFin}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white font-bold text-sm">{r.titre}</p>
                            <Chip color={PRIORITE_COLOR[r.priorite]}>{PRIORITE_LABEL[r.priorite]}</Chip>
                            <Chip color={STATUT_COLOR[r.statut]}>{STATUT_LABEL[r.statut]}</Chip>
                            {estAnim ? <Chip color={compte.couleur}>Organisateur</Chip> : estInvite ? <Chip color="#64748B">Invite</Chip> : null}
                          </div>
                          <div className="flex items-center gap-4 mt-1.5">
                            <span className="text-slate-400 text-xs">⏱ {r.heureFin && r.heureDebut ? (function(){var d=parseInt(r.heureFin)-parseInt(r.heureDebut); return Math.abs(d)+"h";}()) : "—"}</span>
                            <span className="text-slate-400 text-xs">👥 {r.participants.length} participant(s)</span>
                            <span className="text-slate-500 text-xs">🔔 -{r.rappel} min</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2">
                            <div style={{background:anim.couleur+"33",color:anim.couleur}} className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black">{anim.initiales}</div>
                            <span className="text-slate-500 text-xs">{anim.service}</span>
                            <span className="text-slate-700 text-xs">•</span>
                            <div className="flex gap-0.5">
                              {r.participants.slice(0,5).map(function(pid,i){
                                var ci = getCompteInfo(pid);
                                return <div key={pid} style={{background:ci.couleur+"33",color:ci.couleur}} className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black" title={ci.nom}>{ci.initiales}</div>;
                              })}
                              {r.participants.length > 5 ? <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[9px] text-slate-400 font-black">+{r.participants.length-5}</div> : null}
                            </div>
                          </div>
                        </div>
                        {r.statut==="planifiee" ? (
                          <div className="shrink-0">
                            <button onClick={function(e){e.stopPropagation(); setSelReu(r);}} style={{background:compte.couleur}} className="px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5"><Video size={12}/> Voir</button>
                          </div>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}

      {vue === "semaine" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="grid border-b border-slate-700" style={{gridTemplateColumns:"80px repeat(7,1fr)"}}>
            <div className="p-3 border-r border-slate-700"></div>
            {JOURS.map(function(j,i){
              var isAuj = j==="2026-06-25";
              return <div key={j} style={{background:isAuj?compte.couleur+"22":""}} className={"p-3 text-center border-r border-slate-700 "+(isAuj?"":"")}>
                <p style={{color:isAuj?compte.couleur:"#94A3B8"}} className="text-xs font-bold">{JOURS_LABELS[i]}</p>
                {reunionsFiltrees().filter(function(r){return r.date===j && r.statut!=="annulee";}).length > 0 ? <div style={{background:isAuj?compte.couleur:"#3B82F6"}} className="w-1.5 h-1.5 rounded-full mx-auto mt-1"></div> : null}
              </div>;
            })}
          </div>
          {["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map(function(heure){
            return (
              <div key={heure} className="grid border-b border-slate-800/50" style={{gridTemplateColumns:"80px repeat(7,1fr)", minHeight:48}}>
                <div className="p-2 border-r border-slate-700 text-slate-600 text-[11px] font-mono pt-1">{heure}</div>
                {JOURS.map(function(j){
                  var reu = reunionsFiltrees().filter(function(r){ return r.date===j && r.heureDebut===heure && r.statut!=="annulee"; });
                  return (
                    <div key={j} className="border-r border-slate-800/30 p-0.5 relative">
                      {reu.map(function(r){
                        return (
                          <button key={r.id} onClick={function(){setSelReu(r); setVue("agenda");}} style={{background:PRIORITE_COLOR[r.priorite]+"22", borderLeft:"3px solid "+PRIORITE_COLOR[r.priorite]}} className="w-full text-left px-2 py-1 rounded text-[10px] hover:opacity-80">
                            <p style={{color:PRIORITE_COLOR[r.priorite]}} className="font-bold truncate">{r.titre}</p>
                            <p className="text-slate-500">{r.participants.length} pers.</p>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}

      {vue === "liste" ? (
        <div className="space-y-2">
          {reunionsFiltrees().sort(function(a,b){return (a.date+a.heureDebut).localeCompare(b.date+b.heureDebut);}).map(function(r){
            var anim = getCompteInfo(r.animateur);
            return (
              <div key={r.id} onClick={function(){setSelReu(r); setVue("agenda");}} className="bg-slate-800/90 rounded-2xl border border-slate-700 hover:border-slate-500 p-4 cursor-pointer flex items-center gap-4">
                <div style={{background:PRIORITE_COLOR[r.priorite]+"22",color:PRIORITE_COLOR[r.priorite]}} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"><Video size={16}/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{r.titre}</p>
                  <p className="text-slate-400 text-xs">{r.date} · {r.heureDebut}–{r.heureFin} · Org: {anim.service}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Chip color={PRIORITE_COLOR[r.priorite]}>{PRIORITE_LABEL[r.priorite]}</Chip>
                  <Chip color={STATUT_COLOR[r.statut]}>{STATUT_LABEL[r.statut]}</Chip>
                  <span className="text-slate-400 text-xs">👥 {r.participants.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {selReu ? (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div>
                <p className="text-white font-black text-lg">{selReu.titre}</p>
                <p className="text-slate-400 text-xs mt-0.5">{selReu.id} · {TYPE_LABEL[selReu.type]}</p>
              </div>
              <button onClick={function(){setSelReu(null);}} className="text-slate-500 hover:text-white text-xl font-bold w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[["📅 Date", selReu.date],["⏱ Horaire", selReu.heureDebut+" → "+selReu.heureFin],["🔔 Rappel", selReu.rappel+" min avant"]].map(function(i){
                  return <div key={i[0]} className="bg-slate-800 rounded-xl p-3"><p className="text-slate-500 text-[10px] uppercase font-bold">{i[0]}</p><p className="text-white text-sm font-bold mt-0.5">{i[1]}</p></div>;
                })}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Chip color={PRIORITE_COLOR[selReu.priorite]}>Priorite {PRIORITE_LABEL[selReu.priorite]}</Chip>
                <Chip color={STATUT_COLOR[selReu.statut]}>{STATUT_LABEL[selReu.statut]}</Chip>
                <Chip color="#64748B">{TYPE_LABEL[selReu.type]}</Chip>
                <Chip color="#0EA5E9">Salle : {selReu.salle}</Chip>
              </div>
              {selReu.ordre_du_jour ? (
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2">Ordre du jour</p>
                  <pre className="text-slate-200 text-xs whitespace-pre-wrap font-sans">{selReu.ordre_du_jour}</pre>
                </div>
              ) : null}
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Participants ({selReu.participants.length})</p>
                <div className="grid grid-cols-2 gap-2">
                  {selReu.participants.map(function(pid){
                    var ci = getCompteInfo(pid);
                    var isAnim = pid === selReu.animateur;
                    return (
                      <div key={pid} className="bg-slate-800 rounded-xl p-2.5 flex items-center gap-2.5">
                        <div style={{background:ci.couleur+"33",color:ci.couleur}} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0">{ci.initiales}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-bold truncate">{ci.nom.length > 35 ? ci.nom.slice(0,35)+"…" : ci.nom}</p>
                          <p className="text-slate-500 text-[10px]">{ci.service}{isAnim?" · Organisateur":""}</p>
                        </div>
                        {isAnim ? <span className="text-yellow-400 text-[10px] font-black shrink-0">★</span> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
              {selReu.statut === "planifiee" ? (
                <div className="flex gap-3 pt-2">
                  <button style={{background:compte.couleur}} className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"><Video size={16}/> Rejoindre la visioconference</button>
                  {selReu.animateur === compte.identifiant ? (
                    <button onClick={function(){annulerReunion(selReu.id);}} className="px-5 py-3 rounded-xl bg-red-900/50 border border-red-800 text-red-400 font-bold text-sm hover:bg-red-900">Annuler</button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {vue === "form" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white font-black text-lg">Planifier une nouvelle reunion</p>
            <button onClick={function(){setVue("agenda"); setShowForm(false);}} className="text-slate-500 hover:text-white font-bold">✕ Annuler</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-slate-400 text-xs font-bold uppercase">Titre de la reunion *</label>
              <input value={form.titre} onChange={function(e){setForm(function(p){return Object.assign({},p,{titre:e.target.value});});}} placeholder="ex: Point securite hebdomadaire" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Date *</label>
              <input type="date" value={form.date} onChange={function(e){setForm(function(p){return Object.assign({},p,{date:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Debut *</label>
                <input type="time" value={form.heureDebut} onChange={function(e){setForm(function(p){return Object.assign({},p,{heureDebut:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Fin</label>
                <input type="time" value={form.heureFin} onChange={function(e){setForm(function(p){return Object.assign({},p,{heureFin:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
              </div>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Type</label>
              <select value={form.type} onChange={function(e){setForm(function(p){return Object.assign({},p,{type:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm">
                {[["ponctuelle","Ponctuelle"],["hebdomadaire","Hebdomadaire"],["mensuel","Mensuelle"],["quotidien","Quotidienne"]].map(function(o){return <option key={o[0]} value={o[0]}>{o[1]}</option>;})}
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Priorite</label>
              <select value={form.priorite} onChange={function(e){setForm(function(p){return Object.assign({},p,{priorite:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm">
                {[["critique","Critique"],["haute","Haute"],["normale","Normale"]].map(function(o){return <option key={o[0]} value={o[0]}>{o[1]}</option>;})}
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Rappel</label>
              <select value={form.rappel} onChange={function(e){setForm(function(p){return Object.assign({},p,{rappel:parseInt(e.target.value)});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm">
                {[[0,"Pas de rappel"],[5,"5 min avant"],[15,"15 min avant"],[30,"30 min avant"],[60,"1h avant"]].map(function(o){return <option key={o[0]} value={o[0]}>{o[1]}</option>;})}
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Salle</label>
              <select value={form.salle} onChange={function(e){setForm(function(p){return Object.assign({},p,{salle:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm">
                {SALLES_VISIO.map(function(s){return <option key={s.id} value={s.id}>{s.nom}</option>;})}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-slate-400 text-xs font-bold uppercase">Ordre du jour</label>
              <textarea value={form.ordre_du_jour} onChange={function(e){setForm(function(p){return Object.assign({},p,{ordre_du_jour:e.target.value});});}} rows={4} placeholder={"1. Point situation\n2. Actions\n3. Divers"} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm resize-none"/>
            </div>
            <div className="col-span-2">
              <label className="text-slate-400 text-xs font-bold uppercase mb-2 block">Inviter des participants ({form.participants.length} selectionne(s))</label>
              <button onClick={function(){setInviteOpen(function(v){return !v;});}} style={{background:compte.couleur+"22",color:compte.couleur,border:"1px solid "+compte.couleur+"44"}} className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <Users size={15}/> {inviteOpen ? "Fermer la liste" : "Choisir les participants"}
              </button>
              {inviteOpen ? (
                <div className="mt-2 bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2">
                  <input value={searchInv} onChange={function(e){setSearchInv(e.target.value);}} placeholder="Rechercher un service..." className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-xs"/>
                  <div className="max-h-52 overflow-auto space-y-1">
                    {comptesFiltresInvit.map(function(c){
                      var sel = form.participants.indexOf(c.id) >= 0;
                      return (
                        <button key={c.id} onClick={function(){toggleParticipant(c.id);}} style={{background:sel?c.couleur+"22":"transparent",border:sel?"1px solid "+c.couleur+"44":"1px solid transparent"}} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800">
                          <div style={{background:c.couleur+"33",color:c.couleur}} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{c.initiales}</div>
                          <span className="text-slate-200 text-xs flex-1 text-left">{c.nom}</span>
                          {sel ? <span style={{color:c.couleur}} className="text-xs font-black">✓</span> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {form.participants.length > 0 ? (
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {form.participants.map(function(pid){
                    var ci = getCompteInfo(pid);
                    return <div key={pid} style={{background:ci.couleur+"22",color:ci.couleur}} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold">
                      {ci.initiales}
                      <button onClick={function(){toggleParticipant(pid);}} className="ml-1 opacity-60 hover:opacity-100">✕</button>
                    </div>;
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <button onClick={creerReunion} style={{background:compte.couleur}} disabled={!form.titre.trim()} className="w-full py-3 rounded-xl text-white font-bold text-sm disabled:opacity-40 flex items-center justify-center gap-2">
            <Video size={16}/> Planifier et envoyer les invitations
          </button>
        </div>
      ) : null}
    </div>
  );
}


function VideoConference(props) {
  var compte = props.compte;
  var sallesState = useState(SALLES_VISIO.map(function(s){ var c={}; for(var k in s){c[k]=s[k];} c.participants=[].concat(s.participants); return c; }));
  var salles = sallesState[0]; var setSalles = sallesState[1];
  var ongletState = useState("salles");
  var onglet = ongletState[0]; var setOnglet = ongletState[1];
  var appelState = useState(null);
  var appelActif = appelState[0]; var setAppelActif = appelState[1];
  var micState = useState(true); var mic = micState[0]; var setMic = micState[1];
  var camState = useState(true); var cam = camState[0]; var setCam = camState[1];
  var dureeState = useState(0); var duree = dureeState[0]; var setDuree = dureeState[1];
  var chrono = useState(null);
  var msgState = useState([]); var msgs = msgState[0]; var setMsgs = msgState[1];
  var msgInputState = useState(""); var msgInput = msgInputState[0]; var setMsgInput = msgInputState[1];
  var nomSalleState = useState(""); var nomSalle = nomSalleState[0]; var setNomSalle = nomSalleState[1];

  useEffect(function() {
    if (appelActif) {
      var t = setInterval(function(){ setDuree(function(d){ return d+1; }); }, 1000);
      chrono[1](t);
      return function(){ clearInterval(t); };
    } else {
      setDuree(0);
    }
  }, [appelActif]);

  function formatDuree(s) {
    var h = Math.floor(s/3600); var m = Math.floor((s%3600)/60); var ss = s%60;
    return (h>0?h+"h ":"") + (m<10?"0":"")+m+":" + (ss<10?"0":"")+ss;
  }

  function rejoindre(salle) {
    setSalles(function(prev){ return prev.map(function(s){
      if(s.id !== salle.id){ return s; }
      var c={}; for(var k in s){c[k]=s[k];} c.participants=[].concat(s.participants);
      if(c.participants.indexOf(compte.identifiant)<0){ c.participants.push(compte.identifiant); }
      c.statut="en_cours"; return c;
    }); });
    setAppelActif(salle);
    setMsgs([{ id:1, auteur: "Systeme", texte: "Vous avez rejoint la salle « "+salle.nom+" »", heure: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }]);
  }

  function quitter() {
    if(!appelActif){ return; }
    setSalles(function(prev){ return prev.map(function(s){
      if(s.id !== appelActif.id){ return s; }
      var c={}; for(var k in s){c[k]=s[k];} c.participants=s.participants.filter(function(p){ return p!==compte.identifiant; });
      if(c.participants.length===0){ c.statut="disponible"; } return c;
    }); });
    if(chrono[0]){ clearInterval(chrono[0]); }
    setAppelActif(null); setMic(true); setCam(true); setMsgs([]);
  }

  function creerSalle() {
    if(!nomSalle.trim()){ return; }
    var id = "SALLE-" + Date.now();
    setSalles(function(prev){ return prev.concat([{ id:id, nom:nomSalle.trim(), hotes:[compte.identifiant], statut:"disponible", capacite:10, chiffrement:"AES-256", participants:[] }]); });
    setNomSalle("");
  }

  function envoyerMsg() {
    if(!msgInput.trim()){ return; }
    setMsgs(function(prev){ return prev.concat([{ id:Date.now(), auteur:compte.nom, texte:msgInput.trim(), heure:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }]); });
    setMsgInput("");
  }

  var statutCoul = { disponible:"#22C55E", en_cours:"#3B82F6", planifiee:"#F59E0B" };
  var statutLabel = { disponible:"Disponible", en_cours:"En cours", planifiee:"Planifiee" };

  var AVATARS_VISIO = [
    { id: "cfp.brazzaville", initiales: "CF", nom: "CFP" },
    { id: "cgn.brazzaville", initiales: "CG", nom: "CGN" },
    { id: "operations.brazzaville", initiales: "OP", nom: "DOPS" },
    { id: "dcpj.brazzaville", initiales: "PJ", nom: "DCPJ" },
    { id: "drg.brazzaville", initiales: "DR", nom: "DRG" },
    { id: "dgrh.brazzaville", initiales: "RH", nom: "DRH" },
    { id: "dl.brazzaville", initiales: "DL", nom: "LOG" },
    { id: "daf.brazzaville", initiales: "DF", nom: "DAF" },
    { id: "personnel.brazzaville", initiales: "PE", nom: "PERS" },
    { id: "interpol.brazzaville", initiales: "IN", nom: "INT" },
    { id: "bca.brazzaville", initiales: "BC", nom: "BCA" },
    { id: "commissariat.central", initiales: "CC", nom: "COMM" },
    { id: "dcpj.brazzaville", initiales: "PJ", nom: "DCPJ" },
    { id: "gendarmerie.pnr", initiales: "GN", nom: "GEND" },
    { id: "controle.frontieres", initiales: "FR", nom: "FRON" },
    { id: "police.navale", initiales: "PN", nom: "PNAV" },
    { id: "gendarmerie.navale", initiales: "GV", nom: "GNAV" }
  ];

  function getInitiales(id) {
    var found = AVATARS_VISIO.find(function(a){ return a.id===id; });
    return found ? found.initiales : id.slice(0,2).toUpperCase();
  }

  if (appelActif) {
    var salleActive = salles.find(function(s){ return s.id===appelActif.id; }) || appelActif;
    var autresParticipants = salleActive.participants.filter(function(p){ return p!==compte.identifiant; });
    return (
      <div className="fixed inset-0 bg-slate-950 z-40 flex flex-col">
        <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div style={{background: compte.couleur+"22", color: compte.couleur}} className="w-8 h-8 rounded-lg flex items-center justify-center"><Video size={16}/></div>
            <div>
              <p className="text-white font-black text-sm">{salleActive.nom}</p>
              <p className="text-slate-400 text-xs">{salleActive.participants.length} participant(s) — {salleActive.chiffrement} chiffre</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-800 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-white font-mono text-sm font-bold">{formatDuree(duree)}</span>
            </div>
            <Chip color="#22C55E">Chiffre E2E</Chip>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-slate-950 p-4 gap-3">
            <div className="flex-1 grid gap-3" style={{gridTemplateColumns: autresParticipants.length===0?"1fr": autresParticipants.length<=2?"1fr 1fr":"repeat(3,1fr)"}}>
              {autresParticipants.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-3">
                  <MonitorPlay size={48} className="text-slate-700"/>
                  <p className="text-slate-600 text-sm">En attente d autres participants...</p>
                  <p className="text-slate-700 text-xs">Partagez le nom de la salle pour inviter</p>
                </div>
              ) : autresParticipants.map(function(pid, i){
                var colors = ["#3B82F6","#22C55E","#F59E0B","#8B5CF6","#EC4899","#0EA5E9"];
                var col = colors[i % colors.length];
                return (
                  <div key={pid} className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5" style={{background:"linear-gradient(135deg,"+col+",transparent)"}}></div>
                    <div style={{background:col+"33",color:col}} className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-3">
                      {getInitiales(pid)}
                    </div>
                    <p className="text-white font-bold text-sm relative z-10">{pid}</p>
                    <div className="flex items-center gap-2 mt-2 relative z-10">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-slate-400 text-xs">En ligne</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      <div className="bg-slate-800/80 rounded-lg p-1.5"><Mic size={12} className="text-green-400"/></div>
                      <div className="bg-slate-800/80 rounded-lg p-1.5"><Video size={12} className="text-green-400"/></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 flex items-center justify-between shrink-0">
              <div style={{background:compte.couleur+"22",color:compte.couleur}} className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black">
                {compte.identifiant.slice(0,2).toUpperCase()}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={function(){setMic(function(v){return !v;});}} style={{background: mic?"#1E293B":"#DC262633"}} className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-700 hover:border-slate-500">
                  {mic ? <Mic size={18} className="text-white"/> : <MicOff size={18} className="text-red-400"/>}
                </button>
                <button onClick={function(){setCam(function(v){return !v;});}} style={{background: cam?"#1E293B":"#DC262633"}} className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-700 hover:border-slate-500">
                  {cam ? <Video size={18} className="text-white"/> : <VideoOff size={18} className="text-red-400"/>}
                </button>
                <button onClick={quitter} className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-lg shadow-red-900/50">
                  <PhoneOff size={22} className="text-white"/>
                </button>
              </div>
              <div className="text-right">
                <p className="text-white text-xs font-bold">{compte.nom}</p>
                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                  {!mic ? <MicOff size={11} className="text-red-400"/> : <Mic size={11} className="text-green-400"/>}
                  {!cam ? <VideoOff size={11} className="text-red-400"/> : <Video size={11} className="text-green-400"/>}
                </div>
              </div>
            </div>
          </div>

          <div className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-800">
              <p className="text-white font-bold text-sm">💬 Tchat de salle</p>
            </div>
            <div className="flex-1 overflow-auto p-3 space-y-2">
              {msgs.map(function(m){
                var isMine = m.auteur === compte.nom;
                return (
                  <div key={m.id} className={isMine?"text-right":"text-left"}>
                    <p className="text-slate-500 text-[10px]">{m.auteur} · {m.heure}</p>
                    <div className={"inline-block px-3 py-1.5 rounded-xl text-xs mt-0.5 "+(m.auteur==="Systeme"?"bg-slate-800 text-slate-400 italic":isMine?"bg-blue-700 text-white":"bg-slate-800 text-slate-200")}>
                      {m.texte}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 border-t border-slate-800 flex gap-2">
              <input value={msgInput} onChange={function(e){setMsgInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"){envoyerMsg();}}} placeholder="Message..." className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs"/>
              <button onClick={envoyerMsg} className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">↑</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Videoconference SIPGN</h2>
          <p className="text-slate-400 text-sm">Salles de reunion securisees — chiffrement AES-256 — reseau interne</p>
        </div>
        <Chip color={compte.couleur}>{compte.service}</Chip>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Video size={18}/>} label="Salles disponibles" value={salles.filter(function(s){return s.statut==="disponible";}).length} color="#22C55E" sub="Pret a rejoindre" />
        <StatCard icon={<Radio size={18}/>} label="Sessions en cours" value={salles.filter(function(s){return s.statut==="en_cours";}).length} color="#3B82F6" sub="Actives maintenant" />
        <StatCard icon={<MonitorPlay size={18}/>} label="Sessions planifiees" value={salles.filter(function(s){return s.statut==="planifiee";}).length} color="#F59E0B" sub="A venir" />
      </div>

      <div className="flex gap-2">
        {[["salles","Salles de reunion"],["historique","Historique"],["creer","Creer une salle"]].map(function(o){
          return <button key={o[0]} onClick={function(){setOnglet(o[0]);}} style={{background:onglet===o[0]?"#1D4ED8":"#1E293B",color:onglet===o[0]?"#fff":"#94A3B8"}} className="px-4 py-2 rounded-lg text-xs font-bold">{o[1]}</button>;
        })}
      </div>

      {onglet==="salles" ? (
        <div className="grid grid-cols-2 gap-3">
          {salles.map(function(salle){
            var peutRejoindre = salle.statut !== "en_cours" || salle.participants.indexOf(compte.identifiant) >= 0 || true;
            return (
              <div key={salle.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div style={{background:statutCoul[salle.statut]+"22",color:statutCoul[salle.statut]}} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      <Video size={18}/>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{salle.nom}</p>
                      <p className="text-slate-500 text-xs">{salle.id}</p>
                    </div>
                  </div>
                  <Chip color={statutCoul[salle.statut]}>{statutLabel[salle.statut]}{salle.heurePlanifiee?" — "+salle.heurePlanifiee:""}</Chip>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">👥 {salle.participants.length}/{salle.capacite}</span>
                    <span className="text-slate-500">🔒 {salle.chiffrement}</span>
                  </div>
                </div>
                {salle.participants.length > 0 ? (
                  <div className="flex gap-1.5 flex-wrap">
                    {salle.participants.map(function(pid, i){
                      var cols = ["#3B82F6","#22C55E","#F59E0B","#8B5CF6","#EC4899","#0EA5E9"];
                      return <div key={pid} style={{background:cols[i%cols.length]+"33",color:cols[i%cols.length]}} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black" title={pid}>{getInitiales(pid)}</div>;
                    })}
                  </div>
                ) : <p className="text-slate-600 text-xs italic">Aucun participant pour l instant</p>}
                <button onClick={function(){rejoindre(salle);}} className="w-full py-2 rounded-xl text-xs font-bold text-white" style={{background:compte.couleur}}>
                  {salle.participants.indexOf(compte.identifiant)>=0?"Revenir dans la salle":"Rejoindre la salle"}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}

      {onglet==="historique" ? (
        <div className="space-y-2">
          {HISTORIQUE_VISIO.map(function(h){
            return (
              <div key={h.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center shrink-0"><Video size={16} className="text-slate-400"/></div>
                  <div>
                    <p className="text-white font-bold text-sm">{h.salle}</p>
                    <p className="text-slate-400 text-xs">{h.date} a {h.heure} — Anime par {h.animateur}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-sm">{h.duree}</p>
                  <p className="text-slate-500 text-xs">{h.participants} participant(s)</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {onglet==="creer" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 max-w-md space-y-4">
          <p className="text-white font-bold text-sm">Creer une nouvelle salle de reunion</p>
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase">Nom de la salle</label>
            <input value={nomSalle} onChange={function(e){setNomSalle(e.target.value);}} placeholder="ex: Briefing Securite 25 Juin" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3 space-y-1 text-xs text-slate-400">
            <p>🔒 Chiffrement AES-256 automatique</p>
            <p>👤 Hote : {compte.nom}</p>
            <p>🌐 Reseau interne SIPGN uniquement</p>
          </div>
          <button onClick={creerSalle} className="w-full bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm">Creer la salle et rejoindre</button>
        </div>
      ) : null}
    </div>
  );
}


var NAV_ICON = {
  calendrier: CalendarDays,
  incidents: FileWarning,
  gardesvue: Lock,
  patrouilles: Car,
  vehicules: Truck,
  plaintes: FileText,
  carrieres: Users,
  notes: Bell,
  messagerie: MessageSquare,
  controle: Search,
  datascientist: ShieldCheck,
  budget: Truck,
  etatmajor: ShieldCheck,
  rapports: FileText,
  pistesia: Siren,
  taches: FileText,
  budgetprev: CalendarDays,
  patrimoine: Truck,
  parcauto: Truck,
  armurerie: ShieldAlert,
  infrastructures: Building2,
  fournitures: Package,
  commandes: ClipboardCheck,
  edossier: Fingerprint,
  affectations: Shuffle,
  planning: CalendarCheck,
  academie: GraduationCap,
  mobilite: BookOpen,
  pilotage: Search,
  actions: ClipboardCheck,
  detail: FileWarning,
  constat: FileText,
  risques: Search,
  suite: Search,
  transmission: ClipboardCheck,
  memoire: Lock,
  territorial: Building2,
  dossiers: FileText,
  assistance: BookOpen,
  casier: Fingerprint,
  dossiers360: Users,
  visioconf: Video,
  planifvisio: CalendarCheck
};

var NAV_BY_ROLE = {
  direction: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "territorial", label: "Commandement Territorial" },
    { id: "calendrier", label: "Calendrier" },
    { id: "incidents", label: "Main Courante" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "patrouilles", label: "Patrouilles" },
    { id: "vehicules", label: "Vehicules" },
    { id: "plaintes", label: "Plaintes" },
    { id: "carrieres", label: "Personnel" },
    { id: "controle", label: "Controle & Fichiers" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "budget", label: "Gestion Budgetaire" },
    { id: "etatmajor", label: "Etat-Major" },
    { id: "rapports", label: "Rapports Institutionnels" },
    { id: "pistesia", label: "Pistes de Solution IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "dossiers360", label: "Dossiers 360° des Agents" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  rh: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "carrieres", label: "Personnel" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  commissariat: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "incidents", label: "Main Courante" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "patrouilles", label: "Patrouilles" },
    { id: "vehicules", label: "Vehicules" },
    { id: "plaintes", label: "Plaintes" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  accidents: [
    { id: "dashboard", label: "Poste de Pilotage" },
    { id: "calendrier", label: "Calendrier" },
    { id: "constat", label: "Constat Numerique" },
    { id: "risques", label: "Cartographie des Risques" },
    { id: "gestiondossiers", label: "Gestion des Dossiers" },
    { id: "incidents", label: "Rapports accidents" },
    { id: "patrouilles", label: "Patrouilles routieres" },
    { id: "vehicules", label: "Vehicules" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  judiciaire: [
    { id: "dashboard", label: "Centre Nevralgique" },
    { id: "calendrier", label: "Calendrier" },
    { id: "pilotage", label: "Pilotage & Cartographie" },
    { id: "actions", label: "Actions" },
    { id: "detail", label: "Detail" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "plaintes", label: "Plaintes" },
    { id: "controle", label: "Controle & Fichiers" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  gendarmerie: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "incidents", label: "Main Courante" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "patrouilles", label: "Patrouilles" },
    { id: "vehicules", label: "Vehicules" },
    { id: "plaintes", label: "Plaintes" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  controle: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "controle", label: "Controle & Fichiers" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  dl: [
    { id: "dashboard", label: "Tableau de bord 360°" },
    { id: "calendrier", label: "Calendrier" },
    { id: "parcauto", label: "Parc Automobile" },
    { id: "armurerie", label: "Armurerie & Protection" },
    { id: "infrastructures", label: "Infrastructures" },
    { id: "fournitures", label: "Fournitures & Intendance" },
    { id: "patrimoine", label: "Inventaire & Patrimoine" },
    { id: "commandes", label: "Commandes & Validations" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  daf: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "taches", label: "Taches & Ordonnances" },
    { id: "budgetprev", label: "Budget & Previsions" },
    { id: "rapports", label: "Rapports Institutionnels" },
    { id: "patrimoine", label: "Inventaire & Patrimoine" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  personnel: [
    { id: "dashboard", label: "Gestion des Effectifs" },
    { id: "calendrier", label: "Calendrier" },
    { id: "edossier", label: "Dossier Individuel" },
    { id: "affectations", label: "Affectations" },
    { id: "planning", label: "Planning & Presence" },
    { id: "carrieres", label: "Personnel" },
    { id: "academie", label: "Academie & Formation" },
    { id: "mobilite", label: "Carrieres & Mobilite" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "dossiers360", label: "Dossiers 360° des Agents" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  operations: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "incidents", label: "Main Courante" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "patrouilles", label: "Patrouilles" },
    { id: "controle", label: "Controle & Fichiers" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  interpol: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "controle", label: "Controle & Fichiers" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  navale: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "calendrier", label: "Calendrier" },
    { id: "incidents", label: "Main Courante" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "patrouilles", label: "Patrouilles" },
    { id: "vehicules", label: "Embarcations" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  renseignement: [
    { id: "dashboard", label: "Cockpit de Stabilite" },
    { id: "calendrier", label: "Calendrier" },
    { id: "suite", label: "Suite d Anticipation" },
    { id: "transmission", label: "Chaine de Transmission" },
    { id: "memoire", label: "Memoire Securisee" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie" },
    { id: "datascientist", label: "Data Scientist IA" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ],
  opj: [
    { id: "dashboard", label: "Mes Dossiers en Cours" },
    { id: "calendrier", label: "Planning d Enquetes" },
    { id: "dossiers", label: "Enquetes & Procedures" },
    { id: "gardesvue", label: "Gardes a Vue" },
    { id: "assistance", label: "Assistant IA Juridique" },
    { id: "notes", label: "Notes de Service" },
    { id: "messagerie", label: "Messagerie (SIPGN-Comm)" },
    { id: "casier", label: "Casier Judiciaire" },
    { id: "visioconf", label: "Videoconference" },
    { id: "planifvisio", label: "Planificateur Visio" }
  ]
};

var UNITES_POSITIONS_CRISE = {
  "PAT-001": { x: 180, y: 150 }, "PAT-002": { x: 90, y: 230 }, "PAT-003": { x: 430, y: 200 },
  "PAT-004": { x: 250, y: 90 }, "PAT-005": { x: 480, y: 260 }
};

function ModeCrise(props) {
  var compte = props.compte;
  var onQuitter = props.onQuitter;
  var unitesActives = PATROUILLES_DATA.filter(function (p) { return p.statut !== "base"; });
  var canalState = useState([
    { id: 1, auteur: "PC Operations", texte: "Ouverture du canal de crise. Toutes les unites en ecoute.", heure: new Date().toLocaleTimeString("fr-FR") }
  ]);
  var canal = canalState[0]; var setCanal = canalState[1];
  var pttActifState = useState(null);
  var pttActif = pttActifState[0]; var setPttActif = pttActifState[1];
  var uniteSelState = useState(unitesActives[0] ? unitesActives[0].id : null);
  var uniteSel = uniteSelState[0]; var setUniteSel = uniteSelState[1];

  function uniteParId(id) { return unitesActives.find(function (u) { return u.id === id; }); }
  function demarrerPTT(id) { setPttActif(id); }
  function arreterPTT(id) {
    setPttActif(null);
    var u = uniteParId(id);
    if (!u) { return; }
    setCanal(function (prev) { return prev.concat([{ id: Date.now(), auteur: "Commandant → " + u.designation, texte: "[Message vocal transmis — " + Math.floor(Math.random() * 8 + 2) + " sec]", heure: new Date().toLocaleTimeString("fr-FR") }]); });
  }

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col">
      <div className="bg-red-900 border-b border-red-700 flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5"><Siren size={20} className="text-white" /><span className="text-white font-black uppercase tracking-wide text-sm">Mode Crise actif — Cellule de Veille</span><span className="text-red-300 text-xs">{compte.service}</span></div>
        <button onClick={onQuitter} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold border border-red-700">Quitter le mode crise</button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 bg-slate-900 relative">
          <svg width="100%" height="100%" viewBox="0 0 520 320" preserveAspectRatio="xMidYMid meet">
            <rect width="520" height="320" fill="#0B1120" />
            <line x1="260" y1="0" x2="260" y2="320" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
            <text x="55" y="20" fill="#475569" fontSize="11" fontWeight="bold">BRAZZAVILLE</text>
            <text x="365" y="20" fill="#475569" fontSize="11" fontWeight="bold">POINTE-NOIRE</text>
            {unitesActives.map(function (p) {
              var pos = UNITES_POSITIONS_CRISE[p.id] || { x: 260, y: 160 };
              var col = p.statut === "intervention" ? "#DC2626" : "#22C55E";
              var sel = uniteSel === p.id;
              return (
                <g key={p.id} style={{ cursor: "pointer" }} onClick={function () { setUniteSel(p.id); }}>
                  {p.statut === "intervention" ? <circle cx={pos.x} cy={pos.y} r="20" fill={col} opacity="0.2" /> : null}
                  <circle cx={pos.x} cy={pos.y} r={sel ? 11 : 8} fill={col} stroke="#fff" strokeWidth={sel ? 2 : 0} />
                  <text x={pos.x} y={pos.y - 14} textAnchor="middle" fill="#CBD5E1" fontSize="10" fontWeight="bold">{p.designation}</text>
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-400">📍 Positions GPS simulees des unites — actualisation en temps reel</div>
        </div>
        <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800">
            <p className="text-white font-bold text-sm mb-2">Unites d intervention ({unitesActives.length})</p>
            <div className="space-y-1.5 max-h-48 overflow-auto">
              {unitesActives.map(function (p) {
                return (
                  <div key={p.id} onClick={function () { setUniteSel(p.id); }} className={"flex items-center justify-between gap-2 p-2 rounded-lg cursor-pointer " + (uniteSel === p.id ? "bg-slate-800 border border-blue-700" : "border border-transparent")}>
                    <div><p className="text-white text-xs font-bold">{p.designation} — {p.chef}</p><p className="text-slate-500 text-[11px]">{p.zone}</p></div>
                    <Chip color={p.statut === "intervention" ? "#DC2626" : "#22C55E"}>{p.statut === "intervention" ? "Intervention" : "Terrain"}</Chip>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col min-h-0">
            <p className="text-white font-bold text-sm mb-2">📻 Canal Push-to-Talk</p>
            <div className="flex-1 space-y-1.5 overflow-auto mb-3">
              {canal.map(function (m) { return (<div key={m.id} className="text-xs"><span className="text-blue-400 font-bold">{m.auteur}</span><span className="text-slate-600"> {m.heure}</span><p className="text-slate-300">{m.texte}</p></div>); })}
            </div>
            {uniteSel ? (
              <button
                onMouseDown={function () { demarrerPTT(uniteSel); }}
                onMouseUp={function () { arreterPTT(uniteSel); }}
                onMouseLeave={function () { if (pttActif === uniteSel) { arreterPTT(uniteSel); } }}
                className={"w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 shrink-0 " + (pttActif === uniteSel ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300 border border-slate-700")}
              >
                🎙️ {pttActif === uniteSel ? "Transmission en cours..." : "Maintenir pour parler — " + (uniteParId(uniteSel) ? uniteParId(uniteSel).designation : "")}
              </button>
            ) : <p className="text-slate-600 text-xs">Selectionnez une unite pour ouvrir le canal.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var compteState = useState(null);
  var compte = compteState[0];
  var setCompte = compteState[1];
  var moduleState = useState("dashboard");
  var module = moduleState[0];
  var setModule = moduleState[1];
  var horlogeState = useState(new Date());
  var horloge = horlogeState[0];
  var setHorloge = horlogeState[1];
  var crisisModeState = useState(false);
  var crisisMode = crisisModeState[0];
  var setCrisisMode = crisisModeState[1];

  useEffect(function () {
    var intervalId = setInterval(function () { setHorloge(new Date()); }, 1000);
    return function () { clearInterval(intervalId); };
  }, []);

  function deuxChiffres(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  function formatHeure(d) {
    return deuxChiffres(d.getHours()) + ":" + deuxChiffres(d.getMinutes()) + ":" + deuxChiffres(d.getSeconds());
  }

  if (!compte) {
    return <LoginScreen onLogin={setCompte} />;
  }

  if (crisisMode) {
    return <ModeCrise compte={compte} onQuitter={function () { setCrisisMode(false); }} />;
  }

  var nav = NAV_BY_ROLE[compte.role] ? NAV_BY_ROLE[compte.role] : NAV_BY_ROLE.commissariat;
  if (compte.role === "direction" && compte.corps !== "Police") {
    nav = nav.filter(function (n) { return n.id !== "territorial"; });
  }
  var urgences = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours"; }).length + GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6 && g.statut === "actif"; }).length;
  var initiales = compte.identifiant.slice(0, 2).toUpperCase();

  var content;
  if (module === "incidents") {
    content = <MainCourante compte={compte} />;
  } else if (module === "gardesvue") {
    content = <GardesVue compte={compte} />;
  } else if (module === "patrouilles") {
    content = <Patrouilles compte={compte} />;
  } else if (module === "vehicules") {
    content = <Vehicules compte={compte} />;
  } else if (module === "plaintes") {
    content = <Plaintes compte={compte} />;
  } else if (module === "carrieres") {
    content = <Carrieres compte={compte} />;
  } else if (module === "calendrier") {
    content = <CalendrierOperationnel compte={compte} />;
  } else if (module === "notes") {
    content = <Notes compte={compte} />;
  } else if (module === "messagerie") {
    content = <Messagerie compte={compte} />;
  } else if (module === "controle") {
    content = <ControleVoyageurs compte={compte} />;
  } else if (module === "datascientist") {
    content = <DataScientistRouter compte={compte} />;
  } else if (module === "budget") {
    content = <GestionBudget compte={compte} />;
  } else if (module === "etatmajor") {
    content = <EtatMajor compte={compte} />;
  } else if (module === "rapports") {
    content = <RapportsInstitutionnels compte={compte} />;
  } else if (module === "pistesia") {
    content = <PistesIA compte={compte} />;
  } else if (module === "taches") {
    content = <TachesDAF compte={compte} />;
  } else if (module === "budgetprev") {
    content = <BudgetPrevisionsDAF compte={compte} />;
  } else if (module === "patrimoine") {
    content = <InventairePatrimoine compte={compte} />;
  } else if (module === "parcauto") {
    content = <ParcAutomobileDL compte={compte} />;
  } else if (module === "armurerie") {
    content = <ArmurerieDL compte={compte} />;
  } else if (module === "infrastructures") {
    content = <InfrastructuresDL compte={compte} />;
  } else if (module === "fournitures") {
    content = <FournituresDL compte={compte} />;
  } else if (module === "commandes") {
    content = <CommandesDL compte={compte} />;
  } else if (module === "edossier") {
    content = <EDossierPersonnel compte={compte} />;
  } else if (module === "affectations") {
    content = <GestionAffectations compte={compte} />;
  } else if (module === "planning") {
    content = <PlanningPresence compte={compte} />;
  } else if (module === "academie") {
    content = <AcademieFormation compte={compte} />;
  } else if (module === "mobilite") {
    content = <CarrieresMobilite compte={compte} />;
  } else if (module === "pilotage") {
    content = <PilotageDPJ compte={compte} />;
  } else if (module === "actions") {
    content = <ActionsDPJ compte={compte} />;
  } else if (module === "detail") {
    content = <DetailDPJ compte={compte} />;
  } else if (module === "constat") {
    content = <ConstatNumerique compte={compte} />;
  } else if (module === "risques") {
    content = <CartographieRisques compte={compte} />;
  } else if (module === "gestiondossiers") {
    content = <ActionsAccidents compte={compte} />;
  } else if (module === "suite") {
    content = <SuiteAnticipationDRG compte={compte} />;
  } else if (module === "transmission") {
    content = <ChaineTransmissionDRG compte={compte} />;
  } else if (module === "memoire") {
    content = <MemoireSecuriseeDRG compte={compte} onNavigate={setModule} />;
  } else if (module === "territorial") {
    content = <CommandementTerritorialCFP compte={compte} />;
  } else if (module === "dossiers") {
    content = <DossiersOPJ compte={compte} />;
  } else if (module === "assistance") {
    content = <AssistantJuridiqueOPJ compte={compte} />;
  } else if (module === "casier") {
    content = <CasierJudiciaire compte={compte} />;
  } else if (module === "dossiers360") {
    content = <Dossiers360Agents compte={compte} />;
  } else if (module === "visioconf") {
    content = <VideoConference compte={compte} />;
  } else if (module === "planifvisio") {
    content = <PlanificateurVisio compte={compte} />;
  } else if (compte.role === "direction") {
    content = <DashboardCFP compte={compte} onNavigate={setModule} />;
  } else if (compte.role === "daf") {
    content = <DashboardDAF compte={compte} />;
  } else if (compte.role === "dl") {
    content = <DashboardDL compte={compte} />;
  } else if (compte.role === "personnel") {
    content = <DashboardPersonnel compte={compte} />;
  } else if (compte.role === "judiciaire") {
    content = <DashboardDPJ compte={compte} />;
  } else if (compte.role === "accidents") {
    content = <DashboardAccidents compte={compte} />;
  } else if (compte.role === "renseignement") {
    content = <DashboardDRG compte={compte} />;
  } else if (compte.role === "controle") {
    content = <DashboardFrontieres compte={compte} />;
  } else if (compte.role === "opj") {
    content = <DashboardOPJ compte={compte} />;
  } else {
    content = <Dashboard compte={compte} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="bg-slate-900 border-b border-slate-800 flex items-center px-4 py-2.5 gap-4">
        <div className="flex items-center gap-2.5">
          <Ecusson size={30} />
          <div>
            <span className="text-white font-black text-xs uppercase tracking-widest block">SIPGN</span>
            <span className="text-slate-500 text-[10px] block">Police Nationale et Gendarmerie Nationale</span>
          </div>
        </div>
        <div className="flex-1 max-w-md hidden md:flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
          <Search size={14} className="text-slate-500" />
          <input placeholder="Rechercher un dossier, un agent, une plaque..." className="bg-transparent text-slate-300 text-xs placeholder-slate-600 outline-none w-full" />
        </div>
        <div className="flex-1"></div>
        {compte.role === "direction" ? (
          <button onClick={function () { setCrisisMode(true); }} className="hidden md:flex items-center gap-1.5 bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            <Siren size={13} /> Basculer en mode Crise
          </button>
        ) : null}
        <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5">
          <Clock size={13} />
          {formatHeure(horloge)}
        </div>
        <button className="relative w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
          <Bell size={15} />
          {urgences > 0 ? <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{urgences}</span> : null}
        </button>
        <button className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
          <MessageSquare size={15} />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
          <div style={{ background: compte.couleur + "33", color: compte.couleur, border: "1px solid " + compte.couleur }} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black">
            {initiales}
          </div>
          <div className="leading-tight">
            <p className="text-white text-xs font-bold">{compte.nom}</p>
            <p className="text-slate-500 text-[10px]">{compte.identifiant}</p>
          </div>
        </div>
        <button onClick={function () { setCompte(null); setModule("dashboard"); }} className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-red-400">
          <LogOut size={15} />
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest px-4 pt-4 pb-1">Navigation</p>
          <nav className="flex-1 p-3 pt-1">
            {nav.map(function (item) {
              var isActive = module === item.id;
              var IconComp = NAV_ICON[item.id] ? NAV_ICON[item.id] : LayoutDashboard;
              return (
                <button key={item.id} onClick={function () { setModule(item.id); }} style={{ background: isActive ? compte.couleur + "26" : "transparent", color: isActive ? "#fff" : "#94A3B8", borderLeft: isActive ? "3px solid " + compte.couleur : "3px solid transparent" }} className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold mb-0.5 flex items-center gap-2.5">
                  <IconComp size={15} style={{ color: isActive ? compte.couleur : "#64748B" }} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-slate-800 flex items-center gap-2.5">
            <div style={{ background: compte.couleur + "33", color: compte.couleur, border: "1px solid " + compte.couleur }} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0">
              {initiales}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{compte.nom}</p>
              <p className="text-slate-500 text-xs font-mono truncate">{compte.identifiant}</p>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-5">
          {content}
        </main>
      </div>
    </div>
  );
}
