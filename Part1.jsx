import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, FileWarning, Lock, Car, Truck, FileText, Users, Search, Bell, MessageSquare, LogOut, Siren, ShieldCheck, Clock, Fingerprint, ShieldAlert, Building2, Package, ClipboardCheck, Shuffle, CalendarCheck, GraduationCap, BookOpen, Video, VideoOff, Mic, MicOff, PhoneOff, MonitorPlay, Radio } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, Treemap } from "recharts";

var COMPTES = [
  { id: "CFP-001", identifiant: "cfp.brazzaville", motdepasse: "admin2026", role: "direction", nom: "Commandement des Forces de Police (CFP)", service: "Commandement des Forces de Police", corps: "Police", couleur: "#8B5CF6" },
  { id: "CGN-001", identifiant: "cgn.brazzaville", motdepasse: "cgn2026", role: "direction", nom: "Commandement de la Gendarmerie Nationale (CGN)", service: "Commandement de la Gendarmerie Nationale", corps: "Gendarmerie", couleur: "#A21CAF" },
  { id: "DRG-001", identifiant: "drg.brazzaville", motdepasse: "renseignement2026", role: "renseignement", nom: "Direction des Renseignements Generaux (DRG)", service: "Direction des Renseignements Generaux", corps: "Police", couleur: "#581C87" },
  { id: "DGRH-001", identifiant: "dgrh.brazzaville", motdepasse: "rh2026", role: "rh", nom: "Direction Generale des Ressources Humaines", service: "DGRH", corps: "Tous", couleur: "#BE185D" },
  { id: "DL-001", identifiant: "dl.brazzaville", motdepasse: "logistique2026", role: "dl", nom: "Direction de la Logistique", service: "Direction de la Logistique", corps: "Tous", couleur: "#0EA5E9" },
  { id: "DAF-001", identifiant: "daf.brazzaville", motdepasse: "finances2026", role: "daf", nom: "Direction Administration et Finances", service: "DAF", corps: "Tous", couleur: "#16A34A" },
  { id: "DOP-001", identifiant: "personnel.brazzaville", motdepasse: "personnel2026", role: "personnel", nom: "Direction Organisation et Personnel", service: "Direction du Personnel", corps: "Tous", couleur: "#D97706" },
  { id: "DOPS-001", identifiant: "operations.brazzaville", motdepasse: "operations2026", role: "operations", nom: "Direction des Operations", service: "Direction des Operations", corps: "Tous", couleur: "#2563EB" },
  { id: "INTERPOL-001", identifiant: "interpol.brazzaville", motdepasse: "interpol2026", role: "interpol", nom: "Bureau Central National INTERPOL", service: "INTERPOL Brazzaville", corps: "Police", couleur: "#EA580C" },
  { id: "PNAV-001", identifiant: "police.navale", motdepasse: "navale2026", role: "navale", nom: "Police Navale", service: "Police Navale", corps: "Police", couleur: "#0369A1" },
  { id: "GNAV-001", identifiant: "gendarmerie.navale", motdepasse: "navale2026", role: "navale", nom: "Gendarmerie Navale", service: "Gendarmerie Navale", corps: "Gendarmerie", couleur: "#0E7490" },
  { id: "CC-001", identifiant: "commissariat.central", motdepasse: "police2026", role: "commissariat", nom: "Commissariat Central BZV", service: "Commissariat Central BZV", corps: "Police", couleur: "#003F87" },
  { id: "BCA-001", identifiant: "bca.brazzaville", motdepasse: "accident2026", role: "accidents", nom: "Bureau Controle Accidents", service: "Bureau Controle Accidents BZV", corps: "Police", couleur: "#F59E0B" },
  { id: "PJ-001", identifiant: "dcpj.brazzaville", motdepasse: "judiciaire2026", role: "judiciaire", nom: "DCPJ Brazzaville", service: "DCPJ Brazzaville", corps: "Police", couleur: "#DC2626" },
  { id: "GN-001", identifiant: "gendarmerie.pnr", motdepasse: "gend2026", role: "gendarmerie", nom: "Brigade Territoriale PNR", service: "Brigade Territoriale Pointe-Noire", corps: "Gendarmerie", couleur: "#1B6B3A" },
  { id: "CTL-001", identifiant: "controle.frontieres", motdepasse: "frontiere2026", role: "controle", nom: "Controle Voyageurs et Frontieres", service: "Poste Frontalier Aeroport", corps: "Police", couleur: "#0EA5E9" },
  { id: "OPJ-001", identifiant: "opj.malanda", motdepasse: "enquete2026", role: "opj", nom: "Inspecteur Principal MALANDA Christian", service: "DCPJ Brazzaville", corps: "Police", couleur: "#9F1239", nomOfficier: "MALANDA Christian", matricule: "PNB-10234" }
];

var LOGO_POLICE_B64 = "logo_police.png";

function Ecusson(props) {
  var s = props.size ? props.size : 64;
  return (
    <img src={LOGO_POLICE_B64} width={s} height={s} alt="Police Nationale - Republique du Congo" style={{objectFit:"contain", display:"block"}} />
  );
}

function StatCard(props) {
  var color = props.color;
  return (
    <div className="relative bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-4 pl-5 border border-slate-700 flex items-start gap-3 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: color }}></div>
      <div style={{ background: color + "1F", color: color }} className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0">
        {props.icon}
      </div>
      <div className="min-w-0">
        <p className="text-slate-400 text-xs uppercase tracking-wide">{props.label}</p>
        <p style={{ color: color }} className="text-2xl font-black mt-0.5">{props.value}</p>
        {props.sub ? <p className="text-slate-500 text-xs mt-0.5">{props.sub}</p> : null}
      </div>
    </div>
  );
}

