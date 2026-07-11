import { createClient } from "@supabase/supabase-js"
var supabase=createClient("https://lvstphnennbiwwubaepw.supabase.co","sb_publishable_IVEjS49BS6I9F2czR_UnvQ_f_fuykvY",{global:{headers:{"apikey":"sb_publishable_IVEjS49BS6I9F2czR_UnvQ_f_fuykvY","Authorization":"Bearer sb_publishable_IVEjS49BS6I9F2czR_UnvQ_f_fuykvY"}}})
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, CalendarDays, FileWarning, Lock, Car, Truck, FileText, Users, Search, Bell, MessageSquare, LogOut, Siren, ShieldCheck, Clock, Fingerprint, ShieldAlert, Building2, Package, ClipboardCheck, Shuffle, CalendarCheck, GraduationCap, BookOpen, Video, VideoOff, Mic, MicOff, Phone, PhoneOff, PhoneIncoming, MonitorPlay, Radio, Menu, X } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, Treemap } from "recharts";

var COMPTES = [
  { id: "CFP-001", identifiant: "cfp-congo@policenationale.cg", numero: "035 671 001", motdepasse: "admin2026", role: "direction", nom: "Commandement des Forces de Police (CFP)", service: "Commandement des Forces de Police", corps: "Police", couleur: "#8B5CF6" },
  { id: "CGN-001", identifiant: "cgn-congo@gendarmerienationale.cg", numero: "035 671 002", motdepasse: "cgn2026", role: "direction", nom: "Commandement de la Gendarmerie Nationale (CGN)", service: "Commandement de la Gendarmerie Nationale", corps: "Gendarmerie", couleur: "#A21CAF" },
  { id: "DRG-001", identifiant: "drg-congo@policenationale.cg", numero: "035 671 003", motdepasse: "renseignement2026", role: "renseignement", nom: "Direction des Renseignements Generaux (DRG)", service: "Direction des Renseignements Generaux", corps: "Police", couleur: "#581C87" },
  { id: "DGRH-001", identifiant: "dgrh-congo@sipgn.cg", numero: "035 671 004", motdepasse: "rh2026", role: "rh", nom: "Direction Generale des Ressources Humaines", service: "DGRH", corps: "Tous", couleur: "#BE185D" },
  { id: "DL-001", identifiant: "dl-congo@sipgn.cg", numero: "035 671 005", motdepasse: "logistique2026", role: "dl", nom: "Direction de la Logistique", service: "Direction de la Logistique", corps: "Tous", couleur: "#0EA5E9" },
  { id: "DAF-001", identifiant: "daf-congo@sipgn.cg", numero: "035 671 006", motdepasse: "finances2026", role: "daf", nom: "Direction Administration et Finances", service: "DAF", corps: "Tous", couleur: "#16A34A" },
  { id: "DOP-001", identifiant: "personnel-congo@sipgn.cg", numero: "035 671 007", motdepasse: "personnel2026", role: "personnel", nom: "Direction Organisation et Personnel", service: "Direction du Personnel", corps: "Tous", couleur: "#D97706" },
  { id: "DOPS-001", identifiant: "operations-congo@sipgn.cg", numero: "035 671 008", motdepasse: "operations2026", role: "operations", nom: "Direction des Operations", service: "Direction des Operations", corps: "Tous", couleur: "#2563EB" },
  { id: "INTERPOL-001", identifiant: "interpol-congo@policenationale.cg", numero: "035 671 009", motdepasse: "interpol2026", role: "interpol", nom: "Bureau Central National INTERPOL", service: "INTERPOL Brazzaville", corps: "Police", couleur: "#EA580C" },
  { id: "PNAV-001", identifiant: "policenavale-congo@policenationale.cg", numero: "035 671 010", motdepasse: "navale2026", role: "navale", nom: "Police Navale", service: "Police Navale", corps: "Police", couleur: "#0369A1" },
  { id: "GNAV-001", identifiant: "gendarmerienavale-congo@gendarmerienationale.cg", numero: "035 671 011", motdepasse: "navale2026", role: "navale", nom: "Gendarmerie Navale", service: "Gendarmerie Navale", corps: "Gendarmerie", couleur: "#0E7490" },
  { id: "CC-001", identifiant: "commissariatcentral-congo@policenationale.cg", numero: "035 671 012", motdepasse: "police2026", role: "commissariat", nom: "Commissariat Central BZV", service: "Commissariat Central BZV", corps: "Police", couleur: "#003F87" },
  { id: "BCA-001", identifiant: "bca-congo@policenationale.cg", numero: "035 671 013", motdepasse: "accident2026", role: "accidents", nom: "Bureau Controle Accidents", service: "Bureau Controle Accidents BZV", corps: "Police", couleur: "#F59E0B" },
  { id: "PJ-001", identifiant: "dcpj-congo@policenationale.cg", numero: "035 671 014", motdepasse: "judiciaire2026", role: "judiciaire", nom: "DCPJ Brazzaville", service: "DCPJ Brazzaville", corps: "Police", couleur: "#DC2626" },
  { id: "GN-001", identifiant: "gendarmeriepnr-congo@gendarmerienationale.cg", numero: "035 671 015", motdepasse: "gend2026", role: "gendarmerie", nom: "Brigade Territoriale PNR", service: "Brigade Territoriale Pointe-Noire", corps: "Gendarmerie", couleur: "#1B6B3A" },
  { id: "CTL-001", identifiant: "frontieres-congo@policenationale.cg", numero: "035 671 016", motdepasse: "frontiere2026", role: "controle", nom: "Controle Voyageurs et Frontieres", service: "Poste Frontalier Aeroport", corps: "Police", couleur: "#0EA5E9" },
  { id: "OPJ-001", identifiant: "opj.malanda@policenationale.cg", numero: "035 671 017", motdepasse: "enquete2026", role: "opj", nom: "Inspecteur Principal MALANDA Christian", service: "DCPJ Brazzaville", corps: "Police", couleur: "#9F1239", nomOfficier: "MALANDA Christian", matricule: "PNB-10234" }
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
              <input value={identifiant} onChange={function (e) { setIdentifiant(e.target.value); }} placeholder="ex: commissariatcentral-congo@policenationale.cg" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
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
  { id: "INC-001", type: "Vol a main armee", lieu: "Marche Total, Brazzaville", gravite: "critique", statut: "en_cours", corps: "Police", auteur: "dcpj-congo@policenationale.cg", description: "Braquage d un commercant. Deux suspects en fuite." },
  { id: "INC-002", type: "Accident de circulation", lieu: "RN1 km 47, Pointe-Noire", gravite: "grave", statut: "en_cours", corps: "Police", auteur: "bca-congo@policenationale.cg", description: "Collision frontale, 3 vehicules impliques." },
  { id: "INC-003", type: "Trouble a l ordre public", lieu: "Bacongo, Brazzaville", gravite: "moyen", statut: "cloture", corps: "Police", auteur: "commissariatcentral-congo@policenationale.cg", description: "Rixe resolue par mediation." },
  { id: "INC-004", type: "Trafic de stupefiants", lieu: "Port de Brazzaville", gravite: "critique", statut: "en_cours", corps: "Police", auteur: "dcpj-congo@policenationale.cg", description: "Saisie de 12 kg de chanvre indien." },
  { id: "INC-005", type: "Violence domestique", lieu: "Bacongo II, Brazzaville", gravite: "grave", statut: "transmis_parquet", corps: "Police", auteur: "commissariatcentral-congo@policenationale.cg", description: "Victime prise en charge, dossier transmis au Parquet." },
  { id: "INC-006", type: "Exces de vitesse", lieu: "RN1 km 12, Brazzaville", gravite: "moyen", statut: "cloture", corps: "Police", auteur: "bca-congo@policenationale.cg", description: "Vehicule controle a 112 km/h en zone 60." },
  { id: "INC-007", type: "Conduite en etat d ivresse", lieu: "Corniche, Brazzaville", gravite: "grave", statut: "transmis_parquet", corps: "Police", auteur: "bca-congo@policenationale.cg", description: "Alcoolemie 1,8 g/l. Permis retenu." },
  { id: "INC-008", type: "Accident grave collision bus", lieu: "RN1 km 88, Niari", gravite: "critique", statut: "en_cours", corps: "Police", auteur: "bca-congo@policenationale.cg", description: "7 blesses evacues vers l hopital de Dolisie." },
  { id: "INC-009", type: "Cambriolage", lieu: "Moungali, Brazzaville", gravite: "grave", statut: "en_cours", corps: "Police", auteur: "commissariatcentral-congo@policenationale.cg", description: "Effraction nocturne, materiel derobe." },
  { id: "INC-010", type: "Vol a la tire", lieu: "Gare routiere, Pointe-Noire", gravite: "moyen", statut: "en_cours", corps: "Gendarmerie", auteur: "gendarmeriepnr-congo@gendarmerienationale.cg", description: "Vol de telephone filme par camera de surveillance." },
  { id: "INC-011", type: "Tentative d evasion", lieu: "Maison d arret de Brazzaville", gravite: "critique", statut: "transmis_parquet", corps: "Police", auteur: "dcpj-congo@policenationale.cg", description: "Evasion dejouee, deux detenus isoles." },
  { id: "INC-012", type: "Faux documents administratifs", lieu: "Aeroport Maya-Maya", gravite: "grave", statut: "en_cours", corps: "Police", auteur: "frontieres-congo@policenationale.cg", description: "Passeport presentant des signes de falsification." }
];

var GRAVITE_COLOR = { critique: "#DC2626", grave: "#F59E0B", moyen: "#3B82F6", faible: "#22C55E" };
var STATUT_LABEL = { en_cours: "En cours", cloture: "Cloture", transmis_parquet: "Au Parquet" };