function Chip(props) {
  var c = props.color ? props.color : "#3B82F6";
  return (
    <span style={{ background: c + "1A", color: c, border: "1px solid " + c + "45" }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold uppercase">
      <span style={{ background: c }} className="w-1.5 h-1.5 rounded-full shrink-0"></span>
      {props.children}
    </span>
  );
}

function CorpsBadge(props) {
  var corps = props.corps;
  return <Chip color={corps === "Police" ? "#003F87" : "#1B6B3A"}>{corps === "Police" ? "Police" : "Gendarmerie"}</Chip>;
}

function LoginScreen(props) {
  var onLogin = props.onLogin;
  var idState = useState("");
  var identifiant = idState[0];
  var setIdentifiant = idState[1];
  var pwState = useState("");
  var motdepasse = pwState[0];
  var setMotdepasse = pwState[1];
  var errState = useState("");
  var erreur = errState[0];
  var setErreur = errState[1];

  function connecter() {
    var found = null;
    for (var i = 0; i < COMPTES.length; i++) {
      if (COMPTES[i].identifiant === identifiant.trim() && COMPTES[i].motdepasse === motdepasse) {
        found = COMPTES[i];
        break;
      }
    }
    if (found) {
      setErreur("");
      onLogin(found);
    } else {
      setErreur("Identifiant ou mot de passe incorrect.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-[420px]">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex justify-center">
            <Ecusson size={110} />
          </div>
          <h1 className="text-white font-black text-3xl tracking-wide">SIPGN</h1>
          <p className="text-slate-300 text-sm font-semibold mt-1">Police Nationale et Gendarmerie Nationale</p>
          <p className="text-slate-500 text-xs">Systeme Integre - Republique du Congo</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Connexion securisee</h2>
          <div className="space-y-3">
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Identifiant de service</label>
              <input value={identifiant} onChange={function (e) { setIdentifiant(e.target.value); }} placeholder="ex: commissariat.central" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Mot de passe</label>
              <input type="password" value={motdepasse} onChange={function (e) { setMotdepasse(e.target.value); }} placeholder="********" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm" />
            </div>
            {erreur ? <p className="text-red-400 text-xs font-semibold">{erreur}</p> : null}
            <button onClick={connecter} className="w-full bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm">Se connecter</button>
          </div>
        </div>
        <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-3">
          <p className="text-slate-500 text-xs font-bold uppercase mb-2">Comptes de demonstration</p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {COMPTES.map(function (c) {
              return (
                <div key={c.id} className="flex items-center gap-1.5">
                  <span style={{ background: c.couleur }} className="w-1.5 h-1.5 rounded-full"></span>
                  <span className="text-slate-400 font-mono">{c.identifiant}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

var INCIDENTS_DATA = [
  { id: "INC-001", type: "Vol a main armee", lieu: "Marche Total, Brazzaville", gravite: "critique", statut: "en_cours", corps: "Police", auteur: "dcpj.brazzaville", description: "Braquage d un commercant. Deux suspects en fuite." },
  { id: "INC-002", type: "Accident de circulation", lieu: "RN1 km 47, Pointe-Noire", gravite: "grave", statut: "en_cours", corps: "Police", auteur: "bca.brazzaville", description: "Collision frontale, 3 vehicules impliques." },
  { id: "INC-003", type: "Trouble a l ordre public", lieu: "Bacongo, Brazzaville", gravite: "moyen", statut: "cloture", corps: "Police", auteur: "commissariat.central", description: "Rixe resolue par mediation." },
  { id: "INC-004", type: "Trafic de stupefiants", lieu: "Port de Brazzaville", gravite: "critique", statut: "en_cours", corps: "Police", auteur: "dcpj.brazzaville", description: "Saisie de 12 kg de chanvre indien." },
  { id: "INC-005", type: "Violence domestique", lieu: "Bacongo II, Brazzaville", gravite: "grave", statut: "transmis_parquet", corps: "Police", auteur: "commissariat.central", description: "Victime prise en charge, dossier transmis au Parquet." },
  { id: "INC-006", type: "Exces de vitesse", lieu: "RN1 km 12, Brazzaville", gravite: "moyen", statut: "cloture", corps: "Police", auteur: "bca.brazzaville", description: "Vehicule controle a 112 km/h en zone 60." },
  { id: "INC-007", type: "Conduite en etat d ivresse", lieu: "Corniche, Brazzaville", gravite: "grave", statut: "transmis_parquet", corps: "Police", auteur: "bca.brazzaville", description: "Alcoolemie 1,8 g/l. Permis retenu." },
  { id: "INC-008", type: "Accident grave collision bus", lieu: "RN1 km 88, Niari", gravite: "critique", statut: "en_cours", corps: "Police", auteur: "bca.brazzaville", description: "7 blesses evacues vers l hopital de Dolisie." },
  { id: "INC-009", type: "Cambriolage", lieu: "Moungali, Brazzaville", gravite: "grave", statut: "en_cours", corps: "Police", auteur: "commissariat.central", description: "Effraction nocturne, materiel derobe." },
  { id: "INC-010", type: "Vol a la tire", lieu: "Gare routiere, Pointe-Noire", gravite: "moyen", statut: "en_cours", corps: "Gendarmerie", auteur: "gendarmerie.pnr", description: "Vol de telephone filme par camera de surveillance." },
  { id: "INC-011", type: "Tentative d evasion", lieu: "Maison d arret de Brazzaville", gravite: "critique", statut: "transmis_parquet", corps: "Police", auteur: "dcpj.brazzaville", description: "Evasion dejouee, deux detenus isoles." },
  { id: "INC-012", type: "Faux documents administratifs", lieu: "Aeroport Maya-Maya", gravite: "grave", statut: "en_cours", corps: "Police", auteur: "controle.frontieres", description: "Passeport presentant des signes de falsification." }
];

var GRAVITE_COLOR = { critique: "#DC2626", grave: "#F59E0B", moyen: "#3B82F6", faible: "#22C55E" };
var STATUT_LABEL = { en_cours: "En cours", cloture: "Cloture", transmis_parquet: "Au Parquet" };

function MainCourante(props) {
  var compte = props.compte;
  var fState = useState("tous");
  var filter = fState[0];
  var setFilter = fState[1];
  var voitTout = compte.role === "direction" || compte.role === "rh" || compte.role === "operations";

  var visibles = [];
  for (var i = 0; i < INCIDENTS_DATA.length; i++) {
    var inc = INCIDENTS_DATA[i];
    if (voitTout) {
      if (compte.role !== "direction" || compte.corps === "Tous" || inc.corps === compte.corps) {
        visibles.push(inc);
      }
    } else {
      if (inc.auteur === compte.identifiant) {
        visibles.push(inc);
      }
    }
  }
  var filtered = visibles;
  if (filter !== "tous") {
    filtered = [];
    for (var j = 0; j < visibles.length; j++) {
      if (visibles[j].gravite === filter) {
        filtered.push(visibles[j]);
      }
    }
  }

  var filtres = [["tous", "Tous", "#64748B"], ["critique", "Critique", "#DC2626"], ["grave", "Grave", "#F59E0B"], ["moyen", "Moyen", "#3B82F6"]];

  var TYPE_DONUT_COLORS = ["#DC2626", "#F59E0B", "#3B82F6", "#8B5CF6", "#22C55E", "#0EA5E9", "#EC4899", "#64748B"];
  var typeCounts = {};
  visibles.forEach(function (inc) { typeCounts[inc.type] = (typeCounts[inc.type] || 0) + 1; });
  var typeData = Object.entries(typeCounts).map(function (e, i) { return { name: e[0], value: e[1], color: TYPE_DONUT_COLORS[i % TYPE_DONUT_COLORS.length] }; });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-white">Main Courante - Rapports d incidents</h2>
        <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
      </div>
      {typeData.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Repartition des incidents par categorie</p>
          <p className="text-slate-500 text-xs mb-3">Nature de la criminalite en un coup d oeil</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="h-44 w-44 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={typeData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2} stroke="none">{typeData.map(function (e, i) { return <Cell key={i} fill={e.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} /></PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-white text-xl font-black">{visibles.length}</span><span className="text-slate-500 text-[10px] uppercase">Incidents</span></div>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1.5">
              {typeData.map(function (e, i) { return (<div key={i} className="flex items-center justify-between text-xs"><span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: e.color }}></span>{e.name}</span><span className="text-slate-500">{e.value}</span></div>); })}
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex gap-2 flex-wrap">
        {filtres.map(function (item) {
          var v = item[0];
          var l = item[1];
          var c = item[2];
          return (
            <button key={v} onClick={function () { setFilter(v); }} style={{ background: filter === v ? c : c + "22", color: filter === v ? "#fff" : c }} className="px-3 py-1.5 rounded-lg text-xs font-bold">
              {l}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {filtered.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucun incident enregistre.</div> : null}
        {filtered.map(function (inc) {
          return (
            <div key={inc.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-4 border border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{inc.type}</span>
                    <Chip color={GRAVITE_COLOR[inc.gravite]}>{inc.gravite}</Chip>
                    <CorpsBadge corps={inc.corps} />
                  </div>
                  <p className="text-slate-400 text-sm">{inc.lieu}</p>
                  <p className="text-slate-500 text-xs">{inc.id} - {inc.description}</p>
                </div>
                <Chip color={inc.statut === "en_cours" ? "#F59E0B" : (inc.statut === "cloture" ? "#22C55E" : "#8B5CF6")}>{STATUT_LABEL[inc.statut]}</Chip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

var GARDES_VUE_DATA = [
  { id: "GAV-001", nom: "MOUKOUARI Jean-Pierre", motif: "Vol a main armee", unite: "DCPJ Brazzaville", heuresRestantes: 34, statut: "actif", auteur: "dcpj.brazzaville" },
  { id: "GAV-002", nom: "BAZANA Paul", motif: "Trafic de stupefiants", unite: "DCPJ Brazzaville", heuresRestantes: 9, statut: "actif", auteur: "dcpj.brazzaville" },
  { id: "GAV-003", nom: "KOUMBA Arsene", motif: "Violence conjugale", unite: "Commissariat Central BZV", heuresRestantes: 15, statut: "actif", auteur: "commissariat.central" },
  { id: "GAV-004", nom: "NKOUKA Theophile", motif: "Escroquerie", unite: "Brigade Territoriale PNR", heuresRestantes: 0, statut: "prolonge", auteur: "gendarmerie.pnr" },
  { id: "GAV-005", nom: "ITOUA Patrice", motif: "Trafic de stupefiants", unite: "DCPJ Brazzaville", heuresRestantes: 42, statut: "actif", auteur: "dcpj.brazzaville" },
  { id: "GAV-006", nom: "MASSAMBA Herve", motif: "Conduite en etat d ivresse recidive", unite: "Bureau Controle Accidents BZV", heuresRestantes: 5, statut: "actif", auteur: "bca.brazzaville" }
];

function GavTimer(props) {
  var heures = props.heures;
  var col = heures <= 6 ? "#DC2626" : (heures <= 12 ? "#F59E0B" : "#22C55E");
  var pct = Math.min(100, (heures / 48) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: col }} className="font-bold">{heures}h restantes</span>
        <span className="text-slate-500">/ 48h legales</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1.5">
        <div className="h-1.5 rounded-full" style={{ width: pct + "%", background: col }}></div>
      </div>
    </div>
  );
}

function GardesVue(props) {
  var compte = props.compte;
  var initial = GARDES_VUE_DATA.map(function (g) {
    var copy = {};
    for (var key in g) { copy[key] = g[key]; }
    copy.instruction = null;
    copy.droits = { avocat: false, medecin: false, famille: false };
    return copy;
  });
  var gState = useState(initial);
  var gardes = gState[0];
  var setGardes = gState[1];

  var voitTout = compte.role === "direction" || compte.role === "rh" || compte.role === "operations";
  var visibles = voitTout ? gardes : gardes.filter(function (g) { return g.auteur === compte.identifiant || g.unite === compte.service; });
  var peutInstruire = compte.role === "direction";
  var rolesAgir = ["commissariat", "accidents", "judiciaire", "gendarmerie", "controle", "navale", "opj"];
  var peutAgir = rolesAgir.indexOf(compte.role) >= 0;

  function toggleDroit(id, droit) {
    setGardes(function (prev) {
      return prev.map(function (g) {
        if (g.id !== id) { return g; }
        var copy = {}; for (var key in g) { copy[key] = g[key]; }
        copy.droits = {}; for (var key2 in g.droits) { copy.droits[key2] = g.droits[key2]; }
        copy.droits[droit] = !copy.droits[droit];
        return copy;
      });
    });
  }

  function updateGarde(id, changes) {
    setGardes(function (prev) {
      return prev.map(function (g) {
        if (g.id !== id) { return g; }
        var copy = {};
        for (var key in g) { copy[key] = g[key]; }
        for (var key2 in changes) { copy[key2] = changes[key2]; }
        return copy;
      });
    });
  }

  function prolonger(id) {
    var g = null;
    for (var i = 0; i < gardes.length; i++) { if (gardes[i].id === id) { g = gardes[i]; } }
    updateGarde(id, { heuresRestantes: (g ? g.heuresRestantes : 0) + 24, statut: "prolonge" });
  }
  function liberer(id) { updateGarde(id, { statut: "libere" }); }
  function hospitaliser(id) { updateGarde(id, { statut: "hospitalise" }); }
  function instruire(id, texte) { updateGarde(id, { instruction: { texte: texte } }); }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white">Gestion des Gardes a Vue</h2>
      <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🔒" label="En cours" value={visibles.filter(function (g) { return g.statut === "actif"; }).length} color="#F59E0B" />
        <StatCard icon="⚠️" label="Delai critique" value={visibles.filter(function (g) { return g.heuresRestantes <= 6 && g.statut === "actif"; }).length} color="#DC2626" />
        <StatCard icon="📋" label="Total dossiers" value={visibles.length} color="#3B82F6" />
      </div>
      {visibles.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucune garde a vue enregistree.</div> : null}
      <div className="space-y-3">
        {visibles.map(function (g) {
          var isLibere = g.statut === "libere";
          var isHospitalise = g.statut === "hospitalise";
          return (
            <div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-5 border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-black text-lg">{g.nom}</span>
                    {isLibere ? <Chip color="#22C55E">LIBERE</Chip> : null}
                    {isHospitalise ? <Chip color="#0EA5E9">HOSPITALISE</Chip> : null}
                    {g.statut === "prolonge" ? <Chip color="#8B5CF6">PROLONGE</Chip> : null}
                  </div>
                  <p className="text-slate-400 text-sm">Motif: {g.motif}</p>
                  <p className="text-slate-500 text-xs">{g.id} - {g.unite}</p>
                  {g.instruction ? <div className="mt-1.5 p-2 rounded-lg border border-purple-700 bg-purple-950"><p className="text-purple-300 text-xs font-bold">Instruction: {g.instruction.texte}</p></div> : null}
                </div>
              </div>
              {!isLibere && !isHospitalise ? <GavTimer heures={g.heuresRestantes} /> : null}
              {!isLibere ? (
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  <span className="text-slate-500 text-[10px] uppercase font-bold mr-1 self-center">Droits de la personne :</span>
                  {[["avocat", "⚖️ Avocat"], ["medecin", "🩺 Medecin"], ["famille", "👪 Famille informee"]].map(function (d) {
                    var actif = g.droits && g.droits[d[0]];
                    return <button key={d[0]} onClick={function () { toggleDroit(g.id, d[0]); }} className={"px-2 py-1 rounded-full text-[11px] font-bold border " + (actif ? "bg-green-900 border-green-700 text-green-300" : "bg-slate-900 border-slate-700 text-slate-500")}>{d[1]} {actif ? "✓" : ""}</button>;
                  })}
                </div>
              ) : null}
              {!isLibere && peutAgir ? (
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button onClick={function () { prolonger(g.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-900 text-purple-300">Prolonger</button>
                  <button onClick={function () { liberer(g.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Liberer</button>
                  <button onClick={function () { hospitaliser(g.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-900 text-sky-300">Evacuer hopital</button>
                </div>
              ) : null}
              {peutInstruire && !isLibere ? (
                <div className="flex gap-2 mt-3 flex-wrap border-t border-slate-700 pt-3">
                  <button onClick={function () { instruire(g.id, "Liberer immediatement"); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Instr: Liberer</button>
                  <button onClick={function () { instruire(g.id, "Transmettre au Parquet"); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-900 text-purple-300">Instr: Parquet</button>
                  <button onClick={function () { instruire(g.id, "Prolonger 24h"); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-900 text-amber-300">Instr: Prolonger</button>
                  <button onClick={function () { instruire(g.id, "Emmener a l hopital"); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-900 text-sky-300">Instr: Hopital</button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

var PATROUILLES_DATA = [
  { id: "PAT-001", designation: "Alpha-1", corps: "Police", effectif: 4, zone: "Secteur Poto-Poto", statut: "terrain", vehicule: "VHL-PNB-0042", chef: "MBEMBA Joel", service: "DCPJ Brazzaville" },
  { id: "PAT-002", designation: "Bravo-3", corps: "Police", effectif: 3, zone: "Secteur Bacongo", statut: "terrain", vehicule: "VHL-PNB-0057", chef: "NGUESSO POBA Marie-Claire", service: "Commissariat Central BZV" },
  { id: "PAT-003", designation: "Gend-7", corps: "Gendarmerie", effectif: 5, zone: "RN1 Pointe-Noire Est", statut: "intervention", vehicule: "VHL-GN-0019", chef: "ODZAMBA Patrick", service: "Brigade Territoriale Pointe-Noire" },
  { id: "PAT-004", designation: "Alpha-2", corps: "Police", effectif: 4, zone: "Aeroport Maya-Maya", statut: "base", vehicule: "VHL-PNB-0031", chef: "MAKOSSO Sylvie", service: "Bureau Controle Accidents BZV" },
  { id: "PAT-005", designation: "Gend-2", corps: "Gendarmerie", effectif: 6, zone: "Brigade Routiere Dolisie", statut: "terrain", vehicule: "VHL-GN-0008", chef: "BITSINDOU Rodrigue", service: "Brigade de Dolisie" }
];

var STATUT_PATROUILLE_LABEL = { terrain: "Sur le terrain", intervention: "Intervention", base: "En base" };

function Patrouilles(props) {
  var compte = props.compte;
  var voitTout = compte.role === "rh" || compte.role === "operations";
  var visibles;
  if (voitTout) {
    visibles = PATROUILLES_DATA;
  } else if (compte.role === "direction" || compte.role === "navale") {
    visibles = PATROUILLES_DATA.filter(function (p) { return p.corps === compte.corps; });
  } else {
    visibles = PATROUILLES_DATA.filter(function (p) { return p.service === compte.service; });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white">Deploiement des Patrouilles</h2>
      <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🟢" label="Sur le terrain" value={visibles.filter(function (p) { return p.statut === "terrain"; }).length} color="#22C55E" />
        <StatCard icon="🔴" label="En intervention" value={visibles.filter(function (p) { return p.statut === "intervention"; }).length} color="#DC2626" />
        <StatCard icon="🔵" label="En base" value={visibles.filter(function (p) { return p.statut === "base"; }).length} color="#64748B" />
      </div>
      {visibles.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucune patrouille rattachee.</div> : null}
      <div className="grid grid-cols-2 gap-4">
        {visibles.map(function (p) {
          var col = p.statut === "intervention" ? "#DC2626" : (p.statut === "terrain" ? "#22C55E" : "#64748B");
          return (
            <div key={p.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-5 border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: col }} className="text-xl font-black">{p.designation}</span>
                    <CorpsBadge corps={p.corps} />
                  </div>
                  <p className="text-white text-sm font-semibold">{p.zone}</p>
                  <p className="text-slate-500 text-xs">Chef: {p.chef}</p>
                </div>
                <Chip color={col}>{STATUT_PATROUILLE_LABEL[p.statut]}</Chip>
              </div>
              <p className="text-slate-400 text-xs">{p.effectif} agents - {p.vehicule}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

var VEHICULES_DATA = [
  { id: "VHL-001", immat: "BZV-4421-PL", type: "Pick-up 4x4", marque: "Toyota Hilux", corps: "Police", unite: "DCPJ Brazzaville", statut: "mission", km: 47820 },
  { id: "VHL-002", immat: "BZV-5712-PL", type: "Berline", marque: "Peugeot 508", corps: "Police", unite: "Commissariat Central BZV", statut: "mission", km: 62300 },
  { id: "VHL-003", immat: "PNR-1924-GN", type: "Pick-up 4x4", marque: "Nissan Navara", corps: "Gendarmerie", unite: "Brigade Territoriale Pointe-Noire", statut: "mission", km: 28500 },
  { id: "VHL-004", immat: "BZV-3108-PL", type: "Fourgon", marque: "Renault Master", corps: "Police", unite: "Bureau Controle Accidents BZV", statut: "disponible", km: 89400 },
  { id: "VHL-005", immat: "NIA-0821-GN", type: "Moto", marque: "Honda CRF450", corps: "Gendarmerie", unite: "Brigade Routiere Dolisie", statut: "mission", km: 12100 },
  { id: "VHL-006", immat: "BZV-8812-PL", type: "Berline", marque: "Toyota Corolla", corps: "Police", unite: "DCPJ Brazzaville", statut: "maintenance", km: 104200 }
];

var STATUT_VEHICULE_LABEL = { mission: "En mission", disponible: "Disponible", maintenance: "Maintenance" };

function Vehicules(props) {
  var compte = props.compte;
  var voitTout = compte.role === "rh" || compte.role === "dl" || compte.role === "operations";
  var visibles;
  if (voitTout) {
    visibles = VEHICULES_DATA;
  } else if (compte.role === "direction" || compte.role === "navale") {
    visibles = VEHICULES_DATA.filter(function (v) { return v.corps === compte.corps; });
  } else {
    visibles = VEHICULES_DATA.filter(function (v) { return v.unite === compte.service; });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white">Vehicules et Equipements</h2>
      <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🟢" label="En mission" value={visibles.filter(function (v) { return v.statut === "mission"; }).length} color="#22C55E" />
        <StatCard icon="🔧" label="En maintenance" value={visibles.filter(function (v) { return v.statut === "maintenance"; }).length} color="#F59E0B" />
        <StatCard icon="📋" label="Total parc" value={visibles.length} color="#3B82F6" />
      </div>
      {visibles.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Disponibilite des moyens par categorie</p>
          <p className="text-slate-500 text-xs mb-3">Ratio vehicules en service / total — anticiper les besoins avant rupture</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(visibles.reduce(function (acc, v) { if (!acc[v.type]) { acc[v.type] = { total: 0, enService: 0 }; } acc[v.type].total++; if (v.statut !== "maintenance") { acc[v.type].enService++; } return acc; }, {})).map(function (e) { return { categorie: e[0], pct: Math.round((e[1].enService / e[1].total) * 100), label: e[1].enService + "/" + e[1].total }; })} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <YAxis dataKey="categorie" type="category" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v, n, p) { return [p.payload.label + " vehicules (" + v + "%)", "En service"]; }} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={18}>
                  {Object.entries(visibles.reduce(function (acc, v) { if (!acc[v.type]) { acc[v.type] = { total: 0, enService: 0 }; } acc[v.type].total++; if (v.statut !== "maintenance") { acc[v.type].enService++; } return acc; }, {})).map(function (e, i) { var pct = Math.round((e[1].enService / e[1].total) * 100); return <Cell key={i} fill={pct >= 80 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#DC2626"} />; })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}
      {visibles.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucun vehicule rattache.</div> : (
        <div className="space-y-2">
          {visibles.map(function (v) {
            var col = v.statut === "mission" ? "#22C55E" : (v.statut === "maintenance" ? "#F59E0B" : "#3B82F6");
            return (
              <div key={v.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-4 border border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold font-mono">{v.immat}</p>
                  <p className="text-slate-400 text-sm">{v.marque} {v.type}</p>
                  <p className="text-slate-500 text-xs">{v.unite}</p>
                </div>
                <div className="text-right">
                  <CorpsBadge corps={v.corps} />
                  <p className="mt-1"><Chip color={col}>{STATUT_VEHICULE_LABEL[v.statut]}</Chip></p>
                  <p className="text-slate-400 text-xs mt-1">{v.km.toLocaleString("fr-FR")} km</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

var PLAINTES_DATA = [
  { id: "PL-001", reference: "PL-BZV-234-2026", type: "Escroquerie", plaignant: "MOUKALA Bernadette", telephone: "06-123-4567", description: "Arnaque en ligne, virement de 450000 FCFA perdu.", statut: "enregistree", auteur: "commissariat.central" },
  { id: "PL-002", reference: "PL-PNR-233-2026", type: "Agression physique", plaignant: "LOUBASSOU Martin", telephone: "05-987-6543", description: "Victime d agression. Certificat medical fourni.", statut: "enquete", auteur: "gendarmerie.pnr" },
  { id: "PL-003", reference: "PL-BZV-232-2026", type: "Vol de vehicule", plaignant: "NTSIMBA Clarisse", telephone: "06-456-7890", description: "Toyota RAV4 gris vole devant domicile.", statut: "transmis_parquet", auteur: "dcpj.brazzaville" }
];

var STATUT_PLAINTE_LABEL = { enregistree: "Enregistree", enquete: "En enquete", transmis_parquet: "Au Parquet" };
var STATUT_PLAINTE_COLOR = { enregistree: "#3B82F6", enquete: "#F59E0B", transmis_parquet: "#8B5CF6" };

function Plaintes(props) {
  var compte = props.compte;
  var voitTout = compte.role === "direction" || compte.role === "rh";
  var visibles = voitTout ? PLAINTES_DATA : PLAINTES_DATA.filter(function (p) { return p.auteur === compte.identifiant; });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white">Depots de Plainte</h2>
      <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
      {visibles.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucune plainte enregistree.</div> : (
        <div className="space-y-3">
          {visibles.map(function (p) {
            return (
              <div key={p.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-5 border border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-black">{p.type}</span>
                      <span className="text-slate-500 font-mono text-xs">{p.reference}</span>
                    </div>
                    <p className="text-slate-300 text-sm">Plaignant: {p.plaignant} - {p.telephone}</p>
                    <p className="text-slate-400 text-sm mt-1">{p.description}</p>
                  </div>
                  <Chip color={STATUT_PLAINTE_COLOR[p.statut]}>{STATUT_PLAINTE_LABEL[p.statut]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

var GRADES_POLICE = ["Gardien de la Paix", "Gardien de la Paix Principal", "Brigadier", "Brigadier-Chef", "Major", "Inspecteur", "Inspecteur Principal", "Commissaire Adjoint", "Commissaire de Police", "Commissaire Divisionnaire"];
var GRADES_GENDARMERIE = ["Gendarme", "Gendarme Chef", "Marechal des Logis", "Marechal des Logis-Chef", "Adjudant", "Adjudant-Chef", "Sous-Lieutenant", "Lieutenant", "Capitaine", "Commandant"];

function gradesDe(corps) {
  return corps === "Police" ? GRADES_POLICE : GRADES_GENDARMERIE;
}

function gradeLabel(agent) {
  var liste = gradesDe(agent.corps);
  var idx = agent.gradeIndex < liste.length ? agent.gradeIndex : liste.length - 1;
  return liste[idx];
}

var AGENTS_DATA = [
  { id: "AGT-001", matricule: "PNB-10234", nom: "MALANDA Christian", corps: "Police", service: "DCPJ Brazzaville", gradeIndex: 6, anciennete: 16, statut: "actif", diplome: "Licence en Sciences Criminelles" },
  { id: "AGT-002", matricule: "PNB-10567", nom: "NGUESSO POBA Marie-Claire", corps: "Police", service: "Commissariat Central BZV", gradeIndex: 4, anciennete: 11, statut: "proposition_promotion", diplome: "Licence en Droit Penal" },
  { id: "AGT-003", matricule: "PNB-10812", nom: "MAKOSSO Sylvie", corps: "Police", service: "Bureau Controle Accidents BZV", gradeIndex: 2, anciennete: 6, statut: "actif", diplome: "BTS Maintenance Automobile" },
  { id: "AGT-004", matricule: "GN-20114", nom: "ODZAMBA Patrick", corps: "Gendarmerie", service: "Brigade Territoriale Pointe-Noire", gradeIndex: 5, anciennete: 13, statut: "actif", diplome: "Brevet Superieur de Gendarmerie" },
  { id: "AGT-005", matricule: "GN-20389", nom: "BITSINDOU Rodrigue", corps: "Gendarmerie", service: "Brigade de Dolisie", gradeIndex: 3, anciennete: 9, statut: "conge", diplome: "BTS Mecanique Generale" },
  { id: "AGT-006", matricule: "PNB-10905", nom: "MBEMBA Joel", corps: "Police", service: "DCPJ Brazzaville", gradeIndex: 5, anciennete: 14, statut: "actif", diplome: "Licence en Informatique — Forensique Numerique" },
  { id: "AGT-007", matricule: "PNB-11042", nom: "ITOUA Patrice", corps: "Police", service: "DCPJ Brazzaville", gradeIndex: 1, anciennete: 3, statut: "actif", diplome: "Baccalaureat Scientifique" },
  { id: "AGT-008", matricule: "PNB-09988", nom: "MOUKOUARI Jean-Pierre", corps: "Police", service: "INTERPOL Brazzaville", gradeIndex: 7, anciennete: 22, statut: "actif", diplome: "Master en Relations Internationales" },
  { id: "AGT-009", matricule: "GN-19762", nom: "NKOUKA Theophile", corps: "Gendarmerie", service: "Gendarmerie Navale", gradeIndex: 8, anciennete: 29, statut: "actif", diplome: "Brevet de Navigation Maritime" },
  { id: "AGT-010", matricule: "PNB-09541", nom: "BAZANA Paul", corps: "Police", service: "Police Navale", gradeIndex: 9, anciennete: 31, statut: "actif", diplome: "Diplome Superieur de Commandement" },
  { id: "AGT-011", matricule: "PNB-11203", nom: "KOUMBA Arsene", corps: "Police", service: "Commissariat Central BZV", gradeIndex: 0, anciennete: 2, statut: "sanction", diplome: "Baccalaureat Litteraire" },
  { id: "AGT-012", matricule: "PNB-10677", nom: "NTSIMBA Clarisse", corps: "Police", service: "Poste Frontalier Aeroport", gradeIndex: 3, anciennete: 8, statut: "actif", diplome: "Licence en Droit International" },
  { id: "AGT-013", matricule: "GN-20501", nom: "LOUBASSOU Martin", corps: "Gendarmerie", service: "Brigade Territoriale Pointe-Noire", gradeIndex: 2, anciennete: 5, statut: "actif", diplome: "Brevet de Gendarmerie — Cynotechnie (Brigade Canine)" },
  { id: "AGT-014", matricule: "PNB-08877", nom: "MASSAMBA Herve", corps: "Police", service: "Bureau Controle Accidents BZV", gradeIndex: 8, anciennete: 30, statut: "proposition_promotion", diplome: "Diplome Superieur de Commandement" },
  { id: "AGT-015", matricule: "PNB-10341", nom: "OKOUYA Fabrice", corps: "Police", service: "INTERPOL Brazzaville", gradeIndex: 4, anciennete: 10, statut: "detachement", diplome: "Licence en Relations Internationales" },
  { id: "AGT-016", matricule: "GN-20622", nom: "MASSENGO Hyacinthe", corps: "Gendarmerie", service: "Brigade Territoriale Pointe-Noire", gradeIndex: 2, anciennete: 4, statut: "suspension", diplome: "Brevet de Gendarmerie" }
];

var AGENT_PROFILS_MAP = {
  "AGT-001": { dateNaissance: "1992-04-12", lieuNaissance: "Brazzaville", situationFamiliale: "Marie, 2 enfants", dateFinContrat: null, evaluations: [{ annee: 2024, note: 16, commentaire: "Excellent sens de l enquete, rigueur exemplaire." }, { annee: 2025, note: 17, commentaire: "Confirme son potentiel, propose pour formation avancee." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2010-2016", service: "Commissariat Central BZV" }, { periode: "2016-present", service: "DCPJ Brazzaville" }], competences: { armes: 75, secourisme: 60, criminalistique: 92, informatique: 70, langues: 55 } },
  "AGT-002": { dateNaissance: "1989-09-03", lieuNaissance: "Pointe-Noire", situationFamiliale: "Celibataire", dateFinContrat: null, evaluations: [{ annee: 2024, note: 15, commentaire: "Tres bon encadrement d equipe." }, { annee: 2025, note: 16, commentaire: "Prete pour la promotion." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2014-2019", service: "Bureau Controle Accidents BZV" }, { periode: "2019-present", service: "Commissariat Central BZV" }], competences: { armes: 68, secourisme: 80, criminalistique: 65, informatique: 72, langues: 60 } },
  "AGT-003": { dateNaissance: "1998-01-25", lieuNaissance: "Dolisie", situationFamiliale: "Mariee", dateFinContrat: "2026-09-15", evaluations: [{ annee: 2025, note: 13, commentaire: "Bonne technicite, a renforcer sur le terrain." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2020-present", service: "Bureau Controle Accidents BZV" }], competences: { armes: 55, secourisme: 70, criminalistique: 40, informatique: 50, langues: 45 } },
  "AGT-004": { dateNaissance: "1991-06-30", lieuNaissance: "Pointe-Noire", situationFamiliale: "Marie, 1 enfant", dateFinContrat: null, evaluations: [{ annee: 2024, note: 15, commentaire: "Solide chef de brigade." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2013-2020", service: "Caserne Gendarmerie Pointe-Noire" }, { periode: "2020-present", service: "Brigade Territoriale Pointe-Noire" }], competences: { armes: 82, secourisme: 65, criminalistique: 58, informatique: 50, langues: 48 } },
  "AGT-005": { dateNaissance: "1995-11-11", lieuNaissance: "Dolisie", situationFamiliale: "Celibataire", dateFinContrat: null, evaluations: [{ annee: 2025, note: 12, commentaire: "Performance correcte, ponctualite a ameliorer." }], historiqueDiscipline: [{ date: "2024-05-10", motif: "Retard repete", sanction: "Avertissement verbal" }], historiqueAffectations: [{ periode: "2017-present", service: "Brigade de Dolisie" }], competences: { armes: 60, secourisme: 55, criminalistique: 35, informatique: 40, langues: 38 } },
  "AGT-006": { dateNaissance: "1990-02-18", lieuNaissance: "Brazzaville", situationFamiliale: "Marie, 3 enfants", dateFinContrat: null, evaluations: [{ annee: 2024, note: 17, commentaire: "Expertise technique remarquable." }, { annee: 2025, note: 18, commentaire: "Reference en informatique forensique." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2012-2018", service: "Commissariat Central BZV" }, { periode: "2018-present", service: "DCPJ Brazzaville" }], competences: { armes: 65, secourisme: 50, criminalistique: 85, informatique: 95, langues: 62 } },
  "AGT-007": { dateNaissance: "2001-08-05", lieuNaissance: "Brazzaville", situationFamiliale: "Celibataire", dateFinContrat: "2026-12-01", evaluations: [{ annee: 2025, note: 11, commentaire: "Jeune agent prometteur, en cours d integration." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2023-present", service: "DCPJ Brazzaville" }], competences: { armes: 50, secourisme: 45, criminalistique: 38, informatique: 55, langues: 40 } },
  "AGT-008": { dateNaissance: "1986-03-22", lieuNaissance: "Brazzaville", situationFamiliale: "Marie, 2 enfants", dateFinContrat: null, evaluations: [{ annee: 2024, note: 18, commentaire: "Officier de tres haut niveau, diplomatie exemplaire." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2008-2015", service: "DCPJ Brazzaville" }, { periode: "2015-present", service: "INTERPOL Brazzaville" }], competences: { armes: 60, secourisme: 55, criminalistique: 70, informatique: 75, langues: 90 } },
  "AGT-009": { dateNaissance: "1979-07-14", lieuNaissance: "Pointe-Noire", situationFamiliale: "Marie, 4 enfants", dateFinContrat: null, evaluations: [{ annee: 2024, note: 16, commentaire: "Commandement solide de la Gendarmerie Navale." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2005-present", service: "Gendarmerie Navale" }], competences: { armes: 88, secourisme: 70, criminalistique: 45, informatique: 35, langues: 50 } },
  "AGT-010": { dateNaissance: "1977-10-02", lieuNaissance: "Brazzaville", situationFamiliale: "Marie, 5 enfants", dateFinContrat: null, evaluations: [{ annee: 2024, note: 19, commentaire: "Officier superieur exemplaire, fin de carriere proche." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "1996-2010", service: "Commissariat Central BZV" }, { periode: "2010-present", service: "Police Navale" }], competences: { armes: 90, secourisme: 75, criminalistique: 60, informatique: 40, langues: 55 } },
  "AGT-011": { dateNaissance: "2003-12-19", lieuNaissance: "Brazzaville", situationFamiliale: "Celibataire", dateFinContrat: "2026-07-30", evaluations: [{ annee: 2025, note: 9, commentaire: "Difficultes disciplinaires constatees." }], historiqueDiscipline: [{ date: "2026-02-14", motif: "Manquement aux consignes", sanction: "Avertissement disciplinaire" }], historiqueAffectations: [{ periode: "2024-present", service: "Commissariat Central BZV" }], competences: { armes: 45, secourisme: 35, criminalistique: 30, informatique: 38, langues: 30 } },
  "AGT-012": { dateNaissance: "1994-05-09", lieuNaissance: "Brazzaville", situationFamiliale: "Mariee, 1 enfant", dateFinContrat: null, evaluations: [{ annee: 2025, note: 14, commentaire: "Tres rigoureuse au controle frontalier." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2018-present", service: "Poste Frontalier Aeroport" }], competences: { armes: 58, secourisme: 50, criminalistique: 55, informatique: 60, langues: 78 } },
  "AGT-013": { dateNaissance: "1997-02-27", lieuNaissance: "Pointe-Noire", situationFamiliale: "Celibataire", dateFinContrat: null, evaluations: [{ annee: 2025, note: 13, commentaire: "Specialiste cynotechnie tres apprecie." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2021-present", service: "Brigade Territoriale Pointe-Noire" }], competences: { armes: 62, secourisme: 58, criminalistique: 50, informatique: 35, langues: 40 } },
  "AGT-014": { dateNaissance: "1976-08-16", lieuNaissance: "Brazzaville", situationFamiliale: "Marie, 3 enfants", dateFinContrat: null, evaluations: [{ annee: 2024, note: 18, commentaire: "Pilier du Bureau Controle Accidents." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "1996-present", service: "Bureau Controle Accidents BZV" }], competences: { armes: 70, secourisme: 85, criminalistique: 55, informatique: 45, langues: 50 } },
  "AGT-015": { dateNaissance: "1993-03-08", lieuNaissance: "Brazzaville", situationFamiliale: "Marie", dateFinContrat: "2026-12-31", evaluations: [{ annee: 2025, note: 15, commentaire: "En detachement aupres d Interpol Lyon." }], historiqueDiscipline: [], historiqueAffectations: [{ periode: "2015-2023", service: "Commissariat Central BZV" }, { periode: "2023-present", service: "INTERPOL Brazzaville (detache)" }], competences: { armes: 55, secourisme: 50, criminalistique: 68, informatique: 80, langues: 85 } },
  "AGT-016": { dateNaissance: "1999-10-30", lieuNaissance: "Pointe-Noire", situationFamiliale: "Celibataire", dateFinContrat: null, evaluations: [{ annee: 2025, note: 8, commentaire: "Suspension en cours suite a enquete interne." }], historiqueDiscipline: [{ date: "2026-05-02", motif: "Enquete interne en cours", sanction: "Suspension temporaire" }], historiqueAffectations: [{ periode: "2022-present", service: "Brigade Territoriale Pointe-Noire" }], competences: { armes: 48, secourisme: 40, criminalistique: 30, informatique: 32, langues: 28 } }
};

var STATUT_CARRIERE_LABEL = { actif: "En service", conge: "En conge", proposition_promotion: "Proposition promotion", sanction: "Sanction disciplinaire", retraite: "Retraite", detachement: "Detachement", suspension: "Suspension" };
var STATUT_CARRIERE_COLOR = { actif: "#22C55E", conge: "#3B82F6", proposition_promotion: "#F59E0B", sanction: "#DC2626", retraite: "#64748B", detachement: "#8B5CF6", suspension: "#EA580C" };

var FORMATIONS_OBLIGATOIRES_DATA = [
  { id: "FOB-001", nom: "Securite et usage des armes", valide: 11, total: 16 },
  { id: "FOB-002", nom: "Deontologie et droits humains", valide: 14, total: 16 },
  { id: "FOB-003", nom: "Premiers secours", valide: 9, total: 16 }
];

var SESSIONS_FORMATION_DATA = [
  { id: "SES-001", nom: "Informatique Forensique Avancee", ancienneteMin: 5, gradeMin: 3, specialite: null, duree: "6 semaines", dateDebut: "2026-08-03", statut: "ouverte", candidats: [] },
  { id: "SES-002", nom: "Commandement Operationnel", ancienneteMin: 12, gradeMin: 6, specialite: null, duree: "3 mois", dateDebut: "2026-09-01", statut: "ouverte", candidats: [] },
  { id: "SES-003", nom: "Brigade Canine — Cynotechnie", ancienneteMin: 2, gradeMin: 0, specialite: null, duree: "8 semaines", dateDebut: "2026-07-20", statut: "ouverte", candidats: [] }
];

var ASPIRATIONS_DATA = [
  { id: "ASP-001", agentId: "AGT-007", diplomeVise: "Licence en Droit", strategique: true },
  { id: "ASP-002", agentId: "AGT-012", diplomeVise: "Master en Cybercriminalite", strategique: true },
  { id: "ASP-003", agentId: "AGT-003", diplomeVise: "BTS Electrotechnique", strategique: false },
  { id: "ASP-004", agentId: "AGT-013", diplomeVise: "Licence en Droit", strategique: true },
  { id: "ASP-005", agentId: "AGT-005", diplomeVise: "Master en Cybercriminalite", strategique: true }
];

var DISPONIBILITE_DATA = [
  { id: "DIS-001", agentId: "AGT-005", duree: "6 mois", motif: "Raisons familiales — assistance a un parent malade", statut: "en_attente" },
  { id: "DIS-002", agentId: "AGT-012", duree: "1 an", motif: "Etudes a l etranger (Master Cybercriminalite)", statut: "en_attente" },
  { id: "DIS-003", agentId: "AGT-003", duree: "3 mois", motif: "Convenance personnelle", statut: "defavorable" }
];

var ABSENTEISME_DATA = [
  { service: "DCPJ Brazzaville", taux: 4 },
  { service: "Commissariat Central BZV", taux: 9 },
  { service: "Bureau Controle Accidents BZV", taux: 6 },
  { service: "Brigade Territoriale PNR", taux: 12 },
  { service: "INTERPOL Brazzaville", taux: 3 }
];

var EVOLUTION_EFFECTIFS_DATA = [
  { mois: "Jan", reel: 14, besoin: 15 }, { mois: "Fev", reel: 14, besoin: 15 }, { mois: "Mar", reel: 15, besoin: 16 },
  { mois: "Avr", reel: 15, besoin: 17 }, { mois: "Mai", reel: 16, besoin: 18 }, { mois: "Juin", reel: 16, besoin: 19 }
];


function Carrieres(props) {
  var compte = props.compte;
  var initial = AGENTS_DATA.map(function (a) {
    var copy = {};
    for (var key in a) { copy[key] = a[key]; }
    copy.instruction = null;
    return copy;
  });
  var aState = useState(initial);
  var agents = aState[0];
  var setAgents = aState[1];
  var fState = useState("tous");
  var filter = fState[0];
  var setFilter = fState[1];

  var voitTout = compte.role === "rh" || compte.role === "personnel";
  var visiblesBase;
  if (voitTout) {
    visiblesBase = agents;
  } else if (compte.role === "direction") {
    visiblesBase = agents.filter(function (a) { return a.corps === compte.corps; });
  } else {
    visiblesBase = [];
  }

  var visibles = visiblesBase;
  if (filter !== "tous") {
    visibles = visiblesBase.filter(function (a) { return a.corps === filter; });
  }

  var peutGerer = compte.role === "rh" || compte.role === "personnel";
  var peutValider = compte.role === "direction";
  var peutMatcher = compte.role === "rh" || compte.role === "personnel" || compte.role === "direction";

  var matchingAI = useState({ loading: false, result: null });
  var SYS_MATCH = "Tu es Data Scientist RH du SIPGN (Police Nationale et Gendarmerie Nationale du Congo). Tu croises les diplomes et qualifications des agents avec les besoins operationnels reels pour suggerer les meilleures affectations. Reponds en francais, structure et directement actionnable.";

  function lancerMatching() {
    matchingAI[1]({ loading: true, result: null });
    var ctx = JSON.stringify(visiblesBase.map(function (a) { return { nom: a.nom, corps: a.corps, grade: gradeLabel(a), diplome: a.diplome, service: a.service, statut: a.statut, anciennete: a.anciennete }; }));
    var besoins = "Incidents necessitant des specialistes: Faux documents administratifs (besoin: Droit/Police Scientifique), Trafic de stupefiants (besoin: enqueteurs experimentes), Vol a main armee (besoin: DCPJ renforce) | Unites en sous-effectif: DCPJ Brazzaville, Poste Frontalier Aeroport, Brigade Territoriale Pointe-Noire | Specialites recherchees: Informatique Forensique, Brigade Canine, Police Scientifique, Relations Internationales (INTERPOL)";
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS_MATCH, messages: [{ role: "user", content: "Croise les diplomes des agents avec les besoins operationnels reels pour proposer des affectations optimisees. Pour les 5 meilleurs matchs identifies: 1) Agent concerne et son diplome 2) Poste ou unite recommande 3) Justification du match diplome/besoin 4) Gain operationnel attendu. Conclus avec les diplomes sous-exploites dans l effectif actuel et les profils a recruter en priorite pour combler les lacunes. Agents et diplomes: " + ctx + " | Besoins operationnels: " + besoins }] })
    }).then(function (r) { return r.json(); }).then(function (d) {
      matchingAI[1]({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." });
    }).catch(function () { matchingAI[1]({ loading: false, result: "Erreur de connexion." }); });
  }

  function update(id, changes) {
    setAgents(function (prev) {
      return prev.map(function (a) {
        if (a.id !== id) { return a; }
        var copy = {};
        for (var key in a) { copy[key] = a[key]; }
        for (var key2 in changes) { copy[key2] = changes[key2]; }
        return copy;
      });
    });
  }

  function proposerPromotion(id) { update(id, { statut: "proposition_promotion", instruction: null }); }
  function validerPromotion(id) {
    var a = null;
    for (var i = 0; i < agents.length; i++) { if (agents[i].id === id) { a = agents[i]; } }
    if (!a) { return; }
    var liste = gradesDe(a.corps);
    var next = Math.min(a.gradeIndex + 1, liste.length - 1);
    update(id, { gradeIndex: next, statut: "actif", instruction: { texte: "Promotion validee au grade de " + liste[next] } });
  }
  function refuserPromotion(id) { update(id, { statut: "actif", instruction: { texte: "Promotion refusee par la Direction" } }); }
  function mettreConge(id) { update(id, { statut: "conge", instruction: null }); }
  function sanctionner(id) { update(id, { statut: "sanction", instruction: { texte: "Avertissement disciplinaire notifie" } }); }
  function mettreRetraite(id) { update(id, { statut: "retraite", instruction: null }); }
  function repriseService(id) { update(id, { statut: "actif", instruction: null }); }

  var filtres = [["tous", "Tous", "#64748B"], ["Police", "Police", "#003F87"], ["Gendarmerie", "Gendarmerie", "#1B6B3A"]];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-white">Personnel et Carrieres</h2>
        <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee DGRH" : "Service: " + compte.service}</p>
      </div>
      {visiblesBase.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucun dossier de personnel accessible pour ce profil.</div> : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon="👥" label="Effectif gere" value={visibles.length} color="#3B82F6" />
            <StatCard icon="⭐" label="Promotions en attente" value={visibles.filter(function (a) { return a.statut === "proposition_promotion"; }).length} color="#F59E0B" />
            <StatCard icon="🌴" label="En conge" value={visibles.filter(function (a) { return a.statut === "conge"; }).length} color="#0EA5E9" />
            <StatCard icon="🎖️" label="Proches retraite" value={visibles.filter(function (a) { return a.anciennete >= 28; }).length} color="#64748B" />
          </div>
          {peutMatcher ? (
            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-pink-800 p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-white font-bold text-sm">🎯 Suivi RH intelligent — Matching Diplomes / Besoins</p>
                  <p className="text-slate-500 text-xs">L IA croise les diplomes de l effectif avec les besoins operationnels reels pour suggerer des affectations.</p>
                </div>
                <button onClick={lancerMatching} className="bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0">Lancer le matching IA</button>
              </div>
              {matchingAI[0].loading || matchingAI[0].result ? (
                <div className="mt-3"><AIBloc state={matchingAI[0]} /></div>
              ) : null}
            </div>
          ) : null}
          <div className="flex gap-2 flex-wrap">
            {filtres.map(function (item) {
              var v = item[0];
              var l = item[1];
              var c = item[2];
              return (
                <button key={v} onClick={function () { setFilter(v); }} style={{ background: filter === v ? c : c + "22", color: filter === v ? "#fff" : c }} className="px-3 py-1.5 rounded-lg text-xs font-bold">
                  {l}
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            {visibles.map(function (a) {
              return (
                <div key={a.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-4 border border-slate-700">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold">{a.nom}</span>
                        <CorpsBadge corps={a.corps} />
                      </div>
                      <p className="text-slate-400 text-sm">{gradeLabel(a)} - {a.service}</p>
                      <p className="text-slate-500 text-xs">{a.matricule} - {a.anciennete} ans de service</p>
                      {a.diplome ? <p className="text-pink-400 text-xs mt-0.5">🎓 {a.diplome}</p> : null}
                      {a.instruction ? <div className="mt-1.5 p-2 rounded-lg border border-purple-700 bg-purple-950 inline-block"><p className="text-purple-300 text-xs font-bold">{a.instruction.texte}</p></div> : null}
                    </div>
                    <Chip color={STATUT_CARRIERE_COLOR[a.statut]}>{STATUT_CARRIERE_LABEL[a.statut]}</Chip>
                  </div>
                  {peutGerer && a.statut === "actif" ? (
                    <div className="flex gap-2 mt-3 flex-wrap border-t border-slate-700 pt-3">
                      <button onClick={function () { proposerPromotion(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-900 text-amber-300">Proposer promotion</button>
                      <button onClick={function () { mettreConge(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-900 text-sky-300">Mettre en conge</button>
                      <button onClick={function () { sanctionner(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Sanctionner</button>
                      <button onClick={function () { mettreRetraite(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-700 text-slate-300">Mettre en retraite</button>
                    </div>
                  ) : null}
                  {peutGerer && (a.statut === "conge" || a.statut === "sanction") ? (
                    <div className="flex gap-2 mt-3 flex-wrap border-t border-slate-700 pt-3">
                      <button onClick={function () { repriseService(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Reprise de service</button>
                    </div>
                  ) : null}
                  {peutValider && a.statut === "proposition_promotion" ? (
                    <div className="flex gap-2 mt-3 flex-wrap border-t border-slate-700 pt-3">
                      <button onClick={function () { validerPromotion(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Valider promotion</button>
                      <button onClick={function () { refuserPromotion(a.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Refuser</button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

var TYPE_LABEL = { intervention: "Intervention", echeance: "Echeance critique", reunion: "Reunion", formation: "Formation", mission: "Mission" };
var TYPE_COLOR = { intervention: "#DC2626", echeance: "#F59E0B", reunion: "#3B82F6", formation: "#8B5CF6", mission: "#16A34A" };
var STATUT_EVT_LABEL = { planifie: "Planifie", termine: "Termine", annule: "Annule" };
var STATUT_EVT_COLOR = { planifie: "#3B82F6", termine: "#22C55E", annule: "#64748B" };

var EVENTS_DATA = [
  { id: "EVT-001", titre: "Reunion Etat-Major hebdomadaire", type: "reunion", date: "2026-06-19", heure: "08:00", duree: "2h", corps: "Tous", service: "Commandement des Forces de Police", lieu: "QG CFP Brazzaville", criticite: "normale", statut: "planifie", auteur: "cfp.brazzaville" },
  { id: "EVT-002", titre: "Operation conjointe anti-stupefiants Port BZV", type: "intervention", date: "2026-06-19", heure: "05:00", duree: "4h", corps: "Police", service: "DCPJ Brazzaville", lieu: "Port de Brazzaville", criticite: "critique", statut: "planifie", auteur: "dcpj.brazzaville" },
  { id: "EVT-003", titre: "Echeance transmission dossier INC-004 au Parquet", type: "echeance", date: "2026-06-20", heure: "17:00", duree: null, corps: "Police", service: "DCPJ Brazzaville", lieu: "Tribunal de Grande Instance", criticite: "critique", statut: "planifie", auteur: "dcpj.brazzaville" },
  { id: "EVT-004", titre: "Controle routier renforce RN1", type: "mission", date: "2026-06-20", heure: "06:00", duree: "6h", corps: "Police", service: "Bureau Controle Accidents BZV", lieu: "RN1 km 12", criticite: "normale", statut: "planifie", auteur: "bca.brazzaville" },
  { id: "EVT-005", titre: "Formation maniement armes reglementaires", type: "formation", date: "2026-06-22", heure: "09:00", duree: "3 jours", corps: "Gendarmerie", service: "Brigade Territoriale Pointe-Noire", lieu: "Centre d entrainement PNR", criticite: "normale", statut: "planifie", auteur: "gendarmerie.pnr" },
  { id: "EVT-006", titre: "Audience disciplinaire agent KOUMBA Arsene", type: "echeance", date: "2026-06-18", heure: "14:00", duree: "1h", corps: "Police", service: "Direction du Personnel", lieu: "DGRH Brazzaville", criticite: "critique", statut: "planifie", auteur: "personnel.brazzaville" },
  { id: "EVT-007", titre: "Mission escorte convoi mineraux Boko Songho", type: "mission", date: "2026-06-23", heure: "05:30", duree: "8h", corps: "Gendarmerie", service: "Direction des Operations", lieu: "Axe Boko Songho - Dolisie", criticite: "critique", statut: "planifie", auteur: "operations.brazzaville" },
  { id: "EVT-008", titre: "Reunion budgetaire trimestrielle DAF", type: "reunion", date: "2026-06-25", heure: "10:00", duree: "3h", corps: "Tous", service: "DAF", lieu: "DAF Brazzaville", criticite: "normale", statut: "planifie", auteur: "daf.brazzaville" },
  { id: "EVT-009", titre: "Renouvellement habilitations INTERPOL", type: "echeance", date: "2026-06-30", heure: "09:00", duree: null, corps: "Police", service: "INTERPOL Brazzaville", lieu: "BCN INTERPOL", criticite: "normale", statut: "planifie", auteur: "interpol.brazzaville" },
  { id: "EVT-010", titre: "Patrouille maritime conjointe", type: "intervention", date: "2026-06-21", heure: "07:00", duree: "5h", corps: "Police", service: "Police Navale", lieu: "Embouchure Pointe-Noire", criticite: "normale", statut: "planifie", auteur: "police.navale" },
  { id: "EVT-011", titre: "Controle frontalier renforce vacances scolaires", type: "mission", date: "2026-06-26", heure: "06:00", duree: "7 jours", corps: "Police", service: "Poste Frontalier Aeroport", lieu: "Aeroport Maya-Maya", criticite: "critique", statut: "planifie", auteur: "controle.frontieres" },
  { id: "EVT-012", titre: "Maintenance programmee parc vehicules", type: "echeance", date: "2026-06-24", heure: "08:00", duree: "1 jour", corps: "Tous", service: "Direction de la Logistique", lieu: "Garage central BZV", criticite: "normale", statut: "planifie", auteur: "dl.brazzaville" },
  { id: "EVT-013", titre: "Reunion coordination Gendarmerie Navale", type: "reunion", date: "2026-06-17", heure: "09:00", duree: "2h", corps: "Gendarmerie", service: "Gendarmerie Navale", lieu: "Base navale Pointe-Noire", criticite: "normale", statut: "termine", auteur: "gendarmerie.navale" },
  { id: "EVT-014", titre: "Intervention rixe signalee Bacongo", type: "intervention", date: "2026-06-18", heure: "21:00", duree: "2h", corps: "Police", service: "Commissariat Central BZV", lieu: "Bacongo", criticite: "critique", statut: "planifie", auteur: "commissariat.central" }
];

function CalendrierOperationnel(props) {
  var compte = props.compte;
  var initial = EVENTS_DATA.map(function (e) {
    var copy = {};
    for (var key in e) { copy[key] = e[key]; }
    return copy;
  });
  var eState = useState(initial);
  var events = eState[0];
  var setEvents = eState[1];
  var fState = useState("tous");
  var filter = fState[0];
  var setFilter = fState[1];
  var showState = useState(false);
  var showForm = showState[0];
  var setShowForm = showState[1];
  var titreState = useState("");
  var titre = titreState[0];
  var setTitre = titreState[1];
  var typeState = useState("intervention");
  var typeEvt = typeState[0];
  var setTypeEvt = typeState[1];
  var dateState = useState(new Date().toISOString().slice(0, 10));
  var dateEvt = dateState[0];
  var setDateEvt = dateState[1];
  var heureState = useState("08:00");
  var heureEvt = heureState[0];
  var setHeureEvt = heureState[1];
  var dureeState = useState("");
  var dureeEvt = dureeState[0];
  var setDureeEvt = dureeState[1];
  var lieuState = useState("");
  var lieuEvt = lieuState[0];
  var setLieuEvt = lieuState[1];
  var critState = useState("normale");
  var criticiteEvt = critState[0];
  var setCriticiteEvt = critState[1];

  var voitTout = compte.role === "direction" || compte.role === "rh" || compte.role === "operations";

  function visiblePour(e) {
    if (voitTout) {
      if (compte.role === "direction" && compte.corps !== "Tous" && e.corps !== "Tous" && e.corps !== compte.corps) { return false; }
      return true;
    }
    return e.service === compte.service;
  }

  var visiblesBase = events.filter(visiblePour);

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  function diffJours(d) {
    var dt = new Date(d + "T00:00:00");
    return Math.round((dt - today) / 86400000);
  }

  var visibles = visiblesBase;
  if (filter === "aujourdhui") {
    visibles = visiblesBase.filter(function (e) { return diffJours(e.date) === 0; });
  } else if (filter === "semaine") {
    visibles = visiblesBase.filter(function (e) { return diffJours(e.date) >= 0 && diffJours(e.date) <= 7; });
  } else if (filter === "critique") {
    visibles = visiblesBase.filter(function (e) { return e.criticite === "critique"; });
  }

  var tries = visibles.slice().sort(function (a, b) {
    var ka = a.date + " " + a.heure;
    var kb = b.date + " " + b.heure;
    if (ka < kb) { return -1; }
    if (ka > kb) { return 1; }
    return 0;
  });

  function peutGerer(e) {
    return voitTout || e.auteur === compte.identifiant;
  }

  function marquerTermine(id) {
    setEvents(function (prev) {
      return prev.map(function (e) {
        if (e.id !== id) { return e; }
        var copy = {};
        for (var key in e) { copy[key] = e[key]; }
        copy.statut = "termine";
        return copy;
      });
    });
  }
  function annulerEvenement(id) {
    setEvents(function (prev) {
      return prev.map(function (e) {
        if (e.id !== id) { return e; }
        var copy = {};
        for (var key in e) { copy[key] = e[key]; }
        copy.statut = "annule";
        return copy;
      });
    });
  }

  function enregistrer() {
    if (titre.trim() === "" || dateEvt === "") { return; }
    var nouveau = {
      id: "EVT-" + Date.now(),
      titre: titre.trim(),
      type: typeEvt,
      date: dateEvt,
      heure: heureEvt,
      duree: dureeEvt.trim() === "" ? null : dureeEvt.trim(),
      corps: compte.corps,
      service: compte.service,
      lieu: lieuEvt.trim(),
      criticite: criticiteEvt,
      statut: "planifie",
      auteur: compte.identifiant
    };
    setEvents(function (prev) { return prev.concat([nouveau]); });
    setTitre("");
    setDureeEvt("");
    setLieuEvt("");
    setCriticiteEvt("normale");
    setShowForm(false);
  }

  function formatDate(d) {
    var dt = new Date(d + "T00:00:00");
    var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var mois = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
    return jours[dt.getDay()] + " " + dt.getDate() + " " + mois[dt.getMonth()] + " " + dt.getFullYear();
  }

  var filtres = [["tous", "Tous", "#64748B"], ["aujourdhui", "Aujourd hui", "#3B82F6"], ["semaine", "Cette semaine", "#8B5CF6"], ["critique", "Critique", "#DC2626"]];

  var lastDate = null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Calendrier Operationnel</h2>
          <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
        </div>
        <button onClick={function () { setShowForm(!showForm); }} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">{showForm ? "Fermer" : "+ Nouvel evenement"}</button>
      </div>

      {showForm ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-5 border border-slate-700 space-y-3">
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase">Titre</label>
            <input value={titre} onChange={function (e) { setTitre(e.target.value); }} placeholder="ex: Operation de controle" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Type</label>
              <select value={typeEvt} onChange={function (e) { setTypeEvt(e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                <option value="intervention">Intervention</option>
                <option value="echeance">Echeance critique</option>
                <option value="reunion">Reunion</option>
                <option value="formation">Formation</option>
                <option value="mission">Mission</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Criticite</label>
              <select value={criticiteEvt} onChange={function (e) { setCriticiteEvt(e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                <option value="normale">Normale</option>
                <option value="critique">Critique</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Date</label>
              <input type="date" value={dateEvt} onChange={function (e) { setDateEvt(e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Heure</label>
              <input type="time" value={heureEvt} onChange={function (e) { setHeureEvt(e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Duree</label>
              <input value={dureeEvt} onChange={function (e) { setDureeEvt(e.target.value); }} placeholder="ex: 2h" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase">Lieu</label>
            <input value={lieuEvt} onChange={function (e) { setLieuEvt(e.target.value); }} placeholder="ex: Commissariat Central" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          </div>
          <button onClick={enregistrer} className="bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Enregistrer l evenement</button>
        </div>
      ) : null}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📅" label="Evenements" value={visiblesBase.length} color="#3B82F6" />
        <StatCard icon="☀️" label="Aujourd hui" value={visiblesBase.filter(function (e) { return diffJours(e.date) === 0; }).length} color="#0EA5E9" />
        <StatCard icon="🗓️" label="Cette semaine" value={visiblesBase.filter(function (e) { return diffJours(e.date) >= 0 && diffJours(e.date) <= 7; }).length} color="#8B5CF6" />
        <StatCard icon="⚠️" label="Echeances critiques" value={visiblesBase.filter(function (e) { return e.criticite === "critique" && e.statut === "planifie"; }).length} color="#DC2626" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {filtres.map(function (item) {
          var v = item[0];
          var l = item[1];
          var c = item[2];
          return (
            <button key={v} onClick={function () { setFilter(v); }} style={{ background: filter === v ? c : c + "22", color: filter === v ? "#fff" : c }} className="px-3 py-1.5 rounded-lg text-xs font-bold">
              {l}
            </button>
          );
        })}
      </div>

      {tries.length === 0 ? <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucun evenement programme.</div> : null}

      <div className="space-y-3">
        {tries.map(function (e) {
          var showHeader = e.date !== lastDate;
          lastDate = e.date;
          var isAnnule = e.statut === "annule";
          var isTermine = e.statut === "termine";
          return (
            <div key={e.id}>
              {showHeader ? <p className="text-slate-400 text-xs font-bold uppercase mt-4 mb-1.5">{formatDate(e.date)}</p> : null}
              <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 p-4 border border-slate-700" style={{ opacity: isAnnule ? 0.5 : 1 }}>
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-bold">{e.titre}</span>
                      <Chip color={TYPE_COLOR[e.type]}>{TYPE_LABEL[e.type]}</Chip>
                      {e.criticite === "critique" ? <Chip color="#DC2626">Urgent</Chip> : null}
                    </div>
                    <p className="text-slate-400 text-sm">{e.heure}{e.duree ? " - " + e.duree : ""} - {e.lieu}</p>
                    <p className="text-slate-500 text-xs">{e.service}</p>
                  </div>
                  <Chip color={STATUT_EVT_COLOR[e.statut]}>{STATUT_EVT_LABEL[e.statut]}</Chip>
                </div>
                {!isAnnule && !isTermine && peutGerer(e) ? (
                  <div className="flex gap-2 mt-3 flex-wrap border-t border-slate-700 pt-3">
                    <button onClick={function () { marquerTermine(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Marquer termine</button>
                    <button onClick={function () { annulerEvenement(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-700 text-slate-300">Annuler</button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

var PRIORITE_NOTE = { urgente: "#DC2626", importante: "#F59E0B", information: "#3B82F6" };
var NOTES_DATA = [
  { id: "NS-001", titre: "Consignes operation anti-stupefiants Port BZV", contenu: "Tous les agents de la DCPJ et du Commissariat Central sont convoques a 04h30 au QG CFP pour briefing. Tenue operationnelle obligatoire. Discrecion totale.", auteur: "cfp.brazzaville", auteurNom: "CFP - Commandement des Forces de Police", date: "2026-06-18", priorite: "urgente", destinataires: ["dcpj.brazzaville", "commissariat.central", "operations.brazzaville"], lu: [] },
  { id: "NS-002", titre: "Procedure d acces aux fichiers INTERPOL - mise a jour", contenu: "Suite a la mise a jour du systeme BCN, les acces aux fichiers INTERPOL reqierent desormais une double authentification. Contacter le BCN Brazzaville pour renouveler les habilitations avant le 30 juin.", auteur: "interpol.brazzaville", auteurNom: "BCN INTERPOL Brazzaville", date: "2026-06-17", priorite: "importante", destinataires: ["dcpj.brazzaville", "controle.frontieres", "gendarmerie.pnr", "cfp.brazzaville", "cgn.brazzaville"], lu: [] },
  { id: "NS-003", titre: "Calendrier visites medicales periodiques - Juin 2026", contenu: "Les agents dont le matricule commence par PNB-10 sont convoques a la visite medicale periodique le 25 juin 2026 a 08h00 au service medical du Commandement.", auteur: "dgrh.brazzaville", auteurNom: "Direction Generale des Ressources Humaines", date: "2026-06-16", priorite: "information", destinataires: ["tous"], lu: [] },
  { id: "NS-004", titre: "Alerte vehicule recherche - RAV4 gris BZV-7714-PL", contenu: "Un Toyota RAV4 gris immatricule BZV-7714-PL signale vole. Toutes les unites sont priees de signaler toute observation. Contacter immediatement le Commissariat Central.", auteur: "commissariat.central", auteurNom: "Commissariat Central BZV", date: "2026-06-18", priorite: "urgente", destinataires: ["tous"], lu: [] },
  { id: "NS-005", titre: "Formation premiers secours - inscriptions ouvertes", contenu: "La Direction de la Logistique organise une formation aux premiers secours les 28 et 29 juin. Places limitees a 20 agents. Inscriptions aupres de la DL avant le 22 juin.", auteur: "dl.brazzaville", auteurNom: "Direction de la Logistique", date: "2026-06-15", priorite: "information", destinataires: ["tous"], lu: [] },
  { id: "NS-006", titre: "Renforcement controles frontaliers - zone vacacances", contenu: "En prevision des departs en vacances scolaires, le dispositif de controle a l aeroport Maya-Maya est renforce du 26 juin au 10 juillet. Effectifs supplementaires requis.", auteur: "controle.frontieres", auteurNom: "Controle Voyageurs et Frontieres", date: "2026-06-17", priorite: "importante", destinataires: ["tous"], lu: [] }
];

function estDestinataire(compte, note) {
  if (note.destinataires.indexOf("tous") >= 0) { return true; }
  return note.destinataires.indexOf(compte.identifiant) >= 0;
}

function Notes(props) {
  var compte = props.compte;
  var notesState = useState(NOTES_DATA.map(function (n) {
    var c = {};
    for (var k in n) { c[k] = n[k]; }
    c.lu = [];
    return c;
  }));
  var notes = notesState[0];
  var setNotes = notesState[1];
  var selState = useState(null);
  var selected = selState[0];
  var setSelected = selState[1];
  var fState = useState("tous");
  var filter = fState[0];
  var setFilter = fState[1];
  var showForm = useState(false);
  var setShowForm = showForm[1];
  var showFormVal = showForm[0];
  var titreN = useState("");
  var contenuN = useState("");
  var prioN = useState("information");

  var peutPublier = compte.role === "direction" || compte.role === "rh" || compte.role === "operations" || compte.role === "dl" || compte.role === "daf" || compte.role === "interpol";

  var visibles = notes.filter(function (n) { return estDestinataire(compte, n); });
  if (filter !== "tous") {
    visibles = visibles.filter(function (n) { return n.priorite === filter; });
  }
  var nonLues = visibles.filter(function (n) { return n.lu.indexOf(compte.identifiant) < 0; }).length;

  function marquerLu(id) {
    setNotes(function (prev) {
      return prev.map(function (n) {
        if (n.id !== id) { return n; }
        var c = {};
        for (var k in n) { c[k] = n[k]; }
        if (c.lu.indexOf(compte.identifiant) < 0) {
          c.lu = c.lu.concat([compte.identifiant]);
        }
        return c;
      });
    });
  }

  function publier() {
    if (titreN[0].trim() === "" || contenuN[0].trim() === "") { return; }
    var nouvelle = {
      id: "NS-" + Date.now(),
      titre: titreN[0].trim(),
      contenu: contenuN[0].trim(),
      auteur: compte.identifiant,
      auteurNom: compte.nom,
      date: new Date().toISOString().slice(0, 10),
      priorite: prioN[0],
      destinataires: ["tous"],
      lu: [compte.identifiant]
    };
    setNotes(function (prev) { return [nouvelle].concat(prev); });
    titreN[1]("");
    contenuN[1]("");
    setShowForm(false);
  }

  var filtres = [["tous", "Toutes", "#64748B"], ["urgente", "Urgentes", "#DC2626"], ["importante", "Importantes", "#F59E0B"], ["information", "Information", "#3B82F6"]];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Notes de Service & Notifications</h2>
          <p className="text-slate-500 text-xs">{nonLues > 0 ? nonLues + " note(s) non lue(s)" : "Tout est lu"}</p>
        </div>
        {peutPublier ? (
          <button onClick={function () { setShowForm(!showFormVal); }} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">
            {showFormVal ? "Fermer" : "+ Publier une note"}
          </button>
        ) : null}
      </div>
      {showFormVal ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5 space-y-3">
          <p className="text-white font-bold text-sm">Nouvelle note de service</p>
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase">Titre</label>
            <input value={titreN[0]} onChange={function (e) { titreN[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" placeholder="Objet de la note..." />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase">Contenu</label>
            <textarea value={contenuN[0]} onChange={function (e) { contenuN[1](e.target.value); }} rows={4} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" placeholder="Corps de la note..." />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase">Priorite</label>
            <select value={prioN[0]} onChange={function (e) { prioN[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
              <option value="information">Information</option>
              <option value="importante">Importante</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <button onClick={publier} className="bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Publier a tous</button>
        </div>
      ) : null}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Bell size={18} />} label="Non lues" value={nonLues} color="#F59E0B" />
        <StatCard icon="🔴" label="Urgentes" value={visibles.filter(function (n) { return n.priorite === "urgente"; }).length} color="#DC2626" />
        <StatCard icon="🟡" label="Importantes" value={visibles.filter(function (n) { return n.priorite === "importante"; }).length} color="#F59E0B" />
        <StatCard icon="🔵" label="Information" value={visibles.filter(function (n) { return n.priorite === "information"; }).length} color="#3B82F6" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {filtres.map(function (item) {
          var v = item[0]; var l = item[1]; var c = item[2];
          return <button key={v} onClick={function () { setFilter(v); }} style={{ background: filter === v ? c : c + "22", color: filter === v ? "#fff" : c }} className="px-3 py-1.5 rounded-lg text-xs font-bold">{l}</button>;
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          {visibles.length === 0 ? <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucune note disponible.</div> : null}
          {visibles.map(function (n) {
            var isLu = n.lu.indexOf(compte.identifiant) >= 0;
            var isSelected = selected && selected.id === n.id;
            return (
              <button key={n.id} onClick={function () { setSelected(n); marquerLu(n.id); }} style={{ borderLeft: "3px solid " + PRIORITE_NOTE[n.priorite], background: isSelected ? "#1E293B" : "" }} className={"w-full text-left bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4"}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!isLu ? <span style={{ background: PRIORITE_NOTE[n.priorite] }} className="w-2 h-2 rounded-full shrink-0"></span> : null}
                      <p className={"text-sm font-bold truncate " + (isLu ? "text-slate-400" : "text-white")}>{n.titre}</p>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">{n.auteurNom} - {n.date}</p>
                  </div>
                  <Chip color={PRIORITE_NOTE[n.priorite]}>{n.priorite}</Chip>
                </div>
              </button>
            );
          })}
        </div>
        {selected ? (
          <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5 space-y-3 sticky top-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-white font-black text-base">{selected.titre}</p>
                <p className="text-slate-500 text-xs mt-0.5">{selected.auteurNom} — {selected.date}</p>
              </div>
              <Chip color={PRIORITE_NOTE[selected.priorite]}>{selected.priorite}</Chip>
            </div>
            <div className="border-t border-slate-700 pt-3">
              <p className="text-slate-300 text-sm leading-relaxed">{selected.contenu}</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-6 flex items-center justify-center">
            <p className="text-slate-600 text-sm">Selectionnez une note pour la lire</p>
          </div>
        )}
      </div>
    </div>
  );
}

var MESSAGES_DATA = [
  { id: "MSG-001", de: "dcpj.brazzaville", deNom: "DCPJ Brazzaville", a: "cfp.brazzaville", aNom: "CFP", texte: "Commandant, le suspect INC-004 est toujours en fuite. Demande autorisation pour perquisition du domicile.", date: "2026-06-18", heure: "07:45", lu: false },
  { id: "MSG-002", de: "cfp.brazzaville", deNom: "CFP", a: "dcpj.brazzaville", aNom: "DCPJ Brazzaville", texte: "Autorisation accordee. Proceder avec un effectif de 4 agents minimum. Rapport exige sous 2h.", date: "2026-06-18", heure: "08:02", lu: false },
  { id: "MSG-003", de: "bca.brazzaville", deNom: "Bureau Controle Accidents", a: "dgrh.brazzaville", aNom: "DGRH", texte: "Bonjour, besoin d un renflement de 2 agents pour le controle routier du 20 juin RN1. Merci.", date: "2026-06-17", heure: "14:30", lu: true },
  { id: "MSG-004", de: "dgrh.brazzaville", deNom: "DGRH", a: "bca.brazzaville", aNom: "Bureau Controle Accidents", texte: "Pris en compte. Agents MAKOSSO et MASSAMBA affectes pour le 20 juin. Bonne mission.", date: "2026-06-17", heure: "15:10", lu: true },
  { id: "MSG-005", de: "gendarmerie.pnr", deNom: "Brigade Territoriale PNR", a: "cgn.brazzaville", aNom: "CGN", texte: "Mon Commandant, le suspect NKOUKA est en fin de GAV prolongee. Demande instruction pour suite a donner.", date: "2026-06-18", heure: "09:15", lu: false },
  { id: "MSG-006", de: "controle.frontieres", deNom: "Controle Frontieres", a: "interpol.brazzaville", aNom: "BCN INTERPOL", texte: "Passeport suspect detecte. Reference INC-012. Confirmation du fichier INTERPOL demandee pour le voyageur KOULIMBA Jean.", date: "2026-06-18", heure: "10:45", lu: false },
  { id: "MSG-007", de: "interpol.brazzaville", deNom: "BCN INTERPOL", a: "controle.frontieres", aNom: "Controle Frontieres", texte: "Verification effectuee. Individu non fiche INTERPOL. Cependant signalement national actif. Retenir et alerter la DCPJ.", date: "2026-06-18", heure: "11:02", lu: false }
];

function Messagerie(props) {
  var compte = props.compte;
  var msgsState = useState(MESSAGES_DATA.map(function (m) {
    var c = {};
    for (var k in m) { c[k] = m[k]; }
    return c;
  }));
  var msgs = msgsState[0];
  var setMsgs = msgsState[1];

  var convState = useState(null);
  var convPartner = convState[0];
  var setConvPartner = convState[1];

  var nouveauMsg = useState("");
  var destState = useState("");

  var miensEnvois = msgs.filter(function (m) { return m.de === compte.identifiant || m.a === compte.identifiant; });
  var partners = {};
  miensEnvois.forEach(function (m) {
    var partner = m.de === compte.identifiant ? m.a : m.de;
    var partnerNom = m.de === compte.identifiant ? m.aNom : m.deNom;
    if (!partners[partner]) {
      partners[partner] = { id: partner, nom: partnerNom, dernierMsg: m, nonLus: 0 };
    }
    partners[partner].dernierMsg = m;
    if (m.a === compte.identifiant && !m.lu) {
      partners[partner].nonLus++;
    }
  });
  var listePartners = Object.values(partners);

  var conversation = convPartner ? msgs.filter(function (m) {
    return (m.de === compte.identifiant && m.a === convPartner) || (m.a === compte.identifiant && m.de === convPartner);
  }) : [];

  function envoyerMsg() {
    if (nouveauMsg[0].trim() === "" || !convPartner) { return; }
    var partnerInfo = partners[convPartner];
    var m = {
      id: "MSG-" + Date.now(),
      de: compte.identifiant,
      deNom: compte.nom,
      a: convPartner,
      aNom: partnerInfo ? partnerInfo.nom : convPartner,
      texte: nouveauMsg[0].trim(),
      date: new Date().toISOString().slice(0, 10),
      heure: new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes(),
      lu: false
    };
    setMsgs(function (prev) { return prev.concat([m]); });
    nouveauMsg[1]("");
  }

  function nouvConversation() {
    var dest = destState[0].trim();
    if (!dest) { return; }
    setConvPartner(dest);
    destState[1]("");
  }

  var totalNonLus = msgs.filter(function (m) { return m.a === compte.identifiant && !m.lu; }).length;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-white">Messagerie Interne Securisee</h2>
        <p className="text-slate-500 text-xs">{totalNonLus > 0 ? totalNonLus + " message(s) non lu(s)" : "Aucun message en attente"}</p>
      </div>
      <div className="flex h-[520px] gap-4">
        <div className="w-56 shrink-0 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-slate-700">
            <p className="text-slate-400 text-xs font-bold uppercase">Conversations</p>
          </div>
          <div className="p-2 border-b border-slate-700 flex gap-2">
            <input value={destState[0]} onChange={function (e) { destState[1](e.target.value); }} placeholder="ID destinataire..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs" />
            <button onClick={nouvConversation} className="bg-blue-700 text-white px-2 py-1 rounded-lg text-xs font-bold">+</button>
          </div>
          <div className="flex-1 overflow-auto">
            {listePartners.length === 0 ? <p className="text-slate-600 text-xs p-4">Aucune conversation.</p> : null}
            {listePartners.map(function (p) {
              var isActive = convPartner === p.id;
              return (
                <button key={p.id} onClick={function () { setConvPartner(p.id); }} className={"w-full text-left px-3 py-2.5 border-b border-slate-700 " + (isActive ? "bg-slate-700" : "hover:bg-slate-700/50")}>
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-xs text-blue-300 font-bold shrink-0">
                      {p.nom.slice(0, 2).toUpperCase()}
                    </div>
                    {p.nonLus > 0 ? <span className="bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{p.nonLus}</span> : null}
                  </div>
                  <p className="text-xs font-semibold text-white mt-1 truncate">{p.nom}</p>
                  <p className="text-slate-500 text-[10px] truncate">{p.dernierMsg ? p.dernierMsg.texte.slice(0, 35) + "..." : ""}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex-1 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-col overflow-hidden">
          {convPartner ? (
            <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-xs text-blue-300 font-bold">
                {(partners[convPartner] ? partners[convPartner].nom : convPartner).slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-bold">{partners[convPartner] ? partners[convPartner].nom : convPartner}</p>
                <p className="text-slate-500 text-xs">{convPartner}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-slate-500 text-xs">Chiffre E2E</span>
              </div>
            </div>
          ) : null}
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {!convPartner ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-slate-600 text-sm">Selectionnez ou demarrez une conversation</p>
              </div>
            ) : conversation.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-slate-600 text-sm">Aucun message. Envoyez le premier.</p>
              </div>
            ) : null}
            {conversation.map(function (m) {
              var isMine = m.de === compte.identifiant;
              return (
                <div key={m.id} className={"flex " + (isMine ? "justify-end" : "justify-start")}>
                  <div className={"max-w-xs lg:max-w-sm " + (isMine ? "items-end" : "items-start") + " flex flex-col"}>
                    <div className={"px-3 py-2 rounded-2xl text-sm " + (isMine ? "bg-blue-700 text-white rounded-br-none" : "bg-slate-700 text-slate-200 rounded-bl-none")}>
                      {m.texte}
                    </div>
                    <span className="text-slate-600 text-[10px] mt-0.5">{m.heure}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {convPartner ? (
            <div className="p-3 border-t border-slate-700 flex gap-2">
              <input value={nouveauMsg[0]} onChange={function (e) { nouveauMsg[1](e.target.value); }} onKeyDown={function (e) { if (e.key === "Enter") { envoyerMsg(); } }} placeholder="Votre message..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
              <button onClick={envoyerMsg} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Envoyer</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

var RECHERCHES_DATA = [
  { id: "RCH-001", nom: "KOULIMBA Jean", dateNaissance: "12/04/1985", nationalite: "Congolaise", motif: "Escroquerie internationale", reference: "DCPJ-BZV-2024-0412", statut: "actif", dangereux: false, photo: "KJ" },
  { id: "RCH-002", nom: "NZILA Frederic", dateNaissance: "03/09/1978", nationalite: "Congolaise", motif: "Vol a main armee recidiviste", reference: "DCPJ-BZV-2025-0891", statut: "actif", dangereux: true, photo: "NF" },
  { id: "RCH-003", nom: "OBAMBI Claire", dateNaissance: "22/07/1992", nationalite: "Camerounaise", motif: "Trafic de stupefiants", reference: "DCPJ-BZV-2026-0102", statut: "actif", dangereux: false, photo: "OC" },
  { id: "RCH-004", nom: "MASSOUNGA Pierre", dateNaissance: "15/01/1969", nationalite: "Gabonaise", motif: "Fraude documentaire", reference: "CTL-BZV-2025-0234", statut: "localise", dangereux: false, photo: "MP" },
  { id: "RCH-005", nom: "BIYELA Serge", dateNaissance: "08/11/1990", nationalite: "RDC", motif: "Avis INTERPOL - diffusion rouge", reference: "INTERPOL-2025-5591", statut: "actif", dangereux: true, photo: "BS" },
  { id: "RCH-006", nom: "TATY Honorine", dateNaissance: "30/03/1987", nationalite: "Congolaise", motif: "Tentative d evasion", reference: "DCPJ-BZV-2026-0047", statut: "arrete", dangereux: false, photo: "TH" }
];
var STATUT_RCH_COLOR = { actif: "#DC2626", localise: "#F59E0B", arrete: "#22C55E" };
var STATUT_RCH_LABEL = { actif: "Avis actif", localise: "Localise", arrete: "Arrete" };
var VOYAGEURS_RECENTS = [
  { id: "VOY-001", nom: "MOUAMBA Christian", nationalite: "Congolaise", document: "Passeport CF-8821034", destination: "Paris CDG", heure: "11:20", statut: "normal", sens: "sortie", poste: "Aeroport International Maya-Maya", agent: "PNB-11042" },
  { id: "VOY-002", nom: "KOULIMBA Jean", nationalite: "Congolaise", document: "Passeport CF-7714022", destination: "Libreville", heure: "11:45", statut: "alerte", sens: "sortie", poste: "Aeroport International Maya-Maya", agent: "PNB-11042" },
  { id: "VOY-003", nom: "NKOUNKOU Anastasie", nationalite: "Congolaise", document: "CI 4409182-B", destination: "Kinshasa", heure: "12:00", statut: "normal", sens: "sortie", poste: "Poste Frontalier Beach Brazzaville-Kinshasa", agent: "PNB-11187" },
  { id: "VOY-004", nom: "ADOUKI Bernard", nationalite: "Francaise", document: "Passeport FR-1234567", destination: "Pointe-Noire", heure: "12:15", statut: "normal", sens: "entree", poste: "Aeroport International Maya-Maya", agent: "PNB-11042" },
  { id: "VOY-005", nom: "BIYELA Serge", nationalite: "RDC", document: "Passeport CD-9921077", destination: "Brazzzaville arrivee", heure: "12:30", statut: "alerte", sens: "entree", poste: "Poste Frontalier Beach Brazzaville-Kinshasa", agent: "PNB-11187" }
];

var SAISIES_DATA = [
  { id: "SZ-2026-021", type: "Vehicule", description: "Vehicule Toyota Hilux, immatriculation BZV-4521-CG, suspecte de transport de marchandises non declarees", dateSaisie: "2026-06-18", lieu: "Poste de controle Mfilou", agent: "Sgt. NDINGA Paul", statut: "en_fourriere", valeurEstimee: "8 500 000 FCFA", signatures: [{ nom: "Sgt. NDINGA Paul", date: "2026-06-18 14:20", action: "Mise en fourriere" }] },
  { id: "SZ-2026-020", type: "Marchandise", description: "120 cartons de cigarettes de contrebande", dateSaisie: "2026-06-17", lieu: "Marche Total, Brazzaville", agent: "Insp. MALONGA Eric", statut: "transfere_aux_scelles", valeurEstimee: "3 200 000 FCFA", signatures: [{ nom: "Insp. MALONGA Eric", date: "2026-06-17 09:10", action: "Saisie initiale" }, { nom: "Greffier KIBA Solange", date: "2026-06-17 16:45", action: "Transfert aux scelles judiciaires" }] },
  { id: "SZ-2026-019", type: "Objet", description: "Materiel informatique (3 ordinateurs portables) lie a une enquete d escroquerie", dateSaisie: "2026-06-15", lieu: "Commissariat Bacongo", agent: "Insp. OYALA Marc", statut: "en_fourriere", valeurEstimee: "1 800 000 FCFA", signatures: [{ nom: "Insp. OYALA Marc", date: "2026-06-15 10:30", action: "Saisie sur PV" }] },
  { id: "SZ-2026-018", type: "Vehicule", description: "Moto sans plaque d immatriculation, suspectee volee", dateSaisie: "2026-06-10", lieu: "Talangai, Brazzaville", agent: "Sgt. BANTSIMBA Joel", statut: "restitue", valeurEstimee: "450 000 FCFA", signatures: [{ nom: "Sgt. BANTSIMBA Joel", date: "2026-06-10 08:00", action: "Mise en fourriere" }, { nom: "Proprietaire identifie apres verification", date: "2026-06-14 11:00", action: "Restitution" }] }
];
var STATUT_SAISIE_COLOR = { en_fourriere: "#F59E0B", transfere_aux_scelles: "#3B82F6", restitue: "#22C55E", detruit: "#64748B" };
var STATUT_SAISIE_LABEL = { en_fourriere: "En fourriere", transfere_aux_scelles: "Transfere aux scelles", restitue: "Restitue", detruit: "Detruit / Aliene" };

var POINTS_FRONTALIERS_DATA = [
  { id: "PF-AER", nom: "Aeroport International Maya-Maya", type: "aeroportuaire", ville: "Brazzaville", lecteurPasseport: "operationnel", cameras: "operationnel", scannerBagages: "operationnel" },
  { id: "PF-PNR-AER", nom: "Aeroport Antonio Agostinho Neto", type: "aeroportuaire", ville: "Pointe-Noire", lecteurPasseport: "operationnel", cameras: "degrade", scannerBagages: "operationnel" },
  { id: "PF-PNR-PORT", nom: "Port Autonome de Pointe-Noire", type: "maritime", ville: "Pointe-Noire", lecteurPasseport: "operationnel", cameras: "operationnel", scannerBagages: "hors_service" },
  { id: "PF-KIN", nom: "Poste Frontalier Beach Brazzaville-Kinshasa", type: "fluvial", ville: "Brazzaville", lecteurPasseport: "operationnel", cameras: "operationnel", scannerBagages: "operationnel" },
  { id: "PF-MFI", nom: "Poste Frontalier Terrestre Mfilou", type: "terrestre", ville: "Brazzaville", lecteurPasseport: "degrade", cameras: "operationnel", scannerBagages: "operationnel" },
  { id: "PF-NTOK", nom: "Poste Frontalier Terrestre Ntoukou", type: "terrestre", ville: "Sangha", lecteurPasseport: "operationnel", cameras: "hors_service", scannerBagages: "indisponible" }
];
var STATUT_EQUIPEMENT_COLOR = { operationnel: "#22C55E", degrade: "#F59E0B", hors_service: "#DC2626", indisponible: "#64748B" };
var STATUT_EQUIPEMENT_LABEL = { operationnel: "Operationnel", degrade: "Degrade", hors_service: "Hors service", indisponible: "Non equipe" };
var TYPE_POSTE_LABEL = { aeroportuaire: "Aeroportuaire", maritime: "Maritime", fluvial: "Fluvial", terrestre: "Terrestre" };

var FLUX_HORAIRE_DATA = [
  { heure: "00h", entrees: 18, sorties: 12 }, { heure: "02h", entrees: 9, sorties: 7 }, { heure: "04h", entrees: 14, sorties: 11 },
  { heure: "06h", entrees: 62, sorties: 48 }, { heure: "08h", entrees: 145, sorties: 98 }, { heure: "10h", entrees: 188, sorties: 156 },
  { heure: "12h", entrees: 210, sorties: 201 }, { heure: "14h", entrees: 175, sorties: 190 }, { heure: "16h", entrees: 160, sorties: 178 },
  { heure: "18h", entrees: 132, sorties: 165 }, { heure: "20h", entrees: 58, sorties: 71 }, { heure: "22h", entrees: 24, sorties: 33 }
];

var INTERDICTIONS_DATA = [
  { id: "ITD-001", nom: "MABOUNDOU Jean-Claude", nationalite: "Etrangere", document: "Passeport FR-2218890", motif: "Interdiction judiciaire de territoire (mandat d arret international)", dateDebut: "2025-11-02", statut: "active" },
  { id: "ITD-002", nom: "OYOULOU Patrice", nationalite: "Congolaise", document: "CNI CG-552014", motif: "Interdiction de sortie — affaire judiciaire en cours", dateDebut: "2026-03-10", statut: "active" },
  { id: "ITD-003", nom: "KASONGO Eric", nationalite: "RDC", document: "Passeport CD-7741203", motif: "Mesure administrative — sejour irregulier anterieur", dateDebut: "2026-01-15", statut: "active" },
  { id: "ITD-004", nom: "NGALULA Beatrice", nationalite: "RDC", document: "Passeport CD-3390217", motif: "Interdiction levee apres regularisation", dateDebut: "2025-06-20", statut: "levee" }
];
var STATUT_INTERDICTION_COLOR = { active: "#DC2626", levee: "#64748B" };
var STATUT_INTERDICTION_LABEL = { active: "Interdiction active", levee: "Levee" };

var REFOULEMENTS_DATA = [
  { id: "REF-001", nom: "MABOUNDOU Jean-Claude", poste: "Aeroport International Maya-Maya", date: "2026-06-20 14:12", agent: "PNB-11042", motif: "Individu sous interdiction de territoire (ITD-001)" }
];

function ControleVoyageurs(props) {
  var compte = props.compte;
  var peutAcceder = ["direction", "controle", "interpol", "judiciaire", "operations"].indexOf(compte.role) >= 0;

  var rechState = useState(RECHERCHES_DATA.map(function (r) {
    var c = {};
    for (var k in r) { c[k] = r[k]; }
    return c;
  }));
  var recherches = rechState[0];
  var setRecherches = rechState[1];

  var queryState = useState("");
  var query = queryState[0];
  var setQuery = queryState[1];
  var tabState = useState("verification");
  var tab = tabState[0];
  var setTab = tabState[1];
  var resultState = useState(null);
  var result = resultState[0];
  var setResult = resultState[1];
  var verifiedState = useState(false);
  var verified = verifiedState[0];
  var setVerified = verifiedState[1];
  var scanState = useState("idle");
  var scanStatut = scanState[0]; var setScanStatut = scanState[1];

  function scannerDocument() {
    setScanStatut("scan");
    setTimeout(function () {
      setScanStatut("ok");
      if (query.trim() === "") {
        var pool = recherches.concat([{ nom: "MOUAMBA Christian" }, { nom: "ADOUKI Bernard" }]);
        var pick = pool[Math.floor(Math.random() * pool.length)];
        setQuery(pick.nom);
      }
    }, 1100);
  }

  var interdictionsState = useState(INTERDICTIONS_DATA.map(function (i) { var c = {}; for (var k in i) { c[k] = i[k]; } return c; }));
  var interdictions = interdictionsState[0]; var setInterdictions = interdictionsState[1];
  var refoulementsState = useState(REFOULEMENTS_DATA.slice());
  var refoulements = refoulementsState[0]; var setRefoulements = refoulementsState[1];
  var posteRefoulState = useState(POINTS_FRONTALIERS_DATA[0].nom);
  var posteRefoul = posteRefoulState[0]; var setPosteRefoul = posteRefoulState[1];

  function refuserAcces(itd) {
    setRefoulements(function (prev) { return [{ id: "REF-" + Date.now(), nom: itd.nom, poste: posteRefoul, date: new Date().toLocaleString("fr-FR"), agent: compte.id, motif: "Individu sous interdiction de territoire (" + itd.id + ")" }].concat(prev); });
  }

  var saisiesState = useState(SAISIES_DATA.map(function (s) { var c = {}; for (var k in s) { c[k] = s[k]; } c.signatures = s.signatures.slice(); return c; }));
  var saisies = saisiesState[0]; var setSaisies = saisiesState[1];
  var saisieFormState = useState(null);
  var saisieFormOuvert = saisieFormState[0]; var setSaisieFormOuvert = saisieFormState[1];
  var signataireState = useState("");
  var signataire = signataireState[0]; var setSignataire = signataireState[1];
  var nouveauStatutState = useState("transfere_aux_scelles");
  var nouveauStatut = nouveauStatutState[0]; var setNouveauStatut = nouveauStatutState[1];

  function signerTransfert(id) {
    if (!signataire.trim()) { return; }
    var libelleAction = { transfere_aux_scelles: "Transfert aux scelles judiciaires", restitue: "Restitution au proprietaire", detruit: "Destruction / alienation", en_fourriere: "Maintien en fourriere" }[nouveauStatut];
    setSaisies(function (prev) {
      return prev.map(function (s) {
        if (s.id !== id) { return s; }
        var c = {}; for (var k in s) { c[k] = s[k]; }
        c.statut = nouveauStatut;
        c.signatures = s.signatures.concat([{ nom: signataire, date: new Date().toLocaleString("fr-FR"), action: libelleAction }]);
        return c;
      });
    });
    setSaisieFormOuvert(null);
    setSignataire("");
  }

  function verifier() {
    if (query.trim() === "") { return; }
    setVerified(true);
    var found = null;
    var q = query.toLowerCase();
    for (var i = 0; i < recherches.length; i++) {
      if (recherches[i].nom.toLowerCase().indexOf(q) >= 0 || recherches[i].reference.toLowerCase().indexOf(q) >= 0) {
        found = recherches[i];
        break;
      }
    }
    setResult(found ? { type: "alerte", data: found } : { type: "propre" });
  }

  function marquerArrete(id) {
    setRecherches(function (prev) {
      return prev.map(function (r) {
        if (r.id !== id) { return r; }
        var c = {};
        for (var k in r) { c[k] = r[k]; }
        c.statut = "arrete";
        return c;
      });
    });
  }

  if (!peutAcceder) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-white">Controle Voyageurs & Fichiers</h2>
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 text-center">
          <p className="text-red-400 font-bold">Acces restreint</p>
          <p className="text-slate-500 text-sm mt-1">Ce module necessite une habilitation speciale.</p>
        </div>
      </div>
    );
  }

  var tabs = [["verification", "Verification identite"], ["fichiers", "Fichiers de recherche"], ["interdictions", "Refoulements & Interdictions"], ["passages", "Passages recents"], ["saisies", "Saisies & Fourriere"]];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white">Controle Voyageurs & Fichiers</h2>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🛂" label="Fichiers actifs" value={recherches.filter(function (r) { return r.statut === "actif"; }).length} color="#DC2626" />
        <StatCard icon="🟡" label="Localises" value={recherches.filter(function (r) { return r.statut === "localise"; }).length} color="#F59E0B" />
        <StatCard icon="✅" label="Arretes" value={recherches.filter(function (r) { return r.statut === "arrete"; }).length} color="#22C55E" />
      </div>
      <div className="flex gap-2">
        {tabs.map(function (t) {
          var isActive = tab === t[0];
          return <button key={t[0]} onClick={function () { setTab(t[0]); setResult(null); setVerified(false); setQuery(""); }} className={"px-4 py-2 rounded-xl text-xs font-bold " + (isActive ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400")}>{t[1]}</button>;
        })}
      </div>
      {tab === "verification" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Verification d identite</p>
            <p className="text-slate-500 text-xs mb-3">Scannez le document de voyage (OCR) ou saisissez le nom / numero de document pour verification dans les fichiers de recherche.</p>
            <div className="flex gap-2 mb-2">
              <button onClick={scannerDocument} disabled={scanStatut === "scan"} className="bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50">
                <Fingerprint size={14} /> {scanStatut === "scan" ? "Lecture du document..." : "📷 Scanner le document (OCR)"}
              </button>
              {scanStatut === "ok" ? <span className="text-green-400 text-xs font-bold flex items-center">✓ Document lu — conformite MRZ verifiee</span> : null}
            </div>
            <div className="flex gap-2">
              <input value={query} onChange={function (e) { setQuery(e.target.value); setVerified(false); setResult(null); }} onKeyDown={function (e) { if (e.key === "Enter") { verifier(); } }} placeholder="Nom, prenom ou numero de document..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm" />
              <button onClick={verifier} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><Search size={14} />Verifier</button>
            </div>
            {verified && result ? (
              <div className={"mt-4 rounded-xl p-4 border " + (result.type === "alerte" ? "bg-red-950 border-red-700" : "bg-green-950 border-green-700")}>
                {result.type === "propre" ? (
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={28} className="text-green-400 shrink-0" />
                    <div>
                      <p className="text-green-300 font-black text-base">Identite non fichee</p>
                      <p className="text-green-600 text-xs">Aucun avis de recherche actif pour ce nom ou document.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Siren size={24} className="text-red-400 shrink-0" />
                      <div>
                        <p className="text-red-300 font-black text-base">ALERTE — Individu recherche</p>
                        <p className="text-red-600 text-xs">{result.data.reference}</p>
                      </div>
                      {result.data.dangereux ? <Chip color="#DC2626">DANGEREUX</Chip> : null}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-slate-500 uppercase">Nom</p><p className="text-white font-bold">{result.data.nom}</p></div>
                      <div><p className="text-slate-500 uppercase">Date de naissance</p><p className="text-white font-bold">{result.data.dateNaissance}</p></div>
                      <div><p className="text-slate-500 uppercase">Nationalite</p><p className="text-white font-bold">{result.data.nationalite}</p></div>
                      <div><p className="text-slate-500 uppercase">Motif</p><p className="text-white font-bold">{result.data.motif}</p></div>
                    </div>
                    {result.data.statut !== "arrete" ? (
                      <button onClick={function () { marquerArrete(result.data.id); setResult({ type: "alerte", data: Object.assign({}, result.data, { statut: "arrete" }) }); }} className="mt-3 bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Marquer comme arrete</button>
                    ) : <p className="mt-3 text-green-400 text-xs font-bold">Individu deja marque arrete.</p>}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {tab === "fichiers" ? (
        <div className="space-y-2">
          {recherches.map(function (r) {
            return (
              <div key={r.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center gap-4">
                <div className={"w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 " + (r.dangereux ? "bg-red-900 text-red-300" : "bg-slate-700 text-slate-300")}>
                  {r.photo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold">{r.nom}</span>
                    {r.dangereux ? <Chip color="#DC2626">Dangereux</Chip> : null}
                  </div>
                  <p className="text-slate-400 text-xs">{r.motif}</p>
                  <p className="text-slate-500 text-xs font-mono">{r.reference} - {r.nationalite} - Né le {r.dateNaissance}</p>
                </div>
                <div className="text-right shrink-0">
                  <Chip color={STATUT_RCH_COLOR[r.statut]}>{STATUT_RCH_LABEL[r.statut]}</Chip>
                  {r.statut === "actif" ? (
                    <button onClick={function () { marquerArrete(r.id); }} className="block mt-2 px-2 py-1 rounded-lg text-xs font-bold bg-green-900 text-green-300">Arrete</button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === "passages" ? (
        <div className="space-y-2">
          <p className="text-slate-500 text-xs">Journal numerique immuable des entrees/sorties, lie au matricule de l agent ayant effectue le controle.</p>
          {VOYAGEURS_RECENTS.map(function (v) {
            var isAlerte = v.statut === "alerte";
            return (
              <div key={v.id} className={"bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border p-4 flex items-center justify-between " + (isAlerte ? "border-red-700 bg-red-950/40" : "border-slate-700")}>
                <div className="flex items-center gap-3">
                  {isAlerte ? <Siren size={18} className="text-red-400 shrink-0" /> : <ShieldCheck size={18} className="text-green-500 shrink-0" />}
                  <div>
                    <p className={"font-bold text-sm " + (isAlerte ? "text-red-300" : "text-white")}>{v.nom}</p>
                    <p className="text-slate-400 text-xs">{v.document} — {v.nationalite}</p>
                    <p className="text-slate-500 text-xs">{v.poste} — controle par {v.agent}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs font-mono">{v.heure}</p>
                  <Chip color={v.sens === "entree" ? "#3B82F6" : "#8B5CF6"}>{v.sens === "entree" ? "↘ Entree" : "↗ Sortie"}</Chip>
                  {isAlerte ? <Chip color="#DC2626">ALERTE</Chip> : <Chip color="#22C55E">Normal</Chip>}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === "interdictions" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Liste des personnes interdites de territoire</p>
            <div className="space-y-2">
              {interdictions.map(function (itd) {
                return (
                  <div key={itd.id} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-white text-sm font-bold">{itd.nom} <span className="text-slate-500 font-normal">— {itd.document}</span></p>
                      <p className="text-slate-400 text-xs">{itd.motif}</p>
                      <p className="text-slate-600 text-xs">{itd.nationalite} — interdiction depuis le {itd.dateDebut}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Chip color={STATUT_INTERDICTION_COLOR[itd.statut]}>{STATUT_INTERDICTION_LABEL[itd.statut]}</Chip>
                      {itd.statut === "active" ? <button onClick={function () { refuserAcces(itd); }} className="bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">🚫 Refuser l acces</button> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
              <p className="text-white font-bold text-sm">Journal des refoulements</p>
              <select value={posteRefoul} onChange={function (e) { setPosteRefoul(e.target.value); }} className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs">
                {POINTS_FRONTALIERS_DATA.map(function (p) { return <option key={p.id} value={p.nom}>{p.nom}</option>; })}
              </select>
            </div>
            <div className="space-y-1.5">
              {refoulements.map(function (r) {
                return (<div key={r.id} className="text-xs border-b border-slate-800 pb-1.5"><span className="text-red-400 font-bold">{r.nom}</span><span className="text-slate-500"> — {r.poste} — {r.date} — agent {r.agent}</span><p className="text-slate-600">{r.motif}</p></div>);
              })}
            </div>
          </div>
        </div>
      ) : null}
      {tab === "saisies" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="🚗" label="En fourriere" value={saisies.filter(function (s) { return s.statut === "en_fourriere"; }).length} color="#F59E0B" />
            <StatCard icon="📦" label="Transferees aux scelles" value={saisies.filter(function (s) { return s.statut === "transfere_aux_scelles"; }).length} color="#3B82F6" />
            <StatCard icon="✅" label="Restituees" value={saisies.filter(function (s) { return s.statut === "restitue"; }).length} color="#22C55E" />
          </div>
          {saisies.map(function (s) {
            return (
              <div key={s.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold text-sm font-mono">{s.id}</span><Chip color="#64748B">{s.type}</Chip><Chip color={STATUT_SAISIE_COLOR[s.statut]}>{STATUT_SAISIE_LABEL[s.statut]}</Chip></div>
                    <p className="text-slate-300 text-sm mt-1">{s.description}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{s.lieu} — saisi le {s.dateSaisie} par {s.agent} — valeur estimee {s.valeurEstimee}</p>
                  </div>
                  {s.statut !== "restitue" && s.statut !== "detruit" ? (
                    <button onClick={function () { setSaisieFormOuvert(saisieFormOuvert === s.id ? null : s.id); }} className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0">Transferer / Signer</button>
                  ) : null}
                </div>
                <div className="mt-3 border-t border-slate-700 pt-2 space-y-1">
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Chaine de signatures electroniques</p>
                  {s.signatures.map(function (sig, idx) {
                    return (<div key={idx} className="flex items-center justify-between text-xs"><span className="text-slate-300">✍️ {sig.nom} — {sig.action}</span><span className="text-slate-600 font-mono">{sig.date}</span></div>);
                  })}
                </div>
                {saisieFormOuvert === s.id ? (
                  <div className="mt-3 bg-slate-900 rounded-xl border border-slate-700 p-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <select value={nouveauStatut} onChange={function (e) { setNouveauStatut(e.target.value); }} className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs">
                        <option value="transfere_aux_scelles">Transferer aux scelles judiciaires</option>
                        <option value="restitue">Restituer au proprietaire</option>
                        <option value="detruit">Destruction / alienation</option>
                      </select>
                      <input value={signataire} onChange={function (e) { setSignataire(e.target.value); }} placeholder="Nom et grade du signataire..." className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs" />
                    </div>
                    <button onClick={function () { signerTransfert(s.id); }} className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold">✍️ Signer electroniquement le transfert</button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function DashboardFrontieres(props) {
  var compte = props.compte;
  var totalEntrees = FLUX_HORAIRE_DATA.reduce(function (s, f) { return s + f.entrees; }, 0);
  var totalSorties = FLUX_HORAIRE_DATA.reduce(function (s, f) { return s + f.sorties; }, 0);
  var alertesActives = RECHERCHES_DATA.filter(function (r) { return r.statut === "actif" && r.dangereux; }).length + INTERDICTIONS_DATA.filter(function (i) { return i.statut === "active"; }).length;
  var postesOperationnels = POINTS_FRONTALIERS_DATA.filter(function (p) { return p.lecteurPasseport === "operationnel" && p.cameras === "operationnel" && p.scannerBagages === "operationnel"; }).length;
  var postesDegrades = POINTS_FRONTALIERS_DATA.length - postesOperationnels;

  var alerteFormState = useState(false);
  var alerteFormOuvert = alerteFormState[0]; var setAlerteFormOuvert = alerteFormState[1];
  var renfortFormState = useState(false);
  var renfortFormOuvert = renfortFormState[0]; var setRenfortFormOuvert = renfortFormState[1];
  var posteActionState = useState(POINTS_FRONTALIERS_DATA[0].nom);
  var posteAction = posteActionState[0]; var setPosteAction = posteActionState[1];
  var motifActionState = useState("");
  var motifAction = motifActionState[0]; var setMotifAction = motifActionState[1];
  var alertesEnvoyeesState = useState([]);
  var alertesEnvoyees = alertesEnvoyeesState[0]; var setAlertesEnvoyees = alertesEnvoyeesState[1];
  var renfortsEnvoyesState = useState([]);
  var renfortsEnvoyes = renfortsEnvoyesState[0]; var setRenfortsEnvoyes = renfortsEnvoyesState[1];

  function envoyerAlerte() {
    if (!motifAction.trim()) { return; }
    setAlertesEnvoyees(function (prev) { return [{ id: "AS-" + Date.now(), poste: posteAction, motif: motifAction, date: new Date().toLocaleString("fr-FR") }].concat(prev); });
    setMotifAction(""); setAlerteFormOuvert(false);
  }
  function envoyerRenfort() {
    if (!motifAction.trim()) { return; }
    setRenfortsEnvoyes(function (prev) { return [{ id: "DR-" + Date.now(), poste: posteAction, motif: motifAction, date: new Date().toLocaleString("fr-FR") }].concat(prev); });
    setMotifAction(""); setRenfortFormOuvert(false);
  }

  var synthesesDRG = FICHES_RENSEIGNEMENT_DATA.filter(function (f) { return f.domaine === "securitaire" && f.statut === "validee"; });
  var signauxFrontaliers = SIGNAUX_FAIBLES_DATA.filter(function (s) { return s.lieu.toLowerCase().indexOf("portuaire") >= 0 || s.lieu.toLowerCase().indexOf("frontal") >= 0; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Point de Controle Global</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Systeme operationnel</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="🛬" label="Entrees — 24h" value={totalEntrees} color="#3B82F6" />
        <StatCard icon="🛫" label="Sorties — 24h" value={totalSorties} color="#8B5CF6" />
        <StatCard icon="🚨" label="Alertes actives" value={alertesActives} color="#DC2626" />
        <StatCard icon="🛂" label="Postes operationnels" value={postesOperationnels + " / " + POINTS_FRONTALIERS_DATA.length} color="#22C55E" />
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Flux migratoire — 24 dernieres heures</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FLUX_HORAIRE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="heure" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="entrees" name="Entrees" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sorties" name="Sorties" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Etat des points de controle</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {POINTS_FRONTALIERS_DATA.map(function (p) {
            return (
              <div key={p.id} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2"><p className="text-white text-sm font-bold">{p.nom}</p><Chip color="#64748B">{TYPE_POSTE_LABEL[p.type]}</Chip></div>
                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                  <div className="text-center"><p className="text-slate-500 mb-1">Lecteur passeport</p><Chip color={STATUT_EQUIPEMENT_COLOR[p.lecteurPasseport]}>{STATUT_EQUIPEMENT_LABEL[p.lecteurPasseport]}</Chip></div>
                  <div className="text-center"><p className="text-slate-500 mb-1">Cameras</p><Chip color={STATUT_EQUIPEMENT_COLOR[p.cameras]}>{STATUT_EQUIPEMENT_LABEL[p.cameras]}</Chip></div>
                  <div className="text-center"><p className="text-slate-500 mb-1">Scanner bagages</p><Chip color={STATUT_EQUIPEMENT_COLOR[p.scannerBagages]}>{STATUT_EQUIPEMENT_LABEL[p.scannerBagages]}</Chip></div>
                </div>
              </div>
            );
          })}
        </div>
        {postesDegrades > 0 ? <p className="text-amber-400 text-xs mt-3">⚠️ {postesDegrades} poste{postesDegrades > 1 ? "s" : ""} avec equipement degrade ou hors service — maintenance a planifier.</p> : null}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-5">
        <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Alertes de criticite</p>
        <div className="space-y-2">
          {RECHERCHES_DATA.filter(function (r) { return r.statut === "actif" && r.dangereux; }).map(function (r) {
            return (<div key={r.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{r.nom} — {r.motif}</span><Chip color="#DC2626">Fichier actif</Chip></div>);
          })}
          {INTERDICTIONS_DATA.filter(function (i) { return i.statut === "active"; }).map(function (i) {
            return (<div key={i.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{i.nom} — {i.motif}</span><Chip color="#F59E0B">Interdiction territoire</Chip></div>);
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Coordination avec les autres directions</p>
          <div className="flex gap-2 flex-wrap mb-3">
            <button onClick={function () { setAlerteFormOuvert(!alerteFormOuvert); setRenfortFormOuvert(false); }} className="bg-red-700 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">🚨 Lancer Alerte Securite</button>
            <button onClick={function () { setRenfortFormOuvert(!renfortFormOuvert); setAlerteFormOuvert(false); }} className="bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">🚓 Demande de renfort</button>
          </div>
          {(alerteFormOuvert || renfortFormOuvert) ? (
            <div className="bg-slate-900 rounded-xl border border-slate-700 p-3 space-y-2">
              <select value={posteAction} onChange={function (e) { setPosteAction(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs">
                {POINTS_FRONTALIERS_DATA.map(function (p) { return <option key={p.id} value={p.nom}>{p.nom}</option>; })}
              </select>
              <textarea value={motifAction} onChange={function (e) { setMotifAction(e.target.value); }} rows={2} placeholder={alerteFormOuvert ? "Description de la menace / individu suspect detecte..." : "Motif de la demande de renfort (tentative de franchissement, tension...)..."} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-white text-xs resize-none" />
              {alerteFormOuvert ? <button onClick={envoyerAlerte} className="bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Envoyer au Centre de Commandement et a la DPJ</button> : null}
              {renfortFormOuvert ? <button onClick={envoyerRenfort} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Demander l appui d une unite mobile</button> : null}
            </div>
          ) : null}
          <div className="mt-3 space-y-1.5">
            {alertesEnvoyees.map(function (a) { return (<div key={a.id} className="text-xs"><Chip color="#DC2626">Alerte envoyee</Chip><span className="text-slate-400"> {a.poste} — {a.date}</span></div>); })}
            {renfortsEnvoyes.map(function (r) { return (<div key={r.id} className="text-xs"><Chip color="#3B82F6">Renfort demande</Chip><span className="text-slate-400"> {r.poste} — {r.date}</span></div>); })}
          </div>
        </div>

        <div className="bg-slate-900/80 rounded-2xl border border-purple-800 p-5">
          <div className="flex items-center gap-2 mb-1"><Lock size={14} className="text-purple-400" /><p className="text-purple-300 font-bold text-sm">Module Synthese DRG — Vigilance Frontieres</p></div>
          <p className="text-slate-500 text-xs mb-3">Notes de vigilance validees par la Direction des Renseignements Generaux sur les menaces emergentes aux frontieres</p>
          <div className="space-y-2">
            {signauxFrontaliers.map(function (s) {
              return (<div key={s.id} className="text-xs border-b border-slate-800 pb-1.5"><div className="flex items-center justify-between gap-2"><span className="text-slate-300">{s.titre}</span><Chip color={NIVEAU_RENS_COLOR[s.niveau]}>{NIVEAU_RENS_LABEL[s.niveau]}</Chip></div><p className="text-slate-500">{s.lieu}</p></div>);
            })}
            {synthesesDRG.map(function (f) {
              return (<div key={f.id} className="text-xs border-b border-slate-800 pb-1.5"><div className="flex items-center justify-between gap-2"><span className="text-slate-300">{f.titre}</span><Chip color={NIVEAU_RENS_COLOR[f.niveau]}>{NIVEAU_RENS_LABEL[f.niveau]}</Chip></div></div>);
            })}
            {signauxFrontaliers.length === 0 && synthesesDRG.length === 0 ? <p className="text-slate-600 text-xs">Aucune note de vigilance active pour le moment.</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataScientistFrontieres(props) {
  var compte = props.compte;
  var tabState = useState("fraude");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });

  var SYS = "Tu es Data Scientist pour la Police des Frontieres de la Republique du Congo. Tu reponds en francais, de maniere structuree, concise et directement actionnable pour le responsable du service, sans jamais inventer de noms reels.";
  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var TABS = [["fraude", "Detection d Anomalies", "🔍"], ["affluence", "Analyse des Tendances", "📈"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-900 to-blue-950 border border-sky-700 flex items-center justify-center text-2xl shrink-0">🧠</div>
        <div><h2 className="text-2xl font-black text-white">Data Scientist IA — Frontieres</h2><p className="text-slate-500 text-xs">Lutte contre la fraude et anticipation des flux — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-blue-700 text-white border-blue-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "fraude" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Detection d Anomalies — Fraude documentaire et comportementale</p>
            <p className="text-slate-500 text-xs mb-3">L IA croise les passages recents, les fichiers de recherche et les interdictions de territoire pour reperer des schemas inhabituels</p>
            <button onClick={function () {
              var ctx = "Passages recents: " + JSON.stringify(VOYAGEURS_RECENTS.map(function (v) { return { nom: v.nom, document: v.document, nationalite: v.nationalite, poste: v.poste, sens: v.sens, statut: v.statut, heure: v.heure }; })) + " | Fichiers de recherche actifs: " + JSON.stringify(RECHERCHES_DATA.filter(function (r) { return r.statut !== "arrete"; }).map(function (r) { return { nom: r.nom, motif: r.motif, dangereux: r.dangereux }; })) + " | Interdictions de territoire actives: " + JSON.stringify(INTERDICTIONS_DATA.filter(function (i) { return i.statut === "active"; }));
              callIA(ai1[1], "Analyse les donnees de passage frontalier fournies pour detecter des ANOMALIES ou schemas de FRAUDE DOCUMENTAIRE qui ne seraient pas visibles a une verification humaine isolee (ex: documents similaires utilises a des postes differents, incoherences de nationalite/destination, passages repetes suspects, profils correspondant a des fichiers actifs). Structure: 1) ANOMALIES DETECTEES (avec niveau de confiance Fort/Moyen/Faible) 2) POSTES A SURVEILLER EN PRIORITE 3) RECOMMANDATIONS DE CONTROLE RENFORCE. Donnees: " + ctx);
            }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔍 Lancer la detection d anomalies</button>
            <AIBloc state={ai1[0]} />
          </div>
        </div>
      ) : null}

      {tab === "affluence" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Analyse des Tendances — Prevision des pics d affluence</p>
            <p className="text-slate-500 text-xs mb-3">Anticipe les pics horaires et journaliers pour ajuster les effectifs aux postes de controle</p>
            <button onClick={function () {
              var ctx = "Flux horaire 24h (entrees/sorties): " + JSON.stringify(FLUX_HORAIRE_DATA) + " | Postes frontaliers et type: " + JSON.stringify(POINTS_FRONTALIERS_DATA.map(function (p) { return { nom: p.nom, type: p.type, ville: p.ville }; }));
              callIA(ai2[1], "A partir du flux horaire des entrees/sorties fourni, identifie les CRENEAUX DE FORTE AFFLUENCE (heures et periodes a risque d engorgement) et propose un PLAN D AJUSTEMENT DES EFFECTIFS par poste frontalier (combien d agents supplementaires, a quelles heures, a quel poste). Structure: 1) PICS IDENTIFIES 2) PLAN DE RENFORT HORAIRE PAR POSTE 3) RECOMMANDATIONS POUR FLUIDIFIER LE PASSAGE SANS REDUIRE LA SECURITE. Donnees: " + ctx);
            }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📈 Generer le plan d ajustement des effectifs</button>
            <AIBloc state={ai2[0]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DataScientist(props) {
  var compte = props.compte;
  var tabState = useState("geo");
  var tab = tabState[0]; var setTab = tabState[1];

  var geoAI = useState({ loading: false, result: null });
  var plaintesAI = useState({ loading: false, result: null });
  var rhAI = useState({ loading: false, result: null });
  var prevAI = useState({ loading: false, result: null });
  var gavAI = useState({ loading: false, result: null });
  var decAI = useState({ loading: false, result: null });
  var proposalText = useState("");
  var proposals = useState([]);

  var SYS = "Tu es un Data Scientist expert en securite publique pour la Police Nationale et Gendarmerie Nationale de la Republique du Congo (SIPGN). Tu reponds toujours en francais, de maniere structuree, concise et directement actionnable par le commandement. Utilise des titres courts, des listes a puces et des chiffres concrets.";

  function aiStateMap(which) {
    var m = { geo: geoAI, plaintes: plaintesAI, rh: rhAI, prev: prevAI, gav: gavAI, dec: decAI };
    return m[which];
  }

  function callIA(which, prompt) {
    aiStateMap(which)[1]({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] })
    }).then(function (r) { return r.json(); }).then(function (d) {
      var txt = d.content && d.content[0] ? d.content[0].text : "Erreur de reponse.";
      aiStateMap(which)[1]({ loading: false, result: txt });
    }).catch(function () {
      aiStateMap(which)[1]({ loading: false, result: "Erreur de connexion a l API IA." });
    });
  }

  function AIBlock(props) {
    var which = props.which;
    var state = aiStateMap(which)[0];
    if (!state.loading && !state.result) { return null; }
    return (
      <div className="bg-slate-900 rounded-2xl border border-blue-800 p-4">
        {state.loading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" style={{ animation: "spin 1s linear infinite" }}></div>
            <span className="text-blue-400 text-sm font-semibold">Analyse IA en cours...</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤖</span>
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest">SIPGN Data Scientist</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{state.result}</p>
          </div>
        )}
      </div>
    );
  }

  var BZV_ZONES = [
    { nom: "Makelelekele", x: 110, y: 265 },
    { nom: "Bacongo", x: 175, y: 235 },
    { nom: "Poto-Poto", x: 260, y: 195 },
    { nom: "Moungali", x: 315, y: 168 },
    { nom: "Ouenze", x: 360, y: 142 },
    { nom: "Talangai", x: 400, y: 115 },
    { nom: "Mfilou", x: 145, y: 200 },
    { nom: "Madibou", x: 88, y: 300 },
    { nom: "Djiri", x: 435, y: 92 }
  ];

  var incParZone = {};
  INCIDENTS_DATA.forEach(function (inc) {
    BZV_ZONES.forEach(function (z) {
      var lLieu = inc.lieu.toLowerCase();
      var lZone = z.nom.toLowerCase();
      if (lLieu.indexOf(lZone.slice(0, 5)) >= 0) {
        incParZone[z.nom] = (incParZone[z.nom] || 0) + 1;
      }
    });
    if (inc.lieu.toLowerCase().indexOf("bacongo") >= 0) { incParZone["Bacongo"] = (incParZone["Bacongo"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("poto") >= 0) { incParZone["Poto-Poto"] = (incParZone["Poto-Poto"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("moungali") >= 0) { incParZone["Moungali"] = (incParZone["Moungali"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("port") >= 0) { incParZone["Poto-Poto"] = (incParZone["Poto-Poto"] || 0) + 1; }
  });

  var PAT_POSITIONS = [
    { id: "PAT-001", x: 255, y: 180, col: "#003F87" },
    { id: "PAT-002", x: 190, y: 225, col: "#003F87" },
    { id: "PAT-003", x: 395, y: 130, col: "#1B6B3A" },
    { id: "PAT-004", x: 130, y: 270, col: "#003F87" },
    { id: "PAT-005", x: 360, y: 155, col: "#1B6B3A" }
  ];

  var TABS_DS = [
    { id: "geo", label: "Geolocalisation", icon: "🗺️" },
    { id: "plaintes", label: "Analyse Plaintes", icon: "🧠" },
    { id: "rh", label: "RH & Besoins", icon: "👥" },
    { id: "prev", label: "Previsions", icon: "📈" },
    { id: "gav", label: "Intelligence GAV", icon: "🔒" },
    { id: "dec", label: "Aide a la Decision", icon: "⚡" }
  ];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-700 flex items-center justify-center text-2xl shrink-0">🤖</div>
        <div>
          <h2 className="text-2xl font-black text-white">Data Scientist — IA Operationnelle</h2>
          <p className="text-slate-500 text-xs">Analyse predictive, aide a la decision et optimisation des ressources — SIPGN</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS_DS.map(function (t) {
          var isActive = tab === t.id;
          return (
            <button key={t.id} onClick={function () { setTab(t.id); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isActive ? "bg-blue-700 text-white border-blue-600" : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white")}>
              <span>{t.icon}</span>{t.label}
            </button>
          );
        })}
      </div>

      {tab === "geo" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-white font-bold text-sm">Carte operationnelle — Brazzaville</p>
              <div className="flex gap-3 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Hotspot incidents</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Patrouille Police</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>Patrouille Gendarmerie</span>
              </div>
            </div>
            <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 380 }}>
              <svg width="100%" height="100%" viewBox="0 0 560 380">
                <rect width="560" height="380" fill="#0B1120" />
                <path d="M 0 345 Q 150 325 280 335 Q 420 345 560 330" stroke="#1E3A5F" strokeWidth="20" fill="none" opacity="0.6" />
                <text x="230" y="362" fill="#1E4080" fontSize="10" opacity="0.8">Fleuve Congo</text>
                {BZV_ZONES.map(function (z) {
                  var nb = incParZone[z.nom] || 0;
                  var radius = 26 + nb * 10;
                  var fillCol = nb >= 2 ? "#DC2626" : nb === 1 ? "#F59E0B" : "#334155";
                  return (
                    <g key={z.nom}>
                      <circle cx={z.x} cy={z.y} r={radius} fill={fillCol} opacity={nb > 0 ? 0.18 : 0.08} />
                      <circle cx={z.x} cy={z.y} r={18} fill={fillCol} opacity={nb > 0 ? 0.75 : 0.18} stroke={fillCol} strokeWidth={1} />
                      <text x={z.x} y={z.y + 4} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{nb > 0 ? nb : ""}</text>
                      <text x={z.x} y={z.y - 23} textAnchor="middle" fill="#94A3B8" fontSize={9}>{z.nom}</text>
                    </g>
                  );
                })}
                {PATROUILLES_DATA.map(function (p, i) {
                  var pos = PAT_POSITIONS[i] || { x: 250, y: 200 };
                  var col = p.corps === "Police" ? "#003F87" : "#1B6B3A";
                  var borderCol = p.statut === "intervention" ? "#DC2626" : "#fff";
                  return (
                    <g key={p.id}>
                      <circle cx={pos.x} cy={pos.y} r={13} fill={col} stroke={borderCol} strokeWidth={p.statut === "intervention" ? 2 : 1} opacity={0.95} />
                      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="#fff" fontSize={8} fontWeight="bold">{p.designation.slice(0, 4)}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="🔴" label="Zones critiques" value={Object.values(incParZone).filter(function (v) { return v >= 2; }).length} color="#DC2626" />
            <StatCard icon="🚔" label="Unites deployees" value={PATROUILLES_DATA.filter(function (p) { return p.statut !== "base"; }).length} color="#3B82F6" />
            <StatCard icon="⚠️" label="Zones non couvertes" value={BZV_ZONES.filter(function (z) { return !incParZone[z.nom]; }).length} color="#F59E0B" />
          </div>
          <button onClick={function () {
            var ctx = "Incidents par zone: " + JSON.stringify(incParZone) + " | Patrouilles: " + JSON.stringify(PATROUILLES_DATA.map(function (p) { return { designation: p.designation, zone: p.zone, statut: p.statut, effectif: p.effectif, corps: p.corps }; })) + " | Zones: Makelelekele, Bacongo, Poto-Poto, Moungali, Ouenze, Talangai, Mfilou, Madibou, Djiri";
            callIA("geo", "Analyse la repartition geographique des incidents a Brazzaville et le positionnement actuel des patrouilles. Identifie les points chauds et zones sous-couvertes, puis propose un plan de redeploiement optimal avec horaires recommandes. Structure en: 1) Points chauds identifies (par zone et densite) 2) Analyse du deploiement actuel (forces et lacunes) 3) Plan de redeploiement recommande (unites, zones, horaires) 4) Alertes prioritaires. Donnees: " + ctx);
          }} className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            🤖 Analyser le deploiement et optimiser les positions
          </button>
          <AIBlock which="geo" />
        </div>
      ) : null}

      {tab === "plaintes" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Plaintes — Classification NLP</p>
            {PLAINTES_DATA.map(function (p) {
              return (
                <div key={p.id} className="border border-slate-700 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm">{p.type}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{p.description}</p>
                      <p className="text-slate-600 text-xs font-mono">{p.reference}</p>
                    </div>
                    <Chip color={STATUT_PLAINTE_COLOR[p.statut]}>{STATUT_PLAINTE_LABEL[p.statut]}</Chip>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(PLAINTES_DATA.map(function (p) { return { id: p.id, type: p.type, description: p.description, statut: p.statut }; }));
            callIA("plaintes", "Effectue une analyse NLP de ces plaintes. Pour chacune (reference par son type): 1) Confirme ou recorrige la classification 2) Evalue l urgence: Critique / Eleve / Moyen / Faible avec justification 3) Suggere la procedure immediate a suivre par l agent (ex: audition temoins, visionnage cameras, arrestation, etc.) 4) Identifie les plaintes liees entre elles. Sois direct et operationnel. Plaintes: " + ctx);
          }} className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            🧠 Lancer l'analyse NLP — Classification et procedures
          </button>
          <AIBlock which="plaintes" />
        </div>
      ) : null}

      {tab === "rh" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Users size={18} />} label="Agents actifs" value={AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length} color="#22C55E" />
            <StatCard icon="📊" label="Inc. par agent" value={(INCIDENTS_DATA.length / Math.max(AGENTS_DATA.length, 1)).toFixed(1)} color="#F59E0B" />
            <StatCard icon="🎖️" label="Proches retraite" value={AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length} color="#64748B" />
            <StatCard icon="⭐" label="En promotion" value={AGENTS_DATA.filter(function (a) { return a.statut === "proposition_promotion"; }).length} color="#8B5CF6" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">Effectifs — vue synthetique</p>
            <div className="space-y-1.5 max-h-48 overflow-auto">
              {AGENTS_DATA.map(function (a) {
                return (
                  <div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1">
                    <span className="text-slate-300 font-semibold truncate max-w-xs">{a.nom}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <CorpsBadge corps={a.corps} />
                      <span className="text-slate-500">{a.anciennete}ans</span>
                      <Chip color={STATUT_CARRIERE_COLOR[a.statut]}>{STATUT_CARRIERE_LABEL[a.statut]}</Chip>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={function () {
            var ctxAgents = JSON.stringify(AGENTS_DATA.map(function (a) { return { nom: a.nom, corps: a.corps, grade: gradeLabel(a), anciennete: a.anciennete, statut: a.statut, service: a.service }; }));
            var ctxOps = "Incidents actifs: " + INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length + " | Types: " + Array.from(new Set(INCIDENTS_DATA.map(function (i) { return i.type; }))).join(", ") + " | Patrouilles deployees: " + PATROUILLES_DATA.length;
            callIA("rh", "Analyse les ecarts entre ressources humaines et besoins operationnels. Base sur les donnees fournies: 1) Unites en sous-effectif critique (avec chiffres) 2) Affectations optimisees recommandees (qui deplacer et pourquoi) 3) Plan de recrutement prioritaire (combien, quel corps, quel profil, quel service) 4) Formations urgentes a organiser 5) Agents proches de la retraite a remplacer (plan de succession). Agents: " + ctxAgents + " | Situation operationnelle: " + ctxOps);
          }} className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            👥 Generer l'analyse RH — Besoins et affectations optimales
          </button>
          <AIBlock which="rh" />
        </div>
      ) : null}

      {tab === "prev" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="📅" label="Incidents mois" value={INCIDENTS_DATA.length} color="#3B82F6" />
            <StatCard icon="🚗" label="Vehicules maintenance" value={VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length} color="#F59E0B" />
            <StatCard icon="🎖️" label="Departs retraite" value={AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length} color="#DC2626" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={function () {
              var ctx = "Incidents: " + JSON.stringify(INCIDENTS_DATA.map(function (i) { return { type: i.type, gravite: i.gravite, lieu: i.lieu }; })) + " | Agents: " + AGENTS_DATA.length + " | Vehicules: " + VEHICULES_DATA.length + " dont " + VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length + " en maintenance | Gardes a vue: " + GARDES_VUE_DATA.length;
              callIA("prev", "Redige un rapport de prevision operationnelle a 1 MOIS pour la Police Nationale et Gendarmerie du Congo. Structure: 1) Evolution previsionnelle des incidents (types dominants, zones a risque) 2) Besoins logistiques urgents a 30 jours (vehicules, equipements) 3) Besoins RH a court terme (renforts necessaires) 4) Budget mensuel estime en FCFA (ordre de grandeur) 5) Risques critiques identifies. Sois chiffre et precis. Donnees: " + ctx);
            }} className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-4 rounded-xl text-sm font-bold flex flex-col items-center gap-2">
              <span className="text-2xl">📅</span>Prevision 1 mois
            </button>
            <button onClick={function () {
              var ctx = "Incidents totaux: " + INCIDENTS_DATA.length + " | Agents: " + AGENTS_DATA.length + " (retraites prevus: " + AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length + ") | Patrouilles: " + PATROUILLES_DATA.length + " | Vehicules: " + VEHICULES_DATA.length + " | Plaintes: " + PLAINTES_DATA.length;
              callIA("prev", "Redige un rapport parlementaire de prevision strategique a 1 AN pour la Police Nationale et Gendarmerie Nationale du Congo. Ce document sera presente a l Assemblee Nationale et au Senat pour justifier les demandes budgetaires 2027. Structure institutionnelle: 1) Synthese executive (pour le Parlement) 2) Analyse de la criminalite sur l annee a venir (tendances, zones, types) 3) Besoins en recrutement 2027 (nombre exact, corps, profils) 4) Besoins en equipements et vehicules (types, quantites) 5) Budget previsionnel 2027 global en FCFA (par poste de depense) 6) Plan de modernisation des moyens 7) Recommandations strategiques au Parlement. Donnees: " + ctx);
            }} className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-4 rounded-xl text-sm font-bold flex flex-col items-center gap-2">
              <span className="text-2xl">📜</span>Rapport Parlement 1 an
            </button>
          </div>
          <AIBlock which="prev" />
        </div>
      ) : null}

      {tab === "gav" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="🔒" label="GAV actives" value={GARDES_VUE_DATA.filter(function (g) { return g.statut === "actif"; }).length} color="#F59E0B" />
            <StatCard icon="⚠️" label="Delai critique" value={GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6; }).length} color="#DC2626" />
            <StatCard icon="🔄" label="Prolongees" value={GARDES_VUE_DATA.filter(function (g) { return g.statut === "prolonge"; }).length} color="#8B5CF6" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {GARDES_VUE_DATA.map(function (g) {
              return (
                <div key={g.id} className="border border-slate-700 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-white font-bold text-sm">{g.nom}</p>
                      <p className="text-slate-400 text-xs">Motif: {g.motif} — {g.unite}</p>
                    </div>
                    <div className="shrink-0 w-40">
                      <GavTimer heures={g.heuresRestantes} />
                      <div className="mt-1"><Chip color={g.statut === "prolonge" ? "#8B5CF6" : g.statut === "actif" ? "#F59E0B" : "#22C55E"}>{g.statut}</Chip></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(GARDES_VUE_DATA.map(function (g) { return { nom: g.nom, motif: g.motif, heuresRestantes: g.heuresRestantes, statut: g.statut, unite: g.unite }; }));
            callIA("gav", "Analyse chaque dossier de garde a vue avec une approche juridico-operationnelle. Pour chaque detenu: 1) Etat legal (delai 48h respecte? risque de vice de procedure?) 2) Resolution recommandee parmi: Liberation immediate / Transmission Parquet / Prolongation justifiee / Transfert hospitalier / Mise en examen 3) Niveau d urgence d action (dans les 6h / 24h / 48h) 4) Alerte globale: quels dossiers peuvent engager la responsabilite de l Etat. Sois direct et operationnel pour le commandement. Donnees: " + ctx);
          }} className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            🔒 Analyser les dossiers GAV — Risques et resolutions
          </button>
          <AIBlock which="gav" />
        </div>
      ) : null}

      {tab === "dec" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Recommandations prescriptives du commandement</p>
            <p className="text-slate-500 text-xs mb-4">L IA analyse l ensemble des donnees operationnelles en temps reel et emet des recommandations actionnables.</p>
            <button onClick={function () {
              var ctx = "Incidents: " + JSON.stringify(INCIDENTS_DATA.map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite, statut: i.statut }; })) + " | Patrouilles: " + JSON.stringify(PATROUILLES_DATA.map(function (p) { return { designation: p.designation, zone: p.zone, statut: p.statut }; })) + " | GAV critiques: " + GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6; }).length + " | Plaintes non resolues: " + PLAINTES_DATA.filter(function (p) { return p.statut !== "transmis_parquet"; }).length + " | Agents en service: " + AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length;
              callIA("dec", "Sur la base de l ensemble des donnees operationnelles SIPGN, genere exactement 5 recommandations prescriptives pour le commandement. Format strict pour chaque recommandation: RECOMMANDATION N: [TITRE EN MAJUSCULES] / Probleme identifie: [description precise avec chiffres] / Action immediate recommandee: [qui fait quoi, ou, quand] / Impact attendu: [resultat mesurable] / Priorite: [CRITIQUE/HAUTE/MOYENNE]. Donnees: " + ctx);
            }} className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 mb-3">
              ⚡ Generer les 5 recommandations du commandement
            </button>
            <AIBlock which="dec" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Workflow Terrain — Propositions de services</p>
            <p className="text-slate-500 text-xs mb-3">Soumettez une proposition de terrain. L IA l analysera avant de la transmettre au Commandant pour validation.</p>
            <textarea value={proposalText[0]} onChange={function (e) { proposalText[1](e.target.value); }} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none mb-2" placeholder="Ex: Compte tenu de la hausse des vols en Bacongo, je propose de renforcer la patrouille Bravo-3 le vendredi soir..." />
            <button onClick={function () {
              var prop = proposalText[0].trim();
              if (!prop) { return; }
              var newP = { id: Date.now(), auteur: compte.nom, service: compte.service, texte: prop, date: new Date().toISOString().slice(0, 10), statut: "analyse_ia", avis: null };
              proposals[1](function (prev) { return [newP].concat(prev); });
              proposalText[1]("");
              var ctx = "Proposition du service " + compte.service + ": " + prop + " | Contexte operationnel: incidents actifs=" + INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length + ", patrouilles=" + JSON.stringify(PATROUILLES_DATA.map(function (p) { return p.designation + " / " + p.zone; }));
              fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: "Analyse cette proposition de terrain et emet un avis structure en 3 parties: 1) AVIS (Favorable / Defavorable / A modifier) avec note de pertinence /10 2) Justification basee sur les donnees (2-3 lignes) 3) Modification suggeree si applicable. Proposition: " + ctx }] })
              }).then(function (r) { return r.json(); }).then(function (d) {
                var avis = d.content && d.content[0] ? d.content[0].text : "Analyse indisponible.";
                proposals[1](function (prev) {
                  return prev.map(function (x) {
                    if (x.id !== newP.id) { return x; }
                    var c = {};
                    for (var k in x) { c[k] = x[k]; }
                    c.avis = avis;
                    c.statut = "en_attente_commandant";
                    return c;
                  });
                });
              }).catch(function () { });
            }} className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
              Soumettre pour analyse IA
            </button>
            {proposals[0].length > 0 ? (
              <div className="mt-4 space-y-3">
                {proposals[0].map(function (p) {
                  var chipCol = p.statut === "valide" ? "#22C55E" : p.statut === "refuse" ? "#DC2626" : "#F59E0B";
                  var chipLabel = p.statut === "valide" ? "Valide" : p.statut === "refuse" ? "Refuse" : p.statut === "analyse_ia" ? "Analyse..." : "Attente commandant";
                  return (
                    <div key={p.id} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 text-xs font-bold">{p.auteur} — {p.service} — {p.date}</span>
                        <Chip color={chipCol}>{chipLabel}</Chip>
                      </div>
                      <p className="text-slate-400 text-xs mb-2 italic">"{p.texte}"</p>
                      {p.avis ? (
                        <div className="bg-slate-800 rounded-lg p-3 border border-blue-800 mb-2">
                          <p className="text-blue-400 text-xs font-black uppercase mb-1">Avis IA:</p>
                          <p className="text-slate-300 text-xs leading-relaxed">{p.avis}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-600 text-xs">
                          <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full" style={{ animation: "spin 1s linear infinite" }}></div>
                          Analyse IA en cours...
                        </div>
                      )}
                      {p.statut === "en_attente_commandant" && compte.role === "direction" ? (
                        <div className="flex gap-2 mt-2 pt-2 border-t border-slate-700">
                          <button onClick={function () {
                            proposals[1](function (prev) { return prev.map(function (x) { if (x.id !== p.id) { return x; } var c = {}; for (var k in x) { c[k] = x[k]; } c.statut = "valide"; return c; }); });
                          }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Valider</button>
                          <button onClick={function () {
                            proposals[1](function (prev) { return prev.map(function (x) { if (x.id !== p.id) { return x; } var c = {}; for (var k in x) { c[k] = x[k]; } c.statut = "refuse"; return c; }); });
                          }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Refuser</button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AlertBanniere(props) {
  var alertes = props.alertes;
  if (!alertes || alertes.length === 0) { return null; }
  return (
    <div className="space-y-2">
      {alertes.map(function (a, i) {
        var crit = a.niveau === "critique";
        return (
          <div key={i} style={{ background: crit ? "#450A0A" : "#431407", border: "1px solid " + (crit ? "#991B1B" : "#92400E") }} className="rounded-xl p-3 flex items-start gap-2">
            <span className="text-base shrink-0">{crit ? "🚨" : "⚠️"}</span>
            <div>
              <p className={"text-xs font-black " + (crit ? "text-red-300" : "text-amber-300")}>{a.titre}</p>
              <p className="text-slate-400 text-xs mt-0.5">{a.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AIBloc(props) {
  var state = props.state;
  if (!state || (!state.loading && !state.result)) { return null; }
  return (
    <div className="bg-slate-900 rounded-2xl border border-blue-800 p-4">
      {state.loading ? (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" style={{ animation: "spin 1s linear infinite" }}></div>
          <span className="text-blue-400 text-sm font-semibold">Analyse IA en cours...</span>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🤖</span>
            <span className="text-blue-400 text-xs font-black uppercase tracking-widest">SIPGN Data Scientist</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{state.result}</p>
        </div>
      )}
    </div>
  );
}

var BUDGET_POSTES = [
  { poste: "Personnel", budget: 450, reel: 487 },
  { poste: "Carburant", budget: 85, reel: 112 },
  { poste: "Maintenance", budget: 45, reel: 38 },
  { poste: "Equipements", budget: 65, reel: 59 },
  { poste: "Missions", budget: 28, reel: 41 },
  { poste: "Formation", budget: 15, reel: 9 }
];

function DataScientistDL(props) {
  var compte = props.compte;
  var SYS = "Tu es Data Scientist SIPGN specialise en logistique et maintenance predictive pour les forces de l ordre en Republique du Congo. Reponds en francais, structure, chiffre et directement actionnable par le Directeur de la Logistique.";
  var tabState = useState("maintenance");
  var tab = tabState[0]; var setTab = tabState[1];
  var mAI = useState({ loading: false, result: null });
  var cAI = useState({ loading: false, result: null });
  var sAI = useState({ loading: false, result: null });
  var tAI = useState({ loading: false, result: null });

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] })
    }).then(function (r) { return r.json(); }).then(function (d) {
      setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." });
    }).catch(function () { setter({ loading: false, result: "Erreur de connexion." }); });
  }

  var alertesDL = [];
  VEHICULES_DATA.forEach(function (v) {
    if (v.km > 90000) { alertesDL.push({ niveau: "critique", titre: v.immat + " — Revision majeure urgente", message: v.marque + " " + v.type + " : " + v.km.toLocaleString("fr-FR") + " km. Risque de panne mecanique eleve." }); }
    else if (v.km > 60000) { alertesDL.push({ niveau: "attention", titre: v.immat + " — Inspection recommandee sous 15 jours", message: v.marque + " : " + v.km.toLocaleString("fr-FR") + " km. Verifier freins, suspension et pneus." }); }
    if (v.statut === "maintenance") { alertesDL.push({ niveau: "attention", titre: v.immat + " immobilise chez " + v.unite, message: "Unite privee de ce vehicule pendant la duree des travaux." }); }
  });

  var TABS = [["maintenance", "Maintenance Predictive", "🔧"], ["carburant", "Carburant & Anomalies", "⛽"], ["stocks", "Stocks Predictifs", "📦"], ["tendance", "Tendance 3 mois", "📈"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-900 to-blue-900 border border-sky-700 flex items-center justify-center text-2xl shrink-0">🚛</div>
        <div>
          <h2 className="text-2xl font-black text-white">Data Scientist — Logistique</h2>
          <p className="text-slate-500 text-xs">Maintenance predictive, gestion des stocks et pilotage de flotte — DL</p>
        </div>
      </div>
      <AlertBanniere alertes={alertesDL} />
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) {
          var isA = tab === t[0];
          return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-sky-700 text-white border-sky-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>;
        })}
      </div>

      {tab === "maintenance" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="🚗" label="Total parc" value={VEHICULES_DATA.length} color="#3B82F6" />
            <StatCard icon="🔧" label="En maintenance" value={VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length} color="#F59E0B" />
            <StatCard icon="⚠️" label="Km critique (90k+)" value={VEHICULES_DATA.filter(function (v) { return v.km > 90000; }).length} color="#DC2626" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Etat du parc vehicules</p>
            {VEHICULES_DATA.map(function (v) {
              var risk = v.km > 90000 ? "critique" : v.km > 60000 ? "attention" : "ok";
              var rCol = risk === "critique" ? "#DC2626" : risk === "attention" ? "#F59E0B" : "#22C55E";
              var pct = Math.min(100, Math.round(v.km / 1200));
              return (
                <div key={v.id} className="border border-slate-700 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div><span className="text-white font-bold text-sm font-mono">{v.immat}</span><span className="text-slate-500 text-xs ml-2">{v.marque} {v.type}</span></div>
                    <Chip color={rCol}>{risk === "critique" ? "Revision urgente" : risk === "attention" ? "A surveiller" : "Etat correct"}</Chip>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5"><span className="text-slate-500">{v.km.toLocaleString("fr-FR")} km</span><span className="text-slate-600">/ 120 000 km</span></div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="h-1.5 rounded-full" style={{ width: pct + "%", background: rCol }}></div></div>
                    </div>
                    <CorpsBadge corps={v.corps} />
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={function () {
            callIA(mAI[1], "Effectue une analyse de maintenance predictive pour la flotte vehicules de la Police et Gendarmerie du Congo. Pour chaque vehicule: 1) Risque de panne (Critique/Moyen/Faible) base sur kilometrage 2) Interventions recommandees avec delai precis (ex: Changement pneus sous 15 jours) 3) Cout estime en FCFA 4) Planning de maintenance sur 30 jours pour minimiser les immobilisations. Flotte: " + JSON.stringify(VEHICULES_DATA.map(function (v) { return { immat: v.immat, marque: v.marque, type: v.type, statut: v.statut, km: v.km }; })));
          }} className="bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔧 Lancer l'analyse de maintenance predictive</button>
          <AIBloc state={mAI[0]} />
        </div>
      ) : null}

      {tab === "carburant" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Consommation estimee par vehicule</p>
            {VEHICULES_DATA.map(function (v) {
              var ref = v.type === "Pick-up 4x4" ? 12 : v.type === "Moto" ? 4 : v.type === "Fourgon" ? 14 : 8;
              var litres = Math.round(v.km * 0.15 * ref / 100);
              var anomalie = v.statut === "maintenance" && v.km > 50000;
              return (
                <div key={v.id} className={"border rounded-xl p-3 " + (anomalie ? "border-amber-700 bg-amber-950/20" : "border-slate-700")}>
                  <div className="flex items-center justify-between">
                    <div><span className="text-white font-bold text-sm font-mono">{v.immat}</span><span className="text-slate-500 text-xs ml-2">{v.marque}</span></div>
                    <div className="text-right">
                      <p className="text-slate-300 text-xs">~{litres.toLocaleString("fr-FR")} L estimes</p>
                      <p className="text-slate-600 text-xs">Ref: {ref} L/100km</p>
                      {anomalie ? <Chip color="#F59E0B">Anomalie</Chip> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={function () {
            callIA(cAI[1], "Analyse la consommation carburant de la flotte de la Police et Gendarmerie du Congo. Consommations de reference: Pick-up 4x4=12L/100, Berline=8L/100, Fourgon=14L/100, Moto=4L/100. Base sur le kilometrage reel: 1) Identifie les vehicules avec consommation anormale vs missions declarees 2) Detecte les risques de fraude ou mauvaise gestion (signes suspects) 3) Estime le budget carburant mensuel total en FCFA (prix diesel ~750 FCFA/L) 4) Propose 3 mesures concretes pour reduire la consommation de 15%. Flotte: " + JSON.stringify(VEHICULES_DATA.map(function (v) { return { immat: v.immat, type: v.type, statut: v.statut, km: v.km }; })));
          }} className="bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⛽ Analyser la consommation et detecter les anomalies</button>
          <AIBloc state={cAI[0]} />
        </div>
      ) : null}

      {tab === "stocks" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">Operations planifiees — besoins logistiques</p>
            <div className="space-y-1.5">
              {EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).slice(0, 6).map(function (e) {
                return (
                  <div key={e.id} className="flex items-center justify-between text-xs border-b border-slate-700/50 pb-1.5">
                    <span className="text-slate-300 truncate max-w-xs">{e.titre}</span>
                    <div className="flex items-center gap-2 shrink-0"><span className="text-slate-500">{e.date}</span><Chip color={TYPE_COLOR[e.type]}>{TYPE_LABEL[e.type]}</Chip></div>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={function () {
            var evts = JSON.stringify(EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).map(function (e) { return { titre: e.titre, type: e.type, date: e.date, criticite: e.criticite }; }));
            var flotte = "Dispo: " + VEHICULES_DATA.filter(function (v) { return v.statut === "disponible"; }).length + " | Mission: " + VEHICULES_DATA.filter(function (v) { return v.statut === "mission"; }).length + " | Maintenance: " + VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length;
            callIA(sAI[1], "Genere un plan de reapprovisionnement predictif base sur le calendrier des operations et l etat du parc. Inclut: 1) Besoins en carburant par operation (litres + FCFA) 2) Pieces detachees prioritaires a commander (base sur km flotte) 3) Equipements necessaires par type d operation 4) Planning de livraison recommande 5) Alerte si rupture de stock previsible. Calendrier: " + evts + " | Flotte: " + flotte);
          }} className="bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📦 Generer le plan de reapprovisionnement predictif</button>
          <AIBloc state={sAI[0]} />
        </div>
      ) : null}

      {tab === "tendance" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Taux disponibilite flotte</p><p className="text-white font-black text-3xl mt-1">{Math.round(VEHICULES_DATA.filter(function (v) { return v.statut !== "maintenance"; }).length / VEHICULES_DATA.length * 100)}%</p></div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Km moyen flotte</p><p className="text-white font-black text-3xl mt-1">{Math.round(VEHICULES_DATA.reduce(function (s, v) { return s + v.km; }, 0) / VEHICULES_DATA.length).toLocaleString("fr-FR")}</p></div>
          </div>
          <button onClick={function () {
            var ctx = "Flotte: " + JSON.stringify(VEHICULES_DATA.map(function (v) { return { immat: v.immat, km: v.km, statut: v.statut, type: v.type }; })) + " | Operations futures: " + EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length;
            callIA(tAI[1], "Genere une analyse predictive logistique sur les 3 prochains mois pour la Direction de la Logistique. Structure: 1) Evolution previsionnelle du parc (pannes attendues, vehicules a retirer) 2) Tendance budgetaire carburant et maintenance en FCFA 3) Risques logistiques critiques identifies 4) Top 5 actions prioritaires pour le directeur 5) KPIs de performance a surveiller ce trimestre. Donnees: " + ctx);
          }} className="bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📈 Quelle est la tendance logistique sur 3 mois ?</button>
          <AIBloc state={tAI[0]} />
        </div>
      ) : null}
    </div>
  );
}

function DataScientistPersonnel(props) {
  var compte = props.compte;
  var SYS = "Tu es Data Scientist SIPGN specialise en gestion des ressources humaines et GPEC pour les forces de l ordre congolaises. Reponds en francais, structure, chiffre, et directement actionnable par le Directeur du Personnel.";
  var tabState = useState("matching");
  var tab = tabState[0]; var setTab = tabState[1];
  var mAI = useState({ loading: false, result: null });
  var pAI = useState({ loading: false, result: null });
  var rAI = useState({ loading: false, result: null });
  var hAI = useState({ loading: false, result: null });

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] })
    }).then(function (r) { return r.json(); }).then(function (d) {
      setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." });
    }).catch(function () { setter({ loading: false, result: "Erreur de connexion." }); });
  }

  var alertesRH = [];
  AGENTS_DATA.forEach(function (a) {
    if (a.anciennete >= 30) { alertesRH.push({ niveau: "critique", titre: a.nom + " — Depart retraite imminent", message: gradeLabel(a) + " - " + a.anciennete + " ans de service. Succession a planifier d urgence." }); }
    else if (a.anciennete >= 28) { alertesRH.push({ niveau: "attention", titre: a.nom + " — Eligible retraite dans 2 ans", message: gradeLabel(a) + " — Transfert de competences a organiser." }); }
    if (a.statut === "sanction") { alertesRH.push({ niveau: "attention", titre: a.nom + " — Sanction disciplinaire active", message: "Situation a suivre. Impact potentiel sur la performance de l unite." }); }
  });
  var promoEnAttente = AGENTS_DATA.filter(function (a) { return a.statut === "proposition_promotion"; });
  if (promoEnAttente.length > 0) { alertesRH.push({ niveau: "attention", titre: promoEnAttente.length + " promotion(s) en attente de validation", message: promoEnAttente.map(function (a) { return a.nom; }).join(", ") }); }

  var pyramideData = [
    { tranche: "0-5 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete <= 5; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete <= 5; }).length },
    { tranche: "6-15 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 6 && a.anciennete <= 15; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 6 && a.anciennete <= 15; }).length },
    { tranche: "16-25 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 16 && a.anciennete <= 25; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 16 && a.anciennete <= 25; }).length },
    { tranche: "26+ ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 26; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 26; }).length }
  ];

  var TABS = [["matching", "Matching Competences", "🎯"], ["pyramide", "Pyramide des Ages", "📊"], ["recrutement", "Prevision Recrutement", "👥"], ["hauts", "Hauts Potentiels", "⭐"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-900 to-purple-900 border border-pink-700 flex items-center justify-center text-2xl shrink-0">👥</div>
        <div>
          <h2 className="text-2xl font-black text-white">Data Scientist — Personnel & GPEC</h2>
          <p className="text-slate-500 text-xs">Matching competences, pyramide des ages et prevision recrutement — DOP</p>
        </div>
      </div>
      <AlertBanniere alertes={alertesRH} />
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) {
          var isA = tab === t[0];
          return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-pink-700 text-white border-pink-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>;
        })}
      </div>

      {tab === "matching" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Users size={18} />} label="Agents actifs" value={AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length} color="#22C55E" />
            <StatCard icon="⭐" label="En promotion" value={AGENTS_DATA.filter(function (a) { return a.statut === "proposition_promotion"; }).length} color="#F59E0B" />
            <StatCard icon="🌴" label="En conge" value={AGENTS_DATA.filter(function (a) { return a.statut === "conge"; }).length} color="#3B82F6" />
            <StatCard icon="🎖️" label="Eligible retraite" value={AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length} color="#DC2626" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">Agents disponibles pour affectation</p>
            <div className="space-y-1.5 max-h-52 overflow-auto">
              {AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).map(function (a) {
                return (
                  <div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1">
                    <span className="text-slate-300 font-semibold">{a.nom}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <CorpsBadge corps={a.corps} />
                      <span className="text-slate-500">{gradeLabel(a)}</span>
                      <span className="text-slate-600">{a.anciennete}ans</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(AGENTS_DATA.map(function (a) { return { nom: a.nom, corps: a.corps, grade: gradeLabel(a), anciennete: a.anciennete, statut: a.statut, service: a.service }; }));
            var ops = "Incidents actifs necessitant des specialistes: Vol a main armee (x2), Trafic stupefiants (x2), Faux documents, Tentative evasion | Unites en sous-effectif: DCPJ, Brigade PNR";
            callIA(mAI[1], "Effectue un matching competences-poste pour la Police et Gendarmerie du Congo. Base sur les grades, anciennete et services actuels des agents: 1) Identifie les 3 meilleurs profils pour renforcer la DCPJ (enquetes criminelles) 2) Propose un matching pour la Brigade Navale (profils maritimes) 3) Identifie les agents sous-utilises dans leur poste actuel 4) Recommande des mutations strategiques pour optimiser le dispositif. Agents: " + ctx + " | Besoins operationnels: " + ops);
          }} className="bg-pink-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🎯 Lancer le matching competences-poste</button>
          <AIBloc state={mAI[0]} />
        </div>
      ) : null}

      {tab === "pyramide" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-4">Pyramide des ages — Police & Gendarmerie</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pyramideData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis type="number" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <YAxis dataKey="tranche" type="category" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                  <Bar dataKey="police" name="Police" fill="#003F87" radius={[0, 4, 4, 0]} barSize={14} />
                  <Bar dataKey="gend" name="Gendarmerie" fill="#1B6B3A" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm" style={{ background: "#003F87" }}></span>Police</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm" style={{ background: "#1B6B3A" }}></span>Gendarmerie</span>
            </div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(pyramideData);
            var retraites = AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).map(function (a) { return a.nom + " (" + a.anciennete + " ans, " + a.corps + ")"; }).join(", ");
            callIA(pAI[1], "Analyse la pyramide des ages de la Police et Gendarmerie du Congo et simule les departs sur 5 ans. Donnees par tranche: " + ctx + " | Agents proches retraite: " + retraites + ". Analyse: 1) Diagnostic de la pyramide actuelle (vieillissement? rajeunissement?) 2) Simulation des departs a la retraite sur 1 an, 3 ans et 5 ans (par corps et effectif) 3) Impact prevu sur la capacite operationnelle 4) Plan de recrutement et formation pour compenser 5) Risques de penurie dans des specialites cles.");
          }} className="bg-pink-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📊 Simuler les departs et planifier les remplacements</button>
          <AIBloc state={pAI[0]} />
        </div>
      ) : null}

      {tab === "recrutement" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Incidents / agent actif</p><p className="text-white font-black text-3xl mt-1">{(INCIDENTS_DATA.length / Math.max(AGENTS_DATA.filter(function(a){return a.statut==="actif";}).length, 1)).toFixed(1)}</p></div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Patrouilles / agent actif</p><p className="text-white font-black text-3xl mt-1">{(PATROUILLES_DATA.reduce(function(s,p){return s+p.effectif;},0) / Math.max(AGENTS_DATA.filter(function(a){return a.statut==="actif";}).length, 1)).toFixed(2)}</p></div>
          </div>
          <button onClick={function () {
            var ctx = "Effectifs actuels: " + AGENTS_DATA.length + " agents (actifs: " + AGENTS_DATA.filter(function(a){return a.statut==="actif";}).length + ") | Police: " + AGENTS_DATA.filter(function(a){return a.corps==="Police";}).length + " | Gendarmerie: " + AGENTS_DATA.filter(function(a){return a.corps==="Gendarmerie";}).length + " | Incidents actifs: " + INCIDENTS_DATA.filter(function(i){return i.statut==="en_cours";}).length + " | Retraites prevus 2 ans: " + AGENTS_DATA.filter(function(a){return a.anciennete>=28;}).length;
            callIA(rAI[1], "Genere le plan de recrutement previsionnel a soumettre au Parlement pour justifier les ouvertures de postes 2027. Structure institutionnelle: 1) Justification chiffree du besoin (ratio incidents/agent, departs prevus, zones deficitaires) 2) Nombre de postes a ouvrir par corps (Police / Gendarmerie) et par specialite 3) Profils et diplomes requis pour chaque poste 4) Cout salarial estimatif en FCFA 5) Planning de recrutement et formation (duree, ecoles) 6) Impact attendu sur les performances operationnelles. Donnees: " + ctx);
          }} className="bg-pink-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">👥 Generer le rapport de recrutement pour le Parlement</button>
          <AIBloc state={rAI[0]} />
        </div>
      ) : null}

      {tab === "hauts" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-3">Profils agents — vue performance</p>
            <div className="space-y-1.5 max-h-60 overflow-auto">
              {AGENTS_DATA.filter(function (a) { return a.statut !== "retraite" && a.statut !== "sanction"; }).sort(function (a, b) { return (b.gradeIndex + b.anciennete * 0.1) - (a.gradeIndex + a.anciennete * 0.1); }).map(function (a) {
                var score = Math.min(100, Math.round((a.gradeIndex * 8 + a.anciennete * 2)));
                return (
                  <div key={a.id} className="flex items-center gap-3 border-b border-slate-800 pb-1.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ background: a.corps === "Police" ? "#003F87" : "#1B6B3A", color: "#fff" }}>{a.nom.slice(0, 2)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-xs font-semibold truncate">{a.nom}</span>
                        <span className="text-slate-500 text-xs">{score}/100</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1 mt-0.5"><div className="h-1 rounded-full bg-blue-500" style={{ width: score + "%" }}></div></div>
                    </div>
                    <CorpsBadge corps={a.corps} />
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(AGENTS_DATA.map(function (a) { return { nom: a.nom, corps: a.corps, grade: gradeLabel(a), anciennete: a.anciennete, statut: a.statut, service: a.service }; }));
            callIA(hAI[1], "Identifie les hauts potentiels parmi les agents de la Police et Gendarmerie du Congo pour integration dans des unites d elite ou des postes de commandement. Pour les 5 meilleurs profils identifies: 1) Nom et justification de la selection (grade, anciennete, service) 2) Poste de commandement recommande 3) Formation elite recommandee (ex: INTERPOL, Informatique Forensique, Brigade Canine, Commandement) 4) Plan d evolution de carriere sur 3 ans. Agents: " + ctx);
          }} className="bg-pink-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⭐ Identifier les hauts potentiels et unites d elite</button>
          <AIBloc state={hAI[0]} />
        </div>
      ) : null}
    </div>
  );
}

function DataScientistDAF(props) {
  var compte = props.compte;
  var SYS = "Tu es Data Scientist SIPGN specialise en analyse financiere et pilotage budgetaire pour les forces de l ordre congolaises. Reponds en francais, structure, chiffre en FCFA, et directement actionnable par le Directeur de l Administration et des Finances.";
  var tabState = useState("budget");
  var tab = tabState[0]; var setTab = tabState[1];
  var bAI = useState({ loading: false, result: null });
  var eAI = useState({ loading: false, result: null });
  var rAI = useState({ loading: false, result: null });
  var oAI = useState({ loading: false, result: null });
  var anoAI = useState({ loading: false, result: null });
  var besAI = useState({ loading: false, result: null });

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] })
    }).then(function (r) { return r.json(); }).then(function (d) {
      setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." });
    }).catch(function () { setter({ loading: false, result: "Erreur de connexion." }); });
  }

  var alertesDAF = [];
  BUDGET_POSTES.forEach(function (p) {
    var ecart = ((p.reel - p.budget) / p.budget * 100).toFixed(1);
    if (p.reel > p.budget * 1.2) { alertesDAF.push({ niveau: "critique", titre: "Derapage " + p.poste + " : +" + ecart + "%", message: "Budget: " + p.budget + "M FCFA | Reel: " + p.reel + "M FCFA | Ecart: +" + (p.reel - p.budget) + "M FCFA. Action corrective urgente requise." }); }
    else if (p.reel > p.budget * 1.05) { alertesDAF.push({ niveau: "attention", titre: p.poste + " depasse le budget de " + ecart + "%", message: "Surveiller la tendance. Mesures correctives a envisager." }); }
  });

  var TABS = [["budget", "Modelisation Budgetaire", "💰"], ["ecarts", "Analyse des Ecarts", "📉"], ["anomalies", "Detection Anomalies", "🔎"], ["besoins", "Prevision Besoins", "🧭"], ["rapport", "Rapport Parlementaire", "📜"], ["optimisation", "Optimisation des Couts", "⚙️"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-900 to-teal-900 border border-green-700 flex items-center justify-center text-2xl shrink-0">💰</div>
        <div>
          <h2 className="text-2xl font-black text-white">Data Scientist — Administration & Finances</h2>
          <p className="text-slate-500 text-xs">Pilotage budgetaire, simulations et rapports parlementaires — DAF</p>
        </div>
      </div>
      <AlertBanniere alertes={alertesDAF} />
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) {
          var isA = tab === t[0];
          return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-green-700 text-white border-green-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>;
        })}
      </div>

      {tab === "budget" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Budget vs Reel — Mois en cours (millions FCFA)</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_POSTES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="poste" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function(v){ return [v + "M FCFA"]; }} />
                  <Bar dataKey="budget" name="Budget" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="reel" name="Reel" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span>Budget previsionnel</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-amber-400"></span>Depenses reelles</span>
            </div>
          </div>
          <button onClick={function () {
            var ctx = "Budget en millions FCFA: " + JSON.stringify(BUDGET_POSTES) + " | Agents: " + AGENTS_DATA.length + " | Vehicules en maintenance: " + VEHICULES_DATA.filter(function(v){return v.statut==="maintenance";}).length + " | Operations planifiees: " + EVENTS_DATA.filter(function(e){return e.statut==="planifie";}).length;
            callIA(bAI[1], "Effectue une modelisation budgetaire. Simule l impact financier de 3 scenarios pour la Police et Gendarmerie du Congo: Scenario A: Deploiement de 20 agents supplementaires aux frontieres (Cout total + impact operationnel) | Scenario B: Renouvellement de 30% du parc vehicules (investissement vs economie de maintenance) | Scenario C: Formation intensive de 50 agents (cout + retour sur investissement en efficacite). Pour chaque scenario: cout total en FCFA, budget supplementaire necessaire, impact prevu sur les performances, et recommendation finale. Contexte budgetaire actuel: " + ctx);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">💰 Simuler l'impact financier de nouvelles politiques</button>
          <AIBloc state={bAI[0]} />
        </div>
      ) : null}

      {tab === "ecarts" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Analyse des ecarts Budget vs Reel</p>
            {BUDGET_POSTES.map(function (p) {
              var ecart = p.reel - p.budget;
              var pct = ((ecart / p.budget) * 100).toFixed(1);
              var surC = ecart > 0 ? "#DC2626" : "#22C55E";
              return (
                <div key={p.poste} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">{p.poste}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-slate-500 text-xs">Budget: {p.budget}M</span>
                      <span className="text-slate-300 text-xs">Reel: {p.reel}M</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ color: surC }} className="font-black text-sm">{ecart > 0 ? "+" : ""}{ecart}M FCFA</p>
                    <p style={{ color: surC }} className="text-xs">{pct}%</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={function () {
            callIA(eAI[1], "Analyse les ecarts budgetaires suivants (en millions FCFA) pour la Police et Gendarmerie du Congo: " + JSON.stringify(BUDGET_POSTES) + ". Pour chaque poste en derapage: 1) Identifie la cause probable du derapage 2) Propose des mesures correctives immediates 3) Estime le risque de fin d annee si la tendance continue. Pour les postes sous-consommes: identifie si c est une economie reelle ou un retard. Conclus avec un plan de regularisation budgetaire global et les 3 actions prioritaires du DAF ce mois-ci.");
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📉 Analyser les ecarts et proposer les mesures correctives</button>
          <AIBloc state={eAI[0]} />
        </div>
      ) : null}

      {tab === "anomalies" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Engagements recents — controle de coherence</p>
            {ENGAGEMENTS_DATA.map(function (e) {
              var suspect = e.montant > 8000000 && e.service === "Direction de la Logistique";
              return (
                <div key={e.id} className={"border rounded-xl p-3 " + (suspect ? "border-amber-700 bg-amber-950/20" : "border-slate-700")}>
                  <div className="flex items-start justify-between gap-2">
                    <div><p className="text-white font-semibold text-sm">{e.objet}</p><p className="text-slate-500 text-xs">{e.service} — {e.date}</p></div>
                    <div className="text-right shrink-0"><p className="text-slate-300 text-xs font-mono">{e.montant.toLocaleString("fr-FR")} FCFA</p>{suspect ? <Chip color="#F59E0B">A verifier</Chip> : null}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(ENGAGEMENTS_DATA.map(function (e) { return { objet: e.objet, montant: e.montant, service: e.service, date: e.date, statut: e.statut }; })) + " | Vehicules et km: " + JSON.stringify(VEHICULES_DATA.map(function (v) { return { immat: v.immat, type: v.type, km: v.km, unite: v.unite }; })) + " | Budget carburant: " + JSON.stringify(BUDGET_POSTES.find(function (p) { return p.poste === "Carburant"; }));
            callIA(anoAI[1], "Effectue une detection d anomalies dans les declarations de depenses et engagements de la Police et Gendarmerie du Congo. Identifie: 1) Incoherences entre montants engages et activite reelle declaree (ex: surconsommation carburant vs kilometrage des vehicules) 2) Engagements dont le montant parait disproportionne par rapport au service emetteur ou a la nature de la depense 3) Doublons ou patterns suspects (memes montants recurrents, meme service sur-sollicite) 4) Pour chaque anomalie detectee: niveau de suspicion (Faible/Moyen/Eleve), justification chiffree, action de verification recommandee. Conclus avec une liste priorisee des controles a effectuer cette semaine. Donnees: " + ctx);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔎 Lancer la detection d'anomalies</button>
          <AIBloc state={anoAI[0]} />
        </div>
      ) : null}

      {tab === "besoins" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={<Users size={18} />} label="Effectif actuel" value={AGENTS_DATA.length} color="#3B82F6" />
            <StatCard icon="🚗" label="Vehicules" value={VEHICULES_DATA.length} color="#0EA5E9" />
            <StatCard icon="🚨" label="Incidents/mois" value={INCIDENTS_DATA.length} color="#DC2626" />
          </div>
          <button onClick={function () {
            var ctx = "Effectifs: " + AGENTS_DATA.length + " (Police: " + AGENTS_DATA.filter(function (a) { return a.corps === "Police"; }).length + ", Gendarmerie: " + AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie"; }).length + ") | Incidents traites: " + INCIDENTS_DATA.length + " | Vehicules: " + VEHICULES_DATA.length + " (maintenance: " + VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length + ") | Commissariats: " + PERF_COMMISSARIATS.length + " avec activite moyenne " + Math.round(PERF_COMMISSARIATS.reduce(function (s, c) { return s + c.incidents; }, 0) / PERF_COMMISSARIATS.length) + " incidents/mois | Budget actuel: " + JSON.stringify(BUDGET_POSTES);
            callIA(besAI[1], "Genere une prevision automatique des besoins futurs (humains, logistiques, financiers) pour le DAF, basee sur l analyse de l activite des commissariats. Structure: 1) BESOINS HUMAINS (postes a ouvrir, par corps et specialite, avec justification par la charge d activite) 2) BESOINS LOGISTIQUES (vehicules, equipements, infrastructure) avec quantites 3) BESOINS FINANCIERS (budget supplementaire necessaire en FCFA par poste) 4) PRIORISATION sur 12 mois (trimestre par trimestre) 5) RISQUE SI NON SATISFAIT (impact operationnel concret). Donnees d activite: " + ctx);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🧭 Generer la prevision des besoins futurs</button>
          <AIBloc state={besAI[0]} />
        </div>
      ) : null}

      {tab === "rapport" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Budget total alloue</p><p className="text-white font-black text-2xl mt-1">{BUDGET_POSTES.reduce(function(s,p){return s+p.budget;},0)}M FCFA</p></div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Depenses reelles</p><p className="text-amber-400 font-black text-2xl mt-1">{BUDGET_POSTES.reduce(function(s,p){return s+p.reel;},0)}M FCFA</p></div>
          </div>
          <button onClick={function () {
            var ctxBudget = JSON.stringify(BUDGET_POSTES);
            var ctxOps = "Agents: " + AGENTS_DATA.length + " | Incidents traites: " + INCIDENTS_DATA.length + " | Gardes a vue: " + GARDES_VUE_DATA.length + " | Plaintes: " + PLAINTES_DATA.length + " | Patrouilles: " + PATROUILLES_DATA.length;
            callIA(rAI[1], "Redige un rapport financier officiel structure pour presentation a l Assemblee Nationale et au Senat de la Republique du Congo. Justifie les demandes budgetaires supplementaires. Structure institutionnelle: 1) SYNTHESE EXECUTIVE (chiffres cles pour le Parlement) 2) BILAN OPERATIONNEL (activites justifiant les depenses: incidents, arrests, patrouilles) 3) ANALYSE BUDGETAIRE (ecarts expliques poste par poste) 4) DEMANDE BUDGETAIRE 2027 (montants, justifications, priorites) 5) PREVISION DE RESULTATS (ex: baisse prevue des incidents avec l investissement demande, en %) 6) CONCLUSION ET RECOMMANDATIONS. Donnees budgetaires: " + ctxBudget + " | Donnees operationnelles: " + ctxOps);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📜 Generer le rapport financier pour le Senat et l'Assemblee</button>
          <AIBloc state={rAI[0]} />
        </div>
      ) : null}

      {tab === "optimisation" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Potentiel d economie identifie</p>
            <div className="grid grid-cols-2 gap-2">
              {BUDGET_POSTES.filter(function (p) { return p.reel > p.budget; }).map(function (p) {
                var surcoût = p.reel - p.budget;
                return (
                  <div key={p.poste} className="bg-red-950/30 border border-red-800 rounded-xl p-3">
                    <p className="text-red-300 text-xs font-bold">{p.poste}</p>
                    <p className="text-white font-black text-lg">+{surcoût}M FCFA</p>
                    <p className="text-slate-500 text-xs">de depassement</p>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={function () {
            var ctx = "Budget vs Reel: " + JSON.stringify(BUDGET_POSTES) + " | Vehicules en maintenance (cout): " + VEHICULES_DATA.filter(function(v){return v.statut==="maintenance";}).length + " | Agents en conge (non productifs): " + AGENTS_DATA.filter(function(a){return a.statut==="conge";}).length + " | Missions planifiees: " + EVENTS_DATA.filter(function(e){return e.type==="mission" && e.statut==="planifie";}).length;
            callIA(oAI[1], "Propose un plan d optimisation des couts pour la Police et Gendarmerie du Congo permettant d economiser 15 a 20% du budget sans reduire le niveau operationnel. Structure: 1) Top 5 postes d economie identifes avec montant FCFA et mesure concrete 2) Renegociations de contrats fournisseurs recommandees 3) Optimisations organisationnelles (mutualisation ressources Police/Gendarmerie) 4) Plan de deploiement des economies pour renforcer les unites prioritaires 5) KPIs financiers a surveiller mensuellement. Donnees: " + ctx);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚙️ Identifier les leviers d'optimisation des couts</button>
          <AIBloc state={oAI[0]} />
        </div>
      ) : null}
    </div>
  );
}

function ChatbotIntegre(props) {
  var sys = props.systeme;
  var ph = props.placeholder || "Posez votre question a l assistant IA...";
  var openState = useState(false);
  var open = openState[0]; var setOpen = openState[1];
  var msgsState = useState([{ role: "assistant", content: "Bonjour ! Je suis votre assistant IA SIPGN. Posez-moi n importe quelle question operationnelle." }]);
  var msgs = msgsState[0]; var setMsgs = msgsState[1];
  var inputState = useState("");
  var input = inputState[0]; var setInput = inputState[1];
  var loadingState = useState(false);
  var loading = loadingState[0]; var setLoading = loadingState[1];

  function envoyer() {
    if (input.trim() === "" || loading) { return; }
    var userMsg = { role: "user", content: input.trim() };
    var newMsgs = msgs.concat([userMsg]);
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);
    var apiMsgs = newMsgs.map(function (m) { return { role: m.role, content: m.content }; });
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 800, system: sys, messages: apiMsgs })
    }).then(function (r) { return r.json(); }).then(function (d) {
      var txt = d.content && d.content[0] ? d.content[0].text : "Erreur de reponse.";
      setMsgs(function (prev) { return prev.concat([{ role: "assistant", content: txt }]); });
      setLoading(false);
    }).catch(function () {
      setMsgs(function (prev) { return prev.concat([{ role: "assistant", content: "Erreur de connexion." }]); });
      setLoading(false);
    });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="bg-slate-900 rounded-2xl border border-blue-700 shadow-2xl flex flex-col overflow-hidden" style={{ width: 360, height: 440 }}>
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-900 to-slate-900 border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div><p className="text-white text-xs font-black">Assistant IA SIPGN</p><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span><span className="text-green-400 text-[10px]">En ligne — Chiffre</span></div></div>
            </div>
            <button onClick={function () { setOpen(false); }} className="text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-700">✕</button>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {msgs.map(function (m, i) {
              var mine = m.role === "user";
              return (
                <div key={i} className={"flex " + (mine ? "justify-end" : "justify-start")}>
                  <div className={"max-w-xs px-3 py-2 rounded-xl text-xs leading-relaxed " + (mine ? "bg-blue-700 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none")}>{m.content}</div>
                </div>
              );
            })}
            {loading ? (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                  <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full" style={{ animation: "spin 1s linear infinite" }}></div>
                  Analyse...
                </div>
              </div>
            ) : null}
          </div>
          <div className="p-3 border-t border-slate-700 flex gap-2 shrink-0">
            <input value={input} onChange={function (e) { setInput(e.target.value); }} onKeyDown={function (e) { if (e.key === "Enter") { envoyer(); } }} placeholder={ph} className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" />
            <button onClick={envoyer} className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold shrink-0">▶</button>
          </div>
        </div>
      ) : (
        <button onClick={function () { setOpen(true); }} title="Assistant IA SIPGN" className="bg-blue-700 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl text-2xl border-2 border-blue-500">🤖</button>
      )}
    </div>
  );
}

var PERF_COMMISSARIATS = [
  { nom: "Commissariat Central BZV", arrondissement: "1er", incidents: 5, resolus: 3, tauxResolution: 60, tpsMoyen: "22 min", agents: 14, respectProcedures: 78, economieCarburant: 65 },
  { nom: "Commissariat Bacongo", arrondissement: "2e", incidents: 3, resolus: 2, tauxResolution: 67, tpsMoyen: "18 min", agents: 8, respectProcedures: 85, economieCarburant: 72 },
  { nom: "Commissariat Poto-Poto", arrondissement: "3e", incidents: 4, resolus: 1, tauxResolution: 25, tpsMoyen: "35 min", agents: 6, respectProcedures: 58, economieCarburant: 48 },
  { nom: "Commissariat Moungali", arrondissement: "4e", incidents: 2, resolus: 2, tauxResolution: 100, tpsMoyen: "14 min", agents: 9, respectProcedures: 92, economieCarburant: 80 },
  { nom: "Commissariat Ouenze", arrondissement: "5e", incidents: 1, resolus: 0, tauxResolution: 0, tpsMoyen: "N/A", agents: 5, respectProcedures: 50, economieCarburant: 55 }
];

var BZV_MAP = [
  { nom: "Bacongo", x: 175, y: 235 },
  { nom: "Poto-Poto", x: 260, y: 195 },
  { nom: "Moungali", x: 315, y: 168 },
  { nom: "Ouenze", x: 360, y: 142 },
  { nom: "Talangai", x: 400, y: 115 },
  { nom: "Mfilou", x: 145, y: 200 },
  { nom: "Madibou", x: 88, y: 300 },
  { nom: "Makelelekele", x: 110, y: 265 }
];

function DataScientistCommissariat(props) {
  var compte = props.compte;
  var profilState = useState(null);
  var profil = profilState[0]; var setProfil = profilState[1];
  var tabState = useState("t1");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });
  var queryState = useState("");
  var query = queryState[0]; var setQuery = queryState[1];
  var verifiedState = useState(null);
  var verified = verifiedState[0]; var setVerified = verifiedState[1];
  var plainteInput = useState("");
  var urgInput = useState("");

  var SYS_MAP = {
    central: "Tu es l assistant IA du Commissaire Central de Brazzaville (Police Nationale du Congo). Tu analyses la criminalite sur tout le ressort territorial, coordonnes les arrondissements et proposes des plans de deploiement. Reponds en francais, structure et operationnel.",
    arrondissement: "Tu es l assistant IA du Commissaire d Arrondissement (Police Nationale du Congo). Tu pilotes les enquetes de secteur, identifies les series criminelles et optimises les patrouilles de zone. Reponds en francais, concis et actionnable.",
    quartier: "Tu es l assistant IA du Commissaire de Quartier (Police Nationale du Congo). Tu analyses les signaux faibles, surveilles les tensions locales et geres les gardes a vue de ton secteur. Reponds en francais, pratique et de proximite.",
    permanence: "Tu es l assistant IA de l Officier de Permanence (Police Nationale du Congo). Tu assistes a la qualification juridique des plaintes, verifies les avis de recherche et proposes les unites d intervention disponibles. Reponds en francais, rapide et precis."
  };

  function callIA(setter, prompt) {
    var sys = SYS_MAP[profil] || SYS_MAP.central;
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: sys, messages: [{ role: "user", content: prompt }] })
    }).then(function (r) { return r.json(); }).then(function (d) {
      setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." });
    }).catch(function () { setter({ loading: false, result: "Erreur de connexion." }); });
  }

  function verifierFugitif() {
    if (!query.trim()) { return; }
    var q = query.toLowerCase();
    var found = null;
    for (var i = 0; i < RECHERCHES_DATA.length; i++) {
      if (RECHERCHES_DATA[i].nom.toLowerCase().indexOf(q) >= 0 || RECHERCHES_DATA[i].reference.toLowerCase().indexOf(q) >= 0) { found = RECHERCHES_DATA[i]; break; }
    }
    setVerified(found ? { type: "alerte", data: found } : { type: "propre" });
  }

  if (!profil) {
    var PROFILS = [
      { id: "central", icon: "🏛️", titre: "Commissaire Central", desc: "Vision territoriale globale, coordination inter-arrondissements, heatmaps criminelles" },
      { id: "arrondissement", icon: "🗂️", titre: "Commissaire d Arrondissement", desc: "Analyse des series criminelles, optimisation patrouilles de secteur, suivi des enquetes" },
      { id: "quartier", icon: "🏘️", titre: "Commissaire de Quartier", desc: "Signaux faibles, tensions locales, suivi GAV et prevention de proximite" },
      { id: "permanence", icon: "📞", titre: "Officier de Permanence", desc: "Qualification juridique auto, alerte fugitif, aide a la decision d urgence" }
    ];
    return (
      <div className="space-y-4">
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-700 flex items-center justify-center text-2xl shrink-0">👮</div>
          <div>
            <h2 className="text-2xl font-black text-white">Data Scientist — Police Nationale</h2>
            <p className="text-slate-500 text-xs">Selectionnez votre profil pour acceder a votre espace IA personnalise</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PROFILS.map(function (p) {
            return (
              <button key={p.id} onClick={function () { setProfil(p.id); setTab("t1"); ai1[1]({ loading: false, result: null }); ai2[1]({ loading: false, result: null }); ai3[1]({ loading: false, result: null }); }} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 text-left hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">{p.icon}</div>
                <p className="text-white font-black text-sm">{p.titre}</p>
                <p className="text-slate-500 text-xs mt-1">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  var sysActuel = SYS_MAP[profil];
  var phMap = {
    central: "Ex: Quelles zones prioritaires pour la patrouille de nuit ?",
    arrondissement: "Ex: Y a-t-il une serie de cambriolages en cours ?",
    quartier: "Ex: Quels sont les signaux de tension dans mon secteur ?",
    permanence: "Ex: Quels actes pour une plainte de violence conjugale ?"
  };

  var incParZone = {};
  INCIDENTS_DATA.forEach(function (inc) {
    BZV_MAP.forEach(function (z) {
      if (inc.lieu.toLowerCase().indexOf(z.nom.toLowerCase().slice(0, 5)) >= 0) {
        incParZone[z.nom] = (incParZone[z.nom] || 0) + 1;
      }
    });
    if (inc.lieu.toLowerCase().indexOf("bacongo") >= 0) { incParZone["Bacongo"] = (incParZone["Bacongo"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("poto") >= 0) { incParZone["Poto-Poto"] = (incParZone["Poto-Poto"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("moungali") >= 0) { incParZone["Moungali"] = (incParZone["Moungali"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("port") >= 0) { incParZone["Poto-Poto"] = (incParZone["Poto-Poto"] || 0) + 1; }
  });

  var PROFIL_LABELS = { central: "Commissaire Central", arrondissement: "Commissaire d Arrondissement", quartier: "Commissaire de Quartier", permanence: "Officier de Permanence" };
  var PROFIL_ICONS = { central: "🏛️", arrondissement: "🗂️", quartier: "🏘️", permanence: "📞" };

  var TABS_MAP = {
    central: [["t1", "Heatmap Criminalite", "🗺️"], ["t2", "Performance Services", "📊"], ["t3", "Previsionnel Effectifs", "🕐"]],
    arrondissement: [["t1", "Modus Operandi", "🔍"], ["t2", "Optimisation Patrouilles", "🚓"], ["t3", "Suivi des Plaintes", "📋"]],
    quartier: [["t1", "Tensions Locales", "⚡"], ["t2", "Zones a Risque", "📍"], ["t3", "GAV de Secteur", "🔒"]],
    permanence: [["t1", "Assistance Plainte", "📝"], ["t2", "Alerte Fugitif", "🚨"], ["t3", "Aide a l Urgence", "⚡"]]
  };
  var tabs = TABS_MAP[profil] || [];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-700 flex items-center justify-center text-2xl shrink-0">{PROFIL_ICONS[profil]}</div>
          <div>
            <h2 className="text-2xl font-black text-white">Data Scientist — {PROFIL_LABELS[profil]}</h2>
            <p className="text-slate-500 text-xs">Police Nationale du Congo — Espace IA personnalise</p>
          </div>
        </div>
        <button onClick={function () { setProfil(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-3 py-1.5 rounded-lg">← Changer de profil</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(function (t) {
          var isA = tab === t[0];
          return <button key={t[0]} onClick={function () { setTab(t[0]); ai1[1]({ loading: false, result: null }); ai2[1]({ loading: false, result: null }); ai3[1]({ loading: false, result: null }); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-blue-700 text-white border-blue-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>;
        })}
      </div>

      {profil === "central" ? (
        <div className="space-y-4">
          {tab === "t1" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-white font-bold text-sm">Heatmap Criminalite — Ressort Territorial BZV</p>
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Zone critique</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>Zone a surveiller</span>
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 340 }}>
                  <svg width="100%" height="100%" viewBox="0 0 520 340">
                    <rect width="520" height="340" fill="#0B1120" />
                    <path d="M 0 310 Q 260 295 520 305" stroke="#1E3A5F" strokeWidth="18" fill="none" opacity="0.5" />
                    <text x="190" y="328" fill="#1E4080" fontSize="9" opacity="0.8">Fleuve Congo</text>
                    {BZV_MAP.map(function (z) {
                      var nb = incParZone[z.nom] || 0;
                      var r = 24 + nb * 12;
                      var col = nb >= 2 ? "#DC2626" : nb >= 1 ? "#F59E0B" : "#1E293B";
                      return (
                        <g key={z.nom}>
                          <circle cx={z.x} cy={z.y} r={r} fill={col} opacity={nb > 0 ? 0.2 : 0.06} />
                          <circle cx={z.x} cy={z.y} r={16} fill={col} opacity={nb > 0 ? 0.8 : 0.15} />
                          {nb > 0 ? <text x={z.x} y={z.y + 4} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{nb}</text> : null}
                          <text x={z.x} y={z.y - 22} textAnchor="middle" fill="#94A3B8" fontSize={9}>{z.nom}</text>
                        </g>
                      );
                    })}
                    {PATROUILLES_DATA.filter(function (p) { return p.corps === "Police"; }).map(function (p, i) {
                      var px = [255, 190, 130, 305, 350][i] || 250;
                      var py = [180, 225, 265, 160, 135][i] || 200;
                      return (
                        <g key={p.id}>
                          <circle cx={px} cy={py} r={11} fill="#003F87" stroke={p.statut === "intervention" ? "#DC2626" : "#fff"} strokeWidth={p.statut === "intervention" ? 2 : 1} opacity={0.9} />
                          <text x={px} y={py + 4} textAnchor="middle" fill="#fff" fontSize={8} fontWeight="bold">{p.designation.slice(0, 3)}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
              <button onClick={function () {
                var ctx = "Zones et incidents: " + JSON.stringify(Object.entries(incParZone).map(function(e){return{zone:e[0],incidents:e[1]};})) + " | Patrouilles Police: " + JSON.stringify(PATROUILLES_DATA.filter(function(p){return p.corps==="Police";}).map(function(p){return{designation:p.designation,zone:p.zone,statut:p.statut};}));
                callIA(ai1[1], "Analyse la heatmap criminelle du ressort du Commissariat Central de Brazzaville. Sur base des donnees: 1) Identifie les 3 zones les plus criminogenes avec justification 2) Detecte les zones sous-couvertes par les patrouilles actuelles 3) Propose un plan de redeploiement pour les 24 prochaines heures 4) Recommande les horaires de renforcement par zone. Donnees: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🗺️ Analyser la heatmap et proposer le redeploiement</button>
              <AIBloc state={ai1[0]} />
            </div>
          ) : null}
          {tab === "t2" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">Performance par arrondissement</p>
                <div className="overflow-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b border-slate-700">{["Commissariat", "Incidents", "Resolus", "Taux", "Tps Interv.", "Agents"].map(function(h){return <th key={h} className="text-slate-500 font-bold uppercase text-left pb-2 pr-3">{h}</th>;})}</tr></thead>
                    <tbody>
                      {PERF_COMMISSARIATS.map(function (c) {
                        var col = c.tauxResolution >= 70 ? "#22C55E" : c.tauxResolution >= 40 ? "#F59E0B" : "#DC2626";
                        return (
                          <tr key={c.nom} className="border-b border-slate-800">
                            <td className="text-slate-300 font-semibold py-2 pr-3">{c.nom}</td>
                            <td className="text-slate-400 py-2 pr-3">{c.incidents}</td>
                            <td className="text-slate-400 py-2 pr-3">{c.resolus}</td>
                            <td className="py-2 pr-3"><span style={{ color: col }} className="font-black">{c.tauxResolution}%</span></td>
                            <td className="text-slate-400 py-2 pr-3">{c.tpsMoyen}</td>
                            <td className="text-slate-400 py-2">{c.agents}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <p className="text-white font-bold text-sm mb-1">Jauge d efficacite des unites</p>
                <p className="text-slate-500 text-xs mb-3">Comparaison objective des arrondissements sur 4 axes de performance</p>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { axe: "Temps de reponse", ...PERF_COMMISSARIATS.reduce(function (acc, c, i) { acc["u" + i] = c.tpsMoyen === "N/A" ? 30 : Math.max(15, 100 - parseInt(c.tpsMoyen) * 2); return acc; }, {}) },
                      { axe: "Taux de resolution", ...PERF_COMMISSARIATS.reduce(function (acc, c, i) { acc["u" + i] = c.tauxResolution; return acc; }, {}) },
                      { axe: "Respect procedures", ...PERF_COMMISSARIATS.reduce(function (acc, c, i) { acc["u" + i] = c.respectProcedures; return acc; }, {}) },
                      { axe: "Economie carburant", ...PERF_COMMISSARIATS.reduce(function (acc, c, i) { acc["u" + i] = c.economieCarburant; return acc; }, {}) }
                    ]}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="axe" tick={{ fill: "#94A3B8", fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 9 }} />
                      {PERF_COMMISSARIATS.map(function (c, i) {
                        var cols = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"];
                        return <Radar key={i} name={c.nom.replace("Commissariat ", "")} dataKey={"u" + i} stroke={cols[i % cols.length]} fill={cols[i % cols.length]} fillOpacity={0.12} strokeWidth={2} />;
                      })}
                      <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
                      <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <button onClick={function () {
                callIA(ai2[1], "Analyse les indicateurs de performance des commissariats d arrondissement de Brazzaville. Donnees: " + JSON.stringify(PERF_COMMISSARIATS) + ". Pour chaque commissariat: 1) Diagnostic de performance (excellent/acceptable/insuffisant) 2) Causes probables des faibles taux de resolution 3) Actions correctives recommandees au Commissaire Central 4) Commissariat necessitant un soutien prioritaire 5) Bonnes pratiques a partager entre arrondissements.");
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📊 Analyser la performance inter-arrondissements</button>
              <AIBloc state={ai2[0]} />
            </div>
          ) : null}
          {tab === "t3" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard icon="👮" label="Agents actifs Police" value={AGENTS_DATA.filter(function(a){return a.corps==="Police"&&a.statut==="actif";}).length} color="#003F87" />
                <StatCard icon="🚨" label="Incidents actifs" value={INCIDENTS_DATA.filter(function(i){return i.statut==="en_cours";}).length} color="#DC2626" />
              </div>
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <p className="text-white font-bold text-sm mb-1">Pics d activite — Appels par tranche de 2h</p>
                <p className="text-slate-500 text-xs mb-3">Periodes critiques pour organiser les roulements des patrouilles</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { tranche: "00-02h", appels: 4 }, { tranche: "02-04h", appels: 2 }, { tranche: "04-06h", appels: 3 },
                      { tranche: "06-08h", appels: 6 }, { tranche: "08-10h", appels: 9 }, { tranche: "10-12h", appels: 7 },
                      { tranche: "12-14h", appels: 8 }, { tranche: "14-16h", appels: 7 }, { tranche: "16-18h", appels: 10 },
                      { tranche: "18-20h", appels: 13 }, { tranche: "20-22h", appels: 11 }, { tranche: "22-00h", appels: 6 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                      <XAxis dataKey="tranche" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} interval={1} />
                      <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + " appels"]; }} />
                      <Bar dataKey="appels" radius={[4, 4, 0, 0]}>
                        {[4, 2, 3, 6, 9, 7, 8, 7, 10, 13, 11, 6].map(function (v, i) { return <Cell key={i} fill={v >= 10 ? "#DC2626" : v >= 7 ? "#F59E0B" : "#3B82F6"} />; })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <button onClick={function () {
                var ctx = "Incidents par type et heure simule: vols (matin 08h-12h: 2, soir 20h-00h: 4), trafic (nuit 00h-06h: 3), violences (weekend: +60%) | Patrouilles disponibles: " + PATROUILLES_DATA.filter(function(p){return p.corps==="Police";}).length + " | Agents: " + AGENTS_DATA.filter(function(a){return a.corps==="Police"&&a.statut==="actif";}).length;
                callIA(ai3[1], "Genere un previsionnel de deploiement des effectifs pour les 24-48 prochaines heures pour le ressort du Commissariat Central de Brazzaville. Structure: 1) Analyse des pics de criminalite par tranche horaire (00h-06h, 06h-12h, 12h-18h, 18h-24h) 2) Effectifs recommandes par tranche et par zone 3) Patrouilles a renforcer ou a creer 4) Zones a surveiller en priorite ce weekend 5) Alertes specifiques (evenements, marches, lieux de rassemblement). Contexte: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🕐 Generer le previsionnel effectifs 24-48h</button>
              <AIBloc state={ai3[0]} />
            </div>
          ) : null}
        </div>
      ) : null}

      {profil === "arrondissement" ? (
        <div className="space-y-4">
          {tab === "t1" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">Incidents par type — Analyse des series</p>
                <div className="space-y-1.5">
                  {Object.entries(INCIDENTS_DATA.reduce(function(acc, inc){acc[inc.type]=(acc[inc.type]||0)+1;return acc;}, {})).sort(function(a,b){return b[1]-a[1];}).map(function(e){
                    var pct = Math.round(e[1]/INCIDENTS_DATA.length*100);
                    return (
                      <div key={e[0]} className="flex items-center gap-3">
                        <div className="w-36 shrink-0 text-slate-400 text-xs truncate">{e[0]}</div>
                        <div className="flex-1 bg-slate-700 rounded-full h-2"><div className="h-2 rounded-full bg-blue-500" style={{ width: pct + "%" }}></div></div>
                        <span className="text-slate-400 text-xs w-6 text-right">{e[1]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={function () {
                var ctx = JSON.stringify(INCIDENTS_DATA.map(function(i){return{type:i.type,lieu:i.lieu,gravite:i.gravite,description:i.description};}));
                callIA(ai1[1], "Analyse les modus operandi des incidents et identifie des series criminelles. Pour le Commissaire d Arrondissement: 1) Identifie les groupes d incidents avec meme mode operatoire (au moins 2 incidents similaires) 2) Pour chaque serie detectee: description du MO, zones concernees, profil probable de l auteur, pistes d enquete 3) Recommande les actes d enquete prioritaires (auditions, cameras, perquisitions) 4) Alerte si une serie semble s amplifier. Incidents: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔍 Detecter les series criminelles et correlations MO</button>
              <AIBloc state={ai1[0]} />
            </div>
          ) : null}
          {tab === "t2" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">Patrouilles de secteur</p>
                <div className="space-y-2">
                  {PATROUILLES_DATA.filter(function(p){return p.corps==="Police";}).map(function(p){
                    var col = p.statut === "intervention" ? "#DC2626" : p.statut === "terrain" ? "#22C55E" : "#64748B";
                    return (
                      <div key={p.id} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold text-sm">{p.designation} — {p.zone}</p>
                          <p className="text-slate-500 text-xs">{p.effectif} agents — {p.vehicule} — Chef: {p.chef}</p>
                        </div>
                        <Chip color={col}>{STATUT_PATROUILLE_LABEL[p.statut]}</Chip>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={function () {
                var ctx = "Patrouilles: " + JSON.stringify(PATROUILLES_DATA.filter(function(p){return p.corps==="Police";}).map(function(p){return{designation:p.designation,zone:p.zone,statut:p.statut,effectif:p.effectif};})) + " | Zones criminogenes: " + JSON.stringify(incParZone);
                callIA(ai2[1], "Propose des itineraires de patrouille optimises pour le secteur de l arrondissement. Sur base des zones criminogenes et des patrouilles disponibles: 1) Itineraires recommandes par patrouille (ordre des zones a couvrir par priorite) 2) Horaires de passage aux points chauds (selon les pics) 3) Points de stationnement visibles recommandes (effet dissuasion) 4) Coordination entre patrouilles pour eviter les doublons et les angles morts 5) Zone en sous-couverture a corriger en urgence. Donnees: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🚓 Optimiser les itineraires de patrouille de secteur</button>
              <AIBloc state={ai2[0]} />
            </div>
          ) : null}
          {tab === "t3" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
                <p className="text-white font-bold text-sm mb-2">Plaintes — Suivi de resolution</p>
                {PLAINTES_DATA.map(function (p) {
                  var stagnante = p.statut === "enregistree";
                  return (
                    <div key={p.id} className={"border rounded-xl p-3 " + (stagnante ? "border-amber-700 bg-amber-950/20" : "border-slate-700")}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2"><p className="text-white font-bold text-sm">{p.type}</p>{stagnante ? <Chip color="#F59E0B">Stagnante</Chip> : null}</div>
                          <p className="text-slate-400 text-xs mt-0.5">{p.description}</p>
                          <p className="text-slate-600 text-xs font-mono">{p.reference} — {p.plaignant}</p>
                        </div>
                        <Chip color={STATUT_PLAINTE_COLOR[p.statut]}>{STATUT_PLAINTE_LABEL[p.statut]}</Chip>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={function () {
                var ctx = JSON.stringify(PLAINTES_DATA.map(function(p){return{type:p.type,description:p.description,statut:p.statut,reference:p.reference};}));
                callIA(ai3[1], "Analyse le suivi des plaintes pour le Commissaire d Arrondissement. Pour chaque plainte stagnante (statut enregistree): 1) Identifie les actes d enquete manquants 2) Propose les prochaines etapes concretes (auditions, confrontations, perquisitions, commission rogatoire) 3) Evalue le risque de prescription ou de vice de procedure 4) Propose une requalification si necessaire. Conclus avec les 3 dossiers les plus urgents a traiter cette semaine. Donnees: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📋 Analyser les plaintes stagnantes et proposer les actes</button>
              <AIBloc state={ai3[0]} />
            </div>
          ) : null}
        </div>
      ) : null}

      {profil === "quartier" ? (
        <div className="space-y-4">
          {tab === "t1" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">Incidents par gravite — Signaux faibles</p>
                <div className="space-y-2">
                  {INCIDENTS_DATA.filter(function(i){return i.gravite==="moyen"||i.gravite==="faible";}).map(function(i){
                    return (
                      <div key={i.id} className="border border-slate-700 rounded-xl p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div><p className="text-white font-semibold text-sm">{i.type}</p><p className="text-slate-500 text-xs">{i.lieu}</p></div>
                          <Chip color={GRAVITE_COLOR[i.gravite]}>{i.gravite}</Chip>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={function () {
                var ctx = "Incidents recents (tous niveaux): " + JSON.stringify(INCIDENTS_DATA.map(function(i){return{type:i.type,lieu:i.lieu,gravite:i.gravite,statut:i.statut};})) + " | Plaintes: " + JSON.stringify(PLAINTES_DATA.map(function(p){return{type:p.type,description:p.description};}));
                callIA(ai1[1], "En tant qu assistant du Commissaire de Quartier, analyse les signaux faibles dans les donnees. Identifie: 1) Les incidents mineurs qui se repetent au meme endroit (risque d escalade) 2) Les signaux annonciateurs de troubles a l ordre public (tensions entre groupes, bagarres repetees) 3) Les zones ou la frequence d incidents augmente meme si la gravite est faible 4) Recommandations de prevention (mediation, renforcement presence, partenariat acteurs locaux) 5) Alerte specifique sur tout signal pouvant mener a un incident majeur dans les 72h. Donnees: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚡ Detecter les signaux faibles et risques d'escalade</button>
              <AIBloc state={ai1[0]} />
            </div>
          ) : null}
          {tab === "t2" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <p className="text-white font-bold text-sm mb-3">Profilage des zones a risque</p>
                <div className="space-y-2">
                  {BZV_MAP.map(function (z) {
                    var nb = incParZone[z.nom] || 0;
                    var niv = nb >= 2 ? "Critique" : nb >= 1 ? "Surveille" : "Calme";
                    var col = nb >= 2 ? "#DC2626" : nb >= 1 ? "#F59E0B" : "#22C55E";
                    return (
                      <div key={z.nom} className="flex items-center justify-between border border-slate-700 rounded-xl p-3">
                        <div><p className="text-white font-semibold text-sm">{z.nom}</p><p className="text-slate-500 text-xs">{nb} incident(s) signale(s)</p></div>
                        <Chip color={col}>{niv}</Chip>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={function () {
                var ctx = "Incidents par zone: " + JSON.stringify(incParZone) + " | Types: " + Array.from(new Set(INCIDENTS_DATA.map(function(i){return i.type;}))).join(", ");
                callIA(ai2[1], "Genere un profilage complet des zones a risque pour le Commissaire de Quartier de Brazzaville. Pour chaque zone identifiee comme sensible: 1) Profil criminologique (types de delits predominants, horaires, profil des auteurs presumes) 2) Points nevralgiques (marches, carrefours, bars, lieux sombres) a surveiller en priorite 3) Recommandations de prevention specifiques a chaque zone 4) Frequence de passage police recommandee 5) Partenaires locaux a mobiliser (chefs de quartier, commercants, associations). Donnees: " + ctx);
              }} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📍 Generer le profilage complet des zones sensibles</button>
              <AIBloc state={ai2[0]} />
            </div>
          ) : null}
          {tab === "t3" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <StatCard icon="🔒" label="GAV actives" value={GARDES_VUE_DATA.filter(function(g){return g.statut==="actif";}).length} color="#F59E0B" />
                <StatCard icon="⚠️" label="Delai critique" value={GARDES_VUE_DATA.filter(function(g){return g.heuresRestantes<=6&&g.statut==="actif";}).length} color="#DC2626" />
                <StatCard icon="🔄" label="Prolongees" value={GARDES_VUE_DATA.filter(function(g){return g.statut==="prolonge";}).length} color="#8B5CF6" />
              </div>
              <div className="space-y-2">
                {GARDES_VUE_DATA.map(function (g) {
                  var alerte = g.heuresRestantes <= 12 && g.statut === "actif";
                  return (
                    <div key={g.id} className={"bg-slate-800/90 rounded-2xl border p-4 " + (alerte ? "border-red-700" : "border-slate-700")}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-white font-bold">{g.nom}</p>
                          <p className="text-slate-400 text-xs">Motif: {g.motif}</p>
                          <p className="text-slate-500 text-xs">{g.id} — {g.unite}</p>
                          {alerte ? <p className="text-red-400 text-xs font-bold mt-1">⚠️ Action requise dans {g.heuresRestantes}h — Risque de vice de procedure</p> : null}
                        </div>
                        <div className="shrink-0 w-44"><GavTimer heures={g.heuresRestantes} /></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {profil === "permanence" ? (
        <div className="space-y-4">
          {tab === "t1" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <p className="text-white font-bold text-sm mb-1">Assistance a la qualification de plainte</p>
                <p className="text-slate-500 text-xs mb-3">Decrivez les faits tels qu ils vous ont ete rapportes. L IA propose la qualification juridique et les premiers actes.</p>
                <textarea value={plainteInput[0]} onChange={function(e){plainteInput[1](e.target.value);}} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none mb-2" placeholder="Ex: Un homme se presente et declare qu il a ete agresse hier soir rue X par deux individus qui lui ont derobe son telephone et son portefeuille sous la menace d un couteau..." />
                <button onClick={function() {
                  if (!plainteInput[0].trim()) { return; }
                  callIA(ai1[1], "Traitement d une plainte par l Officier de Permanence. Faits declares: " + plainteInput[0] + ". Fournis: 1) QUALIFICATION JURIDIQUE (infraction exacte, articles du code penal applicables) 2) ELEMENTS CONSTITUTIFS a verifier et a faire declarer par la victime 3) PREMIERS ACTES OBLIGATOIRES dans les 24h (audition, constats, investigations) 4) ELEMENTS DE PREUVE a recueillir immediatement (cameras, temoins, traces) 5) ORIENTATION DU DOSSIER (classement, enquete preliminaire, flagrant delit, commission rogatoire) 6) FORMULAIRES et PV a etablir. Sois precis et operationnel.");
                }} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">📝 Qualifier juridiquement et proposer les actes</button>
                <AIBloc state={ai1[0]} />
              </div>
            </div>
          ) : null}
          {tab === "t2" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <p className="text-white font-bold text-sm mb-1">Verification — Avis de recherche</p>
                <p className="text-slate-500 text-xs mb-3">Saisissez le nom de l individu controle pour verification dans les fichiers.</p>
                <div className="flex gap-2 mb-3">
                  <input value={query} onChange={function(e){setQuery(e.target.value);setVerified(null);}} onKeyDown={function(e){if(e.key==="Enter"){verifierFugitif();}}} placeholder="Nom complet ou numero de document..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
                  <button onClick={verifierFugitif} className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Search size={14} />Verifier</button>
                </div>
                {verified ? (
                  <div className={"rounded-xl p-4 border " + (verified.type === "alerte" ? "bg-red-950 border-red-700" : "bg-green-950 border-green-700")}>
                    {verified.type === "propre" ? (
                      <div className="flex items-center gap-3"><ShieldCheck size={24} className="text-green-400" /><div><p className="text-green-300 font-black">Individu non fiche</p><p className="text-green-700 text-xs">Aucun avis de recherche actif.</p></div></div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-3"><Siren size={20} className="text-red-400" /><p className="text-red-300 font-black">ALERTE — INDIVIDU RECHERCHE</p>{verified.data.dangereux?<Chip color="#DC2626">DANGEREUX</Chip>:null}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div><p className="text-slate-500 uppercase">Nom</p><p className="text-white font-bold">{verified.data.nom}</p></div>
                          <div><p className="text-slate-500 uppercase">Motif</p><p className="text-white font-bold">{verified.data.motif}</p></div>
                          <div><p className="text-slate-500 uppercase">Reference</p><p className="text-white font-bold font-mono">{verified.data.reference}</p></div>
                          <div><p className="text-slate-500 uppercase">Nationalite</p><p className="text-white font-bold">{verified.data.nationalite}</p></div>
                        </div>
                        <button onClick={function(){callIA(ai2[1],"Un individu recherche vient d etre interpelle. Profil: " + JSON.stringify(verified.data) + ". Indique immediatement a l Officier de Permanence: 1) Procedure d arrestation a suivre (droits lus? temoin?) 2) Unites a alerter immediatement 3) Actes de procedure obligatoires dans les 2 premieres heures 4) Precautions de securite si individu dangereux 5) Service a contacter en premier (DCPJ, Parquet, INTERPOL).");}} className="mt-3 bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Obtenir la procedure d arrestation</button>
                        <AIBloc state={ai2[0]} />
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          {tab === "t3" ? (
            <div className="space-y-4">
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
                <p className="text-white font-bold text-sm mb-1">Aide a la decision d urgence</p>
                <p className="text-slate-500 text-xs mb-3">Decrivez l appel ou la situation d urgence recue. L IA propose les unites disponibles et la procedure.</p>
                <textarea value={urgInput[0]} onChange={function(e){urgInput[1](e.target.value);}} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none mb-2" placeholder="Ex: Appel signalant une rixe avec arme blanche au marche Total, Poto-Poto, 3 individus impliques..." />
                <button onClick={function() {
                  if (!urgInput[0].trim()) { return; }
                  var ctx = "Situation: " + urgInput[0] + " | Patrouilles disponibles: " + JSON.stringify(PATROUILLES_DATA.filter(function(p){return p.statut!=="intervention";}).map(function(p){return{designation:p.designation,zone:p.zone,corps:p.corps,effectif:p.effectif,vehicule:p.vehicule};})) + " | GAV en cours: " + GARDES_VUE_DATA.filter(function(g){return g.statut==="actif";}).length;
                  callIA(ai3[1], "Aide a la decision d urgence pour l Officier de Permanence. " + ctx + ". Reponds IMMEDIATEMENT avec: 1) QUALIFICATION DE L URGENCE (niveau 1/2/3) et type d intervention 2) UNITES A DEPECHER en priorite (par ordre de proximite et disponibilite) 3) EFFECTIF MINIMUM recommande pour cette situation 4) PROCEDURE D INTERVENTION (precautions, coordination, preservation traces) 5) SERVICES A ALERTER en parallele (SAMU, Pompiers, Parquet, Commandement) 6) MESSAGE RADIO type a transmettre aux unites.");
                }} className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Siren size={14} />Declencher l analyse d urgence</button>
                <AIBloc state={ai3[0]} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <ChatbotIntegre systeme={sysActuel} placeholder={phMap[profil]} />
    </div>
  );
}


export { Ecusson, StatCard, Chip, CorpsBadge, LoginScreen, MainCourante, GavTimer, GardesVue, Patrouilles, Vehicules, Plaintes, gradesDe, gradeLabel, Carrieres, CalendrierOperationnel, estDestinataire, Notes, Messagerie, ControleVoyageurs, DashboardFrontieres, DataScientistFrontieres, DataScientist, AlertBanniere, AIBloc, DataScientistDL, DataScientistPersonnel, DataScientistDAF, ChatbotIntegre, DataScientistCommissariat, COMPTES, LOGO_POLICE_B64, INCIDENTS_DATA, GRAVITE_COLOR, STATUT_LABEL, GARDES_VUE_DATA, PATROUILLES_DATA, STATUT_PATROUILLE_LABEL, VEHICULES_DATA, STATUT_VEHICULE_LABEL, PLAINTES_DATA, STATUT_PLAINTE_LABEL, STATUT_PLAINTE_COLOR, GRADES_POLICE, GRADES_GENDARMERIE, AGENTS_DATA, AGENT_PROFILS_MAP, STATUT_CARRIERE_LABEL, STATUT_CARRIERE_COLOR, FORMATIONS_OBLIGATOIRES_DATA, SESSIONS_FORMATION_DATA, ASPIRATIONS_DATA, DISPONIBILITE_DATA, ABSENTEISME_DATA, EVOLUTION_EFFECTIFS_DATA, TYPE_LABEL, TYPE_COLOR, STATUT_EVT_LABEL, STATUT_EVT_COLOR, EVENTS_DATA, PRIORITE_NOTE, NOTES_DATA, MESSAGES_DATA, RECHERCHES_DATA, STATUT_RCH_COLOR, STATUT_RCH_LABEL, VOYAGEURS_RECENTS, SAISIES_DATA, STATUT_SAISIE_COLOR, STATUT_SAISIE_LABEL, POINTS_FRONTALIERS_DATA, STATUT_EQUIPEMENT_COLOR, STATUT_EQUIPEMENT_LABEL, TYPE_POSTE_LABEL, FLUX_HORAIRE_DATA, INTERDICTIONS_DATA, STATUT_INTERDICTION_COLOR, STATUT_INTERDICTION_LABEL, REFOULEMENTS_DATA, BUDGET_POSTES, PERF_COMMISSARIATS, BZV_MAP };