function MainCourante(props) {
  var compte = props.compte;
  var fState = useState("tous");
  var filter = fState[0]; var setFilter = fState[1];
  var voitTout = compte.role === "direction" || compte.role === "rh" || compte.role === "operations";
  var dbIncState = useState([]); var dbInc = dbIncState[0]; var setDbInc = dbIncState[1];
  var showFormState = useState(false); var showForm = showFormState[0]; var setShowForm = showFormState[1];
  var newTypeState = useState(""); var newType = newTypeState[0]; var setNewType = newTypeState[1];
  var newLieuState = useState(""); var newLieu = newLieuState[0]; var setNewLieu = newLieuState[1];
  var newDescState = useState(""); var newDesc = newDescState[0]; var setNewDesc = newDescState[1];
  var newGravState = useState("moyen"); var newGrav = newGravState[0]; var setNewGrav = newGravState[1];

  useEffect(function() {
    function charger(){ supabase.from("incidents").select("*").order("created_at",{ascending:false}).then(function(r){ if(r.data) setDbInc(r.data); }); }
    charger();
    var timer=setInterval(charger, 15000);
    return function(){ clearInterval(timer); };
  }, []);

  function creerIncident() {
    var nouv = {
      id: "INC-DB-"+Date.now(),
      type: newType, lieu: newLieu, description: newDesc,
      gravite: newGrav, statut: "en_cours",
      auteur: compte.identifiant, corps: compte.corps,
      date: new Date().toLocaleDateString("fr-FR"),
      heure: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})
    };
    supabase.from("incidents").insert([nouv]).then(function(r){
      alert("Resultat: "+JSON.stringify(r.error||"OK"));
      if(!r.error){ setDbInc(function(prev){return [nouv].concat(prev);}); setShowForm(false); setNewType(""); setNewLieu(""); setNewDesc(""); }
    });
  }

  var tousInc = INCIDENTS_DATA.concat(dbInc);
  var visibles = [];
  for (var i = 0; i < tousInc.length; i++) {
    var inc = tousInc[i];
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
      <button onClick={function(){setShowForm(function(v){return !v;})}} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold mb-2">+ Signaler un incident</button>
      {showForm ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 space-y-3 mb-3">
          <p className="text-white font-bold">Nouveau signalement</p>
          <input value={newType} onChange={function(e){setNewType(e.target.value)}} placeholder="Type (ex: Vol, Agression...)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={newLieu} onChange={function(e){setNewLieu(e.target.value)}} placeholder="Lieu" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={newDesc} onChange={function(e){setNewDesc(e.target.value)}} placeholder="Description" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <select value={newGrav} onChange={function(e){setNewGrav(e.target.value)}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
            <option value="critique">Critique</option>
            <option value="grave">Grave</option>
            <option value="moyen">Moyen</option>
          </select>
          <button onClick={creerIncident} className="w-full bg-green-700 text-white py-2 rounded-xl font-bold text-sm">Enregistrer</button>
        </div>
      ) : null}
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
  { id: "GAV-001", nom: "MOUKOUARI Jean-Pierre", motif: "Vol a main armee", unite: "DCPJ Brazzaville", heuresRestantes: 34, statut: "actif", auteur: "dcpj-congo@policenationale.cg" },
  { id: "GAV-002", nom: "BAZANA Paul", motif: "Trafic de stupefiants", unite: "DCPJ Brazzaville", heuresRestantes: 9, statut: "actif", auteur: "dcpj-congo@policenationale.cg" },
  { id: "GAV-003", nom: "KOUMBA Arsene", motif: "Violence conjugale", unite: "Commissariat Central BZV", heuresRestantes: 15, statut: "actif", auteur: "commissariatcentral-congo@policenationale.cg" },
  { id: "GAV-004", nom: "NKOUKA Theophile", motif: "Escroquerie", unite: "Brigade Territoriale PNR", heuresRestantes: 0, statut: "prolonge", auteur: "gendarmeriepnr-congo@gendarmerienationale.cg" },
  { id: "GAV-005", nom: "ITOUA Patrice", motif: "Trafic de stupefiants", unite: "DCPJ Brazzaville", heuresRestantes: 42, statut: "actif", auteur: "dcpj-congo@policenationale.cg" },
  { id: "GAV-006", nom: "MASSAMBA Herve", motif: "Conduite en etat d ivresse recidive", unite: "Bureau Controle Accidents BZV", heuresRestantes: 5, statut: "actif", auteur: "bca-congo@policenationale.cg" }
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
  var showGavFormState = useState(false); var showGavForm = showGavFormState[0]; var setShowGavForm = showGavFormState[1];
  var gavNomState = useState(""); var gavNom = gavNomState[0]; var setGavNom = gavNomState[1];
  var gavPrenomState = useState(""); var gavPrenom = gavPrenomState[0]; var setGavPrenom = gavPrenomState[1];
  var gavMotifState = useState(""); var gavMotif = gavMotifState[0]; var setGavMotif = gavMotifState[1];

  useEffect(function() {
    function chargerGav(){
      supabase.from("gardes_vue").select("*").order("created_at",{ascending:false}).then(function(r){
        if(r.data && r.data.length>0){
          var nouvGardes = r.data.map(function(g){
            return Object.assign({},g,{instruction:null,droits:{avocat:false,medecin:false,famille:false},heuresRestantes:24});
          });
          setGardes(function(prev){ return initial.concat(nouvGardes); });
        }
      });
    }
    chargerGav();
    var timer=setInterval(chargerGav,15000);
    return function(){ clearInterval(timer); };
  }, []);

  function creerGardeVue() {
    if(!gavNom.trim() || !gavMotif.trim()) return;
    var nouv = {
      id: "GAV-"+Date.now(),
      nom: gavNom, prenom: gavPrenom, motif: gavMotif,
      statut: "en_cours", auteur: compte.identifiant,
      unite: compte.service,
      date_arrestation: new Date().toLocaleDateString("fr-FR"),
      heure_arrestation: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})
    };
    supabase.from("gardes_vue").insert([nouv]).then(function(r){
      if(!r.error){
        var gav = Object.assign({},nouv,{instruction:null,droits:{avocat:false,medecin:false,famille:false},heuresRestantes:24});
        setGardes(function(prev){return prev.concat([gav]);});
        setShowGavForm(false); setGavNom(""); setGavPrenom(""); setGavMotif("");
      } else { alert("Erreur: "+JSON.stringify(r.error)); }
    });
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Gestion des Gardes a Vue</h2>
          <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee" : "Service: " + compte.service}</p>
        </div>
        {peutAgir ? <button onClick={function(){setShowGavForm(function(v){return !v;})}} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold">+ Nouvelle GAV</button> : null}
      </div>
      {showGavForm ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 space-y-3">
          <p className="text-white font-bold">Nouvelle Garde a Vue</p>
          <input value={gavNom} onChange={function(e){setGavNom(e.target.value)}} placeholder="Nom *" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={gavPrenom} onChange={function(e){setGavPrenom(e.target.value)}} placeholder="Prenom" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={gavMotif} onChange={function(e){setGavMotif(e.target.value)}} placeholder="Motif de garde a vue *" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <button onClick={creerGardeVue} className="w-full bg-green-700 text-white py-2 rounded-xl font-bold text-sm">Enregistrer</button>
        </div>
      ) : null}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  { id: "PL-001", reference: "PL-BZV-234-2026", type: "Escroquerie", plaignant: "MOUKALA Bernadette", telephone: "06-123-4567", description: "Arnaque en ligne, virement de 450000 FCFA perdu.", statut: "enregistree", auteur: "commissariatcentral-congo@policenationale.cg" },
  { id: "PL-002", reference: "PL-PNR-233-2026", type: "Agression physique", plaignant: "LOUBASSOU Martin", telephone: "05-987-6543", description: "Victime d agression. Certificat medical fourni.", statut: "enquete", auteur: "gendarmeriepnr-congo@gendarmerienationale.cg" },
  { id: "PL-003", reference: "PL-BZV-232-2026", type: "Vol de vehicule", plaignant: "NTSIMBA Clarisse", telephone: "06-456-7890", description: "Toyota RAV4 gris vole devant domicile.", statut: "transmis_parquet", auteur: "dcpj-congo@policenationale.cg" }
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
  var showRecrueFormState = useState(false); var showRecrueForm = showRecrueFormState[0]; var setShowRecrueForm = showRecrueFormState[1];
  var recNomState = useState(""); var recNom = recNomState[0]; var setRecNom = recNomState[1];
  var recMatriculeState = useState(""); var recMatricule = recMatriculeState[0]; var setRecMatricule = recMatriculeState[1];
  var recCorpsState = useState("Police"); var recCorps = recCorpsState[0]; var setRecCorps = recCorpsState[1];
  var recServiceState = useState(""); var recService = recServiceState[0]; var setRecService = recServiceState[1];
  var recDiplomeState = useState(""); var recDiplome = recDiplomeState[0]; var setRecDiplome = recDiplomeState[1];
  var recPhotoState = useState(""); var recPhoto = recPhotoState[0]; var setRecPhoto = recPhotoState[1];
  var recPrenomState = useState(""); var recPrenom = recPrenomState[0]; var setRecPrenom = recPrenomState[1];
  var recDateNaissanceState = useState(""); var recDateNaissance = recDateNaissanceState[0]; var setRecDateNaissance = recDateNaissanceState[1];
  var recLieuNaissanceState = useState(""); var recLieuNaissance = recLieuNaissanceState[0]; var setRecLieuNaissance = recLieuNaissanceState[1];
  var recGradeIndexState = useState(0); var recGradeIndex = recGradeIndexState[0]; var setRecGradeIndex = recGradeIndexState[1];
  var recMatriculeMilitaireState = useState(""); var recMatriculeMilitaire = recMatriculeMilitaireState[0]; var setRecMatriculeMilitaire = recMatriculeMilitaireState[1];
  var recMatriculeSoldeState = useState(""); var recMatriculeSolde = recMatriculeSoldeState[0]; var setRecMatriculeSolde = recMatriculeSoldeState[1];
  var recAnneeRecrutementState = useState(""); var recAnneeRecrutement = recAnneeRecrutementState[0]; var setRecAnneeRecrutement = recAnneeRecrutementState[1];
  var recEcoleFormationState = useState(""); var recEcoleFormation = recEcoleFormationState[0]; var setRecEcoleFormation = recEcoleFormationState[1];
  var recDiplomeMilitaireState = useState(""); var recDiplomeMilitaire = recDiplomeMilitaireState[0]; var setRecDiplomeMilitaire = recDiplomeMilitaireState[1];
  var recDernierDiplomeScolaireState = useState(""); var recDernierDiplomeScolaire = recDernierDiplomeScolaireState[0]; var setRecDernierDiplomeScolaire = recDernierDiplomeScolaireState[1];
  var recSalaireState = useState(""); var recSalaire = recSalaireState[0]; var setRecSalaire = recSalaireState[1];
  var recSituationFamilialeState = useState("Celibataire"); var recSituationFamiliale = recSituationFamilialeState[0]; var setRecSituationFamiliale = recSituationFamilialeState[1];

  function handlePhotoChange(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) { setRecPhoto(ev.target.result); };
    reader.readAsDataURL(file);
  }

  useEffect(function() {
    function chargerRecrues(){
      supabase.from("personnels").select("*").order("created_at",{ascending:false}).then(function(r){
        if(r.data && r.data.length>0){
          var nouvAgents = r.data.map(function(a){
            return { id:a.id, matricule:a.matricule, nom:a.nom, corps:a.corps, service:a.service, gradeIndex:a.gradeindex, anciennete:a.anciennete, statut:a.statut, diplome:a.diplome, instruction:null };
          });
          setAgents(function(prev){
            var idsExistants = prev.map(function(p){return p.id;});
            var aAjouter = nouvAgents.filter(function(a){return idsExistants.indexOf(a.id)===-1;});
            return prev.concat(aAjouter);
          });
        }
      });
    }
    chargerRecrues();
    var timer=setInterval(chargerRecrues,15000);
    return function(){ clearInterval(timer); };
  }, []);

  function creerRecrue() {
    if (!recNom || !recPrenom || !recMatricule || !recService) {
      alert("Merci de remplir au minimum: Nom, Prenom, Matricule et Service.");
      return;
    }
    var nouv = {
      id: "AGT-"+Date.now(),
      matricule: recMatricule, nom: recNom, prenom: recPrenom, corps: recCorps,
      service: recService, gradeindex: recGradeIndex, anciennete: 0,
      statut: "actif", diplome: recDiplome, photo: recPhoto,
      datenaissance: recDateNaissance, lieunaissance: recLieuNaissance,
      matriculemilitaire: recMatriculeMilitaire, matriculesolde: recMatriculeSolde,
      anneerecrutement: recAnneeRecrutement, ecoleformation: recEcoleFormation,
      diplomemilitaire: recDiplomeMilitaire, dernierdiplomescolaire: recDernierDiplomeScolaire,
      salaire: recSalaire, situationfamiliale: recSituationFamiliale
    };
    supabase.from("personnels").insert([nouv]).then(function(r){
      if(!r.error){
        var agentComplet = { id:nouv.id, matricule:nouv.matricule, nom:nouv.nom, prenom:nouv.prenom, corps:nouv.corps, service:nouv.service, gradeIndex:recGradeIndex, anciennete:0, statut:"actif", diplome:nouv.diplome, instruction:null };
        setAgents(function(prev){return prev.concat([agentComplet]);});
        setShowRecrueForm(false);
        setRecNom(""); setRecPrenom(""); setRecMatricule(""); setRecService(""); setRecDiplome(""); setRecCorps("Police"); setRecPhoto("");
        setRecDateNaissance(""); setRecLieuNaissance(""); setRecGradeIndex(0);
        setRecMatriculeMilitaire(""); setRecMatriculeSolde(""); setRecAnneeRecrutement("");
        setRecEcoleFormation(""); setRecDiplomeMilitaire(""); setRecDernierDiplomeScolaire("");
        setRecSalaire(""); setRecSituationFamiliale("Celibataire");
      } else { alert("Erreur: "+JSON.stringify(r.error)); }
    });
  }

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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-white">Personnel et Carrieres</h2>
          <p className="text-slate-500 text-xs">{voitTout ? "Vue consolidee DGRH" : "Service: " + compte.service}</p>
        </div>
        {peutGerer ? <button onClick={function(){setShowRecrueForm(function(v){return !v;});}} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold">+ Nouvelle Recrue</button> : null}
      </div>
      {showRecrueForm ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 space-y-3">
          <p className="text-white font-bold">Nouvelle Recrue</p>
          <input value={recNom} onChange={function(e){setRecNom(e.target.value)}} placeholder="Nom complet *" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={recMatricule} onChange={function(e){setRecMatricule(e.target.value)}} placeholder="Matricule *" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <select value={recCorps} onChange={function(e){setRecCorps(e.target.value)}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
            <option value="Police">Police</option>
            <option value="Gendarmerie">Gendarmerie</option>
          </select>
          <input value={recService} onChange={function(e){setRecService(e.target.value)}} placeholder="Service / Unite *" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={recDiplome} onChange={function(e){setRecDiplome(e.target.value)}} placeholder="Diplome (optionnel)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input value={recPrenom} onChange={function(e){setRecPrenom(e.target.value)}} placeholder="Prenom *" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
            <input type="date" value={recDateNaissance} onChange={function(e){setRecDateNaissance(e.target.value)}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          </div>
          <input value={recLieuNaissance} onChange={function(e){setRecLieuNaissance(e.target.value)}} placeholder="Lieu de naissance" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <select value={recGradeIndex} onChange={function(e){setRecGradeIndex(parseInt(e.target.value,10))}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
            {gradesDe(recCorps).map(function(g,i){ return <option key={i} value={i}>{g}</option>; })}
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input value={recMatriculeMilitaire} onChange={function(e){setRecMatriculeMilitaire(e.target.value)}} placeholder="Matricule militaire" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
            <input value={recMatriculeSolde} onChange={function(e){setRecMatriculeSolde(e.target.value)}} placeholder="Matricule solde" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          </div>
          <input value={recAnneeRecrutement} onChange={function(e){setRecAnneeRecrutement(e.target.value)}} placeholder="Annee de recrutement" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={recEcoleFormation} onChange={function(e){setRecEcoleFormation(e.target.value)}} placeholder="Ecole de formation / Base commune" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={recDiplomeMilitaire} onChange={function(e){setRecDiplomeMilitaire(e.target.value)}} placeholder="Diplome militaire" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={recDernierDiplomeScolaire} onChange={function(e){setRecDernierDiplomeScolaire(e.target.value)}} placeholder="Dernier diplome scolaire" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input value={recSalaire} onChange={function(e){setRecSalaire(e.target.value)}} placeholder="Salaire (FCFA)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
            <select value={recSituationFamiliale} onChange={function(e){setRecSituationFamiliale(e.target.value)}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
              <option value="Celibataire">Celibataire</option>
              <option value="Marie">Marie(e)</option>
              <option value="Divorce">Divorce(e)</option>
              <option value="Veuf">Veuf/Veuve</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            {recPhoto ? <img src={recPhoto} className="w-14 h-14 rounded-full object-cover border border-slate-700" /> : <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 text-xs">Photo</div>}
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-slate-400 text-xs" />
          </div>
          <button onClick={creerRecrue} className="w-full bg-green-700 text-white py-2 rounded-xl font-bold text-sm">Enregistrer</button>
        </div>
      ) : null}
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
  { id: "EVT-001", titre: "Reunion Etat-Major hebdomadaire", type: "reunion", date: "2026-06-19", heure: "08:00", duree: "2h", corps: "Tous", service: "Commandement des Forces de Police", lieu: "QG CFP Brazzaville", criticite: "normale", statut: "planifie", auteur: "cfp-congo@policenationale.cg" },
  { id: "EVT-002", titre: "Operation conjointe anti-stupefiants Port BZV", type: "intervention", date: "2026-06-19", heure: "05:00", duree: "4h", corps: "Police", service: "DCPJ Brazzaville", lieu: "Port de Brazzaville", criticite: "critique", statut: "planifie", auteur: "dcpj-congo@policenationale.cg" },
  { id: "EVT-003", titre: "Echeance transmission dossier INC-004 au Parquet", type: "echeance", date: "2026-06-20", heure: "17:00", duree: null, corps: "Police", service: "DCPJ Brazzaville", lieu: "Tribunal de Grande Instance", criticite: "critique", statut: "planifie", auteur: "dcpj-congo@policenationale.cg" },
  { id: "EVT-004", titre: "Controle routier renforce RN1", type: "mission", date: "2026-06-20", heure: "06:00", duree: "6h", corps: "Police", service: "Bureau Controle Accidents BZV", lieu: "RN1 km 12", criticite: "normale", statut: "planifie", auteur: "bca-congo@policenationale.cg" },
  { id: "EVT-005", titre: "Formation maniement armes reglementaires", type: "formation", date: "2026-06-22", heure: "09:00", duree: "3 jours", corps: "Gendarmerie", service: "Brigade Territoriale Pointe-Noire", lieu: "Centre d entrainement PNR", criticite: "normale", statut: "planifie", auteur: "gendarmeriepnr-congo@gendarmerienationale.cg" },
  { id: "EVT-006", titre: "Audience disciplinaire agent KOUMBA Arsene", type: "echeance", date: "2026-06-18", heure: "14:00", duree: "1h", corps: "Police", service: "Direction du Personnel", lieu: "DGRH Brazzaville", criticite: "critique", statut: "planifie", auteur: "personnel-congo@sipgn.cg" },
  { id: "EVT-007", titre: "Mission escorte convoi mineraux Boko Songho", type: "mission", date: "2026-06-23", heure: "05:30", duree: "8h", corps: "Gendarmerie", service: "Direction des Operations", lieu: "Axe Boko Songho - Dolisie", criticite: "critique", statut: "planifie", auteur: "operations-congo@sipgn.cg" },
  { id: "EVT-008", titre: "Reunion budgetaire trimestrielle DAF", type: "reunion", date: "2026-06-25", heure: "10:00", duree: "3h", corps: "Tous", service: "DAF", lieu: "DAF Brazzaville", criticite: "normale", statut: "planifie", auteur: "daf-congo@sipgn.cg" },
  { id: "EVT-009", titre: "Renouvellement habilitations INTERPOL", type: "echeance", date: "2026-06-30", heure: "09:00", duree: null, corps: "Police", service: "INTERPOL Brazzaville", lieu: "BCN INTERPOL", criticite: "normale", statut: "planifie", auteur: "interpol-congo@policenationale.cg" },
  { id: "EVT-010", titre: "Patrouille maritime conjointe", type: "intervention", date: "2026-06-21", heure: "07:00", duree: "5h", corps: "Police", service: "Police Navale", lieu: "Embouchure Pointe-Noire", criticite: "normale", statut: "planifie", auteur: "policenavale-congo@policenationale.cg" },
  { id: "EVT-011", titre: "Controle frontalier renforce vacances scolaires", type: "mission", date: "2026-06-26", heure: "06:00", duree: "7 jours", corps: "Police", service: "Poste Frontalier Aeroport", lieu: "Aeroport Maya-Maya", criticite: "critique", statut: "planifie", auteur: "frontieres-congo@policenationale.cg" },
  { id: "EVT-012", titre: "Maintenance programmee parc vehicules", type: "echeance", date: "2026-06-24", heure: "08:00", duree: "1 jour", corps: "Tous", service: "Direction de la Logistique", lieu: "Garage central BZV", criticite: "normale", statut: "planifie", auteur: "dl-congo@sipgn.cg" },
  { id: "EVT-013", titre: "Reunion coordination Gendarmerie Navale", type: "reunion", date: "2026-06-17", heure: "09:00", duree: "2h", corps: "Gendarmerie", service: "Gendarmerie Navale", lieu: "Base navale Pointe-Noire", criticite: "normale", statut: "termine", auteur: "gendarmerienavale-congo@gendarmerienationale.cg" },
  { id: "EVT-014", titre: "Intervention rixe signalee Bacongo", type: "intervention", date: "2026-06-18", heure: "21:00", duree: "2h", corps: "Police", service: "Commissariat Central BZV", lieu: "Bacongo", criticite: "critique", statut: "planifie", auteur: "commissariatcentral-congo@policenationale.cg" }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  { id: "NS-001", titre: "Consignes operation anti-stupefiants Port BZV", contenu: "Tous les agents de la DCPJ et du Commissariat Central sont convoques a 04h30 au QG CFP pour briefing. Tenue operationnelle obligatoire. Discrecion totale.", auteur: "cfp-congo@policenationale.cg", auteurNom: "CFP - Commandement des Forces de Police", date: "2026-06-18", priorite: "urgente", destinataires: ["dcpj-congo@policenationale.cg", "commissariatcentral-congo@policenationale.cg", "operations-congo@sipgn.cg"], lu: [] },
  { id: "NS-002", titre: "Procedure d acces aux fichiers INTERPOL - mise a jour", contenu: "Suite a la mise a jour du systeme BCN, les acces aux fichiers INTERPOL reqierent desormais une double authentification. Contacter le BCN Brazzaville pour renouveler les habilitations avant le 30 juin.", auteur: "interpol-congo@policenationale.cg", auteurNom: "BCN INTERPOL Brazzaville", date: "2026-06-17", priorite: "importante", destinataires: ["dcpj-congo@policenationale.cg", "frontieres-congo@policenationale.cg", "gendarmeriepnr-congo@gendarmerienationale.cg", "cfp-congo@policenationale.cg", "cgn-congo@gendarmerienationale.cg"], lu: [] },
  { id: "NS-003", titre: "Calendrier visites medicales periodiques - Juin 2026", contenu: "Les agents dont le matricule commence par PNB-10 sont convoques a la visite medicale periodique le 25 juin 2026 a 08h00 au service medical du Commandement.", auteur: "dgrh-congo@sipgn.cg", auteurNom: "Direction Generale des Ressources Humaines", date: "2026-06-16", priorite: "information", destinataires: ["tous"], lu: [] },
  { id: "NS-004", titre: "Alerte vehicule recherche - RAV4 gris BZV-7714-PL", contenu: "Un Toyota RAV4 gris immatricule BZV-7714-PL signale vole. Toutes les unites sont priees de signaler toute observation. Contacter immediatement le Commissariat Central.", auteur: "commissariatcentral-congo@policenationale.cg", auteurNom: "Commissariat Central BZV", date: "2026-06-18", priorite: "urgente", destinataires: ["tous"], lu: [] },
  { id: "NS-005", titre: "Formation premiers secours - inscriptions ouvertes", contenu: "La Direction de la Logistique organise une formation aux premiers secours les 28 et 29 juin. Places limitees a 20 agents. Inscriptions aupres de la DL avant le 22 juin.", auteur: "dl-congo@sipgn.cg", auteurNom: "Direction de la Logistique", date: "2026-06-15", priorite: "information", destinataires: ["tous"], lu: [] },
  { id: "NS-006", titre: "Renforcement controles frontaliers - zone vacacances", contenu: "En prevision des departs en vacances scolaires, le dispositif de controle a l aeroport Maya-Maya est renforce du 26 juin au 10 juillet. Effectifs supplementaires requis.", auteur: "frontieres-congo@policenationale.cg", auteurNom: "Controle Voyageurs et Frontieres", date: "2026-06-17", priorite: "importante", destinataires: ["tous"], lu: [] }
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
  { id: "MSG-001", de: "dcpj-congo@policenationale.cg", deNom: "DCPJ Brazzaville", a: "cfp-congo@policenationale.cg", aNom: "CFP", texte: "Commandant, le suspect INC-004 est toujours en fuite. Demande autorisation pour perquisition du domicile.", date: "2026-06-18", heure: "07:45", lu: false },
  { id: "MSG-002", de: "cfp-congo@policenationale.cg", deNom: "CFP", a: "dcpj-congo@policenationale.cg", aNom: "DCPJ Brazzaville", texte: "Autorisation accordee. Proceder avec un effectif de 4 agents minimum. Rapport exige sous 2h.", date: "2026-06-18", heure: "08:02", lu: false },
  { id: "MSG-003", de: "bca-congo@policenationale.cg", deNom: "Bureau Controle Accidents", a: "dgrh-congo@sipgn.cg", aNom: "DGRH", texte: "Bonjour, besoin d un renflement de 2 agents pour le controle routier du 20 juin RN1. Merci.", date: "2026-06-17", heure: "14:30", lu: true },
  { id: "MSG-004", de: "dgrh-congo@sipgn.cg", deNom: "DGRH", a: "bca-congo@policenationale.cg", aNom: "Bureau Controle Accidents", texte: "Pris en compte. Agents MAKOSSO et MASSAMBA affectes pour le 20 juin. Bonne mission.", date: "2026-06-17", heure: "15:10", lu: true },
  { id: "MSG-005", de: "gendarmeriepnr-congo@gendarmerienationale.cg", deNom: "Brigade Territoriale PNR", a: "cgn-congo@gendarmerienationale.cg", aNom: "CGN", texte: "Mon Commandant, le suspect NKOUKA est en fin de GAV prolongee. Demande instruction pour suite a donner.", date: "2026-06-18", heure: "09:15", lu: false },
  { id: "MSG-006", de: "frontieres-congo@policenationale.cg", deNom: "Controle Frontieres", a: "interpol-congo@policenationale.cg", aNom: "BCN INTERPOL", texte: "Passeport suspect detecte. Reference INC-012. Confirmation du fichier INTERPOL demandee pour le voyageur KOULIMBA Jean.", date: "2026-06-18", heure: "10:45", lu: false },
  { id: "MSG-007", de: "interpol-congo@policenationale.cg", deNom: "BCN INTERPOL", a: "frontieres-congo@policenationale.cg", aNom: "Controle Frontieres", texte: "Verification effectuee. Individu non fiche INTERPOL. Cependant signalement national actif. Retenir et alerter la DCPJ.", date: "2026-06-18", heure: "11:02", lu: false }
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

  useEffect(function() {
    function chargerMessages(){
      supabase.from("messages").select("*").order("created_at",{ascending:true}).then(function(r){
        if(r.data && r.data.length>0){
          var nouvMsgs = r.data.map(function(m){
            return { id:m.id, de:m.de, deNom:m.denom, a:m.a, aNom:m.anom, texte:m.texte, date:m.date, heure:m.heure, lu:m.lu };
          });
          setMsgs(function(prev){
            var idsExistants = prev.map(function(p){return p.id;});
            var aAjouter = nouvMsgs.filter(function(m){return idsExistants.indexOf(m.id)===-1;});
            return prev.concat(aAjouter);
          });
        }
      });
    }
    chargerMessages();
    var timer=setInterval(chargerMessages,15000);
    return function(){ clearInterval(timer); };
  }, []);

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
    var mSupabase = { id:m.id, de:m.de, denom:m.deNom, a:m.a, anom:m.aNom, texte:m.texte, date:m.date, heure:m.heure, lu:m.lu };
    supabase.from("messages").insert([mSupabase]).then(function(r){
      if(!r.error){
        setMsgs(function (prev) { return prev.concat([m]); });
        nouveauMsg[1]("");
      } else { alert("Erreur envoi: "+JSON.stringify(r.error)); }
    });
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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



function DataScientistRouter(props) {
  var compte = props.compte;
  if (compte.role === "dl") { return <DataScientistDL compte={compte} />; }
  if (compte.role === "personnel") { return <DataScientistPersonnel compte={compte} />; }
  if (compte.role === "daf") { return <DataScientistDAF compte={compte} />; }
  if (compte.role === "judiciaire") { return <DataScientistDPJ compte={compte} />; }
  if (compte.role === "accidents") { return <DataScientistAccidents compte={compte} />; }
  if (compte.role === "commissariat") { return <DataScientistCommissariat compte={compte} />; }
  if (compte.role === "renseignement") { return <DataScientistDRG compte={compte} />; }
  if (compte.role === "controle") { return <DataScientistFrontieres compte={compte} />; }
  return <DataScientist compte={compte} />;
}

var ENGAGEMENTS_DATA = [
  { id: "ENG-001", objet: "Carburant vehicules — Juin 2026", montant: 18500000, service: "Direction de la Logistique", statut: "valide", date: "2026-06-01", priorite: "normale" },
  { id: "ENG-002", objet: "Uniformes et equipements — 50 agents", montant: 12750000, service: "DGRH", statut: "en_attente", date: "2026-06-10", priorite: "haute" },
  { id: "ENG-003", objet: "Maintenance vehicules BZV-8812-PL", montant: 4200000, service: "Direction de la Logistique", statut: "valide", date: "2026-06-05", priorite: "normale" },
  { id: "ENG-004", objet: "Formation premiers secours — 20 agents", montant: 3800000, service: "DGRH", statut: "en_attente", date: "2026-06-12", priorite: "normale" },
  { id: "ENG-005", objet: "Renouvellement contrat radio-telecom", montant: 8600000, service: "DAF", statut: "rejete", date: "2026-06-08", priorite: "haute" },
  { id: "ENG-006", objet: "Mission escorte convoi logistique", montant: 2400000, service: "Direction des Operations", statut: "valide", date: "2026-06-15", priorite: "normale" },
  { id: "ENG-007", objet: "Bon de commande carburant n°452", montant: 6300000, service: "Direction de la Logistique", statut: "en_attente", date: "2026-06-18", priorite: "urgente" },
  { id: "ENG-008", objet: "Demande materiel technique DCPJ", montant: 9750000, service: "DCPJ Brazzaville", statut: "en_attente", date: "2026-06-17", priorite: "urgente" }
];

var STC_ENG = { valide: "#22C55E", en_attente: "#F59E0B", attente_commandant: "#8B5CF6", rejete: "#DC2626" };
var STL_ENG = { valide: "Valide", en_attente: "A verifier (DAF)", attente_commandant: "Attente Commandant", rejete: "Rejete" };
var SEUIL_VALIDATION_COMMANDANT = 5000000;

function GestionBudget(props) {
  var compte = props.compte;
  var tabState = useState("overview");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var engState = useState(ENGAGEMENTS_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var engs = engState[0]; var setEngs = engState[1];
  var SYS = "Tu es conseiller financier SIPGN pour les forces de l ordre congolaises. Reponds en francais, structure et chiffre en FCFA.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); });
  }

  function valider(id) {
    setEngs(function (prev) {
      return prev.map(function (e) {
        if (e.id !== id) { return e; }
        var c = {};
        for (var k in e) { c[k] = e[k]; }
        if (e.statut === "en_attente") { c.statut = e.montant >= SEUIL_VALIDATION_COMMANDANT ? "attente_commandant" : "valide"; }
        else if (e.statut === "attente_commandant") { c.statut = "valide"; }
        return c;
      });
    });
  }
  function rejeter(id) { setEngs(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "rejete"; return c; }); }); }

  var totalB = BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0);
  var totalR = BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0);
  var totalE = engs.filter(function (e) { return e.statut === "valide"; }).reduce(function (s, e) { return s + e.montant; }, 0);
  var enAttente = engs.filter(function (e) { return e.statut === "en_attente" || e.statut === "attente_commandant"; }).length;
  var STC = STC_ENG;
  var STL = STL_ENG;
  var TABS = [["overview", "Vue Generale", "💰"], ["engagements", "Engagements", "📋"], ["previsions", "Previsions IA", "📈"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-900 to-emerald-900 border border-green-700 flex items-center justify-center text-2xl shrink-0">💰</div>
        <div><h2 className="text-2xl font-black text-white">Gestion Budgetaire & Finances</h2><p className="text-slate-500 text-xs">Suivi budgetaire, engagements et previsions — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-green-700 text-white border-green-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>
      {tab === "overview" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon="📊" label="Budget alloue" value={totalB + "M"} color="#3B82F6" sub="FCFA" />
            <StatCard icon="💸" label="Depenses reelles" value={totalR + "M"} color={totalR > totalB ? "#DC2626" : "#22C55E"} sub="FCFA" />
            <StatCard icon="✅" label="Engage valide" value={Math.round(totalE / 1000000) + "M"} color="#8B5CF6" sub="FCFA" />
            <StatCard icon="⏳" label="En attente" value={enAttente} color="#F59E0B" sub="engagements" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Budget vs Depenses (millions FCFA)</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_POSTES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="poste" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
                  <Bar dataKey="budget" name="Budget" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="reel" name="Reel" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span>Budget previsionnel</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-amber-400"></span>Depenses reelles</span></div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Ecarts rapides</p>
            <div className="space-y-1.5">
              {BUDGET_POSTES.map(function (p) { var ec = p.reel - p.budget; var col = ec > 0 ? "#DC2626" : "#22C55E"; return (<div key={p.poste} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{p.poste}</span><div className="flex items-center gap-3"><span className="text-slate-500">{p.budget}M budget</span><span style={{ color: col }} className="font-bold">{ec > 0 ? "+" : ""}{ec}M ({((ec / p.budget) * 100).toFixed(0)}%)</span></div></div>); })}
            </div>
          </div>
        </div>
      ) : null}
      {tab === "engagements" ? (
        <div className="space-y-3">
          {engs.map(function (e) {
            return (
              <div key={e.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{e.objet}</p><p className="text-slate-400 text-xs">{e.service} — {e.date}</p><p className="text-green-400 font-black text-base mt-0.5">{e.montant.toLocaleString("fr-FR")} FCFA</p></div>
                  <Chip color={STC[e.statut]}>{STL[e.statut]}</Chip>
                </div>
                {compte.role === "daf" && e.statut === "en_attente" ? (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700">
                    <button onClick={function () { valider(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">{e.montant >= SEUIL_VALIDATION_COMMANDANT ? "Verifier et transmettre" : "Valider"}</button>
                    <button onClick={function () { rejeter(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Rejeter</button>
                  </div>
                ) : null}
                {compte.role === "direction" && e.statut === "attente_commandant" ? (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700">
                    <button onClick={function () { valider(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Valider (Commandant)</button>
                    <button onClick={function () { rejeter(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Rejeter</button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === "previsions" ? (
        <div className="space-y-4">
          <button onClick={function () {
            var ctx = "Budget: " + JSON.stringify(BUDGET_POSTES) + " | Engagements valides: " + totalE.toLocaleString("fr-FR") + " FCFA | Operations futures: " + EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length;
            callIA(ai1[1], "Genere une prevision budgetaire sur les 3 prochains mois pour la Police et Gendarmerie du Congo. Structure: 1) Tendance previsionnelle par poste (hausse/baisse + %) 2) Risques de depassement 3) Economies realisables (mesures + FCFA) 4) Budget supplementaire a solliciter 5) Alerte si insuffisant pour les operations planifiees. Donnees: " + ctx);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📈 Generer la prevision budgetaire 3 mois</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}
    </div>
  );
}

function EtatMajor(props) {
  var compte = props.compte;
  var tabState = useState("gpec");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var SYS = "Tu es conseiller strategique du Commandement des Forces de Police et de la Gendarmerie Nationale du Congo. Tes analyses sont institutionnelles et de long terme. Reponds en francais avec le registre formel du commandement.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  var pyramideData = [
    { tranche: "0-5 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete <= 5; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete <= 5; }).length },
    { tranche: "6-15 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 6 && a.anciennete <= 15; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 6 && a.anciennete <= 15; }).length },
    { tranche: "16-25 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 16 && a.anciennete <= 25; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 16 && a.anciennete <= 25; }).length },
    { tranche: "26+ ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 26; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 26; }).length }
  ];

  var TABS = [["gpec", "GPEC & Succession", "👥"], ["planification", "Planification Strategique", "🗓️"], ["synthese", "Synthese Commandement", "📋"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-700 flex items-center justify-center text-2xl shrink-0">⭐</div>
        <div><h2 className="text-2xl font-black text-white">Etat-Major — Commandement</h2><p className="text-slate-500 text-xs">GPEC, planification strategique et synthese du commandement</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-purple-700 text-white border-purple-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "gpec" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Users size={18} />} label="Total agents" value={AGENTS_DATA.length} color="#3B82F6" />
            <StatCard icon="🎖️" label="Eligible retraite" value={AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length} color="#DC2626" />
            <StatCard icon="⭐" label="Promotions" value={AGENTS_DATA.filter(function (a) { return a.statut === "proposition_promotion"; }).length} color="#F59E0B" />
            <StatCard icon="👑" label="Hauts grades" value={AGENTS_DATA.filter(function (a) { return a.gradeIndex >= 7; }).length} color="#8B5CF6" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Pyramide des ages — Police & Gendarmerie</p>
            <div className="h-48">
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
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Vivier de succession — officiers superieurs</p>
            <div className="space-y-1.5">
              {AGENTS_DATA.filter(function (a) { return a.gradeIndex >= 6 && a.statut === "actif"; }).map(function (a) {
                return (<div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><div className="flex items-center gap-2"><span className="text-yellow-400">⭐</span><span className="text-slate-300 font-semibold">{a.nom}</span></div><div className="flex items-center gap-2"><span className="text-slate-500">{gradeLabel(a)}</span><CorpsBadge corps={a.corps} /></div></div>);
              })}
            </div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(AGENTS_DATA.map(function (a) { return { nom: a.nom, corps: a.corps, grade: gradeLabel(a), anciennete: a.anciennete, statut: a.statut }; }));
            callIA(ai1[1], "Genere un plan GPEC 5 ans pour le Commandement des Forces de Police et de la Gendarmerie du Congo. Structure: 1) Diagnostic RH actuel 2) Simulation departs retraite (1 an / 3 ans / 5 ans par corps et grade) 3) Plan de succession postes cles 4) Besoins recrutement annuel par corps et profil 5) Plan de formation 6) KPIs GPEC du Commandement. Donnees: " + ctx);
          }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">👥 Generer le plan GPEC 5 ans</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "planification" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Operations planifiees</p><p className="text-white font-black text-3xl mt-1">{EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length}</p></div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Taux resolution incidents</p><p className="text-white font-black text-3xl mt-1">{Math.round(INCIDENTS_DATA.filter(function (i) { return i.statut === "cloture"; }).length / INCIDENTS_DATA.length * 100)}%</p></div>
          </div>
          <button onClick={function () {
            var ctx = "Effectifs: " + AGENTS_DATA.length + " | Incidents: " + INCIDENTS_DATA.length + " | Budget: " + BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) + "M vs " + BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) + "M reel | Vehicules: " + VEHICULES_DATA.length;
            callIA(ai2[1], "Redige un plan de planification strategique a 3 ANS pour le Commandement CFP/CGN du Congo. Structure formelle: 1) VISION STRATEGIQUE 2027-2029 2) AXES PRIORITAIRES (securisation, modernisation, RH) 3) OBJECTIFS MESURABLES par axe avec indicateurs 4) PLAN D ACTION annuel (2027/2028/2029) 5) RESSOURCES NECESSAIRES 6) RISQUES ET CONTINGENCES 7) MESSAGE AU COMMANDANT: priorite numero 1. Donnees: " + ctx);
          }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🗓️ Generer le plan strategique 3 ans</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}

      {tab === "synthese" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <StatCard icon="🚨" label="Incidents actifs" value={INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length} color="#DC2626" />
            <StatCard icon="🔒" label="GAV en cours" value={GARDES_VUE_DATA.filter(function (g) { return g.statut === "actif"; }).length} color="#F59E0B" />
            <StatCard icon="🚓" label="Patrouilles terrain" value={PATROUILLES_DATA.filter(function (p) { return p.statut !== "base"; }).length} color="#3B82F6" />
            <StatCard icon="👮" label="Agents actifs" value={AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length} color="#22C55E" />
            <StatCard icon="💰" label="Ecart budget" value={(BUDGET_POSTES.reduce(function (s, p) { return s + (p.reel - p.budget); }, 0) > 0 ? "+" : "") + BUDGET_POSTES.reduce(function (s, p) { return s + (p.reel - p.budget); }, 0) + "M"} color={BUDGET_POSTES.reduce(function (s, p) { return s + (p.reel - p.budget); }, 0) > 0 ? "#DC2626" : "#22C55E"} sub="FCFA" />
            <StatCard icon="📅" label="Ops planifiees" value={EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length} color="#8B5CF6" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Incidents critiques en cours</p>
            <div className="space-y-1.5">
              {INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours"; }).map(function (inc) {
                return (<div key={inc.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-red-300 font-semibold">{inc.type}</span><div className="flex items-center gap-2"><span className="text-slate-500 truncate max-w-xs">{inc.lieu}</span><CorpsBadge corps={inc.corps} /></div></div>);
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RapportsInstitutionnels(props) {
  var compte = props.compte;
  var tabState = useState("mensuel");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var copiedState = useState(false);
  var copied = copiedState[0]; var setCopied = copiedState[1];
  var SYS = "Tu es redacteur institutionnel de haut niveau pour le Commandement des Forces de Police et de la Gendarmerie Nationale de la Republique du Congo. Tes rapports sont formels, structures, chiffres et destines aux institutions legislatives.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  function copier(texte) { if (navigator.clipboard) { navigator.clipboard.writeText(texte).then(function () { setCopied(true); setTimeout(function () { setCopied(false); }, 2500); }); } }

  var ctxG = "Incidents=" + INCIDENTS_DATA.length + " (actifs:" + INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length + ") | GAV=" + GARDES_VUE_DATA.length + " | Patrouilles=" + PATROUILLES_DATA.length + " | Plaintes=" + PLAINTES_DATA.length + " | Agents=" + AGENTS_DATA.length + " | Budget alloue=" + BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) + "M FCFA | Depenses=" + BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) + "M FCFA";

  var TABS = [["mensuel", "Rapport Mensuel", "📄"], ["annuel", "Rapport Parlement", "📜"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-900 to-orange-900 border border-amber-700 flex items-center justify-center text-2xl shrink-0">📜</div>
        <div><h2 className="text-2xl font-black text-white">Rapports Institutionnels</h2><p className="text-slate-500 text-xs">Generateur automatique pour l Assemblee Nationale et le Senat — Republique du Congo</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-amber-700 text-white border-amber-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "mensuel" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon="🚨" label="Incidents traites" value={INCIDENTS_DATA.length} color="#DC2626" />
            <StatCard icon="📋" label="Plaintes deposees" value={PLAINTES_DATA.length} color="#3B82F6" />
            <StatCard icon="🔒" label="Gardes a vue" value={GARDES_VUE_DATA.length} color="#F59E0B" />
            <StatCard icon="💰" label="Depenses mois" value={BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) + "M"} color="#22C55E" sub="FCFA" />
          </div>
          <button onClick={function () { callIA(ai1[1], "Redige le rapport mensuel officiel de juin 2026 de la Police Nationale et Gendarmerie Nationale du Congo. Format: OBJET: Rapport mensuel — Juin 2026 | 1) BILAN SECURITAIRE (incidents par type, taux resolution, zones) 2) ACTIVITES OPERATIONNELLES (GAV, plaintes, patrouilles) 3) SITUATION DES EFFECTIFS 4) SITUATION FINANCIERE (execution budgetaire) 5) EVENEMENTS MARQUANTS 6) BESOINS DU MOIS PROCHAIN 7) SIGNATURE du Commandant. Donnees: " + ctxG); }} className="bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📄 Generer le rapport mensuel officiel</button>
          {ai1[0].result ? (
            <div className="bg-slate-900 rounded-2xl border border-amber-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><span className="text-xl">📄</span><span className="text-amber-400 text-xs font-black uppercase">Rapport Mensuel — Juin 2026</span></div>
                <button onClick={function () { copier(ai1[0].result); }} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">{copied ? "✓ Copie !" : "Copier"}</button>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{ai1[0].result}</p>
            </div>
          ) : <AIBloc state={ai1[0]} />}
        </div>
      ) : null}

      {tab === "annuel" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-amber-800 p-4">
            <p className="text-amber-400 text-xs font-black uppercase mb-1">Document officiel — Usage parlementaire</p>
            <p className="text-slate-400 text-xs">Ce rapport sera transmis a l Assemblee Nationale et au Senat pour justifier les demandes budgetaires et les plans de developpement des forces de securite 2027.</p>
          </div>
          <button onClick={function () { callIA(ai2[1], "Redige le rapport annuel officiel 2026 de la Police Nationale et Gendarmerie du Congo destine au Parlement. Structure parlementaire: TITRE: RAPPORT ANNUEL D ACTIVITES ET BESOINS — EXERCICE 2026 | EXPOSE DES MOTIFS | 1) BILAN ANNUEL SECURITE NATIONALE 2) MOYENS HUMAINS (effectifs, pyramide ages, departs prevus) 3) MOYENS MATERIELS (parc vehicules, equipements) 4) EXECUTION BUDGETAIRE 2026 5) DEMANDES BUDGETAIRES 2027 (montants detailles, justifications) 6) PLAN RECRUTEMENT 2027 7) PROJETS MODERNISATION 8) RESULTATS ATTENDUS 9) CONCLUSION ET ENGAGEMENTS. Donnees: " + ctxG); }} className="bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📜 Generer le rapport parlementaire annuel</button>
          {ai2[0].result ? (
            <div className="bg-slate-900 rounded-2xl border border-amber-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><span className="text-xl">📜</span><span className="text-amber-400 text-xs font-black uppercase">Rapport Parlementaire — 2026</span></div>
                <button onClick={function () { copier(ai2[0].result); }} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">{copied ? "✓ Copie !" : "Copier"}</button>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{ai2[0].result}</p>
            </div>
          ) : <AIBloc state={ai2[0]} />}
        </div>
      ) : null}
    </div>
  );
}

function PistesIA(props) {
  var compte = props.compte;
  var tabState = useState("conflits");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });
  var ai4 = useState({ loading: false, result: null });
  var SYS = "Tu es conseiller prescriptif de haut niveau du Commandant des Forces de Police et de la Gendarmerie Nationale du Congo. Tes recommandations sont concretes, chiffrees et actionnables dans les 48h. Chaque action doit avoir un responsable, un delai et un indicateur de reussite.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  var TABS = [["conflits", "Gestion des Conflits", "⚔️"], ["detenus", "Gestion des Detenus", "🔒"], ["budget", "Mesures Budgetaires", "💰"], ["strategie", "Vision Strategique", "🎯"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-900 to-orange-900 border border-red-700 flex items-center justify-center text-2xl shrink-0">⚡</div>
        <div><h2 className="text-2xl font-black text-white">Pistes de Solution — IA Prescriptive</h2><p className="text-slate-500 text-xs">Recommandations strategiques et operationnelles pour le Commandement</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "conflits" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).map(function (inc) { return (<div key={inc.id} className="border-l-2 pl-3" style={{ borderColor: GRAVITE_COLOR[inc.gravite] }}><p className="text-white text-sm font-semibold">{inc.type}</p><p className="text-slate-500 text-xs">{inc.lieu} — {inc.description}</p></div>); })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite, description: i.description, corps: i.corps }; }));
            callIA(ai1[1], "Fournis des pistes de resolution prescriptives pour chaque conflit/incident actif. Pour chaque incident: 1) STRATEGIE DE RESOLUTION (approche, acteurs, negociation ou force) 2) RESSOURCES A MOBILISER (unites, effectif, equipements) 3) DELAI DE RESOLUTION realiste 4) RISQUES D ESCALADE et mesures preventives 5) PRECEDENTS applicables. CONCLUSION: top 3 incidents a traiter en priorite absolue ce jour avec justification. Incidents actifs: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚔️ Obtenir les pistes de resolution des conflits actifs</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "detenus" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {GARDES_VUE_DATA.map(function (g) {
              var urg = g.heuresRestantes <= 12 && g.statut === "actif";
              return (<div key={g.id} className={"border rounded-xl p-3 " + (urg ? "border-red-700 bg-red-950/20" : "border-slate-700")}><div className="flex items-start justify-between gap-2"><div><p className={"font-bold text-sm " + (urg ? "text-red-300" : "text-white")}>{g.nom}{urg ? " ⚠️" : ""}</p><p className="text-slate-400 text-xs">Motif: {g.motif} | {g.heuresRestantes}h restantes</p></div><GavTimer heures={g.heuresRestantes} /></div></div>);
            })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(GARDES_VUE_DATA.map(function (g) { return { nom: g.nom, motif: g.motif, heuresRestantes: g.heuresRestantes, statut: g.statut }; }));
            callIA(ai2[1], "Fournis une analyse prescriptive des gardes a vue pour le Commandant. Pour chaque cas: 1) DECISION RECOMMANDEE (Liberation / Parquet / Prolongation / Hopital / Mise en examen) avec justification juridique 2) RISQUE LEGAL pour l Etat 3) ACTION dans la prochaine heure pour les cas urgents. BILAN: nombre de dossiers en risque de vice de procedure, recommandation de convocation d urgence du Parquet si necessaire. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔒 Obtenir les decisions prescriptives GAV</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}

      {tab === "budget" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {BUDGET_POSTES.filter(function (p) { return p.reel > p.budget; }).map(function (p) { var ec = p.reel - p.budget; return (<div key={p.poste} className="border-l-2 border-red-600 pl-3"><p className="text-red-300 font-bold text-sm">{p.poste}: +{ec}M FCFA (+{((ec / p.budget) * 100).toFixed(0)}%)</p><p className="text-slate-500 text-xs">Budget: {p.budget}M | Reel: {p.reel}M FCFA</p></div>); })}
          </div>
          <button onClick={function () {
            callIA(ai3[1], "Fournis des mesures correctives budgetaires prescriptives pour le Commandant CFP. Pour chaque poste en derapage: 1) MESURE CORRECTIVE IMMEDIATE avec responsable et delai 2) ECONOMIES REALISABLES en FCFA 3) IMPACT sur les operations. Plan global: redressement budgetaire 30 jours, postes a geler, simulation de l equilibre si mesures appliquees. Donnees: " + JSON.stringify(BUDGET_POSTES));
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">💰 Obtenir les mesures correctives budgetaires</button>
          <AIBloc state={ai3[0]} />
        </div>
      ) : null}

      {tab === "strategie" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="🎯" label="Taux resolution" value={Math.round(INCIDENTS_DATA.filter(function (i) { return i.statut === "cloture"; }).length / INCIDENTS_DATA.length * 100) + "%"} color="#22C55E" />
            <StatCard icon="⚡" label="GAV critiques" value={GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6; }).length} color="#DC2626" />
            <StatCard icon="📊" label="Budget exe." value={Math.round(BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) / BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) * 100) + "%"} color="#F59E0B" />
          </div>
          <button onClick={function () {
            var ctx = "Incidents actifs=" + INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length + " | Taux resolution=" + Math.round(INCIDENTS_DATA.filter(function (i) { return i.statut === "cloture"; }).length / INCIDENTS_DATA.length * 100) + "% | Agents actifs=" + AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length + "/" + AGENTS_DATA.length + " | Budget execution=" + Math.round(BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) / BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) * 100) + "% | Vehicules dispo=" + VEHICULES_DATA.filter(function (v) { return v.statut !== "maintenance"; }).length + "/" + VEHICULES_DATA.length;
            callIA(ai4[1], "Vision strategique prescriptive complete pour le Commandant CFP/CGN du Congo. Structure: 1) DIAGNOSTIC SWOT (Forces/Faiblesses/Opportunites/Menaces) 2) TOP 5 PRIORITES STRATEGIQUES 90 jours (avec indicateur reussite) 3) DECISIONS CLE a prendre cette semaine 4) RESSOURCES CRITIQUES a securiser 5) RISQUES MAJEURS pour la securite nationale 6) MESSAGE AU COMMANDANT: en une phrase, priorite numero 1 aujourd hui. KPIs: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🎯 Obtenir la vision strategique prescriptive</button>
          <AIBloc state={ai4[0]} />
        </div>
      ) : null}
    </div>
  );
}

var COMMANDEMENTS_TERRITORIAUX_DATA = [
  { nom: "Brazzaville", commandant: "Commissaire Divisionnaire OKEMBA Marcel", effectif: 1240, statut: "operationnel" },
  { nom: "Pointe-Noire", commandant: "Commissaire Divisionnaire BALOU Christine", effectif: 980, statut: "operationnel" },
  { nom: "Bouenza", commandant: "Commissaire Principal MABIALA Joseph", effectif: 210, statut: "operationnel" },
  { nom: "Niari", commandant: "Commissaire Principal NGOMA Felix", effectif: 195, statut: "operationnel" },
  { nom: "Pool", commandant: "Commissaire Principal BIKINDOU Andre", effectif: 240, statut: "vigilance_renforcee" },
  { nom: "Djoue-Lefini", commandant: "Commissaire MALONGA Patrick", effectif: 130, statut: "operationnel" },
  { nom: "Plateaux", commandant: "Commissaire Principal ELENGA Suzanne", effectif: 175, statut: "operationnel" },
  { nom: "Cuvette Centrale", commandant: "Commissaire Principal IBARA Daniel", effectif: 160, statut: "operationnel" },
  { nom: "Cuvette Est", commandant: "Commissaire MOUKALA Rose", effectif: 110, statut: "operationnel" },
  { nom: "Sangha", commandant: "Commissaire OBALA Etienne", effectif: 95, statut: "effectifs_reduits" },
  { nom: "Likouala", commandant: "Commissaire NGAKOSSO Albertine", effectif: 105, statut: "effectifs_reduits" }
];
var STATUT_COMMANDEMENT_COLOR = { operationnel: "#22C55E", vigilance_renforcee: "#F59E0B", effectifs_reduits: "#DC2626" };
var STATUT_COMMANDEMENT_LABEL = { operationnel: "Operationnel", vigilance_renforcee: "Vigilance renforcee", effectifs_reduits: "Effectifs reduits" };

var GROUPES_INTERVENTION_DATA = [
  { id: "GI-BAC", nom: "Brigade Anti-Criminelle", sigle: "BAC", effectif: 85, chef: "Commissaire Principal NGOYI Bertrand", zone: "Brazzaville et Pointe-Noire", statut: "deploye", mission: "Surveillance renforcee du Marche Total suite a la hausse des vols a main armee." },
  { id: "GI-BSIR", nom: "Brigade Speciale d Intervention et de Repression", sigle: "BSIR", effectif: 60, chef: "Commissaire Principal LIKIBI Aristide", zone: "Brazzaville", statut: "alerte", mission: "En alerte pour appui aux commandements territoriaux en cas de trouble grave a l ordre public." },
  { id: "GI-UI", nom: "Unite d Intervention", sigle: "UI", effectif: 70, chef: "Commissaire Principal MAVOUNGOU Cherubin", zone: "Pointe-Noire et zone portuaire", statut: "deploye", mission: "Renforcement du dispositif de securite de la zone portuaire." }
];
var STATUT_GI_COLOR = { deploye: "#F59E0B", alerte: "#DC2626", garnison: "#22C55E" };
var STATUT_GI_LABEL = { deploye: "Deploye sur le terrain", alerte: "En alerte — pret a intervenir", garnison: "En garnison" };

var DIRECTIONS_CENTRALES_CFP = [
  { role: "judiciaire", nom: "Direction de la Police Judiciaire (DPJ)", sousServices: ["INTERPOL Brazzaville"] },
  { role: "renseignement", nom: "Direction des Renseignements Generaux (DRG)", sousServices: [] }
];
var SERVICES_SOUS_CFP = [
  { role: "commissariat", nom: "Commissariats de Police" },
  { role: "accidents", nom: "Bureau Controle Accidents" },
  { role: "navale", nom: "Police Navale" },
  { role: "operations", nom: "Operations & Maintien de l Ordre" },
  { role: "controle", nom: "Controle Voyageurs & Frontieres" }
];

function DashboardCFP(props) {
  var compte = props.compte;
  var detailState = useState(null);
  var detail = detailState[0]; var setDetail = detailState[1];

  var corpsCible = compte.corps === "Gendarmerie" ? "Gendarmerie" : "Police";
  function estDuCorpsCommande(g) { var estGend = g.auteur.toLowerCase().indexOf("gendarmerie") >= 0; return corpsCible === "Police" ? !estGend : estGend; }

  var incidentsActifs = INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours" && i.corps === corpsCible; }).length;
  var gavActives = GARDES_VUE_DATA.filter(function (g) { return (g.statut === "actif" || g.statut === "prolonge") && estDuCorpsCommande(g); }).length;
  var gavCritiques = GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6 && g.statut === "actif" && estDuCorpsCommande(g); }).length;
  var patrouillesTerrain = PATROUILLES_DATA.filter(function (p) { return p.statut !== "base" && p.corps === corpsCible; }).length;
  var totalPatrouillesPolice = PATROUILLES_DATA.filter(function (p) { return p.corps === corpsCible; }).length;
  var effectifsActifs = AGENTS_DATA.filter(function (a) { return a.statut === "actif" && a.corps === corpsCible; }).length;
  var totalAgents = AGENTS_DATA.filter(function (a) { return a.corps === corpsCible; }).length;
  var policeCount = totalAgents;

  var graviteData = [
    { name: "Critique", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.corps === corpsCible; }).length, color: GRAVITE_COLOR.critique },
    { name: "Grave", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "grave" && i.corps === corpsCible; }).length, color: GRAVITE_COLOR.grave },
    { name: "Moyen", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "moyen" && i.corps === corpsCible; }).length, color: GRAVITE_COLOR.moyen }
  ];
  var giData = GROUPES_INTERVENTION_DATA.map(function (g) { return { name: g.sigle, value: g.effectif, color: STATUT_GI_COLOR[g.statut] }; });
  var statutAgentsData = [
    { name: "Actifs", value: AGENTS_DATA.filter(function (a) { return a.corps === corpsCible && a.statut === "actif"; }).length, color: "#22C55E" },
    { name: "Conge", value: AGENTS_DATA.filter(function (a) { return a.corps === corpsCible && a.statut === "conge"; }).length, color: "#3B82F6" },
    { name: "Autre", value: AGENTS_DATA.filter(function (a) { return a.corps === corpsCible && a.statut !== "actif" && a.statut !== "conge"; }).length, color: "#F59E0B" }
  ];

  var incidentsCritiques = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours" && i.corps === corpsCible; }).slice(0, 4);
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var echeancesDuJour = EVENTS_DATA.filter(function (e) { var dt = new Date(e.date + "T00:00:00"); return Math.round((dt - today) / 86400000) === 0 && e.statut === "planifie"; }).slice(0, 4);

  function toggleDetail(id) { setDetail(detail === id ? null : id); }

  var engorgementAI = useState({ loading: false, result: null });
  var SYS_CFP = "Tu es l assistant d aide a la decision du Commandant des Forces de " + corpsCible + " de la Republique du Congo. Tu reponds en francais, de maniere structuree, concise et directement actionnable.";
  function callIA_CFP(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS_CFP, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var groupesState = useState([
    { id: "GT-001", titre: "Operation Port de Brazzaville", services: ["DAF", "DPJ", "Logistique"], dateCreation: "2026-06-18", messages: [{ auteur: "DPJ", texte: "Premiers elements de l enquete transmis au groupe.", date: "2026-06-18 10:05" }, { auteur: "Logistique", texte: "2 vehicules supplementaires mis a disposition pour la zone portuaire.", date: "2026-06-18 14:30" }] },
    { id: "GT-002", titre: "Securisation Sommet Regional", services: ["DAF", "Personnel", "Logistique"], dateCreation: "2026-06-15", messages: [{ auteur: "Personnel", texte: "Plan de roulement des effectifs valide pour la semaine du sommet.", date: "2026-06-15 09:00" }] }
  ]);
  var groupes = groupesState[0]; var setGroupes = groupesState[1];
  var groupeFormState = useState(false);
  var groupeFormOuvert = groupeFormState[0]; var setGroupeFormOuvert = groupeFormState[1];
  var nouveauGroupeTitreState = useState("");
  var nouveauGroupeTitre = nouveauGroupeTitreState[0]; var setNouveauGroupeTitre = nouveauGroupeTitreState[1];
  var nouveauGroupeServicesState = useState([]);
  var nouveauGroupeServices = nouveauGroupeServicesState[0]; var setNouveauGroupeServices = nouveauGroupeServicesState[1];
  var groupeActifState = useState(null);
  var groupeActif = groupeActifState[0]; var setGroupeActif = groupeActifState[1];
  var messageTexteState = useState("");
  var messageTexte = messageTexteState[0]; var setMessageTexte = messageTexteState[1];
  var SERVICES_DISPONIBLES = ["DAF", "DPJ", "Logistique", "Personnel", "Renseignements", "Academie"];

  function toggleServiceGroupe(s) {
    setNouveauGroupeServices(function (prev) { return prev.indexOf(s) >= 0 ? prev.filter(function (x) { return x !== s; }) : prev.concat([s]); });
  }
  function creerGroupe() {
    if (!nouveauGroupeTitre.trim() || nouveauGroupeServices.length === 0) { return; }
    var g = { id: "GT-" + Date.now(), titre: nouveauGroupeTitre, services: nouveauGroupeServices, dateCreation: new Date().toISOString().slice(0, 10), messages: [] };
    setGroupes(function (prev) { return [g].concat(prev); });
    setNouveauGroupeTitre(""); setNouveauGroupeServices([]); setGroupeFormOuvert(false);
  }
  function envoyerMessageGroupe(id) {
    if (!messageTexte.trim()) { return; }
    setGroupes(function (prev) { return prev.map(function (g) { if (g.id !== id) { return g; } var c = {}; for (var k in g) { c[k] = g[k]; } c.messages = g.messages.concat([{ auteur: compte.service, texte: messageTexte, date: new Date().toLocaleString("fr-FR") }]); return c; }); });
    setMessageTexte("");
  }

  var drgAlerteOuverteState = useState(null);
  var drgAlerteOuverte = drgAlerteOuverteState[0]; var setDrgAlerteOuverte = drgAlerteOuverteState[1];
  var TENDANCES_DRG = [
    { id: "TD1", titre: "Tensions en hausse au secteur portuaire", domaine: "economique", niveau: "eleve", lieu: "Zone portuaire, Pointe-Noire", synthese: "Accumulation des retards de paiement chez les dockers et rupture d approvisionnement signalee sur le marche local. Risque de mouvement social a surveiller dans les 7 jours." },
    { id: "TD2", titre: "Mouvements suspects en zone frontaliere", domaine: "securitaire", niveau: "critique", lieu: "Zone portuaire, Pointe-Noire", synthese: "Vehicules non identifies observes a plusieurs reprises pres du poste frontalier sans manifeste declare. Surveillance renforcee en cours, dossier transmis pour validation de transfert." },
    { id: "TD3", titre: "Mobilisation citoyenne en preparation", domaine: "social", niveau: "eleve", lieu: "Bacongo, Brazzaville", synthese: "Appel a manifester relaye massivement sur les reseaux sociaux suite a la hausse du prix du carburant. Forte capacite de mobilisation rapide observee." }
  ];

  var REACTIVITE_24H = [
    { heure: "00h", minutes: 14 }, { heure: "02h", minutes: 12 }, { heure: "04h", minutes: 11 }, { heure: "06h", minutes: 15 },
    { heure: "08h", minutes: 19 }, { heure: "10h", minutes: 22 }, { heure: "12h", minutes: 26 }, { heure: "14h", minutes: 24 },
    { heure: "16h", minutes: 28 }, { heure: "18h", minutes: 32 }, { heure: "20h", minutes: 29 }, { heure: "22h", minutes: 20 }
  ];
  var dernierePoint = REACTIVITE_24H[REACTIVITE_24H.length - 1].minutes;
  var pointPrecedent = REACTIVITE_24H[REACTIVITE_24H.length - 2].minutes;
  var tendanceHausse = dernierePoint >= pointPrecedent;

  var KPIS = [
    { id: "incidents", icon: <Siren size={18} />, label: "Incidents actifs", value: incidentsActifs, sub: "Toutes unites", color: "#DC2626" },
    { id: "gardesvue", icon: <Lock size={18} />, label: "Gardes a vue", value: gavActives, sub: gavCritiques + " en delai critique", color: "#F59E0B" },
    { id: "patrouilles", icon: <Car size={18} />, label: "Patrouilles deployees", value: patrouillesTerrain, sub: corpsCible, color: "#3B82F6" },
    { id: "effectifs", icon: <Users size={18} />, label: "Effectifs en service", value: effectifsActifs, sub: totalAgents + " agents geres", color: "#16A34A" }
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Centre de Commandement — {corpsCible === "Police" ? "CFP" : "CGN"}</h2><p className="text-slate-400 text-sm">{compte.service} — {corpsCible} Nationale uniquement</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Systeme operationnel</span></div>
      </div>
      {corpsCible === "Police" ? (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-3 flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 text-xs font-bold shrink-0">Commandement territorial :</span>
          {COMMANDEMENTS_TERRITORIAUX_DATA.map(function (c) { return <Chip key={c.nom} color={STATUT_COMMANDEMENT_COLOR[c.statut]}>{c.nom}</Chip>; })}
          {props.onNavigate ? <button onClick={function () { props.onNavigate("territorial"); }} className="text-purple-400 text-xs font-bold underline ml-1">Voir le detail →</button> : null}
        </div>
      ) : null}
      {corpsCible === "Police" ? (
        <div className="bg-purple-950/40 rounded-2xl border border-purple-800 p-3 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-purple-300 font-bold shrink-0">Directions Centrales du CFP :</span>
          <Chip color="#8B5CF6">Police Judiciaire (DPJ) — dont INTERPOL Brazzaville</Chip>
          <Chip color="#581C87">Renseignements Generaux (DRG)</Chip>
          <span className="text-slate-500">— seul le CGN (Gendarmerie) est autonome</span>
        </div>
      ) : null}
      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white font-bold text-sm">Reactivite des unites — 24 dernieres heures</p>
          <Chip color={tendanceHausse ? "#DC2626" : "#22C55E"}>{tendanceHausse ? "⚠ En hausse" : "✓ Stable"}</Chip>
        </div>
        <p className="text-slate-500 text-xs mb-3">Temps moyen d intervention (minutes) — si la courbe monte, les unites sont surchargees</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REACTIVITE_24H}>
              <defs><linearGradient id="reactGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F59E0B" stopOpacity={0.5} /><stop offset="95%" stopColor="#F59E0B" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="heure" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="min" />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + " min"]; }} />
              <Area type="monotone" dataKey="minutes" stroke="#F59E0B" fill="url(#reactGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-indigo-800 p-5">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <p className="text-white font-bold text-sm flex items-center gap-2">🧭 Anticipation IA — Risque d engorgement (3h a venir)</p>
          {(function () {
            var chargeUnites = totalPatrouillesPolice > 0 ? Math.round((patrouillesTerrain / totalPatrouillesPolice) * 100) : 0;
            var score = Math.min(100, Math.round(chargeUnites * 0.5 + incidentsActifs * 8 + gavCritiques * 6 + (tendanceHausse ? 15 : 0)));
            var col = score < 40 ? "#22C55E" : score < 70 ? "#F59E0B" : "#DC2626";
            var lbl = score < 40 ? "Risque faible" : score < 70 ? "Risque modere" : "Risque eleve";
            return <Chip color={col}>{lbl} — {score}/100</Chip>;
          })()}
        </div>
        <p className="text-slate-500 text-xs mb-3">Score predictif calcule a partir de la charge des unites, des incidents en cours et de la tendance de reactivite — anticipe l engorgement avant qu il ne se traduise par une hausse du temps d intervention</p>
        <button onClick={function () {
          var chargeUnites = totalPatrouillesPolice > 0 ? Math.round((patrouillesTerrain / totalPatrouillesPolice) * 100) : 0;
          var score = Math.min(100, Math.round(chargeUnites * 0.5 + incidentsActifs * 8 + gavCritiques * 6 + (tendanceHausse ? 15 : 0)));
          var ctx = "Score de risque d engorgement: " + score + "/100 | Charge des patrouilles deployees: " + chargeUnites + "% | Incidents actifs: " + incidentsActifs + " | GAV en delai critique: " + gavCritiques + " | Tendance du temps d intervention: " + (tendanceHausse ? "en hausse" : "stable") + " | Patrouilles: " + JSON.stringify(PATROUILLES_DATA.map(function (p) { return { designation: p.designation, zone: p.zone, statut: p.statut }; }));
          callIA_CFP(engorgementAI[1], "Sur la base du score de risque d engorgement et des donnees operationnelles, propose un redeploiement preventif des patrouilles pour les 3 prochaines heures, AVANT que le temps d intervention ne se degrade. Format: 1) ZONES A RENFORCER EN PRIORITE (avec justification chiffree) 2) UNITES A REDEPLOYER (lesquelles, depuis ou) 3) DELAI D ACTION RECOMMANDE. Donnees: " + ctx);
        }} className="bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold">⚡ Generer la recommandation de redeploiement</button>
        <AIBloc state={engorgementAI[0]} />
      </div>
      <p className="text-slate-600 text-xs">Cliquez sur un indicateur pour afficher le detail</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map(function (kpi) {
          var isActive = detail === kpi.id;
          return (
            <button key={kpi.id} onClick={function () { toggleDetail(kpi.id); }} style={{ outline: isActive ? "2px solid " + kpi.color : "none", outlineOffset: "2px" }} className="text-left rounded-2xl w-full">
              <StatCard icon={kpi.icon} label={kpi.label} value={kpi.value} sub={kpi.sub} color={kpi.color} />
            </button>
          );
        })}
      </div>

      {detail === "incidents" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-red-800 p-5 animate-in">
          <div className="flex items-center justify-between mb-3"><p className="text-red-300 font-black text-sm">Incidents actifs — Detail complet</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).map(function (inc) {
              return (<div key={inc.id} className="border border-slate-700 rounded-xl p-3"><div className="flex items-start justify-between gap-2"><div><div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold text-sm">{inc.type}</span><Chip color={GRAVITE_COLOR[inc.gravite]}>{inc.gravite}</Chip><CorpsBadge corps={inc.corps} /></div><p className="text-slate-400 text-xs">{inc.lieu}</p><p className="text-slate-600 text-xs">{inc.id} — {inc.description}</p></div></div></div>);
            })}
          </div>
        </div>
      ) : null}

      {detail === "gardesvue" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-amber-800 p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-amber-300 font-black text-sm">Gardes a Vue — Suivi temps reel</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-3 max-h-64 overflow-auto">
            {GARDES_VUE_DATA.filter(function (g) { return g.statut !== "libere"; }).map(function (g) {
              return (<div key={g.id} className={"border rounded-xl p-3 " + (g.heuresRestantes <= 6 ? "border-red-700" : "border-slate-700")}><div className="flex items-start justify-between mb-2"><div><span className="text-white font-bold text-sm">{g.nom}</span><p className="text-slate-400 text-xs">Motif: {g.motif} — {g.unite}</p></div><Chip color={g.statut === "prolonge" ? "#8B5CF6" : g.heuresRestantes <= 6 ? "#DC2626" : "#F59E0B"}>{g.statut}</Chip></div><GavTimer heures={g.heuresRestantes} /></div>);
            })}
          </div>
        </div>
      ) : null}

      {detail === "patrouilles" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-blue-800 p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-blue-300 font-black text-sm">Patrouilles — Deploiement en cours</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {PATROUILLES_DATA.map(function (p) {
              var col = p.statut === "intervention" ? "#DC2626" : p.statut === "terrain" ? "#22C55E" : "#64748B";
              return (<div key={p.id} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between"><div><div className="flex items-center gap-2"><span style={{ color: col }} className="font-black">{p.designation}</span><CorpsBadge corps={p.corps} /></div><p className="text-slate-400 text-xs">{p.zone} — Chef: {p.chef}</p><p className="text-slate-500 text-xs">{p.effectif} agents — {p.vehicule}</p></div><Chip color={col}>{STATUT_PATROUILLE_LABEL[p.statut]}</Chip></div>);
            })}
          </div>
        </div>
      ) : null}

      {detail === "effectifs" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-green-800 p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-green-300 font-black text-sm">Effectifs — Etat du personnel</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {[["Actifs", "actif", "#22C55E"], ["En conge", "conge", "#3B82F6"], ["En promotion", "proposition_promotion", "#F59E0B"], ["Sanction", "sanction", "#DC2626"]].map(function (s) {
              return (<div key={s[0]} className="border border-slate-700 rounded-xl p-3"><p className="text-slate-500 text-xs">{s[0]}</p><p style={{ color: s[2] }} className="font-black text-xl">{AGENTS_DATA.filter(function (a) { return a.statut === s[1]; }).length}</p></div>);
            })}
          </div>
          <div className="space-y-1 max-h-40 overflow-auto">
            {AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).map(function (a) {
              return (<div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300 truncate">{a.nom}</span><div className="flex items-center gap-2 shrink-0"><span className="text-slate-500">{gradeLabel(a)}</span><CorpsBadge corps={a.corps} /></div></div>);
            })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Incidents par gravite</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graviteData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} cursor={{ fill: "#1E293B" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>{graviteData.map(function (entry, index) { return <Cell key={index} fill={entry.color} />; })}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">{corpsCible === "Police" ? "Effectifs des Groupes d Intervention" : "Effectifs par statut"}</p>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={corpsCible === "Police" ? giData : statutAgentsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={3} stroke="none">{(corpsCible === "Police" ? giData : statutAgentsData).map(function (entry, index) { return <Cell key={index} fill={entry.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} /></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-white text-2xl font-black">{corpsCible === "Police" ? GROUPES_INTERVENTION_DATA.reduce(function (s, g) { return s + g.effectif; }, 0) : totalAgents}</span><span className="text-slate-500 text-xs uppercase">Agents</span></div>
          </div>
          <div className="flex justify-center gap-3 mt-1 flex-wrap">
            {corpsCible === "Police" ? GROUPES_INTERVENTION_DATA.map(function (g) { return <span key={g.id} className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: STATUT_GI_COLOR[g.statut] }}></span>{g.sigle} ({g.effectif})</span>; }) : statutAgentsData.map(function (s) { return <span key={s.name} className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: s.color }}></span>{s.name} ({s.value})</span>; })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Incidents critiques en cours</p>
          {incidentsCritiques.length === 0 ? <p className="text-slate-500 text-sm">Aucun incident critique.</p> : <div className="space-y-2">{incidentsCritiques.map(function (inc) { return (<div key={inc.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: GRAVITE_COLOR[inc.gravite] }}><div><p className="text-white text-sm font-semibold">{inc.type}</p><p className="text-slate-500 text-xs">{inc.lieu}</p></div><CorpsBadge corps={inc.corps} /></div>); })}</div>}
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Echeances du jour</p>
          {echeancesDuJour.length === 0 ? <p className="text-slate-500 text-sm">Aucune echeance aujourd hui.</p> : <div className="space-y-2">{echeancesDuJour.map(function (e) { return (<div key={e.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: TYPE_COLOR[e.type] }}><div><p className="text-white text-sm font-semibold">{e.titre}</p><p className="text-slate-500 text-xs">{e.heure} — {e.lieu}</p></div><Chip color={TYPE_COLOR[e.type]}>{TYPE_LABEL[e.type]}</Chip></div>); })}</div>}
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <p className="text-white font-bold text-sm">🤝 Coordination Inter-Services</p>
          <button onClick={function () { setGroupeFormOuvert(!groupeFormOuvert); }} className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold">{groupeFormOuvert ? "Annuler" : "+ Creer un groupe de travail"}</button>
        </div>
        <p className="text-slate-500 text-xs mb-3">Groupes de travail temporaires reunissant plusieurs directions sans deplacement physique</p>
        {groupeFormOuvert ? (
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-3 mb-3 space-y-2">
            <input value={nouveauGroupeTitre} onChange={function (e) { setNouveauGroupeTitre(e.target.value); }} placeholder="Ex: Operation Port de Brazzaville..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
            <div className="flex gap-1.5 flex-wrap">
              {SERVICES_DISPONIBLES.map(function (s) {
                var sel = nouveauGroupeServices.indexOf(s) >= 0;
                return <button key={s} onClick={function () { toggleServiceGroupe(s); }} className={"px-2.5 py-1 rounded-full text-xs font-bold border " + (sel ? "bg-blue-700 border-blue-600 text-white" : "border-slate-700 text-slate-500")}>{s}</button>;
              })}
            </div>
            <button onClick={creerGroupe} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Creer le groupe</button>
          </div>
        ) : null}
        <div className="space-y-2">
          {groupes.map(function (g) {
            var isOuvert = groupeActif === g.id;
            return (
              <div key={g.id} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 flex-wrap cursor-pointer" onClick={function () { setGroupeActif(isOuvert ? null : g.id); }}>
                  <div>
                    <p className="text-white font-bold text-sm">{g.titre}</p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">{g.services.map(function (s) { return <Chip key={s} color="#3B82F6">{s}</Chip>; })}</div>
                  </div>
                  <span className="text-slate-500 text-xs shrink-0">{g.messages.length} message{g.messages.length > 1 ? "s" : ""} — {isOuvert ? "▲" : "▼"}</span>
                </div>
                {isOuvert ? (
                  <div className="mt-3 border-t border-slate-800 pt-2 space-y-2">
                    <div className="space-y-1.5 max-h-32 overflow-auto">
                      {g.messages.map(function (m, idx) {
                        return (<div key={idx} className="text-xs"><span className="text-blue-400 font-bold">{m.auteur}</span><span className="text-slate-600"> — {m.date}</span><p className="text-slate-300">{m.texte}</p></div>);
                      })}
                      {g.messages.length === 0 ? <p className="text-slate-600 text-xs">Aucune ressource partagee pour le moment.</p> : null}
                    </div>
                    <div className="flex gap-2">
                      <input value={messageTexte} onChange={function (e) { setMessageTexte(e.target.value); }} onKeyDown={function (e) { if (e.key === "Enter") { envoyerMessageGroupe(g.id); } }} placeholder="Partager une ressource ou un message au groupe..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs" />
                      <button onClick={function () { envoyerMessageGroupe(g.id); }} className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Envoyer</button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900/80 rounded-2xl border border-purple-800 p-5">
        <div className="flex items-center gap-2 mb-1"><Lock size={14} className="text-purple-400" /><p className="text-purple-300 font-bold text-sm">Indicateurs DRG — Veille et Signaux Faibles</p></div>
        <p className="text-slate-500 text-xs mb-3">Cloisonnement actif : seules les tendances et syntheses validees par la DRG sont visibles ici. Cliquez sur une tendance pour ouvrir la fiche de synthese securisee correspondante.</p>
        <div className="space-y-2 mb-4">
          {TENDANCES_DRG.map(function (t) {
            var isOuvert = drgAlerteOuverte === t.id;
            return (
              <div key={t.id}>
                <div onClick={function () { setDrgAlerteOuverte(isOuvert ? null : t.id); }} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5 cursor-pointer hover:bg-slate-800/50 rounded px-1">
                  <span className="text-slate-300">{t.titre}</span>
                  <Chip color={NIVEAU_RENS_COLOR[t.niveau]}>{NIVEAU_RENS_LABEL[t.niveau]}</Chip>
                </div>
                {isOuvert ? (
                  <div className="bg-slate-950 rounded-xl border border-purple-800 p-3 mt-1.5 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5"><Chip color={DOMAINE_RENS_COLOR[t.domaine]}>{DOMAINE_RENS_LABEL[t.domaine]}</Chip><span className="text-slate-500 text-xs">{t.lieu}</span></div>
                    <p className="text-slate-300 text-xs leading-relaxed">{t.synthese}</p>
                    <p className="text-purple-500 text-[10px] mt-1.5">🔒 Fiche de synthese securisee — source et fiches brutes non communiquees</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="text-purple-300 font-black text-[10px] uppercase mb-1">Notes de synthese transmises et accusees de reception</p>
        <div className="space-y-2">
          {NOTES_TRANSMISES_DATA.filter(function (n) { return n.statut === "accuse_reception"; }).slice(0, 3).map(function (n) {
            return (<div key={n.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{n.titre}</span><Chip color={NIVEAU_RENS_COLOR[n.niveau]}>{NIVEAU_RENS_LABEL[n.niveau]}</Chip></div>);
          })}
        </div>
      </div>
    </div>
  );
}

function CommandementTerritorialCFP(props) {
  var compte = props.compte;
  var tabState = useState("territoires");
  var tab = tabState[0]; var setTab = tabState[1];
  var TABS = [["territoires", "Commandements Territoriaux", "🗺️"], ["intervention", "Groupes d Intervention", "🚨"], ["services", "Services sous Commandement", "🏛️"]];
  var totalEffectifTerritorial = COMMANDEMENTS_TERRITORIAUX_DATA.reduce(function (s, c) { return s + c.effectif; }, 0);
  var totalEffectifGI = GROUPES_INTERVENTION_DATA.reduce(function (s, g) { return s + g.effectif; }, 0);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-white">Commandement Territorial de la Police</h2>
        <p className="text-slate-500 text-xs">{compte.service} — autorite exercee exclusivement sur les forces de Police. La Gendarmerie Nationale releve d un commandement distinct (CGN).</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🗺️" label="Commandements territoriaux" value={COMMANDEMENTS_TERRITORIAUX_DATA.length} color="#3B82F6" />
        <StatCard icon="👮" label="Effectifs territoriaux" value={totalEffectifTerritorial} color="#22C55E" />
        <StatCard icon="🚨" label="Effectifs Groupes d Intervention" value={totalEffectifGI} color="#F59E0B" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-blue-700 text-white border-blue-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "territoires" ? (
        <div className="space-y-2">
          {COMMANDEMENTS_TERRITORIAUX_DATA.map(function (c) {
            return (
              <div key={c.nom} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between gap-2 flex-wrap">
                <div><p className="text-white font-bold text-sm">{c.nom}</p><p className="text-slate-500 text-xs">{c.commandant}</p></div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-sm font-bold">{c.effectif} agents</span>
                  <Chip color={STATUT_COMMANDEMENT_COLOR[c.statut]}>{STATUT_COMMANDEMENT_LABEL[c.statut]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "intervention" ? (
        <div className="space-y-3">
          {GROUPES_INTERVENTION_DATA.map(function (g) {
            return (
              <div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-white font-bold text-sm">{g.nom} ({g.sigle})</p>
                    <p className="text-slate-500 text-xs">Chef : {g.chef} — Zone : {g.zone}</p>
                  </div>
                  <Chip color={STATUT_GI_COLOR[g.statut]}>{STATUT_GI_LABEL[g.statut]}</Chip>
                </div>
                <p className="text-slate-300 text-xs mt-2"><span className="text-slate-500 font-bold">Mission actuelle : </span>{g.mission}</p>
                <p className="text-slate-600 text-xs mt-1">Effectif : {g.effectif} agents</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "services" ? (
        <div className="space-y-4">
          <div>
            <p className="text-purple-300 font-black text-xs uppercase mb-2">Directions Centrales du Commandement des Forces de Police</p>
            <div className="space-y-2">
              {DIRECTIONS_CENTRALES_CFP.map(function (d) {
                return (
                  <div key={d.role} className="bg-slate-800/90 rounded-2xl border border-purple-800 p-4">
                    <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span><p className="text-white text-sm font-semibold">{d.nom}</p></div>
                    {d.sousServices.length > 0 ? (
                      <div className="mt-2 ml-5 space-y-1">
                        {d.sousServices.map(function (s) { return <p key={s} className="text-slate-400 text-xs">↳ {s} <span className="text-slate-600">(service rattache)</span></p>; })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-black uppercase mb-2">Services Operationnels & Territoriaux</p>
            <div className="space-y-2">
              {SERVICES_SOUS_CFP.map(function (s) {
                return (
                  <div key={s.role} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                    <p className="text-white text-sm font-semibold">{s.nom}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-slate-600 text-xs pt-2">Note : la Direction de la Police Judiciaire (DPJ) et la Direction des Renseignements Generaux (DRG) sont des Directions Centrales placees sous le commandement des Forces de Police. INTERPOL Brazzaville est un service rattache a la DPJ. Seul le Commandement de la Gendarmerie Nationale (CGN), corps distinct, demeure une direction autonome — coordonnee avec le CFP via la Coordination Inter-Services.</p>
        </div>
      ) : null}
    </div>
  );
}

function DashboardDAF(props) {
  var compte = props.compte;
  var totalB = BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0);
  var totalR = BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0);
  var resteADepenser = totalB - totalR;
  var tauxGlobal = Math.round((totalR / totalB) * 100);
  var TRESORERIE_URGENCE = 32500000;
  var TRESORERIE_AVANCES = 8200000;

  var seuils = BUDGET_POSTES.map(function (p) {
    var taux = Math.round((p.reel / p.budget) * 100);
    var niveau = taux >= 100 ? "critique" : taux >= 90 ? "haute" : taux >= 75 ? "moyenne" : "ok";
    return { poste: p.poste, taux: taux, niveau: niveau, budget: p.budget, reel: p.reel };
  });
  var NIV_COL = { critique: "#DC2626", haute: "#F59E0B", moyenne: "#EAB308", ok: "#22C55E" };
  var NIV_LABEL = { critique: "Seuil depasse (100%+)", haute: "Seuil critique (90%+)", moyenne: "Seuil d alerte (75%+)", ok: "Sous controle" };

  var enAttenteDAF = ENGAGEMENTS_DATA.filter(function (e) { return e.statut === "en_attente"; }).length;
  var enAttenteCmd = ENGAGEMENTS_DATA.filter(function (e) { return e.statut === "attente_commandant"; }).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Cockpit du DAF</h2><p className="text-slate-400 text-sm">{compte.service} — Pilotage financier en temps reel</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Comptes a jour</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📊" label="Budget total alloue" value={totalB + "M"} sub="FCFA — exercice 2026" color="#3B82F6" />
        <StatCard icon="💸" label="Taux de consommation" value={tauxGlobal + "%"} sub={totalR + "M / " + totalB + "M FCFA"} color={tauxGlobal >= 100 ? "#DC2626" : tauxGlobal >= 90 ? "#F59E0B" : "#22C55E"} />
        <StatCard icon="✅" label="Reste a depenser" value={(resteADepenser >= 0 ? "" : "-") + Math.abs(resteADepenser) + "M"} sub="FCFA disponibles" color={resteADepenser >= 0 ? "#22C55E" : "#DC2626"} />
        <StatCard icon="⏳" label="Engagements en attente" value={enAttenteDAF + enAttenteCmd} sub={enAttenteDAF + " a verifier, " + enAttenteCmd + " au Commandant"} color="#8B5CF6" />
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Tresorerie operationnelle</p>
        <p className="text-slate-500 text-xs mb-3">Fonds disponibles pour missions urgentes et avances de caisse</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-950 rounded-xl p-4 border border-green-800"><p className="text-slate-500 text-xs uppercase">Missions urgentes</p><p className="text-green-400 font-black text-2xl mt-1">{TRESORERIE_URGENCE.toLocaleString("fr-FR")} FCFA</p></div>
          <div className="bg-slate-950 rounded-xl p-4 border border-blue-800"><p className="text-slate-500 text-xs uppercase">Avances de caisse</p><p className="text-blue-400 font-black text-2xl mt-1">{TRESORERIE_AVANCES.toLocaleString("fr-FR")} FCFA</p></div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Execution budgetaire — Grandes categories</p>
        <p className="text-slate-500 text-xs mb-3">Consomme vs reste disponible — donnees probantes pour le Parlement</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={(function () {
              var MACRO = { Personnel: "Personnel", Carburant: "Logistique", Maintenance: "Logistique", Equipements: "Logistique", Missions: "Fonctionnement", Formation: "Fonctionnement" };
              var agg = {};
              BUDGET_POSTES.forEach(function (p) {
                var cat = MACRO[p.poste] || "Autre";
                if (!agg[cat]) { agg[cat] = { categorie: cat, budget: 0, reel: 0 }; }
                agg[cat].budget += p.budget; agg[cat].reel += p.reel;
              });
              return Object.values(agg).map(function (c) { return { categorie: c.categorie, consomme: Math.min(c.reel, c.budget), depassement: Math.max(c.reel - c.budget, 0), reste: Math.max(c.budget - c.reel, 0) }; });
            })()} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="categorie" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} formatter={function (v) { return v === "consomme" ? "Consomme" : v === "depassement" ? "Depassement" : "Reste disponible"; }} />
              <Bar dataKey="consomme" stackId="b" fill="#3B82F6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="depassement" stackId="b" fill="#DC2626" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reste" stackId="b" fill="#1E293B" stroke="#334155" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Alertes de seuils par poste budgetaire</p>
        <div className="space-y-2">
          {seuils.map(function (s) {
            return (
              <div key={s.poste} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm font-semibold">{s.poste}</span>
                  <Chip color={NIV_COL[s.niveau]}>{NIV_LABEL[s.niveau]}</Chip>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: Math.min(100, s.taux) + "%", background: NIV_COL[s.niveau] }}></div></div>
                  <span className="text-slate-400 text-xs w-12 text-right">{s.taux}%</span>
                </div>
                <p className="text-slate-600 text-xs mt-1">{s.reel}M / {s.budget}M FCFA</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TachesDAF(props) {
  var compte = props.compte;
  var engState = useState(ENGAGEMENTS_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var engs = engState[0]; var setEngs = engState[1];
  var tabState = useState("todo");
  var tab = tabState[0]; var setTab = tabState[1];

  function valider(id) {
    setEngs(function (prev) {
      return prev.map(function (e) {
        if (e.id !== id) { return e; }
        var c = {}; for (var k in e) { c[k] = e[k]; }
        c.statut = e.montant >= SEUIL_VALIDATION_COMMANDANT ? "attente_commandant" : "valide";
        return c;
      });
    });
  }
  function rejeter(id) { setEngs(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "rejete"; return c; }); }); }

  var PRIO_COL = { urgente: "#DC2626", haute: "#F59E0B", normale: "#3B82F6" };
  var PRIO_LABEL = { urgente: "Urgent", haute: "Priorite haute", normale: "Normal" };
  var PRIO_ORDER = { urgente: 0, haute: 1, normale: 2 };

  var todo = engs.filter(function (e) { return e.statut === "en_attente"; }).sort(function (a, b) { return PRIO_ORDER[a.priorite] - PRIO_ORDER[b.priorite]; });
  var journal = engs.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  var TABS = [["todo", "A traiter (" + todo.length + ")", "✅"], ["journal", "Journal des engagements", "📜"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-900 to-emerald-900 border border-green-700 flex items-center justify-center text-2xl shrink-0">📋</div>
        <div><h2 className="text-2xl font-black text-white">Gestionnaire de Taches et Ordonnances</h2><p className="text-slate-500 text-xs">Validation technique, comptable et de conformite — {compte.service}</p></div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">Workflow de validation a double niveau</p>
        <p className="text-slate-400 text-xs">Le DAF verifie chaque engagement. Les montants superieurs ou egaux a {SEUIL_VALIDATION_COMMANDANT.toLocaleString("fr-FR")} FCFA sont automatiquement transmis au Commandant des Forces de Police pour validation finale avant execution.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-green-700 text-white border-green-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "todo" ? (
        <div className="space-y-3">
          {todo.length === 0 ? <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucune action en attente. Tout est traite.</div> : null}
          {todo.map(function (e) {
            var majeur = e.montant >= SEUIL_VALIDATION_COMMANDANT;
            return (
              <div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1"><span className="text-white font-bold text-sm">{e.objet}</span><Chip color={PRIO_COL[e.priorite]}>{PRIO_LABEL[e.priorite]}</Chip>{majeur ? <Chip color="#8B5CF6">Engagement majeur</Chip> : null}</div>
                    <p className="text-slate-400 text-xs">{e.service} — {e.date}</p>
                    <p className="text-green-400 font-black text-base mt-0.5">{e.montant.toLocaleString("fr-FR")} FCFA</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700">
                  <button onClick={function () { valider(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">{majeur ? "Verifier et transmettre au Commandant" : "Valider"}</button>
                  <button onClick={function () { rejeter(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Rejeter</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "journal" ? (
        <div className="space-y-2">
          {journal.map(function (e) {
            return (
              <div key={e.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between gap-2 flex-wrap">
                <div><p className="text-white font-semibold text-sm">{e.objet}</p><p className="text-slate-500 text-xs">{e.service} — {e.date} — {e.montant.toLocaleString("fr-FR")} FCFA</p></div>
                <Chip color={STC_ENG[e.statut]}>{STL_ENG[e.statut]}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function BudgetPrevisionsDAF(props) {
  var compte = props.compte;
  var tabState = useState("simulateur");
  var tab = tabState[0]; var setTab = tabState[1];
  var posteState = useState(BUDGET_POSTES[1].poste);
  var posteSim = posteState[0]; var setPosteSim = posteState[1];
  var pctState = useState(20);
  var pctSim = pctState[0]; var setPctSim = pctState[1];
  var simAI = useState({ loading: false, result: null });
  var SYS = "Tu es conseiller financier SIPGN. Reponds en francais, structure et chiffre en FCFA.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); });
  }

  var posteData = BUDGET_POSTES.find(function (p) { return p.poste === posteSim; });
  var impactM = posteData ? Math.round(posteData.reel * (pctSim / 100)) : 0;
  var nouveauTotal = posteData ? posteData.reel + impactM : 0;

  var TABS = [["simulateur", "Simulateur de Previsions", "🧪"], ["comparateur", "Comparateur Budget vs Reel", "📊"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-900 to-green-900 border border-teal-700 flex items-center justify-center text-2xl shrink-0">📈</div>
        <div><h2 className="text-2xl font-black text-white">Budget et Previsions</h2><p className="text-slate-500 text-xs">Simulation de scenarios et pilotage de l execution budgetaire — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-teal-700 text-white border-teal-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "simulateur" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Simuler l impact d une variation de cout</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Poste budgetaire</label>
                <select value={posteSim} onChange={function (e) { setPosteSim(e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                  {BUDGET_POSTES.map(function (p) { return <option key={p.poste} value={p.poste}>{p.poste}</option>; })}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Variation (%)</label>
                <input type="number" value={pctSim} onChange={function (e) { setPctSim(Number(e.target.value)); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
              </div>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-teal-800">
              <p className="text-slate-500 text-xs uppercase">Impact simule sur {posteSim}</p>
              <div className="flex items-center gap-4 mt-2">
                <div><p className="text-slate-500 text-xs">Depense actuelle</p><p className="text-white font-black text-xl">{posteData ? posteData.reel : 0}M FCFA</p></div>
                <span className="text-slate-600 text-xl">→</span>
                <div><p className="text-slate-500 text-xs">Nouvelle depense estimee</p><p className={(impactM >= 0 ? "text-red-400" : "text-green-400") + " font-black text-xl"}>{nouveauTotal}M FCFA</p></div>
                <div><p className="text-slate-500 text-xs">Impact</p><p className={(impactM >= 0 ? "text-red-400" : "text-green-400") + " font-black text-xl"}>{impactM >= 0 ? "+" : ""}{impactM}M FCFA</p></div>
              </div>
            </div>
            <button onClick={function () {
              callIA(simAI[1], "Analyse l impact d une variation de " + pctSim + "% sur le poste budgetaire '" + posteSim + "' pour la Police et Gendarmerie du Congo. Budget actuel du poste: " + (posteData ? posteData.budget : 0) + "M FCFA, depense reelle: " + (posteData ? posteData.reel : 0) + "M FCFA. Impact simule: " + (impactM >= 0 ? "+" : "") + impactM + "M FCFA, nouveau total estime: " + nouveauTotal + "M FCFA. Fournis: 1) Consequences operationnelles concretes de ce scenario 2) Mesures d attenuation possibles (substitution, negociation fournisseur, etalement) 3) Postes budgetaires a reequilibrer si ce scenario se realise 4) Recommandation finale au DAF. Contexte budget global: " + JSON.stringify(BUDGET_POSTES));
            }} className="bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 mt-3">🧪 Analyser ce scenario avec l'IA</button>
            <div className="mt-3"><AIBloc state={simAI[0]} /></div>
          </div>
        </div>
      ) : null}

      {tab === "comparateur" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Budget vs Reel (millions FCFA)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_POSTES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="poste" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
                  <Bar dataKey="budget" name="Budget" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar dataKey="reel" name="Reel" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span>Budget previsionnel</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-amber-400"></span>Depenses reelles</span></div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-1.5">
            {BUDGET_POSTES.map(function (p) { var ec = p.reel - p.budget; var col = ec > 0 ? "#DC2626" : "#22C55E"; return (<div key={p.poste} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{p.poste}</span><span style={{ color: col }} className="font-bold">{ec > 0 ? "+" : ""}{ec}M FCFA ({((ec / p.budget) * 100).toFixed(0)}%)</span></div>); })}
          </div>
          <div className="bg-amber-950/30 border border-amber-800 rounded-2xl p-4">
            <p className="text-amber-300 text-xs font-bold">📜 Besoin d un rapport pour l Assemblee Nationale ou le Senat ?</p>
            <p className="text-slate-500 text-xs mt-0.5">Rendez-vous dans le module "Rapports Institutionnels" pour generer un dossier complet (justificatifs de depenses, besoins RH et logistiques).</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

var BATIMENTS_DATA = [
  { id: "BAT-001", nom: "QG Commandement CFP Brazzaville", type: "Commandement", etat: "bon", derniereInspection: "2026-03-12", valeur: 850000000 },
  { id: "BAT-002", nom: "Commissariat Central BZV", type: "Commissariat", etat: "bon", derniereInspection: "2026-02-20", valeur: 320000000 },
  { id: "BAT-003", nom: "DCPJ Brazzaville", type: "Direction", etat: "a_renover", derniereInspection: "2025-11-05", valeur: 210000000 },
  { id: "BAT-004", nom: "Caserne Gendarmerie Pointe-Noire", type: "Caserne", etat: "bon", derniereInspection: "2026-04-01", valeur: 480000000 },
  { id: "BAT-005", nom: "Garage central — Direction Logistique", type: "Logistique", etat: "critique", derniereInspection: "2025-09-15", valeur: 95000000 }
];

var EQUIPEMENTS_LOURDS_DATA = [
  { id: "EQP-001", nom: "Groupe electrogene QG CFP", categorie: "Energie", etat: "operationnel", derniereMaintenance: "2026-05-10", prochaineMaintenance: "2026-08-10" },
  { id: "EQP-002", nom: "Serveur central SIPGN", categorie: "Informatique", etat: "operationnel", derniereMaintenance: "2026-06-01", prochaineMaintenance: "2026-09-01" },
  { id: "EQP-003", nom: "Vedette fluviale Police Navale", categorie: "Naval", etat: "maintenance_requise", derniereMaintenance: "2026-01-15", prochaineMaintenance: "2026-06-15" },
  { id: "EQP-004", nom: "Systeme radio-telecom national", categorie: "Communication", etat: "operationnel", derniereMaintenance: "2026-04-20", prochaineMaintenance: "2026-10-20" },
  { id: "EQP-005", nom: "Scanner documents — Poste frontalier", categorie: "Controle frontieres", etat: "maintenance_requise", derniereMaintenance: "2025-12-01", prochaineMaintenance: "2026-06-01" }
];

function InventairePatrimoine(props) {
  var compte = props.compte;
  var tabState = useState("batiments");
  var tab = tabState[0]; var setTab = tabState[1];

  var ETAT_BAT_COL = { bon: "#22C55E", a_renover: "#F59E0B", critique: "#DC2626" };
  var ETAT_BAT_LABEL = { bon: "Bon etat", a_renover: "A renover", critique: "Etat critique" };
  var ETAT_EQP_COL = { operationnel: "#22C55E", maintenance_requise: "#DC2626" };
  var ETAT_EQP_LABEL = { operationnel: "Operationnel", maintenance_requise: "Maintenance requise" };

  var today = new Date();
  function joursRestants(date) { var dt = new Date(date + "T00:00:00"); return Math.round((dt - today) / 86400000); }

  var valeurTotaleBatiments = BATIMENTS_DATA.reduce(function (s, b) { return s + b.valeur; }, 0);
  var TABS = [["batiments", "Batiments", "🏛️"], ["equipements", "Equipements Lourds", "⚙️"], ["vehicules", "Parc Automobile", "🚗"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center text-2xl shrink-0">🏛️</div>
        <div><h2 className="text-2xl font-black text-white">Inventaire et Patrimoine</h2><p className="text-slate-500 text-xs">Suivi des actifs lourds, batiments et parc automobile — {compte.service}</p></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🏛️" label="Batiments" value={BATIMENTS_DATA.length} sub={Math.round(valeurTotaleBatiments / 1000000) + "M FCFA"} color="#3B82F6" />
        <StatCard icon="⚙️" label="Equipements suivis" value={EQUIPEMENTS_LOURDS_DATA.length} sub={EQUIPEMENTS_LOURDS_DATA.filter(function (e) { return e.etat === "maintenance_requise"; }).length + " a entretenir"} color="#F59E0B" />
        <StatCard icon="🚗" label="Vehicules" value={VEHICULES_DATA.length} sub={VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length + " en maintenance"} color="#0EA5E9" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-slate-700 text-white border-slate-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "batiments" ? (
        <div className="space-y-2">
          {BATIMENTS_DATA.map(function (b) {
            return (
              <div key={b.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{b.nom}</p><p className="text-slate-500 text-xs">{b.type} — Inspection: {b.derniereInspection}</p><p className="text-slate-400 text-xs mt-0.5">Valeur estimee: {b.valeur.toLocaleString("fr-FR")} FCFA</p></div>
                  <Chip color={ETAT_BAT_COL[b.etat]}>{ETAT_BAT_LABEL[b.etat]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "equipements" ? (
        <div className="space-y-2">
          {EQUIPEMENTS_LOURDS_DATA.map(function (e) {
            var jr = joursRestants(e.prochaineMaintenance);
            var urgent = jr <= 14;
            return (
              <div key={e.id} className={"bg-slate-800/90 rounded-2xl border p-4 " + (urgent ? "border-red-700" : "border-slate-700")}>
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-white font-bold text-sm">{e.nom}</p>
                    <p className="text-slate-500 text-xs">{e.categorie} — Derniere maintenance: {e.derniereMaintenance}</p>
                    <p className={(urgent ? "text-red-400" : "text-slate-400") + " text-xs mt-0.5"}>{urgent ? "⚠️ " : ""}Prochaine maintenance: {e.prochaineMaintenance} ({jr >= 0 ? "dans " + jr + " jours" : "en retard de " + Math.abs(jr) + " jours"})</p>
                  </div>
                  <Chip color={ETAT_EQP_COL[e.etat]}>{ETAT_EQP_LABEL[e.etat]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "vehicules" ? (
        <div className="space-y-2">
          {VEHICULES_DATA.map(function (v) {
            var col = v.statut === "mission" ? "#22C55E" : v.statut === "maintenance" ? "#F59E0B" : "#3B82F6";
            return (
              <div key={v.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between">
                <div><p className="text-white font-bold font-mono">{v.immat}</p><p className="text-slate-400 text-sm">{v.marque} {v.type}</p><p className="text-slate-500 text-xs">{v.unite}</p></div>
                <div className="text-right"><CorpsBadge corps={v.corps} /><p className="mt-1"><Chip color={col}>{STATUT_VEHICULE_LABEL[v.statut]}</Chip></p><p className="text-slate-400 text-xs mt-1">{v.km.toLocaleString("fr-FR")} km</p></div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

var PATRIMOINE_CATEGORIES = [
  { nom: "Vehicules", valeur: 285000000, color: "#3B82F6" },
  { nom: "Armement", valeur: 165000000, color: "#DC2626" },
  { nom: "Batiments", valeur: 1955000000, color: "#8B5CF6" },
  { nom: "Equipements individuels", valeur: 72000000, color: "#22C55E" },
  { nom: "Informatique", valeur: 38000000, color: "#0EA5E9" }
];

var STOCKS_DATA = [
  { id: "STK-001", item: "Munitions 9mm", categorie: "Armement", niveau: 15, seuilCritique: 25, quantite: 1500, unite: "cartouches" },
  { id: "STK-002", item: "Pneus de patrouille", categorie: "Vehicules", niveau: 8, seuilCritique: 20, quantite: 6, unite: "unites" },
  { id: "STK-003", item: "Gilets pare-balles", categorie: "Equipements", niveau: 42, seuilCritique: 30, quantite: 21, unite: "unites" },
  { id: "STK-004", item: "Uniformes (toutes tailles)", categorie: "Bureau", niveau: 58, seuilCritique: 25, quantite: 116, unite: "unites" },
  { id: "STK-005", item: "Carburant reserve strategique", categorie: "Vehicules", niveau: 33, seuilCritique: 30, quantite: 3300, unite: "litres" },
  { id: "STK-006", item: "Cartouches de papier A4", categorie: "Bureau", niveau: 70, seuilCritique: 20, quantite: 140, unite: "ramettes" },
  { id: "STK-007", item: "Materiel informatique (PC)", categorie: "Informatique", niveau: 18, seuilCritique: 25, quantite: 9, unite: "unites" }
];

var TRAVAUX_DATA = [
  { id: "TRV-001", batiment: "DCPJ Brazzaville", type: "Plomberie", description: "Fuite reseau eau — aile administrative", priorite: "haute", statut: "en_cours", date: "2026-06-10" },
  { id: "TRV-002", batiment: "Garage central — Direction Logistique", type: "Structure", description: "Affaissement toiture atelier mecanique", priorite: "urgente", statut: "en_attente", date: "2026-06-17" },
  { id: "TRV-003", batiment: "Commissariat Central BZV", type: "Electricite", description: "Remise aux normes tableau electrique", priorite: "normale", statut: "en_attente", date: "2026-06-14" },
  { id: "TRV-004", batiment: "Caserne Gendarmerie Pointe-Noire", type: "Plomberie", description: "Renovation sanitaires dortoirs", priorite: "normale", statut: "termine", date: "2026-05-20" }
];

var CONTRATS_MAINTENANCE_DATA = [
  { id: "CTR-001", prestataire: "Congo Maintenance Technique", objet: "Entretien groupes electrogenes", echeance: "2026-09-30", montantAnnuel: 6500000, statut: "actif" },
  { id: "CTR-002", prestataire: "BZV Climatisation Pro", objet: "Maintenance climatisation QG CFP", echeance: "2026-07-15", montantAnnuel: 3200000, statut: "actif" },
  { id: "CTR-003", prestataire: "SecuriBat Congo", objet: "Surveillance et alarmes batiments", echeance: "2026-12-01", montantAnnuel: 9800000, statut: "actif" },
  { id: "CTR-004", prestataire: "AquaTech Brazzaville", objet: "Maintenance reseaux hydrauliques", echeance: "2026-07-05", montantAnnuel: 2400000, statut: "renouvellement_proche" }
];

var ARMES_DATA = [
  { id: "ARM-001", numeroSerie: "PAMAS-77245", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "MALANDA Christian", etat: "en_service", acquisition: "2019-03-12" },
  { id: "ARM-002", numeroSerie: "AK47-30981", type: "Fusil AK-47", dotation: "collective", assigne: "DCPJ Brazzaville — Armurerie", etat: "en_service", acquisition: "2017-11-08" },
  { id: "ARM-003", numeroSerie: "PAMAS-77310", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "MBEMBA Joel", etat: "en_service", acquisition: "2019-03-12" },
  { id: "ARM-004", numeroSerie: "MAT49-11420", type: "Pistolet-mitrailleur MAT-49", dotation: "collective", assigne: "Commissariat Central BZV — Armurerie", etat: "maintenance", acquisition: "2015-06-20" },
  { id: "ARM-005", numeroSerie: "PAMAS-77398", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "NGUESSO POBA Marie-Claire", etat: "en_service", acquisition: "2020-01-15" },
  { id: "ARM-006", numeroSerie: "AK47-31055", type: "Fusil AK-47", dotation: "collective", assigne: "Brigade Territoriale Pointe-Noire — Armurerie", etat: "en_service", acquisition: "2018-04-02" },
  { id: "ARM-007", numeroSerie: "PAMAS-77412", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "ITOUA Patrice", etat: "hors_service", acquisition: "2014-09-10" }
];

var GILETS_DATA = [
  { id: "GIL-001", reference: "GPB-2021-0042", assigne: "MALANDA Christian", dateExpiration: "2026-07-10" },
  { id: "GIL-002", reference: "GPB-2020-0198", assigne: "MBEMBA Joel", dateExpiration: "2026-08-22" },
  { id: "GIL-003", reference: "GPB-2019-0356", assigne: "NGUESSO POBA Marie-Claire", dateExpiration: "2026-06-28" },
  { id: "GIL-004", reference: "GPB-2022-0511", assigne: "ODZAMBA Patrick", dateExpiration: "2027-03-15" },
  { id: "GIL-005", reference: "GPB-2018-0089", assigne: "ITOUA Patrice", dateExpiration: "2026-06-25" },
  { id: "GIL-006", reference: "GPB-2021-0203", assigne: "BITSINDOU Rodrigue", dateExpiration: "2026-11-30" }
];

var FICHE_VIE_MAP = {
  "VHL-001": { affectationDepuis: "2022-01-10", pannes: [{ date: "2025-08-12", description: "Remplacement amortisseurs avant", cout: 380000 }, { date: "2026-02-03", description: "Vidange et filtres", cout: 95000 }], coutTotalReparation: 475000 },
  "VHL-002": { affectationDepuis: "2021-05-22", pannes: [{ date: "2025-11-20", description: "Reparation systeme freinage", cout: 420000 }], coutTotalReparation: 420000 },
  "VHL-003": { affectationDepuis: "2023-02-14", pannes: [{ date: "2026-01-15", description: "Remplacement batterie", cout: 110000 }], coutTotalReparation: 110000 },
  "VHL-004": { affectationDepuis: "2020-07-01", pannes: [{ date: "2025-06-10", description: "Reparation boite de vitesse", cout: 850000 }, { date: "2026-03-22", description: "Pneus avant", cout: 240000 }], coutTotalReparation: 1090000 },
  "VHL-005": { affectationDepuis: "2024-03-18", pannes: [], coutTotalReparation: 0 },
  "VHL-006": { affectationDepuis: "2018-09-05", pannes: [{ date: "2025-04-02", description: "Reparation moteur — surchauffe", cout: 1250000 }, { date: "2025-12-18", description: "Embrayage", cout: 310000 }, { date: "2026-06-01", description: "Diagnostic — immobilisation en cours", cout: 0 }], coutTotalReparation: 1560000 }
};

var USURE_DATA = [
  { mois: "Jan", vehicules: 28, armement: 12 }, { mois: "Fev", vehicules: 31, armement: 14 }, { mois: "Mar", vehicules: 35, armement: 15 },
  { mois: "Avr", vehicules: 39, armement: 17 }, { mois: "Mai", vehicules: 44, armement: 19 }, { mois: "Juin", vehicules: 49, armement: 22 }
];

var REPARATIONS_ATELIER_DATA = [
  { atelier: "Mecanique", interventions: 14 },
  { atelier: "Batiments", interventions: 7 },
  { atelier: "Informatique", interventions: 5 },
  { atelier: "Armurerie", interventions: 3 }
];

var COUTS_LOGISTIQUES_DATA = [
  { mois: "Jan", cout: 14.2 }, { mois: "Fev", cout: 13.8 }, { mois: "Mar", cout: 16.5 },
  { mois: "Avr", cout: 15.1 }, { mois: "Mai", cout: 18.9 }, { mois: "Juin", cout: 18.5 }
];

var ARRONDISSEMENT_DISPO_DATA = [
  { nom: "1er", dispoVehicules: 82, dispoArmement: 90, dispoEquipements: 75, stockFournitures: 60 },
  { nom: "2e", dispoVehicules: 70, dispoArmement: 85, dispoEquipements: 68, stockFournitures: 72 },
  { nom: "3e", dispoVehicules: 45, dispoArmement: 60, dispoEquipements: 50, stockFournitures: 38 },
  { nom: "4e", dispoVehicules: 91, dispoArmement: 95, dispoEquipements: 88, stockFournitures: 80 },
  { nom: "5e", dispoVehicules: 55, dispoArmement: 65, dispoEquipements: 48, stockFournitures: 42 }
];

var FLUX_DISTRIBUTION_DATA = [
  { destination: "Commissariat Central BZV", quantite: 420, type: "Munitions + Uniformes" },
  { destination: "DCPJ Brazzaville", quantite: 310, type: "Equipements techniques" },
  { destination: "Brigade Territoriale PNR", quantite: 260, type: "Carburant + Pieces" },
  { destination: "Bureau Controle Accidents", quantite: 180, type: "Materiel routier" },
  { destination: "Poste Frontalier Aeroport", quantite: 140, type: "Materiel controle" }
];

function PatrimoineTreemapCell(props) {
  var x = props.x, y = props.y, width = props.width, height = props.height, name = props.name, value = props.value, index = props.index;
  var color = PATRIMOINE_CATEGORIES[index] ? PATRIMOINE_CATEGORIES[index].color : "#3B82F6";
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill: color, stroke: "#0F172A", strokeWidth: 2 }} />
      {width > 55 && height > 28 ? <text x={x + 8} y={y + 18} fill="#fff" fontSize={11} fontWeight="700">{name}</text> : null}
      {width > 55 && height > 44 ? <text x={x + 8} y={y + 34} fill="#E2E8F0" fontSize={10}>{Math.round(value / 1000000)}M FCFA</text> : null}
    </g>
  );
}

function DashboardDL(props) {
  var compte = props.compte;
  var alertesStocks = STOCKS_DATA.filter(function (s) { return s.niveau <= s.seuilCritique; });
  var totalPatrimoine = PATRIMOINE_CATEGORIES.reduce(function (s, c) { return s + c.valeur; }, 0);
  var dispoVehicules = Math.round(VEHICULES_DATA.filter(function (v) { return v.statut !== "maintenance"; }).length / VEHICULES_DATA.length * 100);
  var dispoArmement = Math.round(ARMES_DATA.filter(function (a) { return a.etat === "en_service"; }).length / ARMES_DATA.length * 100);
  var dispoEquip = Math.round((STOCKS_DATA.filter(function (s) { return s.categorie === "Equipements"; }).reduce(function (s, x) { return s + x.niveau; }, 0)) / Math.max(STOCKS_DATA.filter(function (s) { return s.categorie === "Equipements"; }).length, 1));
  var dispoBatiments = Math.round(BATIMENTS_DATA.filter(function (b) { return b.etat === "bon"; }).length / BATIMENTS_DATA.length * 100);
  var tauxGlobal = Math.round((dispoVehicules + dispoArmement + dispoEquip + dispoBatiments) / 4);
  var budgetLogPoste = ["Carburant", "Maintenance", "Equipements"];
  var budgetLogAlloue = BUDGET_POSTES.filter(function (p) { return budgetLogPoste.indexOf(p.poste) >= 0; }).reduce(function (s, p) { return s + p.budget; }, 0);
  var budgetLogReel = BUDGET_POSTES.filter(function (p) { return budgetLogPoste.indexOf(p.poste) >= 0; }).reduce(function (s, p) { return s + p.reel; }, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Tableau de Bord 360° — Materiel & Infrastructure</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">MCO actif</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📊" label="Disponibilite globale" value={tauxGlobal + "%"} sub="Tous moyens confondus" color={tauxGlobal >= 75 ? "#22C55E" : tauxGlobal >= 50 ? "#F59E0B" : "#DC2626"} />
        <StatCard icon="🚗" label="Disponibilite vehicules" value={dispoVehicules + "%"} sub={VEHICULES_DATA.length + " unites au parc"} color="#3B82F6" />
        <StatCard icon="🔫" label="Disponibilite armement" value={dispoArmement + "%"} sub={ARMES_DATA.length + " armes tracees"} color="#DC2626" />
        <StatCard icon="⚠️" label="Stocks critiques" value={alertesStocks.length} sub="Seuil de securite franchi" color="#F59E0B" />
      </div>

      {alertesStocks.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Alertes de stocks critiques</p>
          <div className="space-y-1.5">
            {alertesStocks.map(function (s) { return (<div key={s.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{s.item}</span><span className="text-red-400 font-bold">{s.niveau}% restant — {s.quantite} {s.unite}</span></div>); })}
          </div>
        </div>
      ) : null}

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Indicateur budgetaire logistique</p>
        <p className="text-slate-500 text-xs mb-3">Budget entretien consomme vs previsions annuelles — en lien avec validation DAF</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-700 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: Math.min(100, Math.round((budgetLogReel / budgetLogAlloue) * 100)) + "%", background: budgetLogReel > budgetLogAlloue ? "#DC2626" : "#22C55E" }}></div></div>
          <span className="text-slate-300 text-sm font-bold w-16 text-right">{Math.round((budgetLogReel / budgetLogAlloue) * 100)}%</span>
        </div>
        <p className="text-slate-500 text-xs mt-1">{budgetLogReel}M / {budgetLogAlloue}M FCFA (Carburant, Maintenance, Equipements)</p>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Repartition du patrimoine (Treemap)</p>
        <p className="text-slate-500 text-xs mb-3">Valeur estimee par categorie — {Math.round(totalPatrimoine / 1000000).toLocaleString("fr-FR")}M FCFA au total</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap data={PATRIMOINE_CATEGORIES.map(function (c) { return { name: c.nom, size: c.valeur }; })} dataKey="size" stroke="#0F172A" isAnimationActive={false} content={<PatrimoineTreemapCell />} />
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-3">
          {PATRIMOINE_CATEGORIES.map(function (c, i) { return (<div key={i} className="border border-slate-700 rounded-lg p-2"><div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }}></span><span className="text-slate-300 text-xs font-semibold truncate">{c.nom}</span></div><p className="text-white text-sm font-black mt-1">{Math.round((c.valeur / totalPatrimoine) * 100)}%</p><p className="text-slate-500 text-[10px]">{Math.round(c.valeur / 1000000)}M FCFA</p></div>); })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Charge de travail des ateliers</p>
          <p className="text-slate-500 text-xs mb-3">Interventions en cours par specialite</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REPARATIONS_ATELIER_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="atelier" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="interventions" radius={[4, 4, 0, 0]} fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Couts logistiques mensuels</p>
          <p className="text-slate-500 text-xs mb-3">Millions FCFA — identifier les pics budgetaires</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COUTS_LOGISTIQUES_DATA}>
                <defs><linearGradient id="coutGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.5} /><stop offset="95%" stopColor="#22C55E" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="mois" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="M" />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
                <Area type="monotone" dataKey="cout" stroke="#22C55E" fill="url(#coutGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Indice de disponibilite par arrondissement</p>
        <p className="text-slate-500 text-xs mb-3">Capacite logistique comparee zone par zone</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={[
              { axe: "Vehicules", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.dispoVehicules; return acc; }, {}) },
              { axe: "Armement", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.dispoArmement; return acc; }, {}) },
              { axe: "Equipements", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.dispoEquipements; return acc; }, {}) },
              { axe: "Fournitures", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.stockFournitures; return acc; }, {}) }
            ]}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="axe" tick={{ fill: "#94A3B8", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 9 }} />
              {ARRONDISSEMENT_DISPO_DATA.map(function (a, i) { var cols = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"]; return <Radar key={i} name={a.nom + " arr."} dataKey={"a" + i} stroke={cols[i % cols.length]} fill={cols[i % cols.length]} fillOpacity={0.12} strokeWidth={2} />; })}
              <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ParcAutomobileDL(props) {
  var compte = props.compte;
  var selState = useState(null);
  var selected = selState[0]; var setSelected = selState[1];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Parc Automobile & Engins</h2><p className="text-slate-500 text-xs">Suivi GPS, maintenance et fiche de vie — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Graphique d usure — Vehicules vs Armement</p>
        <p className="text-slate-500 text-xs mb-3">Evolution du taux d usure dans le temps pour anticiper les renouvellements</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={USURE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="mois" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "%"]; }} />
              <Line type="monotone" dataKey="vehicules" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="armement" stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Vehicules</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-red-500"></span>Armement</span></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🟢" label="En mission" value={VEHICULES_DATA.filter(function (v) { return v.statut === "mission"; }).length} color="#22C55E" />
        <StatCard icon="🔧" label="En maintenance" value={VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length} color="#F59E0B" />
        <StatCard icon="📋" label="Total parc" value={VEHICULES_DATA.length} color="#3B82F6" />
      </div>

      <div className="space-y-2">
        {VEHICULES_DATA.map(function (v) {
          var col = v.statut === "mission" ? "#22C55E" : v.statut === "maintenance" ? "#F59E0B" : "#3B82F6";
          var fiche = FICHE_VIE_MAP[v.id];
          var isOpen = selected === v.id;
          return (
            <div key={v.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <button onClick={function () { setSelected(isOpen ? null : v.id); }} className="w-full text-left flex items-center justify-between">
                <div><p className="text-white font-bold font-mono">{v.immat}</p><p className="text-slate-400 text-sm">{v.marque} {v.type} — {v.unite}</p><p className="text-slate-500 text-xs">GPS simule: 4.26°S, 15.28°E — {v.km.toLocaleString("fr-FR")} km</p></div>
                <div className="text-right shrink-0"><CorpsBadge corps={v.corps} /><p className="mt-1"><Chip color={col}>{STATUT_VEHICULE_LABEL[v.statut]}</Chip></p></div>
              </button>
              {isOpen && fiche ? (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2">Fiche de vie — Affecte depuis {fiche.affectationDepuis}</p>
                  {fiche.pannes.length === 0 ? <p className="text-slate-500 text-xs">Aucune panne enregistree.</p> : (
                    <div className="space-y-1.5">
                      {fiche.pannes.map(function (p, i) { return (<div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{p.date} — {p.description}</span><span className="text-amber-400 font-bold">{p.cout.toLocaleString("fr-FR")} FCFA</span></div>); })}
                    </div>
                  )}
                  <p className="text-slate-400 text-xs mt-2">Cout total reparations: <span className="text-white font-bold">{fiche.coutTotalReparation.toLocaleString("fr-FR")} FCFA</span></p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArmurerieDL(props) {
  var compte = props.compte;
  var tabState = useState("armes");
  var tab = tabState[0]; var setTab = tabState[1];
  var today = new Date();
  function joursAvant(date) { var dt = new Date(date + "T00:00:00"); return Math.round((dt - today) / 86400000); }
  var ETAT_ARME_COL = { en_service: "#22C55E", maintenance: "#F59E0B", hors_service: "#DC2626" };
  var ETAT_ARME_LABEL = { en_service: "En service", maintenance: "En maintenance", hors_service: "Hors service" };
  var TABS = [["armes", "Armement (" + ARMES_DATA.length + ")", "🔫"], ["gilets", "Protection (" + GILETS_DATA.length + ")", "🦺"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Armurerie & Protection</h2><p className="text-slate-500 text-xs">Tracabilite et dotations — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>
      {tab === "armes" ? (
        <div className="space-y-2">
          {ARMES_DATA.map(function (a) {
            return (
              <div key={a.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{a.type}</p><p className="text-slate-500 text-xs font-mono">N° serie: {a.numeroSerie}</p><p className="text-slate-400 text-xs">{a.assigne} — {a.dotation === "individuelle" ? "Dotation individuelle" : "Dotation collective"}</p></div>
                <Chip color={ETAT_ARME_COL[a.etat]}>{ETAT_ARME_LABEL[a.etat]}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === "gilets" ? (
        <div className="space-y-2">
          {GILETS_DATA.map(function (g) {
            var jr = joursAvant(g.dateExpiration);
            var niveau = jr <= 30 ? "expire_proche" : jr <= 90 ? "a_surveiller" : "valide";
            var col = niveau === "expire_proche" ? "#DC2626" : niveau === "a_surveiller" ? "#F59E0B" : "#22C55E";
            var label = niveau === "expire_proche" ? "Expire bientot" : niveau === "a_surveiller" ? "A surveiller" : "Valide";
            return (
              <div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{g.assigne}</p><p className="text-slate-500 text-xs font-mono">Ref: {g.reference}</p><p className="text-slate-400 text-xs">Expiration: {g.dateExpiration} ({jr >= 0 ? "dans " + jr + " jours" : "expire depuis " + Math.abs(jr) + " jours"})</p></div>
                <Chip color={col}>{label}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function InfrastructuresDL(props) {
  var compte = props.compte;
  var tabState = useState("batiments");
  var tab = tabState[0]; var setTab = tabState[1];
  var travauxState = useState(TRAVAUX_DATA.map(function (t) { var c = {}; for (var k in t) { c[k] = t[k]; } return c; }));
  var travaux = travauxState[0]; var setTravaux = travauxState[1];

  function avancerStatut(id) {
    setTravaux(function (prev) { return prev.map(function (t) { if (t.id !== id) { return t; } var c = {}; for (var k in t) { c[k] = t[k]; } c.statut = t.statut === "en_attente" ? "en_cours" : "termine"; return c; }); });
  }

  var ETAT_BAT_COL = { bon: "#22C55E", a_renover: "#F59E0B", critique: "#DC2626" };
  var ETAT_BAT_LABEL = { bon: "Bon etat", a_renover: "A renover", critique: "Etat critique" };
  var PRIO_TRV_COL = { urgente: "#DC2626", haute: "#F59E0B", normale: "#3B82F6" };
  var STATUT_TRV_COL = { en_attente: "#F59E0B", en_cours: "#3B82F6", termine: "#22C55E" };
  var STATUT_TRV_LABEL = { en_attente: "En attente", en_cours: "En cours", termine: "Termine" };
  var TYPE_TRV_ICON = { Plomberie: "🚰", Electricite: "⚡", Structure: "🏗️" };

  var TABS = [["batiments", "Batiments", "🏛️"], ["travaux", "Demandes de travaux", "🔨"], ["contrats", "Contrats de maintenance", "📜"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Infrastructures & Batiments</h2><p className="text-slate-500 text-xs">Cartographie, travaux et contrats — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-slate-700 text-white border-slate-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "batiments" ? (
        <div className="space-y-2">
          {BATIMENTS_DATA.map(function (b) {
            return (
              <div key={b.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{b.nom}</p><p className="text-slate-500 text-xs">{b.type} — Inspection: {b.derniereInspection}</p><p className="text-slate-400 text-xs">Valeur: {b.valeur.toLocaleString("fr-FR")} FCFA</p></div>
                <Chip color={ETAT_BAT_COL[b.etat]}>{ETAT_BAT_LABEL[b.etat]}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "travaux" ? (
        <div className="space-y-2">
          {travaux.map(function (t) {
            return (
              <div key={t.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{TYPE_TRV_ICON[t.type]} {t.description}</p><p className="text-slate-500 text-xs">{t.batiment} — {t.type} — {t.date}</p></div>
                  <div className="flex gap-1.5 shrink-0"><Chip color={PRIO_TRV_COL[t.priorite]}>{t.priorite}</Chip><Chip color={STATUT_TRV_COL[t.statut]}>{STATUT_TRV_LABEL[t.statut]}</Chip></div>
                </div>
                {t.statut !== "termine" ? (<button onClick={function () { avancerStatut(t.id); }} className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 text-blue-300">{t.statut === "en_attente" ? "Demarrer les travaux" : "Marquer termine"}</button>) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "contrats" ? (
        <div className="space-y-2">
          {CONTRATS_MAINTENANCE_DATA.map(function (c) {
            var jr = Math.round((new Date(c.echeance + "T00:00:00") - new Date()) / 86400000);
            var proche = jr <= 45;
            return (
              <div key={c.id} className={"bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border p-4 " + (proche ? "border-amber-700" : "border-slate-700")}>
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{c.prestataire}</p><p className="text-slate-400 text-xs">{c.objet}</p><p className={(proche ? "text-amber-400" : "text-slate-500") + " text-xs mt-0.5"}>{proche ? "⚠️ " : ""}Echeance: {c.echeance} ({jr} jours) — {c.montantAnnuel.toLocaleString("fr-FR")} FCFA/an</p></div>
                  <Chip color={proche ? "#F59E0B" : "#22C55E"}>{proche ? "Renouvellement proche" : "Actif"}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function FournituresDL(props) {
  var compte = props.compte;
  var commandesState = useState([]);
  var commandesLocales = commandesState[0]; var setCommandesLocales = commandesState[1];

  function demanderReappro(stock) {
    var nouvelle = { id: "ENG-" + Date.now(), objet: "Reapprovisionnement — " + stock.item, montant: stock.categorie === "Armement" ? 3500000 : 1800000, service: "Direction de la Logistique", statut: "en_attente", date: new Date().toISOString().slice(0, 10), priorite: stock.niveau <= 15 ? "urgente" : "haute" };
    ENGAGEMENTS_DATA.push(nouvelle);
    setCommandesLocales(function (prev) { return prev.concat([nouvelle.objet]); });
  }

  var DONUT_COLORS = { Armement: "#DC2626", Vehicules: "#3B82F6", Equipements: "#22C55E", Bureau: "#8B5CF6", Informatique: "#0EA5E9" };

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Fournitures & Intendance</h2><p className="text-slate-500 text-xs">Stocks centralises, dispatch et reapprovisionnement — {compte.service}</p></div>

      <div className="bg-slate-900 rounded-2xl border border-sky-800 p-3 flex items-center gap-2.5">
        <span className="text-lg shrink-0">🤖</span>
        <p className="text-slate-400 text-xs">L'IA de prediction analyse l'historique de consommation pour anticiper les ruptures avant le seuil critique — voir l'onglet <span className="text-sky-400 font-bold">Stocks Predictifs</span> dans Data Scientist IA.</p>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Jauges de stocks par categorie</p>
        <p className="text-slate-500 text-xs mb-4">Niveau de remplissage des reserves</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STOCKS_DATA.map(function (s) {
            var col = s.niveau <= s.seuilCritique ? "#DC2626" : s.niveau <= s.seuilCritique + 15 ? "#F59E0B" : "#22C55E";
            var data = [{ name: "rempli", value: s.niveau }, { name: "vide", value: 100 - s.niveau }];
            return (
              <div key={s.id} className="flex flex-col items-center">
                <div className="h-24 w-24 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={data} dataKey="value" innerRadius={28} outerRadius={40} startAngle={90} endAngle={-270} stroke="none"><Cell fill={col} /><Cell fill="#1E293B" /></Pie></PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center"><span style={{ color: col }} className="text-sm font-black">{s.niveau}%</span></div>
                </div>
                <p className="text-slate-300 text-xs font-semibold text-center mt-1">{s.item}</p>
                {s.niveau <= s.seuilCritique ? (<button onClick={function () { demanderReappro(s); }} className="mt-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-red-900 text-red-300">Demander reappro</button>) : null}
              </div>
            );
          })}
        </div>
        {commandesLocales.length > 0 ? <p className="text-green-400 text-xs mt-3">✓ {commandesLocales.length} demande(s) transmise(s) au DAF pour validation.</p> : null}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Flux de distribution — Depot central vers les unites</p>
        <p className="text-slate-500 text-xs mb-4">Circulation des stocks dispatches ce mois-ci</p>
        <svg width="100%" height="260" viewBox="0 0 600 260">
          <rect x="10" y="110" width="120" height="40" rx="8" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="70" y="135" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Depot Central</text>
          {FLUX_DISTRIBUTION_DATA.map(function (f, i) {
            var maxQ = Math.max.apply(null, FLUX_DISTRIBUTION_DATA.map(function (x) { return x.quantite; }));
            var strokeW = 2 + (f.quantite / maxQ) * 14;
            var yDest = 30 + i * 50;
            var cols = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"];
            return (
              <g key={i}>
                <path d={"M 130 130 C 280 130, 280 " + yDest + ", 420 " + yDest} stroke={cols[i % cols.length]} strokeWidth={strokeW} fill="none" opacity="0.55" />
                <rect x="420" y={yDest - 16} width="170" height="32" rx="6" fill="#0F172A" stroke={cols[i % cols.length]} strokeWidth="1.5" />
                <text x="505" y={yDest - 2} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">{f.destination}</text>
                <text x="505" y={yDest + 10} textAnchor="middle" fill="#94A3B8" fontSize="8">{f.quantite} unites — {f.type}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function CommandesDL(props) {
  var compte = props.compte;
  var refreshState = useState(0);
  var refresh = refreshState[0]; var setRefresh = refreshState[1];
  var objetState = useState("");
  var montantState = useState("");

  var mesCommandes = ENGAGEMENTS_DATA.filter(function (e) { return e.service === "Direction de la Logistique"; }).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  function creerCommande() {
    if (!objetState[0].trim() || !montantState[0]) { return; }
    var montant = Number(montantState[0]);
    ENGAGEMENTS_DATA.push({ id: "ENG-" + Date.now(), objet: objetState[0].trim(), montant: montant, service: "Direction de la Logistique", statut: "en_attente", date: new Date().toISOString().slice(0, 10), priorite: montant >= SEUIL_VALIDATION_COMMANDANT ? "haute" : "normale" });
    objetState[1](""); montantState[1]("");
    setRefresh(refresh + 1);
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Commandes & Validations</h2><p className="text-slate-500 text-xs">Workflow hierarchique a deux niveaux — {compte.service}</p></div>
      <div className="bg-slate-800/90 rounded-2xl border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">Workflow de validation</p>
        <p className="text-slate-400 text-xs">Toute commande initiee par la Logistique declenche une verification budgetaire du DAF. Les montants superieurs ou egaux a {SEUIL_VALIDATION_COMMANDANT.toLocaleString("fr-FR")} FCFA sont ensuite transmis au Commandant pour approbation finale.</p>
      </div>
      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Nouvelle demande de commande</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <input value={objetState[0]} onChange={function (e) { objetState[1](e.target.value); }} placeholder="Objet de la commande..." className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input type="number" value={montantState[0]} onChange={function (e) { montantState[1](e.target.value); }} placeholder="Montant en FCFA" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
        <button onClick={creerCommande} className="mt-3 bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Soumettre au DAF</button>
      </div>
      <div className="space-y-2">
        {mesCommandes.map(function (e) {
          return (
            <div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
              <div><p className="text-white font-semibold text-sm">{e.objet}</p><p className="text-slate-500 text-xs">{e.date} — {e.montant.toLocaleString("fr-FR")} FCFA</p></div>
              <Chip color={STC_ENG[e.statut]}>{STL_ENG[e.statut]}</Chip>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardPersonnel(props) {
  var compte = props.compte;
  var syncState = useState(null);
  var lastSync = syncState[0]; var setLastSync = syncState[1];
  var exportState = useState(null);
  var exportTxt = exportState[0]; var setExportTxt = exportState[1];
  var copiedState = useState(false);
  var copied = copiedState[0]; var setCopied = copiedState[1];

  var totalAgents = AGENTS_DATA.length;
  var actifs = AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length;
  var detachement = AGENTS_DATA.filter(function (a) { return a.statut === "detachement"; }).length;
  var suspension = AGENTS_DATA.filter(function (a) { return a.statut === "suspension"; }).length;
  var policeCount = AGENTS_DATA.filter(function (a) { return a.corps === "Police"; }).length;
  var gendCount = AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie"; }).length;
  var corpsData = [{ name: "Police", value: policeCount, color: "#003F87" }, { name: "Gendarmerie", value: gendCount, color: "#1B6B3A" }];

  var today = new Date();
  var alertesRH = [];
  AGENTS_DATA.forEach(function (a) {
    var p = AGENT_PROFILS_MAP[a.id];
    if (p && p.dateFinContrat) {
      var jr = Math.round((new Date(p.dateFinContrat + "T00:00:00") - today) / 86400000);
      if (jr <= 90) { alertesRH.push({ type: "Fin de contrat", agent: a.nom, detail: jr >= 0 ? "dans " + jr + " jours" : "depasse de " + Math.abs(jr) + " jours", couleur: jr <= 30 ? "#DC2626" : "#F59E0B" }); }
    }
    if (a.statut === "proposition_promotion") { alertesRH.push({ type: "Promotion imminente", agent: a.nom, detail: "En attente de validation Commandant", couleur: "#8B5CF6" }); }
  });
  if (AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length > 0) { alertesRH.push({ type: "Besoin de recrutement", agent: AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length + " depart(s) a la retraite prevus", detail: "Anticiper le remplacement", couleur: "#F59E0B" }); }

  function genererEtatService() {
    var lignes = AGENTS_DATA.map(function (a) { return a.matricule + " — " + a.nom + " — " + gradeLabel(a) + " — " + a.corps + " — " + a.service + " — " + STATUT_CARRIERE_LABEL[a.statut]; });
    var texte = "ETAT DE SERVICE — " + new Date().toLocaleDateString("fr-FR") + "\nDirection Organisation et Personnel — SIPGN\n\n" + lignes.join("\n") + "\n\nTotal effectif: " + totalAgents + " agents.";
    setExportTxt(texte);
  }
  function copier() { if (navigator.clipboard && exportTxt) { navigator.clipboard.writeText(exportTxt).then(function () { setCopied(true); setTimeout(function () { setCopied(false); }, 2500); }); } }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Gestion des Effectifs</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Effectifs synchronises</span></div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={function () { setLastSync(new Date()); }} className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">🔄 Actualiser effectifs</button>
        <button onClick={genererEtatService} className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold">📄 Generer etat de service</button>
        {lastSync ? <span className="text-slate-500 text-xs self-center">Derniere synchro: {lastSync.toLocaleTimeString("fr-FR")}</span> : null}
      </div>

      {exportTxt ? (
        <div className="bg-slate-900 rounded-2xl border border-purple-800 p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-purple-400 text-xs font-black uppercase">Etat de service genere</span><button onClick={copier} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">{copied ? "✓ Copie !" : "Copier"}</button></div>
          <p className="text-slate-300 text-xs whitespace-pre-wrap font-mono leading-relaxed">{exportTxt}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Users size={18} />} label="Effectifs totaux" value={totalAgents} color="#3B82F6" />
        <StatCard icon="✅" label="En activite" value={actifs} color="#22C55E" />
        <StatCard icon="🌍" label="En detachement" value={detachement} color="#8B5CF6" />
        <StatCard icon="⛔" label="En suspension" value={suspension} color="#EA580C" />
      </div>

      {alertesRH.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-amber-800 p-4">
          <p className="text-amber-300 font-black text-xs uppercase mb-2">Alertes RH</p>
          <div className="space-y-1.5">
            {alertesRH.map(function (a, i) { return (<div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{a.type} — {a.agent}</span><span style={{ color: a.couleur }} className="font-bold">{a.detail}</span></div>); })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Repartition par corps</p>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={corpsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={3} stroke="none">{corpsData.map(function (e, i) { return <Cell key={i} fill={e.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} /></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-white text-2xl font-black">{totalAgents}</span><span className="text-slate-500 text-xs uppercase">Agents</span></div>
          </div>
          <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: "#003F87" }}></span>Police ({policeCount})</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: "#1B6B3A" }}></span>Gendarmerie ({gendCount})</span></div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Evolution des effectifs vs besoins</p>
          <p className="text-slate-500 text-xs mb-3">Ressources reelles comparees aux besoins operationnels</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EVOLUTION_EFFECTIFS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="mois" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
                <Line type="monotone" dataKey="reel" name="Effectif reel" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="besoin" name="Besoin estime" stroke="#F59E0B" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Competences de l effectif (Police vs Gendarmerie)</p>
          <p className="text-slate-500 text-xs mb-3">Capacites techniques moyennes par corps</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={["armes", "secourisme", "criminalistique", "informatique", "langues"].map(function (axe) {
                var pol = AGENTS_DATA.filter(function (a) { return a.corps === "Police" && AGENT_PROFILS_MAP[a.id]; });
                var gen = AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && AGENT_PROFILS_MAP[a.id]; });
                var avgPol = Math.round(pol.reduce(function (s, a) { return s + AGENT_PROFILS_MAP[a.id].competences[axe]; }, 0) / Math.max(pol.length, 1));
                var avgGen = Math.round(gen.reduce(function (s, a) { return s + AGENT_PROFILS_MAP[a.id].competences[axe]; }, 0) / Math.max(gen.length, 1));
                var labels = { armes: "Maitrise armes", secourisme: "Secourisme", criminalistique: "Criminalistique", informatique: "Informatique", langues: "Langues" };
                return { axe: labels[axe], Police: avgPol, Gendarmerie: avgGen };
              })}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="axe" tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 9 }} />
                <Radar name="Police" dataKey="Police" stroke="#003F87" fill="#003F87" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Gendarmerie" dataKey="Gendarmerie" stroke="#1B6B3A" fill="#1B6B3A" fillOpacity={0.2} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Taux d absenteisme par unite</p>
          <p className="text-slate-500 text-xs mb-3">Detecter d eventuels problemes de management</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ABSENTEISME_DATA} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <YAxis dataKey="service" type="category" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "%"]; }} />
                <Bar dataKey="taux" radius={[0, 4, 4, 0]} barSize={16}>
                  {ABSENTEISME_DATA.map(function (s, i) { return <Cell key={i} fill={s.taux >= 10 ? "#DC2626" : s.taux >= 6 ? "#F59E0B" : "#22C55E"} />; })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function EDossierPersonnel(props) {
  var compte = props.compte;
  var selState = useState(AGENTS_DATA[0].id);
  var selectedId = selState[0]; var setSelectedId = selState[1];
  var agentsState = useState(AGENTS_DATA.map(function (a) { var c = {}; for (var k in a) { c[k] = a[k]; } return c; }));
  var agents = agentsState[0]; var setAgents = agentsState[1];

  useEffect(function() {
    function chargerRecruesEDossier(){
      supabase.from("personnels").select("*").order("created_at",{ascending:false}).then(function(r){
        if(r.data && r.data.length>0){
          var nouvAgents = r.data.map(function(a){
            return { id:a.id, matricule:a.matricule, nom:a.nom, corps:a.corps, service:a.service, gradeIndex:a.gradeindex, anciennete:a.anciennete, statut:a.statut, diplome:a.diplome, photo:a.photo };
          });
          setAgents(function(prev){
            var idsExistants = prev.map(function(p){return p.id;});
            var aAjouter = nouvAgents.filter(function(a){return idsExistants.indexOf(a.id)===-1;});
            return prev.concat(aAjouter);
          });
        }
      });
    }
    chargerRecruesEDossier();
    var timer=setInterval(chargerRecruesEDossier,15000);
    return function(){ clearInterval(timer); };
  }, []);

  var agent = agents.find(function (a) { return a.id === selectedId; });
  var profil = AGENT_PROFILS_MAP[selectedId];

  function changerStatut(nouveauStatut) {
    setAgents(function (prev) { return prev.map(function (a) { if (a.id !== selectedId) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.statut = nouveauStatut; return c; }); });
  }
  function validerMutation() {
    setAgents(function (prev) { return prev.map(function (a) { if (a.id !== selectedId) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.statut = "actif"; return c; }); });
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Dossier Individuel (e-dossier)</h2><p className="text-slate-500 text-xs">Fiche complete agent — {compte.service}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-3 lg:col-span-1 max-h-[600px] overflow-auto">
          {agents.map(function (a) {
            var isSel = a.id === selectedId;
            return (
              <button key={a.id} onClick={function () { setSelectedId(a.id); }} className={"w-full text-left px-3 py-2 rounded-xl text-xs mb-1 " + (isSel ? "bg-blue-900/50 border border-blue-700" : "hover:bg-slate-700/50")}>
                <p className="text-white font-semibold">{a.nom}</p>
                <p className="text-slate-500">{a.matricule} — {gradeLabel(a)}</p>
              </button>
            );
          })}
        </div>
        {agent && profil ? (
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div><p className="text-white font-black text-lg">{agent.nom}</p><p className="text-slate-400 text-sm">{gradeLabel(agent)} — {agent.service}</p><p className="text-slate-500 text-xs font-mono">{agent.matricule}</p></div>
                <div className="flex items-center gap-1.5"><CorpsBadge corps={agent.corps} /><Chip color={STATUT_CARRIERE_COLOR[agent.statut]}>{STATUT_CARRIERE_LABEL[agent.statut]}</Chip></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                <div><p className="text-slate-500 uppercase">Naissance</p><p className="text-slate-300">{profil.dateNaissance} — {profil.lieuNaissance}</p></div>
                <div><p className="text-slate-500 uppercase">Situation</p><p className="text-slate-300">{profil.situationFamiliale}</p></div>
                <div><p className="text-slate-500 uppercase">Diplome</p><p className="text-slate-300">{agent.diplome}</p></div>
                <div><p className="text-slate-500 uppercase">Anciennete</p><p className="text-slate-300">{agent.anciennete} ans</p></div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700 flex-wrap">
                <select onChange={function (e) { if (e.target.value) { changerStatut(e.target.value); } }} value="" className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                  <option value="">Mettre a jour statut...</option>
                  <option value="actif">En service</option>
                  <option value="conge">En conge</option>
                  <option value="detachement">Detachement</option>
                  <option value="suspension">Suspension</option>
                </select>
                {agent.statut === "proposition_promotion" ? <button onClick={validerMutation} className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Valider promotion/mutation</button> : null}
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <p className="text-white font-bold text-sm mb-2">Historique des affectations</p>
              <div className="space-y-1.5">{profil.historiqueAffectations.map(function (h, i) { return (<div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{h.service}</span><span className="text-slate-500">{h.periode}</span></div>); })}</div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <p className="text-white font-bold text-sm mb-2">Evaluations de performance</p>
              {profil.evaluations.length === 0 ? <p className="text-slate-500 text-xs">Aucune evaluation enregistree.</p> : (
                <div className="space-y-2">{profil.evaluations.map(function (e, i) { return (<div key={i} className="border-l-2 border-blue-600 pl-3"><p className="text-white text-sm font-bold">{e.annee} — {e.note}/20</p><p className="text-slate-400 text-xs">{e.commentaire}</p></div>); })}</div>
              )}
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <p className="text-white font-bold text-sm mb-2">Historique disciplinaire</p>
              {profil.historiqueDiscipline.length === 0 ? <p className="text-green-400 text-xs">✓ Aucun antecedent disciplinaire.</p> : (
                <div className="space-y-2">{profil.historiqueDiscipline.map(function (d, i) { return (<div key={i} className="border-l-2 border-red-600 pl-3"><p className="text-red-300 text-sm font-bold">{d.date} — {d.motif}</p><p className="text-slate-400 text-xs">Sanction: {d.sanction}</p></div>); })}</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function GestionAffectations(props) {
  var compte = props.compte;
  var agentsState = useState(AGENTS_DATA.filter(function (a) { return a.statut === "actif" || a.statut === "proposition_promotion"; }).map(function (a) { var c = {}; for (var k in a) { c[k] = a[k]; } return c; }));
  var agents = agentsState[0]; var setAgents = agentsState[1];
  var dragState = useState(null);
  var dragId = dragState[0]; var setDragId = dragState[1];

  var services = Array.from(new Set(agents.map(function (a) { return a.service; })));

  function onDrop(service) {
    if (!dragId) { return; }
    setAgents(function (prev) { return prev.map(function (a) { if (a.id !== dragId) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.service = service; return c; }); });
    setDragId(null);
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Gestion des Affectations</h2><p className="text-slate-500 text-xs">Glissez-deposez un agent vers son nouveau service — {compte.service}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {services.map(function (service) {
          var groupe = agents.filter(function (a) { return a.service === service; });
          return (
            <div key={service} onDragOver={function (e) { e.preventDefault(); }} onDrop={function () { onDrop(service); }} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-3 min-h-[180px]">
              <p className="text-white font-bold text-xs mb-2 truncate">{service} ({groupe.length})</p>
              <div className="space-y-1.5">
                {groupe.map(function (a) {
                  return (
                    <div key={a.id} draggable onDragStart={function () { setDragId(a.id); }} className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 cursor-move hover:border-blue-600">
                      <p className="text-slate-200 text-xs font-semibold">{a.nom}</p>
                      <p className="text-slate-500 text-[10px]">{gradeLabel(a)} — {a.matricule}</p>
                    </div>
                  );
                })}
                {groupe.length === 0 ? <p className="text-slate-600 text-xs italic">Deposez un agent ici</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlanningPresence(props) {
  var compte = props.compte;
  var congesState = useState(AGENTS_DATA.filter(function (a) { return a.statut === "conge"; }).map(function (a) { return { agentId: a.id, statut: "en_attente" }; }));
  var conges = congesState[0]; var setConges = congesState[1];
  var JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  var SERVICES_COUVERTURE = Array.from(new Set(AGENTS_DATA.map(function (a) { return a.service; }))).slice(0, 6);

  function traiterConge(agentId, decision) {
    setConges(function (prev) { return prev.map(function (c) { if (c.agentId !== agentId) { return c; } return { agentId: agentId, statut: decision }; }); });
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Planning et Presence</h2><p className="text-slate-500 text-xs">Validation des conges et couverture de service — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Demandes de conge en attente</p>
        {conges.filter(function (c) { return c.statut === "en_attente"; }).length === 0 ? <p className="text-slate-500 text-xs">Aucune demande en attente.</p> : (
          <div className="space-y-2">
            {conges.filter(function (c) { return c.statut === "en_attente"; }).map(function (c) {
              var agent = AGENTS_DATA.find(function (a) { return a.id === c.agentId; });
              return (
                <div key={c.agentId} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
                  <div><p className="text-white font-semibold text-sm">{agent.nom}</p><p className="text-slate-500 text-xs">{agent.service}</p></div>
                  <div className="flex gap-2"><button onClick={function () { traiterConge(c.agentId, "valide"); }} className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Valider</button><button onClick={function () { traiterConge(c.agentId, "refuse"); }} className="bg-red-900 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold">Refuser</button></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5 overflow-auto">
        <p className="text-white font-bold text-sm mb-3">Couverture de service — semaine en cours</p>
        <table className="w-full text-xs">
          <thead><tr><th className="text-left text-slate-500 pb-2 pr-2">Service</th>{JOURS.map(function (j) { return <th key={j} className="text-slate-500 pb-2 px-1">{j}</th>; })}</tr></thead>
          <tbody>
            {SERVICES_COUVERTURE.map(function (s, si) {
              return (
                <tr key={s} className="border-t border-slate-800">
                  <td className="text-slate-300 py-2 pr-2 truncate max-w-[140px]">{s}</td>
                  {JOURS.map(function (j, ji) {
                    var pct = 60 + ((si * 7 + ji) % 5) * 8;
                    var col = pct >= 85 ? "#22C55E" : pct >= 65 ? "#F59E0B" : "#DC2626";
                    return <td key={j} className="px-1 py-2 text-center"><span style={{ color: col }} className="font-bold">{pct}%</span></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AcademieFormation(props) {
  var compte = props.compte;
  var sessionsState = useState(SESSIONS_FORMATION_DATA.map(function (s) { var c = {}; for (var k in s) { c[k] = k === "candidats" ? [] : s[k]; } return c; }));
  var sessions = sessionsState[0]; var setSessions = sessionsState[1];
  var openState = useState(null);
  var openSession = openState[0]; var setOpenSession = openState[1];
  var showForm = useState(false);
  var setShowForm = showForm[1]; var showFormVal = showForm[0];
  var nomS = useState(""); var ancS = useState(0); var gradeS = useState(0); var dureeS = useState(""); var dateS = useState("");

  function creerSession() {
    if (!nomS[0].trim()) { return; }
    var nouvelle = { id: "SES-" + Date.now(), nom: nomS[0].trim(), ancienneteMin: Number(ancS[0]), gradeMin: Number(gradeS[0]), specialite: null, duree: dureeS[0] || "A definir", dateDebut: dateS[0] || "A definir", statut: "ouverte", candidats: [] };
    setSessions(function (prev) { return prev.concat([nouvelle]); });
    nomS[1](""); ancS[1](0); gradeS[1](0); dureeS[1](""); dateS[1]("");
    setShowForm(false);
  }

  function ajouterCandidat(sessionId, agentId) {
    setSessions(function (prev) { return prev.map(function (s) { if (s.id !== sessionId) { return s; } if (s.candidats.indexOf(agentId) >= 0) { return s; } var c = {}; for (var k in s) { c[k] = s[k]; } c.candidats = s.candidats.concat([agentId]); return c; }); });
  }
  function retirerCandidat(sessionId, agentId) {
    setSessions(function (prev) { return prev.map(function (s) { if (s.id !== sessionId) { return s; } var c = {}; for (var k in s) { c[k] = s[k]; } c.candidats = s.candidats.filter(function (id) { return id !== agentId; }); return c; }); });
  }

  function verifierCompatibilite(session, agent) {
    var motifs = [];
    if (agent.anciennete < session.ancienneteMin) { motifs.push("Anciennete insuffisante (" + agent.anciennete + " ans, requis " + session.ancienneteMin + ")"); }
    if (agent.gradeIndex < session.gradeMin) { motifs.push("Grade insuffisant (requis: " + gradesDe(agent.corps)[session.gradeMin] + ")"); }
    return { compatible: motifs.length === 0, motifs: motifs };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Academie & Formation</h2><p className="text-slate-500 text-xs">Cycle de montee en competences — {compte.service}</p></div>
        <button onClick={function () { setShowForm(!showFormVal); }} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">{showFormVal ? "Fermer" : "+ Creer nouvelle session"}</button>
      </div>

      {showFormVal ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
          <input value={nomS[0]} onChange={function (e) { nomS[1](e.target.value); }} placeholder="Nom de la formation..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div><label className="text-slate-400 text-xs font-bold uppercase">Anciennete min (ans)</label><input type="number" value={ancS[0]} onChange={function (e) { ancS[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
            <div><label className="text-slate-400 text-xs font-bold uppercase">Grade min (index 0-9)</label><input type="number" value={gradeS[0]} onChange={function (e) { gradeS[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
            <div><label className="text-slate-400 text-xs font-bold uppercase">Duree</label><input value={dureeS[0]} onChange={function (e) { dureeS[1](e.target.value); }} placeholder="ex: 6 semaines" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
            <div><label className="text-slate-400 text-xs font-bold uppercase">Date debut</label><input type="date" value={dateS[0]} onChange={function (e) { dateS[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
          </div>
          <button onClick={creerSession} className="bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Creer la session</button>
        </div>
      ) : null}

      <div className="space-y-3">
        {sessions.map(function (s) {
          var isOpen = openSession === s.id;
          return (
            <div key={s.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <button onClick={function () { setOpenSession(isOpen ? null : s.id); }} className="w-full text-left flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{s.nom}</p><p className="text-slate-500 text-xs">{s.duree} — Debut: {s.dateDebut} — Prerequis: {s.ancienneteMin} ans min, grade ≥ {s.ancienneteMin > 0 || s.gradeMin > 0 ? "index " + s.gradeMin : "aucun"}</p></div>
                <Chip color="#3B82F6">{s.candidats.length} candidat(s)</Chip>
              </button>
              {isOpen ? (
                <div className="mt-3 pt-3 border-t border-slate-700 space-y-3">
                  <div>
                    <label className="text-slate-400 text-xs font-bold uppercase">Ajouter un candidat</label>
                    <select onChange={function (e) { if (e.target.value) { ajouterCandidat(s.id, e.target.value); e.target.value = ""; } }} value="" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                      <option value="">Selectionner un agent...</option>
                      {AGENTS_DATA.filter(function (a) { return s.candidats.indexOf(a.id) < 0; }).map(function (a) { return <option key={a.id} value={a.id}>{a.nom} — {gradeLabel(a)} — {a.anciennete} ans</option>; })}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    {s.candidats.map(function (agentId) {
                      var agent = AGENTS_DATA.find(function (a) { return a.id === agentId; });
                      var compat = verifierCompatibilite(s, agent);
                      return (
                        <div key={agentId} className={"border rounded-xl p-3 " + (compat.compatible ? "border-green-700 bg-green-950/15" : "border-red-700 bg-red-950/20")}>
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <p className="text-white font-semibold text-sm">{compat.compatible ? "✅" : "🔴"} {agent.nom}</p>
                              <p className="text-slate-500 text-xs">{gradeLabel(agent)} — {agent.anciennete} ans — {agent.service}</p>
                              {!compat.compatible ? <p className="text-red-400 text-xs mt-1">{compat.motifs.join(" — ")}</p> : null}
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              {compat.compatible ? <button className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Valider inscription</button> : null}
                              <button onClick={function () { retirerCandidat(s.id, agentId); }} className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">Retirer</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Projets academiques par filiere</p>
          <p className="text-slate-500 text-xs mb-3">Nombre d agents inscrits par diplome vise</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(ASPIRATIONS_DATA.reduce(function (acc, a) { acc[a.diplomeVise] = (acc[a.diplomeVise] || 0) + 1; return acc; }, {})).map(function (e) { return { diplome: e[0], count: e[1] }; })}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="diplome" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 8 }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Taux de conformite aux formations obligatoires</p>
          <div className="space-y-3">
            {FORMATIONS_OBLIGATOIRES_DATA.map(function (f) {
              var pct = Math.round((f.valide / f.total) * 100);
              var col = pct >= 80 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#DC2626";
              return (
                <div key={f.id} className="flex items-center gap-3">
                  <div className="h-16 w-16 shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart><Pie data={[{ v: pct }, { v: 100 - pct }]} dataKey="v" innerRadius={20} outerRadius={28} startAngle={90} endAngle={-270} stroke="none"><Cell fill={col} /><Cell fill="#1E293B" /></Pie></PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center"><span style={{ color: col }} className="text-[10px] font-black">{pct}%</span></div>
                  </div>
                  <div><p className="text-slate-200 text-xs font-semibold">{f.nom}</p><p className="text-slate-500 text-[10px]">{f.valide}/{f.total} agents conformes</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CarrieresMobilite(props) {
  var compte = props.compte;
  var disposState = useState(DISPONIBILITE_DATA.map(function (d) { var c = {}; for (var k in d) { c[k] = d[k]; } return c; }));
  var dispos = disposState[0]; var setDispos = disposState[1];
  var filterState = useState("tous");
  var filterDiplome = filterState[0]; var setFilterDiplome = filterState[1];

  function traiter(id, avis) {
    setDispos(function (prev) { return prev.map(function (d) { if (d.id !== id) { return d; } var c = {}; for (var k in d) { c[k] = d[k]; } c.statut = avis; return c; }); });
  }

  var diplomesUniques = Array.from(new Set(ASPIRATIONS_DATA.map(function (a) { return a.diplomeVise; })));
  var aspirationsFiltrees = filterDiplome === "tous" ? ASPIRATIONS_DATA : ASPIRATIONS_DATA.filter(function (a) { return a.diplomeVise === filterDiplome; });

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Gestion des Carrieres & Mobilite</h2><p className="text-slate-500 text-xs">Disponibilites et aspirations academiques — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Demandes de mise en disponibilite</p>
        <div className="space-y-2">
          {dispos.map(function (d) {
            var agent = AGENTS_DATA.find(function (a) { return a.id === d.agentId; });
            return (
              <div key={d.id} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-semibold text-sm">{agent.nom} — {agent.matricule}</p><p className="text-slate-400 text-xs">Duree: {d.duree} — Motif: {d.motif}</p></div>
                  <Chip color={d.statut === "favorable" ? "#22C55E" : d.statut === "defavorable" ? "#DC2626" : "#F59E0B"}>{d.statut === "favorable" ? "Avis favorable" : d.statut === "defavorable" ? "Avis defavorable" : "En attente"}</Chip>
                </div>
                {d.statut === "en_attente" ? (
                  <div className="flex gap-2 mt-2"><button onClick={function () { traiter(d.id, "favorable"); }} className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Avis favorable</button><button onClick={function () { traiter(d.id, "defavorable"); }} className="bg-red-900 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold">Avis defavorable</button></div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <p className="text-white font-bold text-sm">Registre des aspirations academiques</p>
          <select value={filterDiplome} onChange={function (e) { setFilterDiplome(e.target.value); }} className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
            <option value="tous">Tous les diplomes</option>
            {diplomesUniques.map(function (d) { return <option key={d} value={d}>{d}</option>; })}
          </select>
        </div>
        <div className="space-y-2">
          {aspirationsFiltrees.map(function (asp) {
            var agent = AGENTS_DATA.find(function (a) { return a.id === asp.agentId; });
            return (
              <div key={asp.id} className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                <div><p className="text-slate-200 text-sm font-semibold">{agent.nom}</p><p className="text-slate-500 text-xs">{asp.diplomeVise}</p></div>
                {asp.strategique ? <Chip color="#22C55E">Strategique pour le service</Chip> : <Chip color="#64748B">Aspiration personnelle</Chip>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

var ENQUETES_DATA = [
  { id: "ENQ-001", titre: "Braquage Marche Total — reseau organise", type: "Vol a main armee", gravite: "critique", statut: "en_cours", opjAssigne: "MALANDA Christian", dateOuverture: "2026-06-18", brigade: "Brigade Criminelle", instructions: "Exploiter les videos de surveillance du marche, identifier le vehicule de fuite." },
  { id: "ENQ-002", titre: "Trafic de stupefiants — Port de Brazzaville", type: "Trafic de stupefiants", gravite: "critique", statut: "en_cours", opjAssigne: "MBEMBA Joel", dateOuverture: "2026-06-15", brigade: "Brigade des Stupefiants", instructions: "Surveillance du quai 3, identification des receptionnaires." },
  { id: "ENQ-003", titre: "Faux documents — Aeroport Maya-Maya", type: "Faux documents", gravite: "grave", statut: "instruction_terminee", opjAssigne: "ITOUA Patrice", dateOuverture: "2026-05-28", brigade: "Brigade des Fraudes", instructions: "Dossier pret pour transmission, verifier la coherence du PV de synthese." },
  { id: "ENQ-004", titre: "Tentative d evasion — Maison d arret BZV", type: "Evasion", gravite: "critique", statut: "transmis_parquet", opjAssigne: "MALANDA Christian", dateOuverture: "2026-06-10", brigade: "Brigade Criminelle", instructions: "Dossier transmis, complement d enquete sur les complicites internes en cours." },
  { id: "ENQ-005", titre: "Serie de cambriolages — Bacongo / Poto-Poto", type: "Cambriolage", gravite: "grave", statut: "en_cours", opjAssigne: null, dateOuverture: "2026-06-12", brigade: "Brigade Criminelle", instructions: "Au moins 4 cambriolages avec meme mode operatoire — necessite affectation d un OPJ supplementaire." },
  { id: "ENQ-006", titre: "Escroquerie en ligne — victime MOUKALA Bernadette", type: "Escroquerie", gravite: "moyen", statut: "en_cours", opjAssigne: "ITOUA Patrice", dateOuverture: "2026-06-08", brigade: "Brigade des Fraudes", instructions: "Tracer le virement bancaire, requete aupres de la MUCODEC." },
  { id: "ENQ-007", titre: "Vol de vehicule — RAV4 gris", type: "Vol de vehicule", gravite: "grave", statut: "cloturee", opjAssigne: "MBEMBA Joel", dateOuverture: "2026-04-02", brigade: "Brigade Criminelle", instructions: "Dossier clos, vehicule retrouve et restitue." },
  { id: "ENQ-008", titre: "Reseau de faux papiers — investigation prolongee", type: "Faux documents", gravite: "grave", statut: "en_cours", opjAssigne: null, dateOuverture: "2026-01-15", brigade: "Brigade des Fraudes", instructions: "Dossier en souffrance depuis plus de 5 mois — necessite renfort cybercriminalite." }
];

var STATUT_ENQ_LABEL = { en_cours: "En cours", instruction_terminee: "Instruction terminee", transmis_parquet: "Transmis Parquet", cloturee: "Cloturee" };
var STATUT_ENQ_COLOR = { en_cours: "#F59E0B", instruction_terminee: "#3B82F6", transmis_parquet: "#8B5CF6", cloturee: "#22C55E" };

var TYPOLOGIE_CRIMES_DATA = [
  { name: "Vols", value: 40, color: "#DC2626" },
  { name: "Stupefiants", value: 30, color: "#F59E0B" },
  { name: "Escroqueries", value: 20, color: "#3B82F6" },
  { name: "Autres", value: 10, color: "#64748B" }
];

var EVOLUTION_CRIMINALITE_30J = [
  { jour: "01/06", incidents: 3 }, { jour: "04/06", incidents: 4 }, { jour: "07/06", incidents: 2 }, { jour: "10/06", incidents: 5 },
  { jour: "13/06", incidents: 6 }, { jour: "16/06", incidents: 4 }, { jour: "19/06", incidents: 7 }, { jour: "22/06", incidents: 6 },
  { jour: "25/06", incidents: 8 }, { jour: "28/06", incidents: 5 }
];

var COLD_CASES_DATA = [
  { categorie: "Resolus < 3 mois", count: 9, color: "#22C55E" },
  { categorie: "En cours < 6 mois", count: 6, color: "#3B82F6" },
  { categorie: "En souffrance 6-12 mois", count: 4, color: "#F59E0B" },
  { categorie: "Cold cases (12 mois+)", count: 3, color: "#DC2626" }
];

function DashboardDPJ(props) {
  var compte = props.compte;
  var mesEnquetes = ENQUETES_DATA;
  var enCours = mesEnquetes.filter(function (e) { return e.statut === "en_cours"; }).length;
  var cloturees = mesEnquetes.filter(function (e) { return e.statut === "cloturee" || e.statut === "transmis_parquet"; }).length;
  var tauxResolution = Math.round((cloturees / mesEnquetes.length) * 100);
  var gavDCPJ = GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville" && g.statut !== "libere"; });
  var transmisParquet = mesEnquetes.filter(function (e) { return e.statut === "transmis_parquet"; }).length;
  var alertesCriticite = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours"; });
  var gavCritiques = gavDCPJ.filter(function (g) { return g.heuresRestantes <= 6; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Centre Nevralgique — Police Judiciaire</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Renseignement actif</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="🕵️" label="Enquetes en cours" value={enCours} sub={mesEnquetes.length + " dossiers geres"} color="#3B82F6" />
        <StatCard icon="📊" label="Taux de resolution" value={tauxResolution + "%"} sub="Dossiers clotures / Parquet" color={tauxResolution >= 60 ? "#22C55E" : "#F59E0B"} />
        <StatCard icon="🔒" label="Suspects en GAV" value={gavDCPJ.length} sub={gavCritiques.length + " en delai critique"} color="#F59E0B" />
        <StatCard icon="⚖️" label="Transmis au Parquet" value={transmisParquet} sub="Ce mois-ci" color="#8B5CF6" />
      </div>

      {alertesCriticite.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Alertes de criticite — crimes graves signales</p>
          <div className="space-y-1.5">
            {alertesCriticite.map(function (i) { return (<div key={i.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{i.type} — {i.lieu}</span><Chip color={GRAVITE_COLOR[i.gravite]}>{i.gravite}</Chip></div>); })}
          </div>
        </div>
      ) : null}

      {gavCritiques.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-amber-800 p-4">
          <p className="text-amber-300 font-black text-xs uppercase mb-2">⏱️ Delais GAV proches de l expiration</p>
          <div className="space-y-2">
            {gavCritiques.map(function (g) { return (<div key={g.id}><div className="flex items-center justify-between text-xs mb-1"><span className="text-slate-300">{g.nom} — {g.motif}</span></div><GavTimer heures={g.heuresRestantes} /></div>); })}
          </div>
        </div>
      ) : null}

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Flux des dossiers recents</p>
        <div className="space-y-2">
          {mesEnquetes.slice().sort(function (a, b) { return a.dateOuverture < b.dateOuverture ? 1 : -1; }).slice(0, 5).map(function (e) {
            return (<div key={e.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{e.titre}</span><Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip></div>);
          })}
        </div>
      </div>
    </div>
  );
}

function PilotageDPJ(props) {
  var compte = props.compte;
  var BZV_ZONES_DPJ = [
    { nom: "Makelelekele", x: 110, y: 265 }, { nom: "Bacongo", x: 175, y: 235 }, { nom: "Poto-Poto", x: 260, y: 195 },
    { nom: "Moungali", x: 315, y: 168 }, { nom: "Ouenze", x: 360, y: 142 }, { nom: "Talangai", x: 400, y: 115 },
    { nom: "Mfilou", x: 145, y: 200 }, { nom: "Madibou", x: 88, y: 300 }, { nom: "Djiri", x: 435, y: 92 }
  ];
  var incParZone = {};
  INCIDENTS_DATA.forEach(function (inc) {
    BZV_ZONES_DPJ.forEach(function (z) { if (inc.lieu.toLowerCase().indexOf(z.nom.toLowerCase().slice(0, 5)) >= 0) { incParZone[z.nom] = (incParZone[z.nom] || 0) + 1; } });
    if (inc.lieu.toLowerCase().indexOf("bacongo") >= 0) { incParZone["Bacongo"] = (incParZone["Bacongo"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("poto") >= 0 || inc.lieu.toLowerCase().indexOf("port") >= 0) { incParZone["Poto-Poto"] = (incParZone["Poto-Poto"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("moungali") >= 0) { incParZone["Moungali"] = (incParZone["Moungali"] || 0) + 1; }
  });

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Pilotage — Analyse et Cartographie</h2><p className="text-slate-500 text-xs">Outils d analyse de la criminalite — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Heatmap de la criminalite — Crime Mapping</p>
        <p className="text-slate-500 text-xs mb-3">Zones de forte concentration delictuelle — Brazzaville</p>
        <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 320 }}>
          <svg width="100%" height="100%" viewBox="0 0 520 340">
            <rect width="520" height="340" fill="#0B1120" />
            <path d="M 0 310 Q 260 295 520 305" stroke="#1E3A5F" strokeWidth="18" fill="none" opacity="0.5" />
            {BZV_ZONES_DPJ.map(function (z) {
              var nb = incParZone[z.nom] || 0;
              var r = 24 + nb * 12;
              var col = nb >= 2 ? "#DC2626" : nb >= 1 ? "#F59E0B" : "#1E293B";
              return (<g key={z.nom}><circle cx={z.x} cy={z.y} r={r} fill={col} opacity={nb > 0 ? 0.2 : 0.06} /><circle cx={z.x} cy={z.y} r={16} fill={col} opacity={nb > 0 ? 0.8 : 0.15} />{nb > 0 ? <text x={z.x} y={z.y + 4} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{nb}</text> : null}<text x={z.x} y={z.y - 22} textAnchor="middle" fill="#94A3B8" fontSize={9}>{z.nom}</text></g>);
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Typologie des crimes</p>
          <p className="text-slate-500 text-xs mb-3">Repartition des infractions traitees</p>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={TYPOLOGIE_CRIMES_DATA} dataKey="value" nameKey="name" innerRadius={42} outerRadius={65} paddingAngle={2} stroke="none">{TYPOLOGIE_CRIMES_DATA.map(function (e, i) { return <Cell key={i} fill={e.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "%"]; }} /></PieChart></ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">{TYPOLOGIE_CRIMES_DATA.map(function (e, i) { return (<div key={i} className="flex items-center justify-between text-xs"><span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: e.color }}></span>{e.name}</span><span className="text-slate-500">{e.value}%</span></div>); })}</div>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Evolution de la criminalite — 30 jours</p>
          <p className="text-slate-500 text-xs mb-3">Detecter une montee de la violence</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EVOLUTION_CRIMINALITE_30J}>
                <defs><linearGradient id="crimGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#DC2626" stopOpacity={0.5} /><stop offset="95%" stopColor="#DC2626" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="jour" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Area type="monotone" dataKey="incidents" stroke="#DC2626" fill="url(#crimGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Cold Cases — Pression sur les dossiers anciens</p>
        <p className="text-slate-500 text-xs mb-3">Repartition des dossiers selon leur anciennete</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COLD_CASES_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="categorie" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 8 }} axisLine={false} tickLine={false} interval={0} angle={-10} textAnchor="end" height={50} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>{COLD_CASES_DATA.map(function (c, i) { return <Cell key={i} fill={c.color} />; })}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ActionsDPJ(props) {
  var compte = props.compte;
  var enquetesState = useState(ENQUETES_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var enquetes = enquetesState[0]; var setEnquetes = enquetesState[1];
  var hotspotState = useState(null);
  var hotspotMsg = hotspotState[0]; var setHotspotMsg = hotspotState[1];
  var zoneState = useState("");

  var opjDisponibles = AGENTS_DATA.filter(function (a) { return a.service === "DCPJ Brazzaville" && a.statut === "actif"; });

  function affecterOPJ(id, opj) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.opjAssigne = opj; return c; }); });
  }
  function transmettreParquet(id) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "transmis_parquet"; return c; }); });
  }
  function changerStatut(id, statut) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = statut; return c; }); });
  }
  function lancerHotspot() {
    if (!zoneState[0].trim()) { return; }
    setHotspotMsg("Alerte transmise aux patrouilles et au Commandement pour la zone: " + zoneState[0]);
    zoneState[1]("");
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Actions — Pilotage des Enquetes</h2><p className="text-slate-500 text-xs">Commandes rapides — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-5">
        <p className="text-red-300 font-bold text-sm mb-1">🔥 Lancer alerte "Hotspot"</p>
        <p className="text-slate-500 text-xs mb-3">Alerter les patrouilles sur une zone en pic d incidents (en lien avec le Commandant)</p>
        <div className="flex gap-2 flex-wrap">
          <input value={zoneState[0]} onChange={function (e) { zoneState[1](e.target.value); }} placeholder="Zone concernee (ex: Poto-Poto, Marche Total)..." className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <button onClick={lancerHotspot} className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Lancer l alerte</button>
        </div>
        {hotspotMsg ? <p className="text-green-400 text-xs mt-2">✓ {hotspotMsg}</p> : null}
      </div>

      <div className="space-y-3">
        {enquetes.map(function (e) {
          return (
            <div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold text-sm">{e.titre}</span><Chip color={GRAVITE_COLOR[e.gravite]}>{e.gravite}</Chip></div>
                  <p className="text-slate-500 text-xs">{e.brigade} — Ouvert le {e.dateOuverture}</p>
                  <p className="text-slate-400 text-xs mt-0.5">OPJ: {e.opjAssigne || "Non affecte"}</p>
                </div>
                <Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip>
              </div>
              <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-700">
                <select onChange={function (ev) { if (ev.target.value) { affecterOPJ(e.id, ev.target.value); } }} value="" className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                  <option value="">Affecter enqueteur...</option>
                  {opjDisponibles.map(function (a) { return <option key={a.id} value={a.nom}>{a.nom}</option>; })}
                </select>
                {e.statut !== "transmis_parquet" && e.statut !== "cloturee" ? <button onClick={function () { transmettreParquet(e.id); }} className="bg-purple-900 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold">Transmettre au Parquet</button> : null}
                <select onChange={function (ev) { if (ev.target.value) { changerStatut(e.id, ev.target.value); } }} value="" className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                  <option value="">Mettre a jour statut...</option>
                  <option value="en_cours">En cours</option>
                  <option value="instruction_terminee">Instruction terminee</option>
                  <option value="cloturee">Cloturee</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailDPJ(props) {
  var compte = props.compte;
  var tabState = useState("gav");
  var tab = tabState[0]; var setTab = tabState[1];
  var gavDCPJ = GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville"; });
  var TABS = [["gav", "Registre GAV", "🔒"], ["dossiers", "Flux des dossiers", "📁"], ["profils", "Profils suspects", "🎯"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Detail — Base de Travail Quotidienne</h2><p className="text-slate-500 text-xs">{compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">{TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}</div>

      {tab === "gav" ? (
        <div className="space-y-3">
          {gavDCPJ.map(function (g) { return (<div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4"><div className="flex items-start justify-between mb-2"><div><p className="text-white font-bold">{g.nom}</p><p className="text-slate-400 text-xs">Motif: {g.motif}</p></div><Chip color={g.statut === "libere" ? "#22C55E" : g.heuresRestantes <= 6 ? "#DC2626" : "#F59E0B"}>{g.statut}</Chip></div>{g.statut !== "libere" ? <GavTimer heures={g.heuresRestantes} /> : null}</div>); })}
        </div>
      ) : null}

      {tab === "dossiers" ? (
        <div className="space-y-2">
          {ENQUETES_DATA.slice().sort(function (a, b) { return a.dateOuverture < b.dateOuverture ? 1 : -1; }).map(function (e) {
            return (<div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4"><div className="flex items-start justify-between gap-2 flex-wrap"><div><p className="text-white font-bold text-sm">{e.titre}</p><p className="text-slate-500 text-xs">{e.brigade} — {e.dateOuverture}</p><p className="text-slate-400 text-xs mt-1 italic">Instructions: {e.instructions}</p></div><Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip></div></div>);
          })}
        </div>
      ) : null}

      {tab === "profils" ? (
        <div className="space-y-2">
          {RECHERCHES_DATA.map(function (r) {
            return (<div key={r.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center gap-4"><div className={"w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 " + (r.dangereux ? "bg-red-900 text-red-300" : "bg-slate-700 text-slate-300")}>{r.photo}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold">{r.nom}</span>{r.dangereux ? <Chip color="#DC2626">Dangereux</Chip> : null}</div><p className="text-slate-400 text-xs">{r.motif}</p><p className="text-slate-500 text-xs font-mono">{r.reference}</p></div><Chip color={STATUT_RCH_COLOR[r.statut]}>{STATUT_RCH_LABEL[r.statut]}</Chip></div>);
          })}
        </div>
      ) : null}
    </div>
  );
}

function DataScientistDPJ(props) {
  var compte = props.compte;
  var tabState = useState("forecast");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });
  var ai4 = useState({ loading: false, result: null });
  var rapportInput = useState("");
  var indiceInput = useState("");
  var SYS = "Tu es l assistant IA Data Scientist de la Police Judiciaire (DCPJ) du Congo. Tu fais de l analyse predictive et de l aide a l investigation. Reponds en francais, de maniere structuree, precise et operationnelle pour un Directeur de Police Judiciaire.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1100, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion." }); });
  }

  var TABS = [["forecast", "Crime Forecaster", "🔮"], ["enquete", "Aide a l Enquete", "🔍"], ["ressources", "Pilotage Ressources", "👥"], ["anomalies", "Detection Anomalies", "⚠️"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-900 to-slate-900 border border-red-700 flex items-center justify-center text-2xl shrink-0">🕵️</div>
        <div><h2 className="text-2xl font-black text-white">Data Scientist IA — Police Judiciaire</h2><p className="text-slate-500 text-xs">Moteur d analyse predictive et d aide a l investigation — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">{TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}</div>

      {tab === "forecast" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Dossiers et incidents recents — base d analyse</p>
            <div className="space-y-1">{INCIDENTS_DATA.slice(0, 6).map(function (i) { return (<div key={i.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{i.type} — {i.lieu}</span><Chip color={GRAVITE_COLOR[i.gravite]}>{i.gravite}</Chip></div>); })}</div>
          </div>
          <button onClick={function () {
            var ctx = "Incidents recents: " + JSON.stringify(INCIDENTS_DATA.map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite, description: i.description }; })) + " | Enquetes actives: " + JSON.stringify(ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).map(function (e) { return { titre: e.titre, type: e.type, brigade: e.brigade }; }));
            callIA(ai1[1], "Modelise les zones a risque pour les prochaines 24h a Brazzaville (Crime Forecaster). Sur base des donnees: 1) Zones a forte probabilite d infraction dans les 24h (justifie par les patterns observes) 2) Type d infraction le plus probable par zone 3) Recommandation de deploiement preventif des effectifs 4) CORRELATION DES MODES OPERATOIRES: identifie si plusieurs crimes recents presentent des similitudes (horaires, outils, cibles) suggerant un meme groupe de malfaiteurs, avec justification precise. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔮 Lancer la modelisation predictive 24h</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "enquete" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Synthese automatisee de rapport / PV</p>
            <p className="text-slate-500 text-xs mb-3">Collez le texte d un rapport OPJ ou PV pour extraction des faits saillants</p>
            <textarea value={rapportInput[0]} onChange={function (e) { rapportInput[1](e.target.value); }} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none mb-2" placeholder="Collez ici le rapport ou PV a analyser..." />
            <button onClick={function () { if (rapportInput[0].trim()) { callIA(ai2[1], "Analyse ce rapport OPJ / PV d enquete et fournis: 1) FAITS SAILLANTS (resume des elements cles) 2) INCOHERENCES detectees dans les temoignages ou declarations 3) POINTS DE CONVERGENCE avec d autres enquetes en cours du DCPJ (dossiers actifs: " + JSON.stringify(ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).map(function (e) { return e.titre; })) + ") 4) PISTES D ENQUETE recommandees. Texte du rapport: " + rapportInput[0]); } }} className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Analyser le rapport</button>
            <AIBloc state={ai2[0]} />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Matching des indices</p>
            <p className="text-slate-500 text-xs mb-3">Comparez un nouvel indice avec la base criminelle</p>
            <input value={indiceInput[0]} onChange={function (e) { indiceInput[1](e.target.value); }} placeholder="Ex: vehicule RAV4 gris, suspect cicatrice joue gauche..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm mb-2" />
            <button onClick={function () { if (indiceInput[0].trim()) { callIA(ai3[1], "Compare cet indice avec la base de donnees criminelle (fichiers de recherche et profils suspects). Indice fourni: '" + indiceInput[0] + "'. Base de donnees: " + JSON.stringify(RECHERCHES_DATA.map(function (r) { return { nom: r.nom, motif: r.motif, reference: r.reference, dangereux: r.dangereux }; })) + ". Indique: 1) Correspondances potentielles avec justification 2) Niveau de confiance (Faible/Moyen/Eleve) 3) Recidivistes potentiels a auditionner en priorite 4) Prochaine etape d enquete recommandee."); } }} className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Lancer le matching</button>
            <AIBloc state={ai3[0]} />
          </div>
        </div>
      ) : null}

      {tab === "ressources" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatCard icon={<Users size={18} />} label="OPJ disponibles" value={AGENTS_DATA.filter(function (a) { return a.service === "DCPJ Brazzaville" && a.statut === "actif"; }).length} color="#3B82F6" />
            <StatCard icon="📁" label="Dossiers actifs" value={ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).length} color="#F59E0B" />
          </div>
          <button onClick={function () {
            var ctx = "OPJ DCPJ: " + JSON.stringify(AGENTS_DATA.filter(function (a) { return a.service === "DCPJ Brazzaville"; }).map(function (a) { return { nom: a.nom, grade: gradeLabel(a), anciennete: a.anciennete, diplome: a.diplome, statut: a.statut }; })) + " | Dossiers actifs: " + JSON.stringify(ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).map(function (e) { return { titre: e.titre, opjAssigne: e.opjAssigne, brigade: e.brigade, gravite: e.gravite }; }));
            callIA(ai4[1], "Optimise le pilotage des ressources de la Police Judiciaire. Fournis: 1) PLANNING D ENQUETE optimal (moments recommandes pour auditions/interpellations selon disponibilite OPJ et charge actuelle) 2) BESOINS EN RENFORTS pour les dossiers complexes ou sans OPJ assigne (specialite recommandee: cybercriminalite, scientifique, financiere) 3) REPARTITION DE CHARGE entre OPJ (qui est surcharge, qui peut prendre plus) 4) RECOMMANDATION PRIORITAIRE pour le DPJ cette semaine. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">👥 Optimiser le pilotage des ressources</button>
          <AIBloc state={ai4[0]} />
        </div>
      ) : null}

      {tab === "anomalies" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Controle interne — dossiers a verifier</p>
            {ENQUETES_DATA.filter(function (e) { return !e.opjAssigne || e.statut === "en_cours"; }).map(function (e) {
              var sansOpj = !e.opjAssigne;
              var ancien = new Date(e.dateOuverture + "T00:00:00") < new Date(new Date().setMonth(new Date().getMonth() - 4));
              if (!sansOpj && !ancien) { return null; }
              return (<div key={e.id} className="border border-amber-700 bg-amber-950/15 rounded-xl p-3"><p className="text-white text-sm font-semibold">{e.titre}</p><p className="text-amber-400 text-xs mt-0.5">{sansOpj ? "⚠️ Aucun OPJ affecte" : ""}{sansOpj && ancien ? " — " : ""}{ancien ? "⚠️ Dossier ouvert depuis plus de 4 mois sans cloture" : ""}</p></div>);
            })}
            {GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville" && g.heuresRestantes <= 6 && g.statut === "actif"; }).map(function (g) {
              return (<div key={g.id} className="border border-red-700 bg-red-950/15 rounded-xl p-3"><p className="text-white text-sm font-semibold">{g.nom}</p><p className="text-red-400 text-xs mt-0.5">⚠️ GAV proche expiration ({g.heuresRestantes}h) — verifier le PV de synthese</p></div>);
            })}
          </div>
          <button onClick={function () {
            var ctx = "Dossiers: " + JSON.stringify(ENQUETES_DATA.map(function (e) { return { titre: e.titre, statut: e.statut, opjAssigne: e.opjAssigne, dateOuverture: e.dateOuverture, brigade: e.brigade }; })) + " | GAV DCPJ: " + JSON.stringify(GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville"; }));
            callIA(ai1[1], "Effectue un controle interne des procedures de la Police Judiciaire. Identifie: 1) Anomalies procedurales (GAV sans suivi, dossiers bloques, absence d OPJ assigne) avec niveau de risque 2) ANALYSE DE PERFORMANCE: causes probables des retards dans les dossiers (manque d effectif, complexite juridique, zone geographique) 3) Argumentaire chiffre que le DPJ peut presenter au Commandant pour justifier des besoins supplementaires. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚠️ Lancer le controle interne complet</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}
    </div>
  );
}

var ACCIDENTS_DATA = [
  { id: "BZV-20260615-0830-BRIG01", lat: -4.2634, lng: 15.2429, lieu: "Carrefour Moungali", gravite: 2, delitFuite: false, personnalitePublique: false, opjAssigne: "MAKOSSO Sylvie", statut: "enquete", etape: 1, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-15" },
  { id: "BZV-20260618-1745-BRIG02", lat: -4.2789, lng: 15.2654, lieu: "Avenue de la Paix, Poto-Poto", gravite: 4, delitFuite: false, personnalitePublique: false, opjAssigne: "MASSAMBA Herve", statut: "rapport", etape: 2, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-18" },
  { id: "BZV-20260619-2210-BRIG01", lat: -4.2701, lng: 15.2502, lieu: "Marche Total, Centre-ville", gravite: 3, delitFuite: true, personnalitePublique: false, opjAssigne: "MAKOSSO Sylvie", statut: "enquete", etape: 1, vehiculePolice: true, agentEnTort: null, dateCreation: "2026-06-19" },
  { id: "BZV-20260620-0915-BRIG03", lat: -4.2558, lng: 15.2381, lieu: "Rond-point Moungali", gravite: 1, delitFuite: false, personnalitePublique: false, opjAssigne: "MASSAMBA Herve", statut: "cloture", etape: 3, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-20" },
  { id: "BZV-20260621-1130-BRIG02", lat: -4.2845, lng: 15.2598, lieu: "RN1 km 88, Niari", gravite: 4, delitFuite: false, personnalitePublique: true, opjAssigne: null, statut: "enquete", etape: 1, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-21" },
  { id: "BZV-20260612-1400-BRIG03", lat: -4.2701, lng: 15.2502, lieu: "Marche Total, Centre-ville", gravite: 2, delitFuite: false, personnalitePublique: false, opjAssigne: "MASSAMBA Herve", statut: "cloture", etape: 3, vehiculePolice: true, agentEnTort: "AGT-003", dateCreation: "2026-06-12" }
];

var GRAVITE_ACC_LABEL = { 1: "Degats materiels legers", 2: "Blesses legers", 3: "Blesses graves", 4: "Accident mortel" };
var GRAVITE_ACC_COLOR = { 1: "#22C55E", 2: "#3B82F6", 3: "#F59E0B", 4: "#DC2626" };
var STATUT_ACC_LABEL = { enquete: "Enquete", rapport: "Rapport", cloture: "Cloture" };
var ETAPES_ACC = ["Enquete", "Rapport", "Cloture"];

function DashboardAccidents(props) {
  var compte = props.compte;
  var enCoursTerrain = ACCIDENTS_DATA.filter(function (a) { return a.statut === "enquete"; }).length;
  var enAttenteAdmin = ACCIDENTS_DATA.filter(function (a) { return a.statut === "rapport"; }).length;
  var immobilises = VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length;
  var alertesPrioritaires = ACCIDENTS_DATA.filter(function (a) { return a.delitFuite || a.gravite >= 3 || a.personnalitePublique; });

  var chargeOPJ = {};
  ACCIDENTS_DATA.forEach(function (a) { var opj = a.opjAssigne || "Non affecte"; chargeOPJ[opj] = (chargeOPJ[opj] || 0) + 1; });
  var chargeData = Object.entries(chargeOPJ).map(function (e) { return { opj: e[0], dossiers: e[1] }; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Poste de Pilotage des Sinistres</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Bureau operationnel</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon="🚧" label="Accidents en intervention" value={enCoursTerrain} sub="Enquete sur le terrain" color="#F59E0B" />
        <StatCard icon="📋" label="Dossiers en attente admin." value={enAttenteAdmin} sub="Traitement du rapport" color="#3B82F6" />
        <StatCard icon="🚗" label="Vehicules immobilises" value={immobilises} sub="Fourriere / maintenance" color="#DC2626" />
      </div>

      {alertesPrioritaires.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Liste rouge — alertes prioritaires</p>
          <div className="space-y-2">
            {alertesPrioritaires.map(function (a) {
              var motifs = [];
              if (a.delitFuite) { motifs.push("Delit de fuite"); }
              if (a.gravite >= 3) { motifs.push(GRAVITE_ACC_LABEL[a.gravite]); }
              if (a.personnalitePublique) { motifs.push("Personnalite publique impliquee"); }
              return (<div key={a.id} className="border-l-2 border-red-600 pl-3"><p className="text-white text-sm font-bold font-mono">{a.id}</p><p className="text-slate-400 text-xs">{a.lieu} — {motifs.join(" — ")}</p></div>);
            })}
          </div>
        </div>
      ) : null}

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Repartition des dossiers par OPJ</p>
        <p className="text-slate-500 text-xs mb-3">Equilibrer la charge de travail du bureau</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chargeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="opj" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} interval={0} angle={-10} textAnchor="end" height={45} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="dossiers" radius={[4, 4, 0, 0]} fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ConstatNumerique(props) {
  var compte = props.compte;
  var idSinistre = useState(null);
  var gpsLat = useState(""); var gpsLng = useState("");
  var gravite = useState(null);
  var lieu = useState("");
  var photos = useState(false);
  var croquis = useState("");
  var temoins = useState("");
  var savedState = useState(false);
  var saved = savedState[0]; var setSaved = savedState[1];

  function depecherUnite() {
    var now = new Date();
    var id = "BZV-" + now.toISOString().slice(0, 10).replace(/-/g, "") + "-" + String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0") + "-BRIG0" + (1 + Math.floor(Math.random() * 4));
    idSinistre[1](id);
  }

  var champsComplets = !!idSinistre[0] && gpsLat[0] !== "" && gpsLng[0] !== "" && gravite[0] !== null;

  function enregistrer() {
    if (!champsComplets) { return; }
    var nouveau = { id: idSinistre[0], lat: Number(gpsLat[0]), lng: Number(gpsLng[0]), lieu: lieu[0] || "Non precise", gravite: gravite[0], delitFuite: false, personnalitePublique: false, opjAssigne: null, statut: "enquete", etape: 1, vehiculePolice: false, agentEnTort: null, dateCreation: now_date() };
    ACCIDENTS_DATA.push(nouveau);
    setSaved(true);
    if (gravite[0] === 4) { setTimeout(function () { alert("Alerte transmise au Directeur PJ et au Commandant — accident mortel."); }, 100); }
  }
  function now_date() { return new Date().toISOString().slice(0, 10); }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Constat Numerique</h2><p className="text-slate-500 text-xs">Formulaire terrain — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">1. Matricule unique de l incident (ID-Sinistre)</p>
        <p className="text-slate-500 text-xs mb-2">Genere automatiquement par activation de l unite. Cle primaire du dossier.</p>
        {idSinistre[0] ? (
          <div className="bg-green-950/30 border border-green-700 rounded-xl px-3 py-2"><p className="text-green-300 font-mono font-bold text-sm">{idSinistre[0]}</p></div>
        ) : (
          <button onClick={depecherUnite} className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">🚓 Depecher Unite</button>
        )}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">2. Geolocalisation precise (obligatoire)</p>
        <p className="text-slate-500 text-xs mb-2">Sans ce champ, la soumission du constat est bloquee.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          <input value={gpsLat[0]} onChange={function (e) { gpsLat[1](e.target.value); }} placeholder="Latitude (ex: -4.2634)" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={gpsLng[0]} onChange={function (e) { gpsLng[1](e.target.value); }} placeholder="Longitude (ex: 15.2429)" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
        <input value={lieu[0]} onChange={function (e) { lieu[1](e.target.value); }} placeholder="Description du lieu (optionnel)..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-2">3. Indice de gravite (obligatoire)</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(function (g) {
            var isSel = gravite[0] === g;
            return (<button key={g} onClick={function () { gravite[1](g); }} className={"rounded-xl p-3 text-left border " + (isSel ? "border-2" : "border-slate-700")} style={isSel ? { borderColor: GRAVITE_ACC_COLOR[g], background: GRAVITE_ACC_COLOR[g] + "22" } : {}}><p style={{ color: GRAVITE_ACC_COLOR[g] }} className="font-black text-lg">{g}</p><p className="text-slate-300 text-xs">{GRAVITE_ACC_LABEL[g]}</p></button>);
          })}
        </div>
        {gravite[0] === 4 ? <p className="text-red-400 text-xs mt-2">⚠️ Accident mortel — declenche une alerte immediate au Directeur PJ et au Commandant.</p> : null}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
        <p className="text-white font-bold text-sm mb-2">Pieces du constat</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <button onClick={function () { photos[1](!photos[0]); }} className={"rounded-xl p-3 text-left border " + (photos[0] ? "border-green-700 bg-green-950/20" : "border-slate-700")}><p className="text-white text-sm font-semibold">{photos[0] ? "✅" : "📷"} Photos de la scene</p><p className="text-slate-500 text-xs">{photos[0] ? "Photos chargees" : "Cliquer pour simuler le chargement"}</p></button>
          <div className="rounded-xl p-3 border border-slate-700"><p className="text-white text-sm font-semibold mb-1">✏️ Croquis (editeur)</p><textarea value={croquis[0]} onChange={function (e) { croquis[1](e.target.value); }} rows={2} placeholder="Description du croquis / positions des vehicules..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs resize-none" /></div>
        </div>
        <textarea value={temoins[0]} onChange={function (e) { temoins[1](e.target.value); }} rows={2} placeholder="Declarations des temoins..." className="w-full mt-3 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" />
      </div>

      <button onClick={enregistrer} disabled={!champsComplets} className={"px-5 py-3 rounded-xl text-sm font-bold w-full " + (champsComplets ? "bg-green-700 hover:bg-green-600 text-white" : "bg-slate-700 text-slate-500 cursor-not-allowed")}>
        {champsComplets ? "✓ Enregistrer et Transmettre au Bureau" : "Enregistrer et Transmettre au Bureau (champs obligatoires manquants)"}
      </button>
      {!champsComplets ? <p className="text-amber-400 text-xs text-center">Renseignez l ID-Sinistre, la geolocalisation et l indice de gravite pour activer la soumission.</p> : null}
      {saved ? <p className="text-green-400 text-xs text-center">✓ Dossier {idSinistre[0]} transmis au Bureau avec succes.</p> : null}
    </div>
  );
}

function CartographieRisques(props) {
  var compte = props.compte;
  var selState = useState(null);
  var selected = selState[0]; var setSelected = selState[1];

  var pointsNoirs = {};
  ACCIDENTS_DATA.forEach(function (a) { var key = a.lieu; if (!pointsNoirs[key]) { pointsNoirs[key] = { lieu: a.lieu, lat: a.lat, lng: a.lng, accidents: [] }; } pointsNoirs[key].accidents.push(a); });
  var points = Object.values(pointsNoirs);
  var minLat = Math.min.apply(null, points.map(function (p) { return p.lat; }));
  var maxLat = Math.max.apply(null, points.map(function (p) { return p.lat; }));
  var minLng = Math.min.apply(null, points.map(function (p) { return p.lng; }));
  var maxLng = Math.max.apply(null, points.map(function (p) { return p.lng; }));
  function toX(lng) { return 40 + ((lng - minLng) / Math.max(maxLng - minLng, 0.001)) * 440; }
  function toY(lat) { return 40 + ((maxLat - lat) / Math.max(maxLat - minLat, 0.001)) * 260; }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Cartographie des Risques</h2><p className="text-slate-500 text-xs">Zones de forte accidentologie — {compte.service}</p></div>
      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-slate-500 text-xs mb-3">Cliquez sur un point noir pour voir les rapports associes</p>
        <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 340 }}>
          <svg width="100%" height="100%" viewBox="0 0 520 340">
            <rect width="520" height="340" fill="#0B1120" />
            <path d="M 0 310 Q 260 295 520 305" stroke="#1E3A5F" strokeWidth="18" fill="none" opacity="0.5" />
            {points.map(function (p, i) {
              var x = toX(p.lng); var y = toY(p.lat);
              var nb = p.accidents.length;
              var col = nb >= 2 ? "#DC2626" : "#F59E0B";
              return (<g key={i} onClick={function () { setSelected(p); }} style={{ cursor: "pointer" }}><circle cx={x} cy={y} r={20 + nb * 8} fill={col} opacity="0.2" /><circle cx={x} cy={y} r={14} fill={col} opacity="0.85" /><text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{nb}</text><text x={x} y={y - 20} textAnchor="middle" fill="#94A3B8" fontSize={8}>{p.lieu.split(",")[0]}</text></g>);
            })}
          </svg>
        </div>
      </div>
      {selected ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-amber-800 p-5">
          <div className="flex items-center justify-between mb-2"><p className="text-amber-300 font-bold text-sm">Rapports — {selected.lieu}</p><button onClick={function () { setSelected(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-2">{selected.accidents.map(function (a) { return (<div key={a.id} className="border-l-2 pl-3" style={{ borderColor: GRAVITE_ACC_COLOR[a.gravite] }}><p className="text-white text-sm font-mono font-bold">{a.id}</p><p className="text-slate-400 text-xs">{GRAVITE_ACC_LABEL[a.gravite]} — {a.dateCreation} — {STATUT_ACC_LABEL[a.statut]}</p></div>); })}</div>
        </div>
      ) : null}
    </div>
  );
}

function DataScientistAccidents(props) {
  var compte = props.compte;
  var tabState = useState("reconstitution");
  var tab = tabState[0]; var setTab = tabState[1];
  var descInput = useState("");
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var SYS = "Tu es l assistant IA du Bureau de Controle Accidents de la Police Nationale du Congo. Reponds en francais, technique et operationnel.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  var TABS = [["reconstitution", "Reconstitution 3D", "🎬"], ["causes", "Analyse des Causes", "🔧"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div><h2 className="text-2xl font-black text-white">Data Scientist IA — Accidents</h2><p className="text-slate-500 text-xs">{compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">{TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-amber-700 text-white border-amber-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}</div>

      {tab === "reconstitution" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Reconstitution 3D — Analyse des photos</p>
            <p className="text-slate-500 text-xs mb-3">Decrivez la scene (position des vehicules, traces de freinage, degats) pour une estimation IA</p>
            <textarea value={descInput[0]} onChange={function (e) { descInput[1](e.target.value); }} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none mb-2" placeholder="Ex: Vehicule A heurte de plein fouet vehicule B a l arret, traces de freinage de 15m, degats avant importants sur A..." />
            <button onClick={function () { if (descInput[0].trim()) { callIA(ai1[1], "Tu es expert en reconstitution d accidents de la route. Sur base de cette description de scene, suggere: 1) Trajectoire probable des vehicules avant impact 2) Vitesse probable au moment de l impact (fourchette en km/h avec justification physique) 3) Point de choc estime 4) Responsabilites probables. Description: " + descInput[0]); } }} className="bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold">🎬 Lancer l analyse de reconstitution</button>
            <AIBloc state={ai1[0]} />
          </div>
        </div>
      ) : null}

      {tab === "causes" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Dossiers recents — base d analyse</p>
            <div className="space-y-1">{ACCIDENTS_DATA.slice(0, 5).map(function (a) { return (<div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300 font-mono">{a.id}</span><span className="text-slate-500">{a.lieu}</span></div>); })}</div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(ACCIDENTS_DATA.map(function (a) { return { lieu: a.lieu, gravite: a.gravite, delitFuite: a.delitFuite, date: a.dateCreation }; }));
            callIA(ai2[1], "Analyse les causes recurrentes des accidents de la circulation a Brazzaville sur base de ces dossiers: " + ctx + ". 1) Identifie les causes recurrentes probables (signalisation defectueuse, etat de la chaussee, eclairage, comportement) par zone 2) Redige un PROJET DE NOTE OFFICIELLE adresse au Directeur de la Logistique et aux services des Travaux Publics, signalant les points noirs identifies et demandant les corrections necessaires (signalisation, eclairage, marquage au sol). La note doit etre formelle et structuree (Objet, Constat, Demande, Signature Bureau Controle Accidents).");
          }} className="bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔧 Analyser les causes et rediger la note</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}
    </div>
  );
}

function ActionsAccidents(props) {
  var compte = props.compte;
  var dossiersState = useState(ACCIDENTS_DATA.map(function (a) { var c = {}; for (var k in a) { c[k] = a[k]; } return c; }));
  var dossiers = dossiersState[0]; var setDossiers = dossiersState[1];
  var msgState = useState({});
  var msgs = msgState[0]; var setMsgs = msgState[1];

  function avancerEtape(id) {
    setDossiers(function (prev) { return prev.map(function (a) { if (a.id !== id) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.etape = Math.min(3, a.etape + 1); c.statut = c.etape === 2 ? "rapport" : c.etape === 3 ? "cloture" : "enquete"; return c; }); });
  }
  function transmettreParquet(id) {
    var dossier = dossiers.find(function (a) { return a.id === id; });
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Dossier judiciaire genere et pret pour signature et envoi electronique au Procureur."; return c; });
    if (dossier.vehiculePolice) {
      VEHICULES_DATA.forEach(function (v) { });
    }
  }
  function notifier(id) {
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Avis d accident transmis automatiquement a l assureur et a l hopital concerne."; return c; });
  }
  function lierLogistique(id) {
    var dossier = dossiers.find(function (a) { return a.id === id; });
    ENGAGEMENTS_DATA.push({ id: "ENG-" + Date.now(), objet: "Reparation vehicule police accidente — dossier " + id, montant: 1500000, service: "Direction de la Logistique", statut: "en_attente", date: new Date().toISOString().slice(0, 10), priorite: "haute" });
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Fiche de reparation generee automatiquement dans le module Logistique."; return c; });
  }
  function lierPersonnel(id, agentId) {
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Dossier lie a l e-dossier RH de l agent concerne (notification Direction du Personnel)."; return c; });
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Gestion Administrative</h2><p className="text-slate-500 text-xs">Dossiers en cours et collaboration transversale — {compte.service}</p></div>
      <div className="space-y-3">
        {dossiers.map(function (d) {
          var agent = d.agentEnTort ? AGENTS_DATA.find(function (a) { return a.id === d.agentEnTort; }) : null;
          return (
            <div key={d.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                <div><p className="text-white font-bold text-sm font-mono">{d.id}</p><p className="text-slate-500 text-xs">{d.lieu}</p></div>
                <Chip color={GRAVITE_ACC_COLOR[d.gravite]}>{GRAVITE_ACC_LABEL[d.gravite]}</Chip>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {ETAPES_ACC.map(function (e, i) { var done = d.etape > i; var current = d.etape === i + 1; return (<div key={e} className="flex-1"><div className="h-1.5 rounded-full" style={{ background: done || current ? "#F59E0B" : "#1E293B" }}></div><p className={"text-[10px] mt-1 " + (current ? "text-amber-400 font-bold" : "text-slate-600")}>{e}</p></div>); })}
              </div>
              <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-700">
                {d.etape < 3 ? <button onClick={function () { avancerEtape(d.id); }} className="bg-blue-900 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold">Avancer l etape</button> : null}
                <button onClick={function () { transmettreParquet(d.id); }} className="bg-purple-900 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold">Transmettre Parquet</button>
                <button onClick={function () { notifier(d.id); }} className="bg-teal-900 text-teal-300 px-3 py-1.5 rounded-lg text-xs font-bold">Notifier Assureur/Hopital</button>
                {d.vehiculePolice ? <button onClick={function () { lierLogistique(d.id); }} className="bg-amber-900 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold">🔧 Lien Logistique</button> : null}
                {agent ? <button onClick={function () { lierPersonnel(d.id, agent.id); }} className="bg-pink-900 text-pink-300 px-3 py-1.5 rounded-lg text-xs font-bold">👤 Lien e-dossier {agent.nom}</button> : null}
              </div>
              {msgs[d.id] ? <p className="text-green-400 text-xs mt-2">✓ {msgs[d.id]}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

var DOMAINE_RENS_LABEL = { social: "Social", economique: "Economique", politique: "Politique", religieux: "Religieux", securitaire: "Securitaire" };
var DOMAINE_RENS_COLOR = { social: "#3B82F6", economique: "#16A34A", politique: "#8B5CF6", religieux: "#F59E0B", securitaire: "#DC2626" };
var NIVEAU_RENS_COLOR = { faible: "#22C55E", moyen: "#3B82F6", eleve: "#F59E0B", critique: "#DC2626" };
var NIVEAU_RENS_LABEL = { faible: "Faible", moyen: "Moyen", eleve: "Eleve", critique: "Critique" };

var SIGNAUX_FAIBLES_DATA = [
  { id: "SF-001", date: "2026-06-21", heure: "08:40", domaine: "social", niveau: "eleve", lieu: "Bacongo, Brazzaville", titre: "Appel a mobilisation sur les reseaux sociaux", description: "Un collectif de jeunes diffuse un appel a manifester contre la hausse du prix du carburant. Plus de 800 partages en 12h.", statut: "analyse" },
  { id: "SF-002", date: "2026-06-21", heure: "14:15", domaine: "economique", niveau: "moyen", lieu: "Marche Total, Brazzaville", titre: "Rupture d approvisionnement en denrees de base", description: "Penurie de farine et de sucre signalee par plusieurs commercants. Risque de tension sur les prix.", statut: "nouveau" },
  { id: "SF-003", date: "2026-06-20", heure: "19:30", domaine: "religieux", niveau: "moyen", lieu: "Talangai, Brazzaville", titre: "Discours radical dans une eglise de reveil", description: "Un predicateur tient des propos hostiles envers une communaute etrangere. Audience estimee a 300 fideles.", statut: "analyse" },
  { id: "SF-004", date: "2026-06-20", heure: "11:00", domaine: "politique", niveau: "eleve", lieu: "Centre-ville, Pointe-Noire", titre: "Tract anonyme distribue pres de la Prefecture", description: "Tract appelant a la desobeissance civile en cas de coupure d electricite prolongee.", statut: "nouveau" },
  { id: "SF-005", date: "2026-06-19", heure: "22:10", domaine: "securitaire", niveau: "critique", lieu: "Zone portuaire, Pointe-Noire", titre: "Mouvement inhabituel de vehicules de nuit", description: "Plusieurs vehicules non identifies observes pres du poste frontalier, sans manifeste declare.", statut: "analyse" },
  { id: "SF-006", date: "2026-06-19", heure: "09:20", domaine: "social", niveau: "faible", lieu: "Moungali, Brazzaville", titre: "Greve ponctuelle des moto-taxis", description: "Mouvement localise sans relai national pour le moment.", statut: "classe" },
  { id: "SF-007", date: "2026-06-18", heure: "16:45", domaine: "economique", niveau: "moyen", lieu: "Zone portuaire, Pointe-Noire", titre: "Retard de paiement des dockers", description: "Trois mois d arrieres signales, risque de mouvement social dans le secteur portuaire.", statut: "analyse" },
  { id: "SF-008", date: "2026-06-17", heure: "07:50", domaine: "politique", niveau: "moyen", lieu: "Makelekele, Brazzaville", titre: "Reunion non declaree d un groupe d opposition", description: "Une trentaine de personnes reunies dans une residence privee, motif officiel non communique.", statut: "classe" }
];

var FICHES_RENSEIGNEMENT_DATA = [
  { id: "FR-2026-014", domaine: "securitaire", titre: "Suivi des flux frontaliers nocturnes — axe Pointe-Noire", date: "2026-06-20", source: "HUMINT-07", niveau: "critique", statut: "validee" },
  { id: "FR-2026-013", domaine: "politique", titre: "Cartographie des mouvements d opposition — Brazzaville", date: "2026-06-19", source: "OSINT-12", niveau: "eleve", statut: "validee" },
  { id: "FR-2026-012", domaine: "religieux", titre: "Veille des discours dans les eglises de reveil", date: "2026-06-18", source: "HUMINT-03", niveau: "moyen", statut: "en_cours" },
  { id: "FR-2026-011", domaine: "economique", titre: "Tensions sociales dans le secteur portuaire", date: "2026-06-17", source: "OSINT-05", niveau: "eleve", statut: "validee" },
  { id: "FR-2026-010", domaine: "social", titre: "Cartographie des collectifs de jeunesse urbaine", date: "2026-06-15", source: "HUMINT-09", niveau: "moyen", statut: "archivee" },
  { id: "FR-2026-009", domaine: "securitaire", titre: "Reseau de trafic transfrontalier suspecte", date: "2026-06-12", source: "HUMINT-02", niveau: "critique", statut: "en_cours" }
];
var STATUT_FR_LABEL = { validee: "Validee", en_cours: "En cours d analyse", archivee: "Archivee" };
var STATUT_FR_COLOR = { validee: "#22C55E", en_cours: "#F59E0B", archivee: "#64748B" };

var ACTEURS_DATA = [
  { id: "ACT-001", nom: "Collectif Jeunesse Debout", type: "Groupe de pression", domaine: "social", influence: "Forte", posture: "hostile", notes: "Forte audience sur les reseaux sociaux. Capacite de mobilisation rapide demontree." },
  { id: "ACT-002", nom: "Predicateur — Eglise de reveil Talangai", type: "Leader d opinion", domaine: "religieux", influence: "Moyenne", posture: "neutre", notes: "Audience locale fidele. Discours suivis pour evolution de la rhetorique." },
  { id: "ACT-003", nom: "Syndicat des Dockers du Port Autonome", type: "Organisation", domaine: "economique", influence: "Forte", posture: "hostile", notes: "Arrieres de salaire recurrents. Historique de greves dures." },
  { id: "ACT-004", nom: "Plateforme Citoyenne Unite", type: "Parti / mouvement politique", domaine: "politique", influence: "Moyenne", posture: "hostile", notes: "Diffusion de tracts. Implantation principale a Pointe-Noire." },
  { id: "ACT-005", nom: "Association des Commercants du Grand Marche", type: "Groupe de pression", domaine: "economique", influence: "Moyenne", posture: "neutre", notes: "Relai utile pour la remontee d information economique de terrain." },
  { id: "ACT-006", nom: "Reseau Moto-Taxis Solidarite", type: "Groupe de pression", domaine: "social", influence: "Faible", posture: "neutre", notes: "Mouvements ponctuels et localises, peu de relai national." }
];
var POSTURE_COLOR = { favorable: "#22C55E", neutre: "#3B82F6", hostile: "#DC2626" };
var POSTURE_LABEL = { favorable: "Favorable", neutre: "Neutre", hostile: "Hostile" };

var RESEAU_NODES_DATA = [
  { id: "N1", nom: "Collectif Jeunesse Debout", type: "groupe", x: 100, y: 90 },
  { id: "N2", nom: "Predicateur Talangai", type: "individu", x: 250, y: 50 },
  { id: "N3", nom: "Syndicat des Dockers", type: "organisation", x: 380, y: 130 },
  { id: "N4", nom: "Plateforme Citoyenne Unite", type: "groupe", x: 210, y: 200 },
  { id: "N5", nom: "Contact recurrent FR-2026-009", type: "individu", x: 420, y: 220 },
  { id: "N6", nom: "Association Commercants", type: "organisation", x: 80, y: 210 }
];
var RESEAU_LIENS_DATA = [
  { source: "N1", target: "N4", type: "Coordination logistique", force: "forte" },
  { source: "N2", target: "N1", type: "Soutien moral / discours commun", force: "moyenne" },
  { source: "N3", target: "N6", type: "Echange d information economique", force: "faible" },
  { source: "N4", target: "N3", type: "Appel a convergence des luttes", force: "moyenne" },
  { source: "N5", target: "N3", type: "Contact recurrent identifie (zone portuaire)", force: "forte" },
  { source: "N1", target: "N6", type: "Relai logistique commun", force: "faible" }
];
var FORCE_LIEN_COLOR = { forte: "#DC2626", moyenne: "#F59E0B", faible: "#64748B" };

var NOTES_TRANSMISES_DATA = [
  { id: "NS-2026-031", titre: "Note de synthese — Tensions sociales secteur portuaire", date: "2026-06-19", heure: "09:12", destinataire: "Primature", niveau: "eleve", statut: "accuse_reception", dateAccuse: "2026-06-19 11:30" },
  { id: "NS-2026-030", titre: "Note flash — Mouvement suspect zone frontaliere Pointe-Noire", date: "2026-06-19", heure: "23:05", destinataire: "Presidence", niveau: "critique", statut: "accuse_reception", dateAccuse: "2026-06-19 23:40" },
  { id: "NS-2026-029", titre: "Note de synthese — Veille politique Plateforme Citoyenne", date: "2026-06-17", heure: "15:20", destinataire: "Prefecture de Pointe-Noire", niveau: "moyen", statut: "accuse_reception", dateAccuse: "2026-06-18 08:05" },
  { id: "NS-2026-028", titre: "Note de synthese — Veille religieuse Talangai", date: "2026-06-15", heure: "10:00", destinataire: "Commandement des Forces de Police", niveau: "moyen", statut: "transmise", dateAccuse: null }
];
var STATUT_NOTE_COLOR = { transmise: "#F59E0B", accuse_reception: "#22C55E" };
var STATUT_NOTE_LABEL = { transmise: "Transmise — en attente d accuse", accuse_reception: "Accuse de reception recu" };

var ISG_SOUS_INDICES = [
  { nom: "Social", valeur: 68, color: "#3B82F6" },
  { nom: "Economique", valeur: 61, color: "#16A34A" },
  { nom: "Securitaire", valeur: 74, color: "#DC2626" },
  { nom: "Politique", valeur: 70, color: "#8B5CF6" }
];

function JaugeISG(props) {
  var value = props.value;
  var color = value < 40 ? "#DC2626" : value < 70 ? "#F59E0B" : "#22C55E";
  var statutLabel = value < 40 ? "Instabilite elevee" : value < 70 ? "Vigilance requise" : "Stabilite satisfaisante";
  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="130" viewBox="0 0 200 110">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1E293B" strokeWidth="16" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" pathLength="100" strokeDasharray={value + " 100"} />
        <text x="100" y="85" textAnchor="middle" fill="#fff" fontSize="34" fontWeight="900">{value}</text>
        <text x="100" y="103" textAnchor="middle" fill="#64748B" fontSize="10">/ 100</text>
      </svg>
      <p style={{ color: color }} className="text-xs font-bold uppercase tracking-wide -mt-2">{statutLabel}</p>
    </div>
  );
}



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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
  var agentsDataState = useState(AGENTS_DATA);
  var agentsData = agentsDataState[0]; var setAgentsData = agentsDataState[1];

  useEffect(function() {
    function chargerRecrues360(){
      supabase.from("personnels").select("*").order("created_at",{ascending:false}).then(function(r){
        if(r.data && r.data.length>0){
          var nouvAgents = r.data.map(function(a){
            return { id:a.id, matricule:a.matricule, nom:a.nom, corps:a.corps, service:a.service, gradeIndex:a.gradeindex, anciennete:a.anciennete, statut:a.statut, diplome:a.diplome, photo:a.photo };
          });
          setAgentsData(function(prev){
            var idsExistants = prev.map(function(p){return p.id;});
            var aAjouter = nouvAgents.filter(function(a){return idsExistants.indexOf(a.id)===-1;});
            return prev.concat(aAjouter);
          });
        }
      });
    }
    chargerRecrues360();
    var timer=setInterval(chargerRecrues360,15000);
    return function(){ clearInterval(timer); };
  }, []);

  var rechercheState = useState("");
  var recherche = rechercheState[0]; var setRecherche = rechercheState[1];
  var selState = useState("AGT-006");
  var selId = selState[0]; var setSelId = selState[1];
  var filtreCorpsState = useState("tous");
  var filtreCorps = filtreCorpsState[0]; var setFiltreCorps = filtreCorpsState[1];

  var agentsFiltres = agentsData.filter(function (a) {
    var matchNom = !recherche || a.nom.toLowerCase().indexOf(recherche.toLowerCase()) >= 0 || a.matricule.toLowerCase().indexOf(recherche.toLowerCase()) >= 0;
    var matchCorps = filtreCorps === "tous" || a.corps === filtreCorps;
    return matchNom && matchCorps;
  });

  var agent = agentsData.find(function (a) { return a.id === selId; });
  var profil = agent ? (AGENT_PROFILS_MAP[agent.id] || { evaluations: [], historiqueDiscipline: [], historiqueAffectations: [{ service: agent.service, periode: (agent.anciennete ? (2026 - agent.anciennete) : 2026) + "-present" }], dateNaissance: "N/A", lieuNaissance: "N/A", competences: { armes: 0, secourisme: 0, criminalistique: 0, informatique: 0, langues: 0 } }) : null;

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

  var totalAgents = agentsData.length;
  var enService = agentsData.filter(function (a) { return a.statut === "actif"; }).length;
  var eligibles = agentsData.filter(function (a) { return isEligiblePromotion(a) || a.statut === "proposition_promotion"; }).length;

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  { id: "SALLE-CFP", nom: "Salle Commandement — CFP", hotes: ["cfp-congo@policenationale.cg", "cgn-congo@gendarmerienationale.cg"], statut: "disponible", capacite: 20, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-OPS", nom: "Salle Operations — DOPS", hotes: ["operations-congo@sipgn.cg", "cfp-congo@policenationale.cg"], statut: "en_cours", capacite: 12, chiffrement: "AES-256", participants: ["cfp-congo@policenationale.cg", "operations-congo@sipgn.cg", "dcpj-congo@policenationale.cg"] },
  { id: "SALLE-LOG", nom: "Reunion Logistique — DL", hotes: ["dl-congo@sipgn.cg"], statut: "disponible", capacite: 8, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-DAF", nom: "Comite Financier — DAF", hotes: ["daf-congo@sipgn.cg"], statut: "planifiee", capacite: 6, chiffrement: "AES-256", participants: [], heurePlanifiee: "14h30" },
  { id: "SALLE-RH", nom: "Reunion DRH / Personnel", hotes: ["dgrh-congo@sipgn.cg", "personnel-congo@sipgn.cg"], statut: "disponible", capacite: 10, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-DRG", nom: "Briefing Renseignements — DRG", hotes: ["drg-congo@policenationale.cg"], statut: "disponible", capacite: 6, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-INTER", nom: "Coordination INTERPOL", hotes: ["interpol-congo@policenationale.cg"], statut: "disponible", capacite: 8, chiffrement: "AES-256", participants: [] },
  { id: "SALLE-BCA", nom: "Revue Accidents — BCA", hotes: ["bca-congo@policenationale.cg"], statut: "disponible", capacite: 6, chiffrement: "AES-256", participants: [] }
];

var HISTORIQUE_VISIO = [
  { id: "HV-001", salle: "Salle Commandement — CFP", date: "2026-06-24", heure: "09:00", duree: "47 min", participants: 5, animateur: "Commandement des Forces de Police (CFP)" },
  { id: "HV-002", salle: "Coordination INTERPOL", date: "2026-06-23", heure: "14:00", duree: "32 min", participants: 3, animateur: "Bureau Central National INTERPOL" },
  { id: "HV-003", salle: "Comite Financier — DAF", date: "2026-06-22", heure: "10:30", duree: "1h 12 min", participants: 4, animateur: "Direction Administration et Finances" },
  { id: "HV-004", salle: "Reunion Logistique — DL", date: "2026-06-20", heure: "08:00", duree: "28 min", participants: 6, animateur: "Direction de la Logistique" }
];

var TOUS_COMPTES_VISIO = [
  { id: "cfp-congo@policenationale.cg", nom: "Commandement des Forces de Police (CFP)", service: "CFP", couleur: "#8B5CF6", initiales: "CF" },
  { id: "cgn-congo@gendarmerienationale.cg", nom: "Commandement de la Gendarmerie Nationale (CGN)", service: "CGN", couleur: "#A21CAF", initiales: "CG" },
  { id: "drg-congo@policenationale.cg", nom: "Direction des Renseignements Generaux (DRG)", service: "DRG", couleur: "#581C87", initiales: "DR" },
  { id: "dgrh-congo@sipgn.cg", nom: "Direction Generale des Ressources Humaines", service: "DGRH", couleur: "#BE185D", initiales: "RH" },
  { id: "dl-congo@sipgn.cg", nom: "Direction de la Logistique", service: "DL", couleur: "#0EA5E9", initiales: "DL" },
  { id: "daf-congo@sipgn.cg", nom: "Direction Administration et Finances", service: "DAF", couleur: "#16A34A", initiales: "DF" },
  { id: "personnel-congo@sipgn.cg", nom: "Direction Organisation et Personnel", service: "PERS", couleur: "#D97706", initiales: "PE" },
  { id: "operations-congo@sipgn.cg", nom: "Direction des Operations", service: "DOPS", couleur: "#2563EB", initiales: "OP" },
  { id: "interpol-congo@policenationale.cg", nom: "Bureau Central National INTERPOL", service: "INTERPOL", couleur: "#EA580C", initiales: "IN" },
  { id: "commissariatcentral-congo@policenationale.cg", nom: "Commissariat Central BZV", service: "COMM", couleur: "#003F87", initiales: "CC" },
  { id: "bca-congo@policenationale.cg", nom: "Bureau Controle Accidents", service: "BCA", couleur: "#F59E0B", initiales: "BC" },
  { id: "dcpj-congo@policenationale.cg", nom: "DCPJ Brazzaville", service: "DCPJ", couleur: "#DC2626", initiales: "PJ" },
  { id: "gendarmeriepnr-congo@gendarmerienationale.cg", nom: "Brigade Territoriale Pointe-Noire", service: "GEND PNR", couleur: "#1B6B3A", initiales: "GN" },
  { id: "frontieres-congo@policenationale.cg", nom: "Controle Voyageurs et Frontieres", service: "FRONT", couleur: "#0284C7", initiales: "FR" },
  { id: "policenavale-congo@policenationale.cg", nom: "Police Navale Pointe-Noire", service: "PNAV", couleur: "#0C4A6E", initiales: "PN" },
  { id: "gendarmerienavale-congo@gendarmerienationale.cg", nom: "Gendarmerie Maritime Pointe-Noire", service: "GNAV", couleur: "#14532D", initiales: "GV" },
  { id: "opj.brazzaville", nom: "Officier de Police Judiciaire", service: "OPJ", couleur: "#7C3AED", initiales: "OJ" }
];

var REUNIONS_INITIALES = [
  {
    id: "REU-001", titre: "Point hebdomadaire CFP — Securite nationale", animateur: "cfp-congo@policenationale.cg",
    date: "2026-06-26", heureDebut: "09:00", heureFin: "10:00",
    type: "hebdomadaire", ordre_du_jour: "1. Bilan incidents semaine\n2. Effectifs et deployments\n3. Coordination gendarmerie\n4. Divers",
    participants: ["cfp-congo@policenationale.cg", "cgn-congo@gendarmerienationale.cg", "operations-congo@sipgn.cg", "dcpj-congo@policenationale.cg"],
    statut: "planifiee", salle: "SALLE-CFP", priorite: "haute", rappel: 15
  },
  {
    id: "REU-002", titre: "Comite financier mensuel DAF", animateur: "daf-congo@sipgn.cg",
    date: "2026-06-26", heureDebut: "14:30", heureFin: "16:00",
    type: "mensuel", ordre_du_jour: "1. Revue budgetaire juin\n2. Engagements en attente\n3. Previsions juillet\n4. Validation depenses >5M FCFA",
    participants: ["daf-congo@sipgn.cg", "cfp-congo@policenationale.cg", "dl-congo@sipgn.cg", "personnel-congo@sipgn.cg"],
    statut: "planifiee", salle: "SALLE-DAF", priorite: "haute", rappel: 30
  },
  {
    id: "REU-003", titre: "Briefing INTERPOL — cooperation regionale", animateur: "interpol-congo@policenationale.cg",
    date: "2026-06-27", heureDebut: "10:00", heureFin: "11:30",
    type: "ponctuelle", ordre_du_jour: "1. Mandats actifs region Afrique Centrale\n2. Echange de renseignements\n3. Formation procedures INTERPOL\n4. Prochaine conference NCB",
    participants: ["interpol-congo@policenationale.cg", "cfp-congo@policenationale.cg", "dcpj-congo@policenationale.cg", "drg-congo@policenationale.cg"],
    statut: "planifiee", salle: "SALLE-INTER", priorite: "critique", rappel: 60
  },
  {
    id: "REU-004", titre: "Reunion logistique — reapprovisionnement Q3", animateur: "dl-congo@sipgn.cg",
    date: "2026-06-28", heureDebut: "08:00", heureFin: "09:00",
    type: "ponctuelle", ordre_du_jour: "1. Etat des stocks munitions\n2. Parc vehicules — revisions\n3. Commandes en attente\n4. Budget logistique",
    participants: ["dl-congo@sipgn.cg", "cfp-congo@policenationale.cg", "operations-congo@sipgn.cg", "bca-congo@policenationale.cg"],
    statut: "planifiee", salle: "SALLE-LOG", priorite: "normale", rappel: 15
  },
  {
    id: "REU-005", titre: "Coordination DRH — GPEC semestre", animateur: "dgrh-congo@sipgn.cg",
    date: "2026-06-30", heureDebut: "09:30", heureFin: "11:00",
    type: "ponctuelle", ordre_du_jour: "1. Avancements en attente\n2. Affectations juillet\n3. Plan de formation H2 2026\n4. Recrutements ouverts",
    participants: ["dgrh-congo@sipgn.cg", "personnel-congo@sipgn.cg", "cfp-congo@policenationale.cg", "cgn-congo@gendarmerienationale.cg"],
    statut: "planifiee", salle: "SALLE-RH", priorite: "normale", rappel: 30
  },
  {
    id: "REU-006", titre: "Reunion urgente — incident securite Pointe-Noire", animateur: "cgn-congo@gendarmerienationale.cg",
    date: "2026-06-25", heureDebut: "07:00", heureFin: "08:00",
    type: "ponctuelle", ordre_du_jour: "1. Situation securitaire zone portuaire\n2. Deploiement forces\n3. Coordination avec Brigade PNR",
    participants: ["cgn-congo@gendarmerienationale.cg", "cfp-congo@policenationale.cg", "gendarmeriepnr-congo@gendarmerienationale.cg", "operations-congo@sipgn.cg", "frontieres-congo@policenationale.cg"],
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-slate-400 text-xs font-bold uppercase">Titre de la reunion *</label>
              <input value={form.titre} onChange={function(e){setForm(function(p){return Object.assign({},p,{titre:e.target.value});});}} placeholder="ex: Point securite hebdomadaire" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase">Date *</label>
              <input type="date" value={form.date} onChange={function(e){setForm(function(p){return Object.assign({},p,{date:e.target.value});});}} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
    { id: "cfp-congo@policenationale.cg", initiales: "CF", nom: "CFP" },
    { id: "cgn-congo@gendarmerienationale.cg", initiales: "CG", nom: "CGN" },
    { id: "operations-congo@sipgn.cg", initiales: "OP", nom: "DOPS" },
    { id: "dcpj-congo@policenationale.cg", initiales: "PJ", nom: "DCPJ" },
    { id: "drg-congo@policenationale.cg", initiales: "DR", nom: "DRG" },
    { id: "dgrh-congo@sipgn.cg", initiales: "RH", nom: "DRH" },
    { id: "dl-congo@sipgn.cg", initiales: "DL", nom: "LOG" },
    { id: "daf-congo@sipgn.cg", initiales: "DF", nom: "DAF" },
    { id: "personnel-congo@sipgn.cg", initiales: "PE", nom: "PERS" },
    { id: "interpol-congo@policenationale.cg", initiales: "IN", nom: "INT" },
    { id: "bca-congo@policenationale.cg", initiales: "BC", nom: "BCA" },
    { id: "commissariatcentral-congo@policenationale.cg", initiales: "CC", nom: "COMM" },
    { id: "dcpj-congo@policenationale.cg", initiales: "PJ", nom: "DCPJ" },
    { id: "gendarmeriepnr-congo@gendarmerienationale.cg", initiales: "GN", nom: "GEND" },
    { id: "frontieres-congo@policenationale.cg", initiales: "FR", nom: "FRON" },
    { id: "policenavale-congo@policenationale.cg", initiales: "PN", nom: "PNAV" },
    { id: "gendarmerienavale-congo@gendarmerienationale.cg", initiales: "GV", nom: "GNAV" }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  planifvisio: CalendarCheck,
  appels: Radio
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
    { id: "planifvisio", label: "Planificateur Visio" },
    { id: "appels", label: "Appels SIPGN" }
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
  var showWelcomeState = useState(false);
  var showWelcome = showWelcomeState[0];
  var setShowWelcome = showWelcomeState[1];
  var msgNonLusState = useState(0);
  var msgNonLus = msgNonLusState[0];
  var setMsgNonLus = msgNonLusState[1];
  var sidebarOpenState = useState(false);
  var sidebarOpen = sidebarOpenState[0];
  var setSidebarOpen = sidebarOpenState[1];

  useEffect(function () {
    if (compte) {
      setShowWelcome(true);
      supabase.from("messages").select("*").eq("a", compte.identifiant).eq("lu", false).then(function (r) {
        if (r.data) { setMsgNonLus(r.data.length); }
      });
    }
  }, [compte]);

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
  var mcEnCours = INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length;
  var gavActives = GARDES_VUE_DATA.filter(function (g) { return g.statut === "actif"; }).length;
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
  } else if (module === "appels") {
    content = <AppelsSystem compte={compte} />;
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
      {showWelcome ? (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <div>
              <p className="text-white font-black text-lg">Bienvenue, {compte.nom}</p>
              <p className="text-slate-500 text-xs">Voici votre situation a la connexion</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-3 py-2">
                <span className="text-slate-300 text-sm">Mains courantes en cours</span>
                <span className="text-white font-bold">{mcEnCours}</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-3 py-2">
                <span className="text-slate-300 text-sm">Gardes a vue actives</span>
                <span className="text-white font-bold">{gavActives}</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-3 py-2">
                <span className="text-slate-300 text-sm">Messages non lus</span>
                <span className="text-white font-bold">{msgNonLus}</span>
              </div>
            </div>
            <button onClick={function () { setShowWelcome(false); }} className="w-full bg-blue-700 text-white py-2 rounded-xl font-bold text-sm">Compris</button>
          </div>
        </div>
      ) : null}
      <div className="bg-slate-900 border-b border-slate-800 flex items-center px-4 py-2.5 gap-4">
        <button onClick={function () { setSidebarOpen(function (v) { return !v; }); }} className="md:hidden w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white shrink-0">
          <Menu size={16} />
        </button>
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
        <button className="relative w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
          <MessageSquare size={15} />
          {msgNonLus > 0 ? <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{msgNonLus}</span> : null}
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
      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen ? (
          <div onClick={function () { setSidebarOpen(false); }} className="fixed inset-0 bg-black/60 z-30 md:hidden"></div>
        ) : null}
        <aside className={"fixed md:static inset-y-0 left-0 z-40 w-64 md:w-56 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 transform transition-transform duration-200 md:translate-x-0 " + (sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex items-center justify-between px-4 pt-4 pb-1 md:block">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Navigation</p>
            <button onClick={function () { setSidebarOpen(false); }} className="md:hidden w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          </div>
          <nav className="flex-1 p-3 pt-1 overflow-y-auto">
            {nav.map(function (item) {
              var isActive = module === item.id;
              var IconComp = NAV_ICON[item.id] ? NAV_ICON[item.id] : LayoutDashboard;
              return (
                <button key={item.id} onClick={function () { setModule(item.id); setSidebarOpen(false); }} style={{ background: isActive ? compte.couleur + "26" : "transparent", color: isActive ? "#fff" : "#94A3B8", borderLeft: isActive ? "3px solid " + compte.couleur : "3px solid transparent" }} className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold mb-0.5 flex items-center gap-2.5">
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
// ============ SYSTEME D APPELS ============
function AppelsSystem(props) {
  var compte = props.compte;
  var allComptes = COMPTES;

  var appelEntrantState = useState(null);
  var appelEntrant = appelEntrantState[0]; var setAppelEntrant = appelEntrantState[1];
  var pcRef = useRef(null);
  var localStreamRef = useRef(null);
  var remoteAudioRef = useRef(null);
  var appelSortantState = useState(null);
  var appelSortant = appelSortantState[0]; var setAppelSortant = appelSortantState[1];
  var enAppelState = useState(false);
  var enAppel = enAppelState[0]; var setEnAppel = enAppelState[1];
  var dureeState = useState(0);
  var duree = dureeState[0]; var setDuree = dureeState[1];
  var presencesState = useState({});
  var presences = presencesState[0]; var setPresences = presencesState[1];
  var historiqueState = useState([]);
  var historique = historiqueState[0]; var setHistorique = historiqueState[1];
  var micState = useState(true); var mic = micState[0]; var setMic = micState[1];
  var rechercheState = useState(""); var recherche = rechercheState[0]; var setRecherche = rechercheState[1];
  var ongletState = useState("clavier"); var onglet = ongletState[0]; var setOnglet = ongletState[1];
  var numeroComposeState = useState(""); var numeroCompose = numeroComposeState[0]; var setNumeroCompose = numeroComposeState[1];
  var repertoireState = useState([]); var repertoire = repertoireState[0]; var setRepertoire = repertoireState[1];
  var nouveauNomState = useState(""); var nouveauNom = nouveauNomState[0]; var setNouveauNom = nouveauNomState[1];
  var nouveauNumeroState = useState(""); var nouveauNumero = nouveauNumeroState[0]; var setNouveauNumero = nouveauNumeroState[1];

  // Enregistrer presence
  useEffect(function() {
    function majPresence() {
      supabase.from("presences").upsert({
        identifiant: compte.identifiant,
        nom: compte.nom,
        statut: "en_ligne",
        derniere_activite: new Date().toISOString()
      }, {onConflict: "identifiant"}).then(function(){});
    }
    majPresence();
    var timer = setInterval(majPresence, 20000);

    // Charger presences
    function chargerPresences() {
      supabase.from("presences").select("*").then(function(r) {
        if(r.data) {
          var map = {};
          r.data.forEach(function(p) {
            var diff = (new Date() - new Date(p.derniere_activite)) / 1000;
            map[p.identifiant] = diff < 60 ? "en_ligne" : "hors_ligne";
          });
          setPresences(map);
        }
      });
    }
    chargerPresences();
    var presTimer = setInterval(chargerPresences, 15000);

    // Ecouter appels entrants
    function verifierAppels() {
      supabase.from("appels").select("*")
        .eq("recepteur", compte.identifiant)
        .eq("statut", "sonnerie")
        .order("created_at", {ascending: false})
        .limit(1)
        .then(function(r) {
          if(r.data && r.data.length > 0 && !enAppel) {
            setAppelEntrant(r.data[0]);
          }
        });
    }
    var appelTimer = setInterval(verifierAppels, 3000);

    // Ecouter reponse de l'appel sortant (WebRTC answer)
    function verifierReponseAppelant() {
      setAppelSortant(function(a) {
        if (!a || !pcRef.current || pcRef.current.remoteDescription) { return a; }
        supabase.from("appels").select("statut,answer_sdp").eq("id", a.id).limit(1).then(function(r) {
          var row = r.data && r.data[0];
          if (row && row.answer_sdp && pcRef.current && !pcRef.current.remoteDescription) {
            pcRef.current.setRemoteDescription(JSON.parse(row.answer_sdp)).then(function() {
              setEnAppel(true);
            });
          }
        });
        return a;
      });
    }
    var reponseTimer = setInterval(verifierReponseAppelant, 1500);

    return function() {
      clearInterval(timer);
      clearInterval(presTimer);
      clearInterval(appelTimer);
      clearInterval(reponseTimer);
      supabase.from("presences").upsert({
        identifiant: compte.identifiant,
        nom: compte.nom,
        statut: "hors_ligne",
        derniere_activite: new Date().toISOString()
      }, {onConflict: "identifiant"}).then(function(){});
    };
  }, []);

  // Chrono appel
  useEffect(function() {
    if(enAppel) {
      var t = setInterval(function() { setDuree(function(d) { return d+1; }); }, 1000);
      return function() { clearInterval(t); };
    } else {
      setDuree(0);
    }
  }, [enAppel]);

  // Charger historique depuis Supabase
  function chargerHistorique() {
    supabase.from("appels")
      .select("*")
      .or("appelant.eq." + compte.identifiant + ",recepteur.eq." + compte.identifiant)
      .order("created_at", {ascending: false})
      .limit(50)
      .then(function(r) {
        if (!r.data) { return; }
        var mapped = r.data.map(function(row) {
          var estSortant = row.appelant === compte.identifiant;
          var nomAvec = row.appelant_nom;
          if (estSortant) {
            var cibleTrouvee = allComptes.filter(function(cc) { return cc.identifiant === row.recepteur; })[0];
            nomAvec = cibleTrouvee ? cibleTrouvee.nom : row.recepteur;
          }
          return {
            id: row.id,
            avec: nomAvec,
            correspondantId: estSortant ? row.recepteur : row.appelant,
            type: estSortant ? "sortant" : "entrant",
            heure: row.created_at ? new Date(row.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) : "",
            statut: row.statut
          };
        });
        setHistorique(mapped);
      });
  }

  function chargerRepertoire() {
    supabase.from("repertoire_perso")
      .select("*")
      .eq("proprietaire", compte.identifiant)
      .order("nom", {ascending: true})
      .then(function(r) {
        if (r.data) { setRepertoire(r.data); }
      });
  }

  function ajouterContact() {
    if (!nouveauNom.trim() || !nouveauNumero.trim()) { return; }
    supabase.from("repertoire_perso").insert([{
      proprietaire: compte.identifiant,
      nom: nouveauNom.trim(),
      numero: nouveauNumero.trim()
    }]).then(function(r) {
      if (!r.error) {
        setNouveauNom("");
        setNouveauNumero("");
        chargerRepertoire();
      }
    });
  }

  function supprimerContact(id) {
    supabase.from("repertoire_perso").delete().eq("id", id).eq("proprietaire", compte.identifiant).then(function(r) {
      if (!r.error) { chargerRepertoire(); }
    });
  }

  useEffect(function() {
    if (onglet === "historique") { chargerHistorique(); }
    if (onglet === "repertoire") { chargerRepertoire(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onglet]);

  function formatDuree(s) {
    var m = Math.floor(s/60); var ss = s%60;
    return (m<10?"0":"")+m+":"+(ss<10?"0":"")+ss;
  }

  function appeler(cible, typeAppel) {
    var id = "APPEL-"+Date.now();
    var nouvelAppel = {
      id: id,
      appelant: compte.identifiant,
      appelant_nom: compte.nom,
      recepteur: cible.identifiant,
      statut: "sonnerie",
      type: typeAppel || "audio"
    };
    supabase.from("appels").insert([nouvelAppel]).then(function(r) {
      if(!r.error) {
        setAppelSortant(Object.assign({}, nouvelAppel, {recepteur_nom: cible.nom, recepteur_couleur: cible.couleur}));
        navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
          localStreamRef.current = stream;
          var pc = new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]});
          pcRef.current = pc;
          stream.getTracks().forEach(function(t) { pc.addTrack(t, stream); });
          pc.ontrack = function(e) {
            if (remoteAudioRef.current) { remoteAudioRef.current.srcObject = e.streams[0]; }
          };
          pc.createOffer().then(function(offer) {
            return pc.setLocalDescription(offer);
          }).then(function() {
            function envoyerOffreQuandPret() {
              if (pc.iceGatheringState === "complete") {
                supabase.from("appels").update({offer_sdp: JSON.stringify(pc.localDescription)}).eq("id", id).then(function(){});
              } else {
                setTimeout(envoyerOffreQuandPret, 300);
              }
            }
            envoyerOffreQuandPret();
          });
        }).catch(function(){});
        // Auto-annuler apres 30s
        setTimeout(function() {
          setAppelSortant(function(a) {
            if(a && a.id === id) {
              supabase.from("appels").update({statut:"manque"}).eq("id",id).then(function(){});
              if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
              if (localStreamRef.current) { localStreamRef.current.getTracks().forEach(function(t){t.stop();}); localStreamRef.current = null; }
              return null;
            }
            return a;
          });
        }, 30000);
      }
    });
  }

  function accepterAppel() {
    if(!appelEntrant) return;
    var idAppel = appelEntrant.id;
    var nomAppelant = appelEntrant.appelant_nom;
    supabase.from("appels").select("*").eq("id", idAppel).limit(1).then(function(rSel) {
      var ligneAppel = rSel.data && rSel.data[0];
      if (!ligneAppel || !ligneAppel.offer_sdp) { return; }
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
        localStreamRef.current = stream;
        var pc = new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]});
        pcRef.current = pc;
        stream.getTracks().forEach(function(t) { pc.addTrack(t, stream); });
        pc.ontrack = function(e) {
          if (remoteAudioRef.current) { remoteAudioRef.current.srcObject = e.streams[0]; }
        };
        pc.setRemoteDescription(JSON.parse(ligneAppel.offer_sdp)).then(function() {
          return pc.createAnswer();
        }).then(function(answer) {
          return pc.setLocalDescription(answer);
        }).then(function() {
          function envoyerReponseQuandPrete() {
            if (pc.iceGatheringState === "complete") {
              supabase.from("appels").update({statut:"en_cours", answer_sdp: JSON.stringify(pc.localDescription)}).eq("id", idAppel).then(function(r) {
                if(!r.error) {
                  setEnAppel(true);
                  setHistorique(function(prev) {
                    return [{
                      id: idAppel,
                      avec: nomAppelant,
                      type: "entrant",
                      heure: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),
                      statut: "accepte"
                    }].concat(prev);
                  });
                }
              });
            } else {
              setTimeout(envoyerReponseQuandPrete, 300);
            }
          }
          envoyerReponseQuandPrete();
        });
      }).catch(function(){});
    });
  }

  function refuserAppel() {
    if(!appelEntrant) return;
    supabase.from("appels").update({statut:"refuse"}).eq("id", appelEntrant.id).then(function(){});
    setAppelEntrant(null);
  }

  function raccrocher() {
    var id = enAppel ? (appelEntrant ? appelEntrant.id : (appelSortant ? appelSortant.id : null)) : (appelSortant ? appelSortant.id : null);
    if(id) {
      supabase.from("appels").update({statut:"termine"}).eq("id", id).then(function(){});
    }
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    if (localStreamRef.current) { localStreamRef.current.getTracks().forEach(function(t){t.stop();}); localStreamRef.current = null; }
    setEnAppel(false);
    setAppelEntrant(null);
    setAppelSortant(null);
  }

  function annulerAppel() {
    if(appelSortant) {
      supabase.from("appels").update({statut:"annule"}).eq("id", appelSortant.id).then(function(){});
      setAppelSortant(null);
    }
  }

  var contactsFiltres = allComptes.filter(function(c) {
    return c.identifiant !== compte.identifiant &&
      (!recherche || c.nom.toLowerCase().indexOf(recherche.toLowerCase()) >= 0 || c.service.toLowerCase().indexOf(recherche.toLowerCase()) >= 0);
  });

  // Interface appel entrant
  if(appelEntrant && !enAppel) {
    return (
      <div className="space-y-4">
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-slate-900 rounded-3xl border border-slate-700 p-8 w-[90vw] max-w-xs text-center space-y-6 shadow-2xl">
            <div className="animate-pulse">
              <div style={{background: "#1B6B3A33", color: "#1B6B3A"}} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4">
                {appelEntrant.appelant_nom.slice(0,2).toUpperCase()}
              </div>
              <p className="text-white font-black text-xl">{appelEntrant.appelant_nom}</p>
              <p className="text-slate-400 text-sm mt-1">Appel entrant...</p>
              <p className="text-green-400 text-xs mt-1">📞 {appelEntrant.type === "video" ? "Appel vidéo" : "Appel audio"}</p>
            </div>
            <div className="flex gap-6 justify-center">
              <button onClick={refuserAppel} className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                <PhoneOff size={24} className="text-white"/>
              </button>
              <button onClick={accepterAppel} className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center shadow-lg animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-slate-500 text-sm">Appel entrant de {appelEntrant.appelant_nom}...</div>
      </div>
    );
  }

  // Interface appel en cours
  if(enAppel) {
    var interlocuteur = appelEntrant ? appelEntrant.appelant_nom : (appelSortant ? appelSortant.recepteur_nom : "Inconnu");
    return (
      <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <div style={{background: "#1B6B3A33", color: "#1B6B3A"}} className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black mx-auto">
            {interlocuteur.slice(0,2).toUpperCase()}
          </div>
          <p className="text-white font-black text-2xl">{interlocuteur}</p>
          <p className="text-green-400 font-mono text-xl">{formatDuree(duree)}</p>
          <p className="text-slate-500 text-sm">Appel en cours — chiffré</p>
        </div>
        <div className="flex gap-6">
          <button onClick={function(){setMic(function(v){return !v;})}} style={{background: mic?"#1E293B":"#DC262633"}} className="w-14 h-14 rounded-full flex items-center justify-center border border-slate-700">
            {mic ? <Mic size={20} className="text-white"/> : <MicOff size={20} className="text-red-400"/>}
          </button>
          <button onClick={raccrocher} className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/50">
            <PhoneOff size={24} className="text-white"/>
          </button>
        </div>
      </div>
    );
  }

  // Interface appel sortant
  if(appelSortant) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-8 w-[90vw] max-w-xs text-center space-y-6 shadow-2xl">
          <div style={{background: (appelSortant.recepteur_couleur||"#1B6B3A")+"33", color: appelSortant.recepteur_couleur||"#1B6B3A"}} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mx-auto">
            {(appelSortant.recepteur_nom||"").slice(0,2).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-black text-xl">{appelSortant.recepteur_nom}</p>
            <p className="text-slate-400 text-sm mt-1 animate-pulse">Appel en cours...</p>
          </div>
          <button onClick={annulerAppel} className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg mx-auto">
            <PhoneOff size={24} className="text-white"/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Appels SIPGN</h2>
          <p className="text-slate-400 text-sm">Communications securisees entre agents</p>
        </div>
        <Chip color="#22C55E">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-1"></span>
          En ligne
        </Chip>
      </div>

      <div className="flex gap-2">
        {[["clavier","🔢 Clavier"],["repertoire","📇 Repertoire"],["historique","📋 Historique"]].map(function(o) {
          return <button key={o[0]} onClick={function(){setOnglet(o[0]);}} style={{background:onglet===o[0]?"#1D4ED8":"#1E293B", color:onglet===o[0]?"#fff":"#94A3B8"}} className="px-4 py-2 rounded-lg text-xs font-bold">{o[1]}</button>;
        })}
      </div>

      {onglet === "clavier" ? (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-center">
            <input value={numeroCompose} readOnly placeholder="Composer un numero..." className="bg-transparent text-white text-2xl font-bold text-center outline-none w-full tracking-widest"/>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["1","2","3","4","5","6","7","8","9","⌫","0","Appeler"].map(function(touche) {
              return (
                <button key={touche} onClick={function() {
                  if (touche === "⌫") {
                    setNumeroCompose(function(n) { return n.slice(0, -1); });
                  } else if (touche === "Appeler") {
                    var cibleTrouvee = allComptes.filter(function(c) { return c.numero.replace(/\s/g, "") === numeroCompose.replace(/\s/g, ""); })[0];
                    if (cibleTrouvee) {
                      appeler(cibleTrouvee, "audio");
                      setNumeroCompose("");
                    }
                  } else {
                    setNumeroCompose(function(n) { return (n + touche).slice(0, 20); });
                  }
                }} style={{background: touche==="Appeler"?"#22C55E":"#1E293B", color: touche==="Appeler"?"#fff":"#E2E8F0"}} className="py-4 rounded-xl text-lg font-bold hover:opacity-80">
                  {touche}
                </button>
              );
            })}
          </div>
          {numeroCompose && allComptes.filter(function(c) { return c.numero.replace(/\s/g, "") === numeroCompose.replace(/\s/g, ""); }).length === 0 ? (
            <p className="text-slate-500 text-xs text-center">Aucun agent avec ce numero</p>
          ) : null}
        </div>
      ) : null}


      {onglet === "repertoire" ? (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2">
            <input value={nouveauNom} onChange={function(e){setNouveauNom(e.target.value);}} placeholder="Nom du contact" className="w-full bg-slate-800 text-white text-sm px-3 py-2 rounded-lg outline-none border border-slate-700"/>
            <input value={nouveauNumero} onChange={function(e){setNouveauNumero(e.target.value);}} placeholder="Numero (ex: 035 671 001)" className="w-full bg-slate-800 text-white text-sm px-3 py-2 rounded-lg outline-none border border-slate-700"/>
            <button onClick={ajouterContact} className="w-full bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold py-2 rounded-lg">Ajouter au repertoire</button>
          </div>
          <div className="space-y-2">
            {repertoire.length === 0 ? (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 text-center">
                <p className="text-slate-500 text-sm">Aucun contact enregistre</p>
              </div>
            ) : repertoire.map(function(rc) {
              return (
                <div key={rc.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3">
                  <div onClick={function() {
                    var cibleTrouvee = allComptes.filter(function(cc) { return cc.numero.replace(/\s/g, "") === rc.numero.replace(/\s/g, ""); })[0];
                    if (cibleTrouvee) { setOnglet("clavier"); appeler(cibleTrouvee, "audio"); }
                    else { setNumeroCompose(rc.numero.replace(/\s/g, "")); setOnglet("clavier"); }
                  }} className="flex-1 min-w-0 cursor-pointer">
                    <p className="text-white text-sm font-bold truncate">{rc.nom}</p>
                    <p className="text-slate-500 text-xs">{rc.numero}</p>
                  </div>
                  <button onClick={function(){supprimerContact(rc.id);}} className="w-9 h-9 rounded-full flex items-center justify-center bg-red-900/40 text-red-400 hover:bg-red-700 hover:text-white shrink-0" title="Supprimer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {onglet === "historique" ? (
        <div className="space-y-2">
          {historique.length === 0 ? (
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 text-center">
              <p className="text-slate-500 text-sm">Aucun appel recent</p>
            </div>
          ) : historique.map(function(h) {
            return (
              <div key={h.id} onClick={function() {
                var cibleTrouvee = allComptes.filter(function(cc) { return cc.identifiant === h.correspondantId; })[0];
                if (cibleTrouvee) { setOnglet("clavier"); appeler(cibleTrouvee, "audio"); }
              }} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-700/90 active:scale-[0.98] transition">
                <div style={{background: h.type==="entrant"?"#22C55E22":"#3B82F622", color: h.type==="entrant"?"#22C55E":"#3B82F6"}} className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold">{h.avec}</p>
                  <p className="text-slate-500 text-xs">{h.type === "entrant" ? "Appel entrant" : "Appel sortant"} · {h.heure}</p>
                </div>
                <Chip color={(h.statut==="termine"||h.statut==="en_cours")?"#22C55E":(h.statut==="sonnerie"?"#64748B":"#DC2626")}>{h.statut}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  );
}

